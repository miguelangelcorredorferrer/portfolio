document.addEventListener('DOMContentLoaded', function() {

    // --- Constantes y Estado ---
    const POSTS_POR_PAGINA = 5;
    let paginaActual = 1;
    let postsFiltrados = [...misPosts]; // Copia de los posts

    // --- Selectores del DOM ---
    const postContainer = document.getElementById('blog-posts-container');
    const btnVerMas = document.getElementById('btn-ver-mas');
    
    // Selectores de Proyectos
    const proyectosContainer = document.getElementById('proyectos-grid');

    // Selectores de Filtros
    const searchInput = document.getElementById('filter-search');
    const categorySelect = document.getElementById('filter-category');
    const difficultySelect = document.getElementById('filter-difficulty');
    const tagsSelect = document.getElementById('filter-tags');

    // ===============================================
    // CARGA DE PROYECTOS
    // ===============================================
    function renderizarProyectos() {
        if (!proyectosContainer) return; 
        proyectosContainer.innerHTML = ''; 

        misProyectos.forEach(proyecto => {
            const tagsHTML = proyecto.tags.map(tag => `<span>${tag}</span>`).join('');
            
            const demoLink = proyecto.linkDemo 
                ? `<a href="${proyecto.linkDemo}" target="_blank" title="Demo"><i class="fa-solid fa-rocket"></i> Ver Deploy</a>` 
                : '';

            const proyectoHTML = `
                <article class="proyecto-card">
                    <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="proyecto-card-imagen">
                    <div class="proyecto-card-contenido">
                        <h3>${proyecto.titulo}</h3>
                        <div class="proyecto-card-tags">
                            ${tagsHTML}
                        </div>
                        <p>${proyecto.descripcion}</p>
                        <div class="proyecto-card-links">
                            <a href="${proyecto.linkGitHub}" target="_blank" title="GitHub"><i class="fa-brands fa-github"></i> Código Fuente</a>
                            ${demoLink}
                        </div>
                    </div>
                </article>
            `;
            proyectosContainer.innerHTML += proyectoHTML;
        });
    }

    // ===============================================
    // CARGA Y FILTRADO DEL BLOG
    // ===============================================

    function renderizarPosts() {
        if (!postContainer) return; // Salir si no existe el contenedor
        postContainer.innerHTML = ''; 
        
        const inicio = 0;
        const fin = paginaActual * POSTS_POR_PAGINA;
        const postsAMostrar = postsFiltrados.slice(inicio, fin);

        if (postsAMostrar.length === 0) {
            postContainer.innerHTML = '<p>No se encontraron publicaciones con esos filtros.</p>';
        } else {
            postsAMostrar.forEach(post => {
                postContainer.innerHTML += crearHTMLdePost(post);
            });
        }

        if (postsFiltrados.length > fin) {
            btnVerMas.style.display = 'block'; 
        } else {
            btnVerMas.style.display = 'none'; 
        }
    }

    function crearHTMLdePost(post) {
        let diffClass = post.dificultad.toLowerCase();
        let diffText = post.dificultad.charAt(0).toUpperCase() + post.dificultad.slice(1);
        const tagsHTML = post.etiquetas.map(tag => `<span class="tag-cat">${tag}</span>`).join(' ');

        return `
            <article class="blog-post-card" data-id="${post.id}">
                <div class="post-tags">
                    ${tagsHTML}
                    <span class="tag-diff ${diffClass}">${diffText}</span>
                </div>

                <a href="${post.archivo}" class="post-title-link">
                    <h3>${post.titulo}</h3>
                </a>

                <p>${post.resumen}</p>
                <a href="${post.archivo}" class="btn-read">Leer más...</a>
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

        // Asegurarse de que los selectores existen antes de intentar llenarlos
        if (categorySelect) {
            categorias.forEach(cat => {
                categorySelect.innerHTML += `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`;
            });
        }
        
        if (tagsSelect) {
            etiquetas.forEach(etiqueta => {
                tagsSelect.innerHTML += `<option value="${etiqueta}">${etiqueta}</option>`;
            });
        }
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

    // --- Event Listeners ---
    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            paginaActual++; 
            renderizarPosts(); 
        });
    }

    // Añadir listeners solo si los elementos existen
    if (searchInput) searchInput.addEventListener('input', aplicarTodosLosFiltros);
    if (categorySelect) categorySelect.addEventListener('change', aplicarTodosLosFiltros);
    if (difficultySelect) difficultySelect.addEventListener('change', aplicarTodosLosFiltros);
    if (tagsSelect) tagsSelect.addEventListener('change', aplicarTodosLosFiltros);

    // --- Inicialización ---
    renderizarProyectos();
    popularFiltros();
    aplicarTodosLosFiltros(); // Carga inicial

});