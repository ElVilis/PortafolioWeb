<template>
  <section class="card contacto-card">
    <h2>Contacto</h2>
    <p class="muted">Déjame tu mensaje y te respondo lo antes posible.</p>

    <form @submit.prevent="enviarFormulario" class="contact-form">
      <label>
        Nombre
        <input v-model="form.nombre" type="text" required />
      </label>

      <label>
        Correo electrónico
        <input v-model="form.correo" type="email" required />
      </label>

      <label>
        Celular
        <input v-model="form.celular" type="tel" />
      </label>

      <label>
        Asunto
        <input v-model="form.asunto" type="text" required />
      </label>

      <label>
        Mensaje
        <textarea v-model="form.mensaje" rows="4" required></textarea>
      </label>

      <button class="btn" type="submit" :disabled="cargando">
        {{ cargando ? 'Enviando…' : 'Enviar' }}
      </button>
    </form>

    <div v-if="respuesta" class="server-response" v-html="respuesta"></div>
    <div v-if="error" class="error-response">{{ error }}</div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  nombre: '',
  correo: '',
  celular: '',
  asunto: '',
  mensaje: ''
})

const respuesta = ref('')
const error = ref('')
const cargando = ref(false)

const enviarFormulario = async () => {
  respuesta.value = ''
  error.value = ''
  cargando.value = true

  try {
    const body = new FormData()
    body.append('nombre', form.nombre)
    body.append('correo', form.correo)
    body.append('celular', form.celular)
    body.append('asunto', form.asunto)
    body.append('mensaje', form.mensaje)

    const res = await fetch('http://localhost/portafolio/contacto.php', {
      method: 'POST',
      body
    })

    if (!res.ok) throw new Error('Error al enviar el formulario')

    const text = await res.text()
    respuesta.value = text

    form.nombre = ''
    form.correo = ''
    form.celular = ''
    form.asunto = ''
    form.mensaje = ''
  } catch (e) {
    error.value = e.message
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.contacto-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:16px;
  padding:16px;
  box-shadow:0 8px 30px rgba(0,0,0,.25);
  max-width:600px;
  margin-inline:auto;
}
.contact-form{
  display:flex;
  flex-direction:column;
  gap:12px;
  margin-top:14px;
}
label{
  display:flex;
  flex-direction:column;
  gap:4px;
  font-size:0.9rem;
}
input, textarea{
  background:#0b1220;
  border:1px solid var(--border);
  border-radius:10px;
  padding:8px 10px;
  color:var(--text);
}
input:focus, textarea:focus{
  outline:none;
  border-color:var(--brand);
  box-shadow:0 0 0 2px rgba(0,230,167,.15);
}
.btn{
  background:transparent;
  border:1px solid var(--border);
  color:var(--text);
  padding:8px 12px;
  border-radius:10px;
  cursor:pointer;
  font-weight:500;
  width:max-content;
}
.btn:hover{background:rgba(255,255,255,.02)}
.server-response{
  margin-top:16px;
  background:rgba(0,230,167,.05);
  border:1px solid rgba(0,230,167,.3);
  border-radius:12px;
  padding:12px;
}
.error-response{
  margin-top:16px;
  background:rgba(255,0,0,.05);
  border:1px solid rgba(255,0,0,.3);
  border-radius:12px;
  padding:12px;
  color:#ffb3b3;
}
.muted{color:var(--muted);font-size:.9rem}
</style>
