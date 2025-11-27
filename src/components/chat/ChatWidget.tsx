import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ChatHistoryEntry, ChatRole } from '../../services/chatbot';
import { sendChatMessage } from '../../services/chatbot';
import './chat.css';

type WidgetMessage = {
  id: string;
  role: ChatRole;
  text: string;
  timestamp: number;
  pending?: boolean;
  error?: boolean;
};

type RateLimitSnapshot = {
  sessionCount: number;
  sessionResetAt: number;
  timestamps: number[];
};

const MIN_MESSAGE_LENGTH = 3;
const MAX_MESSAGE_LENGTH = 600;
const MAX_SESSION_MESSAGES = 10;
const SESSION_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_MESSAGES_PER_MINUTE = 4;
const RATE_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_STORAGE_KEY = 'chat-widget-rate-limit';
const urlPattern = /(https?:\/\/|www\.)/i;
const FREQUENT_QUESTIONS = [
  '¿Cuál fue tu mayor logro?',
  '¿Cómo manejas el trabajo en equipo?',
  '¿Qué esperas del próximo rol y equipo?',
] as const;

const defaultRateLimitSnapshot: RateLimitSnapshot = {
  sessionCount: 0,
  sessionResetAt: 0,
  timestamps: [],
};

const loadRateLimitSnapshot = (): RateLimitSnapshot => {
  if (typeof window === 'undefined') {
    return defaultRateLimitSnapshot;
  }

  try {
    const raw = window.localStorage.getItem(RATE_LIMIT_STORAGE_KEY);
    if (!raw) {
      return defaultRateLimitSnapshot;
    }

    const parsed = JSON.parse(raw) as Partial<RateLimitSnapshot>;
    return {
      sessionCount: Number(parsed.sessionCount) || 0,
      sessionResetAt: Number(parsed.sessionResetAt) || 0,
      timestamps: Array.isArray(parsed.timestamps)
        ? parsed.timestamps
            .map((timestamp) => Number(timestamp))
            .filter((timestamp) => Number.isFinite(timestamp))
        : [],
    };
  } catch (error) {
    console.warn('No se pudo cargar el estado de rate limit:', error);
    return defaultRateLimitSnapshot;
  }
};

const persistRateLimitSnapshot = (snapshot: RateLimitSnapshot) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(
      RATE_LIMIT_STORAGE_KEY,
      JSON.stringify(snapshot)
    );
  } catch (error) {
    console.warn('No se pudo guardar el estado de rate limit:', error);
  }
};

const welcomeMessage: WidgetMessage = {
  id: 'chat-welcome',
  role: 'assistant',
  text: 'Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
  timestamp: Date.now(),
};

const toHistoryEntry = (message: WidgetMessage): ChatHistoryEntry => ({
  role: message.role,
  text: message.text,
  timestamp: message.timestamp,
});

