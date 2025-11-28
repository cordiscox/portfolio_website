export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Subtle paw pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff8c42' opacity='0.4'%3E%3Cpath d='M50 30 Q45 25 40 30 Q35 35 40 40 Q45 45 50 40 Q55 35 50 30 M55 45 Q52 42 49 45 Q46 48 49 51 Q52 54 55 51 Q58 48 55 45 M45 45 Q42 42 39 45 Q36 48 39 51 Q42 54 45 51 Q48 48 45 45 M62 40 Q59 37 56 40 Q53 43 56 46 Q59 49 62 46 Q65 43 62 40 M38 40 Q35 37 32 40 Q29 43 32 46 Q35 49 38 46 Q41 43 38 40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff8c42] rounded-full opacity-10 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#4ecdc4] rounded-full opacity-10 blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/2 w-[450px] h-[450px] bg-[#95e1d3] rounded-full opacity-10 blur-[120px]" />
      
      {/* Animated dots */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#ff8c42] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
