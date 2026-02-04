/**
 * ZEPEDA'S HATS - Products Data
 * ==============================
 * Estructura de productos con SKU, precios y categorías
 * 
 * Para agregar nuevas imágenes:
 * 1. Coloca las imágenes en la carpeta correspondiente dentro de /images/products/
 * 2. Agrega el producto a este archivo con la ruta correcta
 * 
 * Carpetas de imágenes:
 * - /images/products/dandy/      - Gorras Dandy Hats
 * - /images/products/31hats/     - Gorras 31 Hats
 * - /images/products/barbas/     - Gorras Barbas Hats
 * - /images/products/otros/      - Otras marcas/modelos
 * - /images/hero/                - Imágenes del carrusel principal
 * - /images/videos/thumbnails/   - Miniaturas de videos
 * 
 * Carpetas de videos:
 * - /videos/                     - Archivos de video .mp4
 */

const PRODUCTS = [
    // DANDY HATS
    {
        id: 1,
        sku: "ZH-DANDY-001",
        name: "DANDY HATS 'Sad Forever'",
        description: "Gorra Dandy Hats edición Sad Forever con bordado premium",
        price: 1800,
        originalPrice: 2000,
        image: "images/sad-forever.jpg",
        category: "dandy",
        isOffer: true,
        isNew: true,
        isSold: false
    },
    {
        id: 2,
        sku: "ZH-DANDY-002",
        name: "DANDY 'Días Nublados'",
        description: "Diseño exclusivo con nubes bordadas estilo 3D",
        price: 1750,
        originalPrice: 1900,
        image: "images/dias-nublados.jpg",
        category: "dandy",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 3,
        sku: "ZH-DANDY-003",
        name: "DANDY 'Yo No Pesco'",
        description: "Dandy Hats 'Yo No Pesco' sin etiquetas",
        price: 1500,
        originalPrice: null,
        image: "images/yo-no-pesco.jpg",
        category: "dandy",
        isOffer: false,
        isNew: false,
        isSold: false
    },
    {
        id: 4,
        sku: "ZH-DANDY-004",
        name: "DANDY 'The Dandy Club'",
        description: "Gorra de uso The Dandy Club edición especial",
        price: 1800,
        originalPrice: 1900,
        image: "images/dandy-club.jpg",
        category: "dandy",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 5,
        sku: "ZH-DANDY-005",
        name: "DANDY HOUSTON",
        description: "Dandy Hats 'Dandy Houston' *NUEVA* - QR de autenticación",
        price: 2800,
        originalPrice: 3300,
        image: "images/dandy-houston.jpg",
        category: "dandy",
        isOffer: true,
        isNew: true,
        isSold: false
    },
    {
        id: 6,
        sku: "ZH-DANDY-006",
        name: "DANDY STUDIOS",
        description: "Gorra Dandy Studios edición limitada",
        price: 2800,
        originalPrice: null,
        image: "images/dandy-studios.jpg",
        category: "dandy",
        isOffer: false,
        isNew: false,
        isSold: false
    },
    {
        id: 7,
        sku: "ZH-DANDY-007",
        name: "PREVENTA DANDY x JUNIOR H",
        description: "Preventa exclusiva Dandy Hats x Junior H",
        price: 500,
        originalPrice: null,
        image: "images/junior-h.jpg",
        category: "dandy",
        isOffer: false,
        isNew: true,
        isSold: false
    },

    // 31 HATS
    {
        id: 8,
        sku: "ZH-31H-001",
        name: "31 HATS 'El Mago' Full Black",
        description: "31 Hats El Mago edición Full Black",
        price: 1900,
        originalPrice: 2200,
        image: "images/el-mago.jpg",
        category: "31hats",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 9,
        sku: "ZH-31H-002",
        name: "31 HATS 'NY Clouds Aniversario'",
        description: "Gorra 31 Hats NY Clouds edición aniversario",
        price: 1900,
        originalPrice: 2000,
        image: "images/ny-clouds.jpg",
        category: "31hats",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 10,
        sku: "ZH-31H-003",
        name: "31 HATS 'LA Clouds'",
        description: "Gorra 31 Hats LA Clouds (NUEVA)",
        price: 1800,
        originalPrice: 1900,
        image: "images/la-clouds.jpg",
        category: "31hats",
        isOffer: true,
        isNew: true,
        isSold: false
    },
    {
        id: 11,
        sku: "ZH-31H-004",
        name: "RUDE 'NY'",
        description: "Gorra Rude 'NY' (NUEVA) - Disponible",
        price: 1900,
        originalPrice: null,
        image: "images/rude-ny.jpg",
        category: "31hats",
        isOffer: false,
        isNew: true,
        isSold: false
    },

    // BARBAS HATS
    {
        id: 12,
        sku: "ZH-BARB-001",
        name: "BARBAS HATS 'Chrome i Black Out'",
        description: "Barbas Hats x Rich The Kid Chrome i Black Out",
        price: 2800,
        originalPrice: 3500,
        image: "images/chrome-black-out.jpg",
        category: "barbas",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 13,
        sku: "ZH-BARB-002",
        name: "BARBAS HATS 'Rich Stars'",
        description: "Barbas Hats x Rich The Kid Rich Stars",
        price: 2500,
        originalPrice: 2800,
        image: "images/rich-stars.jpg",
        category: "barbas",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 14,
        sku: "ZH-BARB-003",
        name: "BARBAS HATS '77'",
        description: "Gorra de el Barbas Hats '77'",
        price: 1950,
        originalPrice: null,
        image: "images/barbas-77.jpg",
        category: "barbas",
        isOffer: false,
        isNew: false,
        isSold: false
    },

    // OTROS
    {
        id: 15,
        sku: "ZH-ESP-001",
        name: "ANYMORE x BÁEZ",
        description: "Anymore x Báez (de uso) con etiquetas",
        price: 1700,
        originalPrice: 1800,
        image: "images/anymore-baez.jpg",
        category: "otros",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 16,
        sku: "ZH-ESP-002",
        name: "SÚPER CARS 'Los Mochis'",
        description: "Gorra Los Mochis edición Super Cars",
        price: 1400,
        originalPrice: 1500,
        image: "images/los-mochis.jpg",
        category: "otros",
        isOffer: true,
        isNew: false,
        isSold: false
    },
    {
        id: 17,
        sku: "ZH-ESP-003",
        name: "SAD BOYZ 'LA Edition'",
        description: "Gorra Sad Boyz edición Los Angeles con estrella",
        price: 1850,
        originalPrice: null,
        image: "images/sad-boyz-la.jpg",
        category: "otros",
        isOffer: false,
        isNew: true,
        isSold: false
    },
    {
        id: 18,
        sku: "ZH-ESP-004",
        name: "PSICODÉLICA Edition",
        description: "Diseño psicodélico exclusivo con bordados de colores",
        price: 2000,
        originalPrice: null,
        image: "images/psicodelica.jpg",
        category: "otros",
        isOffer: false,
        isNew: true,
        isSold: false
    }
];

