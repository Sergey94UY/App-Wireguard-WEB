# App-Wireguard-WEB by Sergio Maine 

Redes Social: Linkedin linkedin.com/in/sergiomaine/

Paso 1) Instalar apache en Ubuntu.
    apt install apache2
    
Paso 2) Copiar los files de la app al directorio.

app.js

app2.js

basic-qr.html

index.html

style.css


cp . /var/www/html/

Version Dockerizada:

1) Bajar la imagen: docker pull sergei94uy/app-wireguard
2) Ejecutar la imagen: docker run -d -p 80:80 app-wireguard

