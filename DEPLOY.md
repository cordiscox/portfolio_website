```markdown
# 🚀 Deploy en AWS EC2 (joaquincordisco.me)

Deploy de un portafolio **Vite/React** en **AWS EC2** usando **Nginx + symlink**, evitando loops internos y garantizando un despliegue limpio.

---

## 1. 🖥 Crear y preparar la instancia

1. Crear una EC2 (Ubuntu 22.04 o 24.04, t3.micro o similar).
2. Security Group:
   - `22/tcp` (SSH)
   - `80/tcp` (HTTP)
   - `443/tcp` (HTTPS)
3. Configurar DNS: joaquincordisco.me → <IP pública de EC2>


## 2. 🔐 Acceso por SSH

```bash
ssh -i /ruta/a/tu-par.pem ubuntu@<IP_PUBLICA>
````

---

## 3. 📦 Instalar dependencias base

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl snapd
```

### Node LTS con nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
```

---

## 4. 📁 Clonar y build del proyecto

```bash
cd ~
git clone <repo_url> portfolio_website
cd portfolio_website
npm install
npm run build    # genera build/
```

---

## 5. 🌐 Deploy con Nginx (usando SYMLINK — recomendado)

Esta técnica evita loops (como el `rewrite or internal redirection cycle`) y permite redeploys limpios.

### 5.1 Crear carpeta base

```bash
sudo mkdir -p /var/www
```

### 5.2 Crear symlink apuntando al build

```bash
sudo ln -s /home/ubuntu/portfolio_website/build /var/www/portfolio
```

Verificar:

```bash
ls -l /var/www
```

Salida esperada:

```
portfolio -> /home/ubuntu/portfolio_website/build
```

---

## 5.3 Configurar Nginx para servir SPA Vite/React

```bash
sudo tee /etc/nginx/sites-available/portfolio <<'EOF'
server {
    listen 80;
    server_name joaquincordisco.me;

    root /var/www/portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /favicon.ico {
        try_files /favicon.ico =204;
        access_log off;
        log_not_found off;
    }
}
EOF
```

Activar sitio:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

---

## 6. 🔒 HTTPS con Let’s Encrypt

```bash
sudo snap install core && sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo certbot --nginx -d joaquincordisco.me
```

Certbot:

* genera certificados
* añade redirección HTTP → HTTPS
* configura renovación automática

---

## 7. 🔄 Actualizar despliegues (redeploy limpio)

```bash
cd ~/portfolio_website
git pull
npm install
npm run build
```

Recrear symlink (seguro y evita problemas si cambian rutas/nombres):

```bash
sudo rm /var/www/portfolio
sudo ln -s /home/ubuntu/portfolio_website/build /var/www/portfolio
sudo systemctl reload nginx
```

---

## 8. 🩺 Diagnóstico rápido

**Logs Nginx**

```bash
sudo tail -f /var/log/nginx/error.log
```

**Estado del servicio**

```bash
sudo systemctl status nginx
```

**Prueba de renovación del certificado**

```bash
sudo certbot renew --dry-run
```

**Ver symlinks activos**

```bash
find /var/www -maxdepth 2 -type l -ls
```
