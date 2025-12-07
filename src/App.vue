<template>
  <div class="header-band">
    <header class="container">
      <div class="brand">
        <h1>Portafolio ISC — Amador Vilis Hernández — Gilberto Gersain Bueno Tlaxcalteco </h1>
        <p>Portafolio Web en el que muestran Proyectos, habilidades y trayectoria de la carrera ISC</p>
      </div>

      <nav aria-label="Navegación principal">
        <ul>
          <li><router-link to="/" class="active">Inicio</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>
      </nav>
    </header>
  </div>

  <main class="container">
    <!-- aquí se cargan Inicio.vue o Contacto.vue -->
    <router-view />
  </main>

  <footer class="footer">
    <div class="container" role="contentinfo">
      © 2025 Vilis Hernández Amador — <router-link to="/contacto">Contacto</router-link>
    </div>
  </footer>
</template>

<script setup>
</script>

<style>
:root{
  --bg:#0b1220; 
  --surface:#101828; 
  --band:#0f172a; 
  --text:#e5e7eb;
  --muted:#94a3b8; 
  --border:#243041; 
  --brand:#00e6a7;
}

*{box-sizing:border-box}
html,body{
  margin:0;
  padding:0;
  background:var(--bg);
  color:var(--text);
  font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Arial
}

a{
  color:#80eaff
}

img{
  max-width:100%;
  display:block;
  border-radius:14px
}

.container{
  max-width:1100px;
  margin-inline:auto;
  padding:16px
}

.header-band{
  background:linear-gradient(90deg,#0f172a,#0b1220 50%,#0f172a)
}

.brand h1{
  margin:0 0 6px 0;
  font-size:24px
}

nav ul{list-style:none;display:flex;gap:12px;padding:0;margin:8px 0 0}
nav a{display:inline-block;padding:8px 12px;border-radius:10px;border:1px solid transparent}
nav a.router-link-active,
nav a:hover{border-color:var(--border);background:rgba(255,255,255,0.02)}

.footer{margin-top:40px;border-top:1px solid var(--border);padding:24px 0;background:#0a1120}
</style>