const VIDEOS = [
    { id:1, title:"Unboxing Colección Sad Boyz", thumbnail:"images/video-1.jpg", video:"videos/video-1.mp4"},
    { id:2, title:"Review Dandy Hats 2024", thumbnail:"images/video-2.jpg", video:"videos/video-2.mp4"},
    { id:3, title:"Nuevos Modelos 31 Hats", thumbnail:"images/video-3.jpg", video:"videos/video-3.mp4"},
    { id:4, title:"Colección Barbas Hats", thumbnail:"images/video-4.jpg", video:"videos/video-4.mp4"},
    { id:5, title:"Proceso de Personalización", thumbnail:"images/video-5.jpg", video:"videos/video-5.mp4"},
    { id:6, title:"Ediciones Limitadas", thumbnail:"images/video-6.jpg", video:"videos/video-6.mp4"}
];

const RECENT_MODELS = [
    { id:1, image:"images/recent-1.jpg", title:"Sad Forever Black"},
    { id:2, image:"images/recent-2.jpg", title:"LA Clouds Edition"},
    { id:3, image:"images/recent-3.jpg", title:"Dandy Houston"},
    { id:4, image:"images/recent-4.jpg", title:"Chrome Black Out"},
    { id:5, image:"images/recent-5.jpg", title:"Junior H Collab"},
    { id:6, image:"images/recent-6.jpg", title:"Psicodélica Special"}
];


const WHATSAPP_NUMBER = "523322373159";
// EXPORTAR (CLAVE)
window.PRODUCTS = PRODUCTS;
window.VIDEOS = VIDEOS;
window.RECENT_MODELS = RECENT_MODELS;
window.WHATSAPP_NUMBER = WHATSAPP_NUMBER;

const STORE_INFO = {
    name: "ZEPEDA'S HATS",
    phone: "33 2237 3159",
    whatsapp: WHATSAPP_NUMBER,
    instagram: "https://www.instagram.com/zepeda_hats.mx",
    facebook: "https://www.facebook.com/",
    location: "Jalisco, México"
};
