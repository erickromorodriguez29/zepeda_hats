/**
 * ZEPEDA'S HATS - Main JavaScript (CLEAN + CART RESET ON REFRESH)
 * ==============================================================
 */

// Safe global references
const AOS_LIB = window.AOS;
const bootstrap = window.bootstrap;

// Shopping Cart
let cart = [];

/* ================= INIT ================= */

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM listo");
    console.log("PRODUCTS:", PRODUCTS);

    // Vaciar carrito al refrescar la página
    cart = [];
    localStorage.removeItem("cart"); // elimina cualquier carrito guardado previamente

    // AOS init safe
    if (AOS_LIB) {
        AOS_LIB.init({
            duration: 800,
            easing: 'ease-out',
            once: true
        });
    }

    // Renderizar todo
    renderProducts();
    renderVideos();
    renderOffersCarousel();
    renderRecentCarousel();

    initializeEventListeners();
    initializeNavbarScroll();
});

/* ================= PRODUCTS ================= */

function toggleCart() {
    const sidebar = document.getElementById("cartSidebar");
    const overlay = document.getElementById("cartOverlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

function renderProducts(filter = "all") {
    const grid = document.getElementById("productsGrid");
    if (!grid || !PRODUCTS.length) return;

    // Filtrar productos
    let filtered = PRODUCTS;
    if (filter !== "all") {
        filtered = filter === "ofertas"
            ? PRODUCTS.filter(p => p.isOffer)
            : PRODUCTS.filter(p => p.category === filter);
    }

    // Generar HTML de productos
    grid.innerHTML = filtered.map(p => `
        <div class="col-6 col-md-4 col-lg-3" data-aos="fade-up">
            <div class="product-card">

                <div class="product-image-container">
                    <img src="${p.image}" class="product-image"
                         onerror="this.src='images/placeholder.jpg'">
                </div>

                ${p.isNew ? `<span class="product-badge">NUEVO</span>` : ""}
                ${p.isSold ? `<span class="product-badge sold">VENDIDO</span>` : ""}

                <div class="product-info">
                    <h5 class="product-title">${p.name}</h5>
                    <p class="product-description">${p.description}</p>

                    <div class="product-price">
                        <span class="price-current">$${p.price.toLocaleString()} MXN</span>
                        ${p.originalPrice ? `<span class="price-original">$${p.originalPrice.toLocaleString()} MXN</span>` : ""}
                    </div>

                    <button class="btn-add-cart" data-id="${p.id}" ${p.isSold ? "disabled" : ""}>
                        ${p.isSold ? "Agotado" : "Agregar"}
                    </button>
                </div>

            </div>
        </div>
    `).join("");

    // Asignar event listeners a los botones después de renderizar
    grid.querySelectorAll(".btn-add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            addToCart(Number(btn.dataset.id));
        });
    });
}

/* ================= CART ================= */

function renderCart() {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");

    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>El carrito está vacío</p>";
        totalEl.textContent = "$0.00 MXN";
        return;
    }

    let total = 0;

    container.innerHTML = cart.map(p => {
        const subtotal = p.price * p.quantity;
        total += subtotal;
        return `
            <div class="cart-item d-flex align-items-center mb-2" data-id="${p.id}">
                <img src="${p.image}" alt="${p.name}" width="50" class="me-2" onerror="this.src='images/placeholder.jpg'">
                <div class="flex-grow-1">
                    <strong>${p.name}</strong>
                    <div class="cart-controls mt-1">
                        <button class="btn-decrease">-</button>
                        <span class="cart-quantity">${p.quantity}</span>
                        <button class="btn-increase">+</button>
                    </div>
                </div>
                <div class="cart-subtotal">$${subtotal.toLocaleString()} MXN</div>
            </div>
        `;
    }).join("");

    totalEl.textContent = `$${total.toLocaleString()} MXN`;

    // Asignar eventos a botones
    container.querySelectorAll(".btn-increase").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.closest(".cart-item").dataset.id);
            changeQuantity(id, 1);
        });
    });

    container.querySelectorAll(".btn-decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.closest(".cart-item").dataset.id);
            changeQuantity(id, -1);
        });
    });
}

