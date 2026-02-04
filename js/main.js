/**
 * ZEPEDA'S HATS - Main JavaScript (FIXED)
 * =======================================
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

    // AOS init safe
    if (AOS_LIB) {
        AOS_LIB.init({
            duration: 800,
            easing: 'ease-out',
            once: true
        });
    }

    loadCart();

    renderProducts();
    renderVideos();
    renderOffersCarousel();
    renderRecentCarousel();

    initializeEventListeners();
    initializeNavbarScroll();
});

/* ================= PRODUCTS ================= */

function renderProducts(filter = "all") {
    const grid = document.getElementById("productsGrid");
    if (!grid || !PRODUCTS.length) return;

    let filtered = PRODUCTS;

    if (filter !== "all") {
        filtered = filter === "ofertas"
            ? PRODUCTS.filter(p => p.isOffer)
            : PRODUCTS.filter(p => p.category === filter);
    }

    grid.innerHTML = filtered.map(p => `
        <div class="col-6 col-md-4 col-lg-3" data-aos="fade-up">
            <div class="product-card">

                <img src="${p.image}" class="product-image"
                     onerror="this.src='images/placeholder.jpg'">

                ${p.isNew ? `<span class="product-badge">NUEVO</span>` : ""}
                ${p.isSold ? `<span class="product-badge sold">VENDIDO</span>` : ""}

                <h5>${p.name}</h5>
                <p>${p.description}</p>

                <strong>$${p.price.toLocaleString()} MXN</strong>

                <button onclick="addToCart(${p.id})"
                        ${p.isSold ? "disabled" : ""}>
                    ${p.isSold ? "Agotado" : "Agregar"}
                </button>

            </div>
        </div>
    `).join("");
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
    const p = PRODUCTS.find(x=>x.id===id);
    if(!p || p.isSold) return;

    const found = cart.find(x=>x.id===id);
    found ? found.quantity++ :
        cart.push({...p, quantity:1});

    saveCart();
    updateCartUI();
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
