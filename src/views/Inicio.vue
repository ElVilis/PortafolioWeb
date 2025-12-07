<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import fotoPerfil from '@/img/Perfil.jpg'


const projects = ref([
  { id: 1, title: 'AlertaBayes', desc: 'Alerta temprana para desastres en México basada en redes bayesianas.', tech: 'HTML, CSS, JS', categories: ['IA/ML','Web'], img:'https://img.freepik.com/fotos-premium/triangulo-rojo-signo-exclamacion-blanco-ilustracion-3d-aislada_356060-87.jpg?semt=ais_hybrid&w=740&q=80', isNew: false },
  { id: 2, title: 'FiestaLandia', desc: 'Plataforma full-stack para gestión de eventos.', tech: 'Django, React, MySQL', categories: ['Web','Fullstack'], img:'https://www.shutterstock.com/image-vector/3d-party-popper-emoji-explosion-600nw-2443765155.jpg', isNew: false },
  { id: 3, title: 'Riego de Orquideas IoT', desc: 'Sistema de riego automatizado con lógica difusa para orquídeas.', tech: 'Arduino, Python', categories: ['IoT','IA/ML'], img:'https://media.istockphoto.com/id/668004034/es/vector/riego-autom%C3%A1tico-de-aspersores.jpg?s=612x612&w=0&k=20&c=VJVD64WvYpsRo9doTC_Km9ahAILc4Cb0MO5XBGhukJc=', isNew: false },
  { id: 4, title: 'Epinoh (Android)', desc: 'Detección de crisis epilépticas y alerta a contactos.', tech: 'Android, Arduino', categories: ['IoT','Android'], img:'https://www.shutterstock.com/image-vector/3d-blue-shield-red-warning-600nw-2627670683.jpg', isNew: false },
  { id: 5, title: 'CuentaSmart', desc: 'Gestor de cuentas y suscripciones con panel de pagos.', tech: 'Node, Express, PostgreSQL', categories: ['Web','Fullstack'], img:'https://www.shutterstock.com/image-vector/digital-banking-virtual-bank-mobile-600nw-2617319843.jpg', isNew: false },
  { id: 6, title: 'Biblioteca Network', desc: 'Diseño de red de voz y datos para biblioteca universitaria.', tech: 'Cisco PT, VLANs', categories: ['Redes'], img:'https://st4.depositphotos.com/16229314/27776/v/450/depositphotos_277767214-stock-illustration-library-interior-empty-room-for.jpg', isNew: false }
])

const activeFilter = ref('*')
const searchTerm   = ref('')
const accent       = ref('#00e6a7')
const editId       = ref(projects.value[0]?.id ?? 1)

/* ===== Categorías (para filtros y modal) ===== */
const baseCategorySeed = ['Web','IA/ML','Fullstack','IoT','Android','Redes']
const extraCategories = ref(new Set())

const categories = computed(() => {
  const set = new Set(baseCategorySeed)
  projects.value.forEach(p => p.categories.forEach(c => set.add(c)))
  extraCategories.value.forEach(c => set.add(c))
  return ['*', ...Array.from(set).sort()]
})

/* ===== Listado filtrado ===== */
const filteredProjects = computed(() =>
  projects.value.filter(p => {
    const okFilter = activeFilter.value === '*' || p.categories.includes(activeFilter.value)
    const okSearch = p.title.toLowerCase().includes(searchTerm.value.trim().toLowerCase())
    return okFilter && okSearch
  })
)
const visibleCount = computed(() => filteredProjects.value.length)

/* ===== Helpers ===== */
function placeholderSvg(text){
  const bg = Math.floor(Math.random()*360)
  const safe = encodeURIComponent(text)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='hsl(${bg},60%,22%)'/>
      <stop offset='100%' stop-color='hsl(${(bg+40)%360},70%,28%)'/>
    </linearGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'
      font-family='Segoe UI, Roboto, Arial' font-size='42' fill='white'>${safe}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${svg}`
}

function addProject(){
  const n = projects.value.length + 1
  const id = Date.now()
  projects.value.push({
    id,
    title: `Nuevo Proyecto DOM #${n}`,
    desc: 'Proyecto insertado dinámicamente con Vue.',
    tech: 'HTML, CSS, JS',
    categories: ['Web'],
    img: placeholderSvg('Nuevo Proyecto Vue'),
    isNew: true
  })
  editId.value = id
}

