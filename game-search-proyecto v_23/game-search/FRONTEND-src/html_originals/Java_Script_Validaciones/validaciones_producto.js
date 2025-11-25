// /js/productosPage.js
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarCantidadCarrito();

    document.getElementById('filtro-plataforma').addEventListener('change', filtrarProductos);
    document.getElementById('filtro-categoria').addEventListener('change', filtrarProductos);
    document.getElementById('busqueda').addEventListener('input', filtrarProductos);
});

function cargarProductos() {
    const container = document.getElementById('productos-container');
    if (!container) return;
    container.innerHTML = '';

    for (const [key, ids] of Object.entries(categorias)) {
        const nombreSeccion = {
            "mas-buscados": "Juegos más buscados",
            "ofertas": "Ofertas Especiales",
            "reservas": "Para reservar"
        }[key];

        const h2 = document.createElement('h2');
        h2.className = 'categoria-titulo';
        h2.textContent = nombreSeccion;
        container.appendChild(h2);

        const grid = document.createElement('div');
        grid.className = 'productos-grid';
        container.appendChild(grid);

        productos.filter(p => ids.includes(p.id)).forEach(p => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.dataset.plataforma = p.plataforma.toLowerCase();
            card.dataset.categoria = p.categoria;

            const link = document.createElement('a');
            link.href = `detalle.html?id=${p.id}`;
            link.innerHTML = `
                <img class="producto-imagen" src="${p.imagen}" alt="${p.nombre}">
                <h3 class="producto-titulo">${p.nombre}</h3>
                <span class="producto-plataforma">${p.plataforma}</span>
                <p class="producto-precio">
                    ${p.precio < p.precioOriginal ? `<s>$${p.precioOriginal.toLocaleString('es-CL')} CLP</s> ` : ''}
                    $${p.precio.toLocaleString('es-CL')} CLP
                    ${categorias.reservas.includes(p.id) ? '(Reserva)' : ''}
                </p>
            `;
            card.appendChild(link);

            const btn = document.createElement('button');
            btn.className = 'producto-boton';
            btn.textContent = categorias.reservas.includes(p.id) ? "Reservar ahora" : "Agregar al carrito";
            btn.onclick = e => { agregarAlCarrito(p.id); e.stopPropagation(); };
            card.appendChild(btn);

            grid.appendChild(card);
        });
    }
}

function filtrarProductos() {
    const plataforma = document.getElementById('filtro-plataforma').value;
    const categoria = document.getElementById('filtro-categoria').value;
    const busqueda = document.getElementById('busqueda').value.toLowerCase();

    document.querySelectorAll('.producto-card').forEach(card => {
        const coincidePlataforma = plataforma === 'todas' || card.dataset.plataforma === plataforma;
        const coincideCategoria = categoria === 'todas' || card.dataset.categoria === categoria;
        const coincideBusqueda = card.querySelector('.producto-titulo').textContent.toLowerCase().includes(busqueda);

        card.style.display = (coincidePlataforma && coincideCategoria && coincideBusqueda) ? 'block' : 'none';
    });
}