function changeQuantity(id, delta) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity < 1) {
        cart = cart.filter(p => p.id !== id);
    }

    saveCart();
    updateCartUI();
    renderCart();
}

/* ================= CART STORAGE HELPERS ================= */

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const stored = localStorage.getItem("cart");
    if (stored) {
        cart = JSON.parse(stored);
    }
}

/* ================= VIDEOS ================= */

function renderVideos() {
    const grid = document.getElementById("videosGrid");
    if (!grid || !VIDEOS.length) return;

    grid.innerHTML = VIDEOS.map(v => `
        <div class="col-md-4">
            <div onclick="openVideoModal('${v.video}','${v.title}')">
                <img src="${v.thumbnail}" class="img-fluid"
                     onerror="this.src='images/video-placeholder.jpg'">
                <p>${v.title}</p>
            </div>
        </div>
    `).join("");
}

/* ================= CAROUSELS ================= */

function renderOffersCarousel() {
    const el = document.getElementById("offersCarouselInner");
    if (!el) return;

    const offers = PRODUCTS.filter(p => p.isOffer && !p.isSold);
    const chunks = chunkArray(offers, 3);

    el.innerHTML = chunks.map((c,i)=>`
        <div class="carousel-item ${i===0?'active':''}">
            <div class="row">
                ${c.map(p=>`
                    <div class="col-md-4">
                        <img src="${p.image}"
                             onerror="this.src='images/placeholder.jpg'">
                        <p>${p.name}</p>
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("");
}

function renderRecentCarousel() {
    const el = document.getElementById("recentCarouselInner");
    if (!el) return;

    const chunks = chunkArray(RECENT_MODELS, 4);

    el.innerHTML = chunks.map((c,i)=>`
        <div class="carousel-item ${i===0?'active':''}">
            <div class="row">
                ${c.map(m=>`
                    <div class="col-md-3">
                        <img src="${m.image}"
                             onerror="this.src='images/placeholder.jpg'">
                        <p>${m.title}</p>
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("");
}

/* ================= EVENTS ================= */

function initializeEventListeners(){
    document.querySelectorAll(".btn-filter").forEach(btn=>{
        btn.onclick = ()=>{
            document.querySelectorAll(".btn-filter")
                .forEach(b=>b.classList.remove("active"));
            btn.classList.add("active");
            renderProducts(btn.dataset.filter);
        };
    });
}

function initializeNavbarScroll(){
    const nav = document.querySelector(".navbar");
    if(!nav) return;

    window.addEventListener("scroll",()=>{
        nav.classList.toggle("scrolled", window.scrollY>50);
    });
}

/* ================= CART ================= */

function loadCart(){
    const saved = localStorage.getItem("zepedaCart");
    if(saved) cart = JSON.parse(saved);
    updateCartUI();
}

function saveCart(){
    localStorage.setItem("zepedaCart", JSON.stringify(cart));
}

function addToCart(id){
    const p = PRODUCTS.find(x => x.id === id);
    if(!p || p.isSold) return;

    const found = cart.find(x => x.id === id);
    found ? found.quantity++ :
        cart.push({...p, quantity:1});

    saveCart();
    updateCartUI();
    renderCart();       // <-- renderiza el carrito
    showToast("Agregado al carrito");
}


function updateCartUI(){
    const count = document.getElementById("cartCount");
    if(!count) return;

    count.textContent =
        cart.reduce((s,i)=>s+i.quantity,0);
}

/* ================= VIDEO MODAL ================= */

function openVideoModal(src,title){
    const v = document.getElementById("modalVideo");
    if(!v) return;

    v.querySelector("source").src = src;
    v.load();

    const m = new bootstrap.Modal(
        document.getElementById("videoModal")
    );
    m.show();
}

/* ================= TOAST ================= */

function showToast(msg){
    const t = document.createElement("div");
    t.textContent = msg;
    t.style.cssText = `
        position:fixed;
        bottom:20px;
        left:50%;
        transform:translateX(-50%);
        background:gold;
        padding:10px 20px;
        border-radius:20px;
        z-index:9999;
    `;
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),2000);
}

/* ================= HELPERS ================= */

function chunkArray(arr,size){
    const r=[];
    for(let i=0;i<arr.length;i+=size)
        r.push(arr.slice(i,i+size));
    return r;
}