function deleteNewProjects(){
  projects.value = projects.value.filter(p => !p.isNew)
  if (!projects.value.find(p => p.id === editId.value) && projects.value.length > 0) {
    editId.value = projects.value[0].id
  }
}

/* ===== MODAL: Categoría ===== */
const showCatModal = ref(false)
const catSelection = ref([])
const newCat = ref('')

function openCategoryModal(){
  const p = projects.value.find(x => x.id === editId.value)
  if (!p) return
  catSelection.value = [...p.categories]
  showCatModal.value = true
}
function addNewCategory(){
  const name = newCat.value.trim()
  if (!name) return
  const normalized = name.replace(/\s+/g, ' ').replace(/\b\w/g, m => m.toUpperCase())
  extraCategories.value.add(normalized)
  if (!catSelection.value.includes(normalized)) catSelection.value.push(normalized)
  newCat.value = ''
}
function saveCategoryModal(){
  const p = projects.value.find(x => x.id === editId.value)
  if (!p) return
  if (catSelection.value.length === 0) { alert('Selecciona al menos una categoría.'); return }
  p.categories = [...catSelection.value]
  showCatModal.value = false
}
function closeCategoryModal(){ showCatModal.value = false }

/* ===== MODAL: Título ===== */
const showTitleModal = ref(false)
const newTitle = ref('')
function openTitleModal(){
  const p = projects.value.find(x => x.id === editId.value)
  if (!p) return
  newTitle.value = p.title
  showTitleModal.value = true
}
function saveTitleModal(){
  const p = projects.value.find(x => x.id === editId.value)
  if (!p) return
  const t = newTitle.value.trim()
  if (!t) { alert('El título no puede estar vacío.'); return }
  p.title = t
  showTitleModal.value = false
}
function closeTitleModal(){ showTitleModal.value = false }

/* ===== MODAL: Tecnología ===== */
const showTechModal = ref(false)
const newTech = ref('')
function openTechModal(){
  const p = projects.value.find(x => x.id === editId.value)
  if (!p) return
  newTech.value = p.tech
  showTechModal.value = true
}
function saveTechModal(){
  const p = projects.value.find(x => x.id === editId.value)
  if (!p) return
  const t = newTech.value.trim()
  if (!t) { alert('La tecnología no puede estar vacía.'); return }
  p.tech = t
  showTechModal.value = false
}
function closeTechModal(){ showTechModal.value = false }
</script>

<template>
  <div>
    <!-- Lateral -->
    <aside class="card" id="sobre-mi">

  <div class="profile-container">
    
    <div class="profile-info">
      <h2>Perfil</h2>
      <p>Estudiante de ISC, enfoque en IA, bases de datos y redes.</p>

      <h3>Habilidades</h3>
      <ul>
        <li>HTML, CSS, JavaScript</li>
        <li>Python, Django</li>
        <li>MySQL, PostgreSQL</li>
      </ul>

      <h3>Enlaces</h3>
      <ul class="social-links">
        <li>
          <a href="https://github.com/ElVilis" target="_blank" rel="noopener">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub">
            GitHub
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/vilis-hern%C3%A1ndez-amador-7baa82267/" target="_blank" rel="noopener">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>

    <div class="profile-photo">
      <img :src="fotoPerfil" alt="Foto de perfil">
    </div>
  </div>
