document.addEventListener('DOMContentLoaded', function() {

    // --- Constantes y Estado ---
    const POSTS_POR_PAGINA = 5;
    let paginaActual = 1;
    
    // Solo inicializamos posts si 'misPosts' existe (por seguridad)
    let postsFiltrados = (typeof misPosts !== 'undefined') ? [...misPosts] : [];

    // --- Selectores del DOM ---
    const postContainer = document.getElementById('blog-posts-container');
    const btnVerMas = document.getElementById('btn-ver-mas');
    const proyectosContainer = document.getElementById('proyectos-grid');

    // Filtros (pueden ser null si estamos en index.html)
    const searchInput = document.getElementById('filter-search');
    const categorySelect = document.getElementById('filter-category');
    const difficultySelect = document.getElementById('filter-difficulty');
    const tagsSelect = document.getElementById('filter-tags');

    // ===============================================
    // 1. LÓGICA PARA PROYECTOS (Solo en index.html)
    // ===============================================
    if (proyectosContainer && typeof misProyectos !== 'undefined') {
        renderizarProyectos();
    }

    function renderizarProyectos() {
        proyectosContainer.innerHTML = ''; 
        misProyectos.forEach(proyecto => {
            const tagsHTML = proyecto.tags.map(tag => `<span>${tag}</span>`).join('');
            const demoLink = proyecto.linkDemo 
                ? `<a href="${proyecto.linkDemo}" target="_blank"><i class="fa-solid fa-rocket"></i> Demo</a>` : '';

            const proyectoHTML = `
                <article class="proyecto-card">
                    <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="proyecto-card-imagen">
                    <div class="proyecto-card-contenido">
                        <h3>${proyecto.titulo}</h3>
                        <div class="proyecto-card-tags">${tagsHTML}</div>
                        <p>${proyecto.descripcion}</p>
                        <div class="proyecto-card-links">
                            <a href="${proyecto.linkGitHub}" target="_blank"><i class="fa-brands fa-github"></i> Code</a>
                            ${demoLink}
                        </div>
                    </div>
                </article>
            `;
            proyectosContainer.innerHTML += proyectoHTML;
        });
    }

    // ===============================================
    // 2. LÓGICA PARA EL BLOG (Solo en blog.html)
    // ===============================================
    if (postContainer) {
        popularFiltros();
        aplicarTodosLosFiltros(); // Carga inicial

        // Listeners solo si existen los elementos
        if (btnVerMas) btnVerMas.addEventListener('click', () => { paginaActual++; renderizarPosts(); });
        if (searchInput) searchInput.addEventListener('input', aplicarTodosLosFiltros);
        if (categorySelect) categorySelect.addEventListener('change', aplicarTodosLosFiltros);
        if (difficultySelect) difficultySelect.addEventListener('change', aplicarTodosLosFiltros);
        if (tagsSelect) tagsSelect.addEventListener('change', aplicarTodosLosFiltros);
    }

    function renderizarPosts() {
        postContainer.innerHTML = ''; 
        
        const inicio = 0;
        const fin = paginaActual * POSTS_POR_PAGINA;
        const postsAMostrar = postsFiltrados.slice(inicio, fin);

        if (postsAMostrar.length === 0) {
            postContainer.innerHTML = '<p style="text-align:center; color:#888;">No hay registros en la base de datos con estos filtros.</p>';
        } else {
            postsAMostrar.forEach(post => {
                postContainer.innerHTML += crearHTMLdePost(post);
            });
        }

        if (btnVerMas) {
            btnVerMas.style.display = (postsFiltrados.length > fin) ? 'block' : 'none';
        }
    }

    function crearHTMLdePost(post) {
        let diffClass = post.dificultad.toLowerCase();
        let diffText = post.dificultad.charAt(0).toUpperCase() + post.dificultad.slice(1);
        const tagsHTML = post.etiquetas.map(tag => `<span class="tag-cat">${tag}</span>`).join('');

        return `
            <article class="blog-post-card">
                <div class="post-tags">
                    ${tagsHTML}
                    <span class="tag-diff ${diffClass}">${diffText}</span>
                </div>
                <a href="${post.archivo}" class="post-title-link">
                    <h3>${post.titulo}</h3>
                </a>
                <p>${post.resumen}</p>
                <a href="${post.archivo}" class="btn-read">[ Leer entrada completa ]</a>
            </article>
        `;
    }

    function popularFiltros() {
        const categorias = new Set();
        const etiquetas = new Set();

        misPosts.forEach(post => {
            categorias.add(post.categoria);
            post.etiquetas.forEach(etiqueta => etiquetas.add(etiqueta));
        });

        if (categorySelect) categorias.forEach(cat => categorySelect.innerHTML += `<option value="${cat}">${cat.toUpperCase()}</option>`);
        if (tagsSelect) etiquetas.forEach(etiqueta => tagsSelect.innerHTML += `<option value="${etiqueta}">${etiqueta}</option>`);
    }

    function aplicarTodosLosFiltros() {
        const busqueda = searchInput ? searchInput.value.toLowerCase() : '';
        const categoria = categorySelect ? categorySelect.value : 'all';
        const dificultad = difficultySelect ? difficultySelect.value : 'all';
        const etiqueta = tagsSelect ? tagsSelect.value : 'all';

        postsFiltrados = misPosts.filter(post => {
            const matchBusqueda = post.titulo.toLowerCase().includes(busqueda) || post.resumen.toLowerCase().includes(busqueda);
            const matchCategoria = (categoria === 'all') || (post.categoria === categoria);
            const matchDificultad = (dificultad === 'all') || (post.dificultad === dificultad);
            const matchEtiqueta = (etiqueta === 'all') || (post.etiquetas.includes(etiqueta));
            return matchBusqueda && matchCategoria && matchDificultad && matchEtiqueta;
        });

        paginaActual = 1;
        renderizarPosts();
    }

    // Añade este bloque de código dentro de la función principal de DOMContentLoaded:

    // --- NUEVA FUNCIONALIDAD: COPIAR EMAIL AL PORTAPAPELES ---
    const emailLink = document.querySelector('.contact-email');

    if (emailLink) {
        emailLink.addEventListener('click', function(event) {
            // 1. Previene la acción por defecto del enlace (abrir el cliente de correo)
            event.preventDefault(); 
            
            // Obtenemos la dirección de correo electrónico del texto interno del enlace
            // Usamos una expresión regular simple para limpiarlo si es necesario, pero
            // usaremos el valor fijo para mayor seguridad:
            const emailAddress = 'miguelangelcorredor07@gmail.com'; 

            // 2. Almacenamos el contenido original para poder restaurarlo
            const originalHTML = this.innerHTML; 

            // 3. Copiar al portapapeles
            navigator.clipboard.writeText(emailAddress).then(() => {
                
                // 4. Proporcionar feedback visual inmediato
                this.classList.add('copied');
                this.innerHTML = '<i class="fa-solid fa-check"></i> ¡COPIADO!';
                
                // 5. Restaurar el texto original después de 2 segundos
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = originalHTML;
                }, 2000);

            }).catch(err => {
                // Fallback si la API del Portapapeles falla 
                console.error('Error al intentar copiar:', err);
                alert('No se pudo copiar automáticamente. Email: ' + emailAddress);
            });
        });
    }

});