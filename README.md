# Portafolio Académico — Vue + PHP + MySQL

Proyecto web que integra **Vue.js** (frontend) con **PHP** (backend) y **MySQL** (persistencia) para mostrar proyectos de un portafolio, filtrar por categorías y recibir mensajes desde un formulario de contacto.

## Requisitos
- Node.js 18+
- XAMPP o WAMP (Apache + MySQL)
- phpMyAdmin para importar la base de datos

## Estructura del proyecto

frontend/ # código Vue (Vite)
api/ # backend PHP (XAMPP/WAMP)
config/Database.php
contacto.php # POST -> inserta mensaje de contacto (HTML)


## Base de datos
Nombre: `PortafolioAcademico`  
Tablas clave: `Proyectos`, `Categorias`, `Proyectos_Categorias`, `Contacto`.  
Importa el script SQL desde **phpMyAdmin**.

## Partes del servidor (PHP)
- **Database.php:** Crea y entrega una conexión **PDO** (charset `utf8mb4`, modo excepción).
- **contacto.php:** Endpoint **POST**. Recibe `$_POST`, guarda en la tabla `Contacto` y responde con HTML personalizado (incluye demo de `$_SERVER`).


## Puesta en marcha (local)
1. Copia la carpeta `api/` a:
   - **XAMPP:** `C:\xampp\htdocs\portafolio\api\`
   - **WAMP:** `C:\wamp64\www\portafolio\api\`
2. Importa la base de datos en `http://localhost/phpmyadmin`.
3. Inicia **Apache** y **MySQL** desde XAMPP/WAMP.
4. En el directorio del frontend:
   ```bash
   npm install
   npm run dev
5. Abre http://localhost:5173/