</aside>



    <!-- Proyectos -->
    <section id="proyectos" aria-label="Lista de proyectos">
      <h2>
        Proyectos destacados
        <span class="badge-proyectos">{{ visibleCount }} proyecto{{ visibleCount===1 ? '' : 's' }}</span>
        <button class="btn" @click="addProject">➕ Añadir proyecto rápido</button>
        <button class="btn" @click="deleteNewProjects">🗑 Eliminar proyectos nuevos</button>
      </h2>

      <!-- Controles -->
      <div class="toolbar" id="project-controls">
        <div class="filters-line">
          <div class="filters" role="group" aria-label="Filtro por categoría">
            <button
              v-for="cat in categories" :key="cat"
              class="btn btn--filter"
              :class="{ 'is-active': activeFilter === cat }"
              @click="activeFilter = cat"
              type="button"
            >
              {{ cat === '*' ? 'Todos' : cat }}
            </button>
          </div>
          <input class="search-input" type="search" placeholder="Filtrar por título…" v-model="searchTerm" />
        </div>

        <!-- PANEL DE EDICIÓN DE PROYECTOS -->
        <div class="edit-panel">
            <h3 class="edit-title">Edición de Proyectos</h3>

        <div class="edit-controls">
          <select v-model="editId">
            <option v-for="p in projects" :key="p.id" :value="p.id">{{ p.title }}</option>
          </select>

            <button class="btn" @click="openTitleModal">Cambiar título</button>
            <button class="btn" @click="openTechModal">Cambio de tecnología</button>
            <button class="btn btn--brand" @click="openCategoryModal">Cambio de categoría</button>
          </div>
      </div>
    </div>  

      <!-- Grid -->
      <div class="grid" id="gallery">
        <ProjectCard
          v-for="p in filteredProjects"
          :key="p.id"
          :project="p"
          :accent="accent"
        />
      </div>
    </section>

    <!-- MODAL: CATEGORÍAS -->
    <div v-if="showCatModal" class="modal-backdrop" @click.self="closeCategoryModal" @keydown.esc="closeCategoryModal" tabindex="-1">
      <div class="modal">
        <header class="modal__header">
          <h3>Cambiar categorías</h3>
          <button class="btn btn--ghost" @click="closeCategoryModal" aria-label="Cerrar">✕</button>
        </header>
        <div class="modal__body">
          <p class="muted">Selecciona una o varias categorías.</p>
          <div class="chips">
            <label v-for="opt in categories.slice(1)" :key="opt" class="chip">
              <input type="checkbox" v-model="catSelection" :value="opt" />
              <span>{{ opt }}</span>
            </label>
          </div>
          <div class="adder">
            <input type="text" v-model="newCat" placeholder="Nueva categoría…" @keyup.enter="addNewCategory" />
            <button class="btn" @click="addNewCategory">Añadir</button>
          </div>
        </div>
        <footer class="modal__footer">
          <button class="btn" @click="closeCategoryModal">Cancelar</button>
          <button class="btn btn--brand" @click="saveCategoryModal">Guardar</button>
        </footer>
      </div>
    </div>

    <!-- MODAL: TÍTULO -->
    <div v-if="showTitleModal" class="modal-backdrop" @click.self="closeTitleModal" @keydown.esc="closeTitleModal" tabindex="-1">
      <div class="modal">
        <header class="modal__header">
          <h3>Cambiar título</h3>
          <button class="btn btn--ghost" @click="closeTitleModal" aria-label="Cerrar">✕</button>
        </header>
        <div class="modal__body">
          <input type="text" v-model="newTitle" placeholder="Nuevo título…" class="text-input" />
        </div>
        <footer class="modal__footer">
          <button class="btn" @click="closeTitleModal">Cancelar</button>
          <button class="btn btn--brand" @click="saveTitleModal">Guardar</button>
        </footer>
      </div>
    </div>

    <!-- MODAL: TECNOLOGÍA -->
    <div v-if="showTechModal" class="modal-backdrop" @click.self="closeTechModal" @keydown.esc="closeTechModal" tabindex="-1">
      <div class="modal">
        <header class="modal__header">
          <h3>Cambiar tecnología</h3>
          <button class="btn btn--ghost" @click="closeTechModal" aria-label="Cerrar">✕</button>
        </header>
        <div class="modal__body">
          <input type="text" v-model="newTech" placeholder="Ej.: HTML, CSS, JS" class="text-input" />
        </div>
        <footer class="modal__footer">
          <button class="btn" @click="closeTechModal">Cancelar</button>
          <button class="btn btn--brand" @click="saveTechModal">Guardar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:16px;box-shadow:0 8px 30px rgba(0,0,0,.25);margin-bottom:20px}