const createMessageId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const formatTime = (timestamp: number) => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  } catch {
    return '';
  }
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<WidgetMessage[]>([welcomeMessage]);
  const [isSending, setIsSending] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(
    [...FREQUENT_QUESTIONS]
  );
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);
  const [, setSessionCount] = useState(0);
  const [, setSessionResetAt] = useState<number>(0);
  const [, setRecentTimestamps] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const rateLimitRef = useRef<RateLimitSnapshot>(defaultRateLimitSnapshot);

  const applyRateLimitSnapshot = (snapshot: RateLimitSnapshot) => {
    rateLimitRef.current = snapshot;
    setSessionCount(snapshot.sessionCount);
    setSessionResetAt(snapshot.sessionResetAt);
    setRecentTimestamps(snapshot.timestamps);
    persistRateLimitSnapshot(snapshot);
  };

  useEffect(() => {
    const storedSnapshot = loadRateLimitSnapshot();
    const now = Date.now();
    let nextSessionCount = storedSnapshot.sessionCount || 0;
    let nextSessionResetAt = storedSnapshot.sessionResetAt || 0;

    if (!nextSessionResetAt || now >= nextSessionResetAt) {
      nextSessionCount = 0;
      nextSessionResetAt = 0;
    }

    const filteredTimestamps = storedSnapshot.timestamps.filter(
      (timestamp) => now - timestamp < RATE_WINDOW_MS
    );

    const sanitizedSnapshot: RateLimitSnapshot = {
      sessionCount: nextSessionCount,
      sessionResetAt:
        nextSessionCount > 0
          ? nextSessionResetAt || now + SESSION_WINDOW_MS
          : 0,
      timestamps: filteredTimestamps,
    };

    applyRateLimitSnapshot(sanitizedSnapshot);
  }, []);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const trimmedInput = inputValue.trim();
  const hasInput = trimmedInput.length > 0;
  const remainingCharacters = Math.max(0, MAX_MESSAGE_LENGTH - inputValue.length);

  const validateMessage = (text: string): string | null => {
    if (!text) {
      return 'Escribe un mensaje antes de enviarlo.';
    }

    if (text.length < MIN_MESSAGE_LENGTH) {
      return `Escribe al menos ${MIN_MESSAGE_LENGTH} caracteres.`;
    }

    if (text.length > MAX_MESSAGE_LENGTH) {
      return `El mensaje supera el máximo de ${MAX_MESSAGE_LENGTH} caracteres.`;
    }

    if (urlPattern.test(text)) {
      return 'Por seguridad, evita compartir enlaces o URLs.';
    }

    return null;
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const nextValue = event.target.value;
    setInputValue(nextValue);

    const trimmed = nextValue.trim();
    if (!trimmed) {
      setValidationError(null);
      return;
    }

    setValidationError(validateMessage(trimmed));
  };

  const checkAndConsumeRateLimit = (): boolean => {
    const now = Date.now();
    let {
      sessionCount: currentSessionCount,
      sessionResetAt: currentSessionResetAt,
      timestamps,
    } = rateLimitRef.current;

    if (!currentSessionResetAt || now >= currentSessionResetAt) {
      currentSessionCount = 0;
      currentSessionResetAt = now + SESSION_WINDOW_MS;
    }

    const filteredTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < RATE_WINDOW_MS
    );

    const baseSnapshot: RateLimitSnapshot = {
      sessionCount: currentSessionCount,
      sessionResetAt: currentSessionResetAt,
      timestamps: filteredTimestamps,
    };

    if (filteredTimestamps.length >= MAX_MESSAGES_PER_MINUTE) {
      applyRateLimitSnapshot(baseSnapshot);
      setRateLimitMessage(
        'Solo puedes enviar 4 mensajes por minuto. Intenta en unos segundos.'
      );
      return false;
    }

    if (currentSessionCount >= MAX_SESSION_MESSAGES) {
      applyRateLimitSnapshot(baseSnapshot);
      const remainingMs = currentSessionResetAt - now;
      const hoursLeft = Math.max(
        1,
        Math.ceil(remainingMs / (60 * 60 * 1000))
      );
      setRateLimitMessage(
        `Alcanzaste el máximo de ${MAX_SESSION_MESSAGES} mensajes por día. Vuelve en ${hoursLeft} ${hoursLeft === 1 ? 'hora' : 'horas'}.`
      );
      return false;
    }

    const updatedSnapshot: RateLimitSnapshot = {
      sessionCount: currentSessionCount + 1,
      sessionResetAt: currentSessionResetAt || now + SESSION_WINDOW_MS,
      timestamps: [...filteredTimestamps, now],
    };

    applyRateLimitSnapshot(updatedSnapshot);
    setRateLimitMessage(null);
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleSend();
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setInputValue('');
      setValidationError('Escribe un mensaje antes de enviarlo.');
      return;
    }

    if (isSending) {
      return;
    }

    const validationMessage = validateMessage(trimmed);
    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    if (!checkAndConsumeRateLimit()) {
      return;
    }

    await processMessage(trimmed, {
      clearInput: true,
      removeAllSuggestions: true,
    });
  };

  const handleSuggestionClick = async (question: string) => {
    if (isSending) {
      return;
    }

    if (!checkAndConsumeRateLimit()) {
      return;
    }

    setValidationError(null);
    await processMessage(question, { removeSuggestionText: question });
  };

  const processMessage = async (
    text: string,
    options: {
      clearInput?: boolean;
      removeAllSuggestions?: boolean;
      removeSuggestionText?: string;
    } = {}
  ) => {
    const userMessage: WidgetMessage = {
      id: createMessageId(),
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    const placeholderId = createMessageId();
    const placeholderMessage: WidgetMessage = {
      id: placeholderId,
      role: 'assistant',
      text: 'Escribiendo…',
      timestamp: Date.now(),
      pending: true,
    };

    const nextHistory: ChatHistoryEntry[] = [...messages, userMessage].map(
      toHistoryEntry
    );

    setMessages((prev) => [...prev, userMessage, placeholderMessage]);
    if (options.clearInput) {
      setInputValue('');
    }
    setValidationError(null);
    if (options.removeAllSuggestions) {
      setSuggestedQuestions([]);
    } else if (options.removeSuggestionText) {
      setSuggestedQuestions((prev) =>
        prev.filter((question) => question !== options.removeSuggestionText)
      );
    }

    setIsSending(true);

    try {
      const reply = await sendChatMessage(text, nextHistory);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                text: reply,
                pending: false,
                error: false,
                timestamp: Date.now(),
              }
            : message
        )
      );
    } catch (error) {
      console.error('Error al enviar el mensaje del chatbot:', error);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === placeholderId
            ? {
                ...message,
                text: 'No pude conectarme con el asistente. ¡Intenta otra vez!',
                pending: false,
                error: true,
                timestamp: Date.now(),
              }
            : message
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const renderMessage = (message: WidgetMessage) => {
    return (
      <div
        key={message.id}
        className={`chat-message chat-message--${message.role} ${
          message.error ? 'chat-message--error' : ''
        }`}
      >
        <div className="chat-message__bubble">
          <p>{message.text}</p>
          <div className="chat-message__meta">
            {message.pending ? (
              <span className="chat-message__status">Escribiendo…</span>
            ) : (
              <time dateTime={new Date(message.timestamp).toISOString()}>
                {formatTime(message.timestamp)}
              </time>
            )}
          </div>
        </div>
      </div>
    );
  };

  const toggleWidget = () => setIsOpen((prev) => !prev);

  const bubbleLabel = useMemo(
    () =>
      isOpen
        ? 'Cerrar asistente virtual'
        : 'Chatea con tu asistente virtual',
    [isOpen]
  );

  return (
    <div className="chat-widget">
      <button
        type="button"
        className={`chat-bubble ${isOpen ? 'chat-bubble--hidden' : ''}`}
        onClick={toggleWidget}
        aria-pressed={isOpen}
        aria-label={bubbleLabel}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M5 2h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3.59L10 22.59A1 1 0 0 1 8.29 22V17H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3m0 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h5v3.59L13.59 15H19a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="chat-window" role="dialog" aria-label="Asistente virtual">
          <header className="chat-window__header">
            <div>
              <p className="chat-window__title">Asistente virtual</p>
            </div>
            <button
              type="button"
              className="chat-window__close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </header>

          {suggestedQuestions.length > 0 && (
            <div className="chat-window__suggestions" aria-live="polite">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="chat-suggestion"
                  onClick={() => void handleSuggestionClick(question)}
                  disabled={isSending}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <div
            className="chat-window__body"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {messages.map(renderMessage)}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          <form className="chat-window__composer" onSubmit={handleSubmit}>
            <label htmlFor="chat-message" className="sr-only">
              Escribe tu mensaje
            </label>
            <div className="chat-window__input-row">
              <textarea
                id="chat-message"
                ref={textareaRef}
                rows={2}
                value={inputValue}
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void handleSend();
                  }
                }}
                placeholder="Escribe tu pregunta y presiona Enter"
                aria-invalid={Boolean(validationError)}
                aria-describedby="chat-message-help"
              />
              <button
                type="submit"
                className="chat-window__send"
                disabled={
                  !hasInput ||
                  Boolean(validationError) ||
                  trimmedInput.length < MIN_MESSAGE_LENGTH ||
                  isSending
                }
              >
                {isSending ? 'Enviando…' : 'Enviar'}
              </button>
            </div>
            <div className="chat-window__input-footer" id="chat-message-help">
              <span className="chat-window__char-count">
                {remainingCharacters} caracteres restantes
              </span>
              {(validationError || rateLimitMessage) && (
                <span
                  className="chat-window__validation"
                  role="alert"
                  aria-live="assertive"
                >
                  {validationError || rateLimitMessage}
                </span>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
