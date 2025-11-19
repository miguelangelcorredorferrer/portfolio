// =======================================================
// "BASE DE DATOS" DE PROYECTOS
// Añade aquí tus proyectos.
// =======================================================
const misProyectos = [
    // {
    //     titulo: "Honeypot SSH Interactivo",
    //     imagen: "images/proyectos/honeypot.jpg", // Ruta a la imagen (¡Crea esta carpeta!)
    //     descripcion: "Despliegue de un honeypot (Cowrie) en un VPS para analizar TTPs de atacantes. Logs centralizados con ELK Stack.",
    //     tags: ["Blue Team", "Docker", "ELK", "VPS", "Cowrie"],
    //     linkGitHub: "https://github.com/miguelangelcorredorferrer/...",
    //     linkDemo: null // Pon un enlace si está desplegado, o null si no
    // },
    
];


// =======================================================
// "BASE DE DATOS" DE POSTS DEL BLOG
// Añade aquí tus publicaciones.
// =======================================================
const misPosts = [
    // Post 1
    {
        id: 1,
        titulo: "Introducción al Monitoreo de Logs con ELK",
        resumen: "Aprende los conceptos básicos para centralizar y visualizar logs de seguridad usando el stack de Elastic (Elasticsearch, Logstash, Kibana).",
        // Enlace al archivo HTML del post (¡que crearás!)
        archivo: "post-1.html", 
        categoria: "blue-team",
        dificultad: "facil",
        fecha: "2025-11-18",
        etiquetas: ["ELK", "SIEM", "Logs", "Blue Team"]
    },
    // Post 2
    {
        id: 2,
        titulo: "Análisis de Memoria Volátil con Volatility",
        resumen: "Un caso práctico sobre cómo extraer artefactos y evidencia de un volcado de memoria RAM para una investigación de incidente.",
        archivo: "post-2.html",
        categoria: "forense",
        dificultad: "media",
        fecha: "2025-11-15",
        etiquetas: ["Forense", "Volatility", "IR", "RAM"]
    },
    // Post 3
    {
        id: 3,
        titulo: "Deobfuscando un Dropper de PowerShell",
        resumen: "Técnicas avanzadas de análisis estático y dinámico para entender un script de PowerShell ofuscado.",
        archivo: "post-3.html",
        categoria: "malware",
        dificultad: "dificil",
        fecha: "2025-11-10",
        etiquetas: ["PowerShell", "Malware", "Análisis", "Reverse"]
    },
    // Post 4
    {
        id: 4,
        titulo: "Configuración de un Honeypot con Cowrie",
        resumen: "Cómo desplegar un honeypot SSH/Telnet para atraer y analizar los métodos de ataque de los adversarios en tu red.",
        archivo: "post-4.html",
        categoria: "redes",
        dificultad: "media",
        fecha: "2025-11-05",
        etiquetas: ["Honeypot", "Docker", "Blue Team", "Redes"]
    },
    // Post 5
    {
        id: 5,
        titulo: "Análisis de un PCAP: Buscando C2",
        resumen: "Usando Wireshark para analizar tráfico de red capturado (PCAP) e identificar comunicación con un servidor de Comando y Control (C2).",
        archivo: "post-5.html",
        categoria: "redes",
        dificultad: "media",
        fecha: "2025-11-01",
        etiquetas: ["Wireshark", "Redes", "Forense", "C2"]
    },
    // Post 6 (Para probar el botón "Ver Más")
    {
        id: 6,
        titulo: "Fundamentos de Hardening en Linux",
        resumen: "Pasos esenciales para asegurar un servidor Linux, desde la configuración del firewall hasta la gestión de usuarios y servicios.",
        archivo: "post-6.html",
        categoria: "sistemas",
        dificultad: "facil",
        fecha: "2025-10-28",
        etiquetas: ["Linux", "Hardening", "Sistemas", "Seguridad"]
    }
];