#proyectos h2{display:flex;align-items:center;gap:8px;margin-top:0;flex-wrap:wrap}
#proyectos .toolbar{margin:12px 0 18px;display:flex;flex-direction:column;gap:12px}
.filters-line{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
#proyectos .filters{display:flex;gap:8px;flex-wrap:wrap}
.search-input,.text-input{
  background:transparent;border:1px solid var(--border);border-radius:10px;
  padding:6px 10px;color:var(--text);min-width:220px;
}
.btn{background:transparent;border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:10px;cursor:pointer;font-weight:500}
.btn:hover{background:rgba(255,255,255,.04)}
.btn--brand{border-color:var(--brand);box-shadow:0 0 0 2px rgba(0,230,167,.25)}
.btn--ghost{border-color:transparent}
.btn--filter.is-active{border-color:var(--brand);box-shadow:0 0 0 2px rgba(0,230,167,.25)}
#gallery{display:grid;gap:16px;grid-template-columns:repeat(12,1fr)}
#gallery .project{grid-column:span 12}
@media (min-width:680px){#gallery .project{grid-column:span 6}}
@media (min-width:1000px){#gallery .project{grid-column:span 4}}
.badge-proyectos{background:rgba(0,230,167,.08);border:1px solid rgba(0,230,167,.35);color:#bfffea;padding:4px 8px;border-radius:999px;font-size:12px}

/* ===== Modal ===== */
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);display:grid;place-items:center;z-index:1000}
.modal{width:min(720px,92vw);background:var(--surface);border:1px solid var(--border);border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.45);padding:16px;display:flex;flex-direction:column;gap:12px}
.modal__header{display:flex;align-items:center;justify-content:space-between}
.modal__body{display:flex;flex-direction:column;gap:12px}
.modal__footer{display:flex;gap:8px;justify-content:flex-end}
.muted{color:var(--muted);font-size:.9rem}

/* chips categorías */
.chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{border:1px solid var(--border);border-radius:999px;padding:6px 10px;display:inline-flex;gap:8px;align-items:center;cursor:pointer}
.chip input{accent-color:var(--brand)}
.adder{display:flex;gap:8px;align-items:center}
.adder input{background:transparent;border:1px solid var(--border);border-radius:10px;padding:6px 10px;color:var(--text);flex:1}

/* Imagenes / Perfil */

/* Layout: texto izquierda, foto derecha */
.profile-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

/* Columna izquierda (texto) */
.profile-info {
  flex: 1;
}

/* Foto con efecto glow neón animado */
.profile-photo {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

/* CONTORNO NEÓN SUPER VISIBLE (primero va esto) */
.profile-photo::before {
  content: "";
  position: absolute;
  inset: -10px;                      
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--brand),
    #00ffd5,
    #00bfa5,
    #00ffd5,
    var(--brand)
  );
  background-size: 300% 300%;
  filter: blur(12px) brightness(1.8);
  animation: neonGlow 3s ease-in-out infinite;
  z-index: 0;
}

/* Imagen encima del glow */
.profile-photo img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 1;
}

/* Efectos al pasar el mouse */
.profile-photo:hover::before {
  filter: blur(18px) brightness(2.4);
  transform: scale(1.1);
  transition: 0.25s ease-out;
}

.profile-photo:hover img {
  transform: scale(1.08);
  transition: 0.25s ease-out;
}

/* Iconos de redes más grandes */
.social-links img {
  width: 30px;
  height: 30px;
}

.social-links li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* Animación del neón */
@keyframes neonGlow {
  0%   { background-position: 0% 50%;   }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%;   }
}

/* Responsive */
@media (max-width: 640px) {
  .profile-container {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* PANEL DE EDICIÓN */
.edit-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 14px;
  margin-top: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
}

.edit-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}

.edit-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

/* SELECT oscuro */
.edit-controls select {
  background: #0f1824;         /* fondo oscuro */
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 10px;
  border-radius: 10px;
  appearance: none;
}

/* Opciones del dropdown */
.edit-controls select option {
  background: #0f1824;  /* fondo del menú */
  color: var(--text);   /* texto claro */
  padding: 10px;
}

/* Opción seleccionada */
.edit-controls select option:checked {
  background: var(--brand);
  color: black;
}



</style>
