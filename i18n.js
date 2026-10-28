/* ============================================================
   BUSE CELIK — PORTFOLIO · Internationalization (EN / TR)
   ============================================================ */

const translations = {
  en: {
    "about.big": "About me",
    "proj.more": "More projects",
    "edu.extra": "Beyond",
    "edu.certs": "Certifications",
    "nav.menu": "Menu",
    "nav.design": "Design",
    "nav.education": "Education",
    "hero.localtime": "Local time",
    "hero.now": "Currently",
    "proj.posters.hint": "Drag or scroll →",
    "skills.cat.db": "Databases",
    "skills.cat.ai": "AI & Data",
    "skills.cat.design": "Design",
    "skills.cat.tools": "Tools",
    "footer.top": "Back to top ↑",
    // Nav
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Hero
    "hero.badge": "Available for opportunities",
    "hero.subtitle": "Architecting scalable systems. Crafting seamless experiences. Full-stack engineer bridging backend depth with frontend finesse.",
    "hero.cta1": "View Projects",
    "hero.cta2": "Get in Touch",
    "hero.scroll": "Scroll",
    "hero.location": "Ankara, Türkiye",
    "hero.meta": "Engineer × Designer",

    // About
    "about.tag": "<about>",
    "about.title": 'The <span class="text-accent">Hybrid</span> Identity',
    "about.desc": "Where architectural engineering precision meets pixel-perfect creative vision.",
    "about.engine.title": "The Engine",
    "about.engine.label": "Backend & Architecture",
    "about.engine.text": "Building the invisible infrastructure that powers everything. Microservices, security layers, and data pipelines engineered for scale.",
    "about.interface.title": "The Interface",
    "about.interface.label": "Frontend & Mobile",
    "about.interface.text": "Translating Figma visions into high-performance, pixel-perfect experiences. From responsive web apps to cross-platform mobile products.",
    "about.stat.years": "Years Experience",
    "about.stat.projects": "Projects Delivered",
    "about.stat.companies": "Companies",
    "about.stat.certs": "Certifications",

    // Experience
    "exp.tag": "<experience>",
    "exp.title": 'Professional <span class="text-accent">Journey</span>',
    "exp.desc": "From security analytics to startup product development — a trajectory of increasing scope and impact.",

    // Databoss
    "exp.databoss.role": "Software Engineer",
    "exp.databoss.1": 'Built an enterprise <strong>LLM assistant</strong> with React, TypeScript and Chainlit on a <strong>LangGraph multi-agent RAG</strong> backend — voice input, streaming audio, guided tours and help-desk integration',
    "exp.databoss.2": 'Embedded the assistant into surveillance and internal platforms over <strong>Socket.IO / REST</strong> for contextual access to product data',
    "exp.databoss.3": 'Built a <strong>RAG document-ingestion pipeline</strong> with NestJS, PostgreSQL, Redis and MinIO — real-time progress, failure recovery and self-repair jobs',
    "exp.databoss.4": 'Unified seven AI services (<strong>OCR, translation, summarisation, STT/TTS</strong>, content generation) in a bilingual React/MUI interface',
    "exp.databoss.5": 'Designed a <strong>runtime multi-tenant branding system</strong> (Docker + Nginx injection) so a single image serves per-customer themes, logos, legal notices and feature flags',
    "exp.databoss.6": 'Developed a <strong>drone command-and-control dashboard</strong> (React, MUI, Socket.IO) with live telemetry, mission/waypoint planning, target tracking and video streams',
    "exp.databoss.7": 'Delivered full-stack features for a video-surveillance platform using <strong>MapLibre/Leaflet, Spring Boot, Oracle and Janus WebRTC</strong>, incl. MGRS mapping',
    "exp.databoss.8": 'Owned the front end and contributed <strong>Spring Boot / Java 21</strong> services for a predictive-analytics platform with GIS scenario analysis and <strong>Apache Airflow</strong> pipelines',
    "exp.databoss.9": 'Secured React, NestJS and Spring Boot apps with <strong>Keycloak (OIDC, OAuth2/JWT, UMA)</strong>; tuned <strong>PostgreSQL</strong> on high-volume datasets',
    "exp.databoss.10": 'Shipped containerised services via <strong>GitLab CI, Harbor and Kubernetes</strong>; delivered product demos and technical walkthroughs to customers and stakeholders',

    // Soulmate
    "exp.soulmate.role": "Software Engineer",
    "exp.soulmate.1": 'Leading end-to-end architecture for a cross-platform mobile app using <strong>React Native & Expo</strong>',
    "exp.soulmate.2": 'Developed AI-integrated chat modules and matchmaking algorithms with <strong>Python (Django REST)</strong>',
    "exp.soulmate.3": 'Translating <strong>Figma design systems</strong> into pixel-perfect, high-performance UI components',
    "exp.soulmate.4": 'Implemented <strong>Firebase</strong> services (Auth, Firestore, Cloud Functions) for real-time data',

    // SippsHub
    "exp.sipps.role": "Software Engineer",
    "exp.sipps.1": 'Designed full-stack responsive web application using <strong>React (TypeScript)</strong> and <strong>Node.js/PostgreSQL</strong>',
    "exp.sipps.2": "Led product optimization for backend query efficiency and frontend web vitals",
    "exp.sipps.3": 'Developed secure <strong>RESTful APIs</strong> with integrated data validation',

    // Melon
    "exp.melon.role": "Frontend Developer",
    "exp.melon.1": 'Developed core mobile UI components using <strong>React Native</strong> with high-fidelity animations',
    "exp.melon.2": 'Optimized state management using <strong>Redux Toolkit</strong> and <strong>RTK Query</strong>',
    "exp.melon.3": "Agile collaboration iterating on product features based on user feedback",

    // FintelaAI
    "exp.fintela.role": "Frontend Developer",
    "exp.fintela.1": 'Built a responsive web app using <strong>React.js</strong>',
    "exp.fintela.2": "Developed clean, reusable UI components with API integration",

    // iWebsa
    "exp.iwebsa.role": "Frontend Developer",
    "exp.iwebsa.1": 'Converted <strong>Figma</strong> designs into responsive, pixel-perfect frontend components',
    "exp.iwebsa.2": "Ensured cross-browser compatibility and mobile-first responsive layouts",

    // Kloudser
    "exp.kloudser.role": "UI/UX Designer",
    "exp.kloudser.1": 'Designed a complete web application <strong>UI/UX for a cybersecurity firm</strong> using Figma',
    "exp.kloudser.2": "Created high-fidelity wireframes, interactive prototypes, and responsive layouts",
    "exp.kloudser.3": 'Focused on <strong>user-centered design principles</strong> to enhance usability and visual coherence',
    "exp.kloudser.4": "Collaborated with stakeholders to translate business requirements into effective UI components",

    // Databoss Social
    "exp.dbsocial.role": "Social Media Content Creator & Graphic Designer",
    "exp.dbsocial.1": 'Designed and managed the company\'s <strong>LinkedIn-based visual content strategy</strong>',
    "exp.dbsocial.2": 'Produced branded visuals including <strong>posters, brochures, banners, business cards</strong>, and videos',
    "exp.dbsocial.3": 'Created <strong>corporate business card designs</strong> aligned with brand identity guidelines',

    // Freelance Social
    "exp.freelance.role": "Social Media Content Creator & Manager",
    "exp.freelance.company": "Freelance",
    "exp.freelance.1": 'Managing end-to-end <strong>social media strategy</strong>, content creation, and brand identity for multiple clients',
    "exp.freelance.2": 'Producing branded visuals including <strong>posters, reels, stories</strong>, and promotional videos',
    "exp.freelance.3": 'Designing <strong>business cards, logos, brand identities</strong>, and visual content systems from scratch',
    "exp.freelance.4": "Growing audience engagement through consistent, data-driven content planning",
    "exp.freelance.clients": "Clients",

    // Projects
    "proj.tag": "<projects>",
    "proj.title": 'Featured <span class="text-accent">Work</span>',
    "proj.desc": "Products and platforms I've designed, built, and shipped.",
    "proj.visit": "Visit Site",
    "proj.arch": "Architecture",

    "proj.empati.badge": "Full-Stack \u2022 Multiplayer",
    "proj.empati.desc": "A Kahoot-style real-time multiplayer word game where players try to predict what others will write for a given topic. Monorepo architecture with Turborepo, real-time WebSocket communication via Socket.IO, Redis-powered state management with horizontal scaling support, server-authoritative game state, 6-digit PIN room system, and retro pixel art aesthetic. Main display for TV/computer, player controller for mobile devices.",

    "proj.soulmate.badge": "Startup \u2022 Founder",
    "proj.soulmate.desc": "Cross-platform dating app for iOS and Android featuring AI-driven matchmaking algorithms, real-time chat with WebSockets, and Firebase-powered authentication. End-to-end architecture from Figma design systems to production deployment.",

    "proj.influence.badge": "Senior Project \u2022 Founder \u2022 Cross-Platform",
    "proj.influence.desc": "Full-scale AI-based recommendation platform connecting brands with influencers and event organizers with performers. Cross-platform web and mobile applications with AI matchmaking model, Docker deployment, and complete UI/UX design in Figma.",

    "proj.sipps.badge": "Full-Stack",
    "proj.sipps.desc": "Full-stack responsive web application with React/TypeScript frontend and Node.js/PostgreSQL backend. Focused on backend query efficiency and frontend web vitals optimization.",

    "proj.isaret.badge": "Frontend \u2022 Corporate",
    "proj.isaret.desc": "Corporate website for a real estate development company. Modern, responsive design showcasing property projects with immersive visuals, interactive layouts, and a professional web presence.",

    "proj.fintela.badge": "Frontend \u2022 AI",
    "proj.fintela.desc": "AI-powered financial assistant web application. Responsive React.js interface with clean, reusable components and dynamic API-driven data rendering.",

    "proj.eminpt.badge": "Frontend \u2022 Freelance",
    "proj.eminpt.desc": "Professional portfolio website for a personal trainer based in Ankara. Modern dark-themed design with animated backgrounds, bilingual support (TR/EN), client transformations gallery, certifications showcase, and WhatsApp integration for easy client outreach.",

    "proj.finansce.badge": "Fintech • Flutter • Creator Platform",
    "proj.finansce.desc": "Subscription-based finance content app built with Flutter and Riverpod in a Melos monorepo following Clean Architecture. Firebase Auth, Firestore, Cloud Functions and Messaging power accounts, content and push. LiveKit voice rooms use server-minted, short-lived tokens enforcing a creator/premium speaker policy; the API runs on Cloudflare Workers.",

    "proj.pacer.badge": "Mobile • Social • Running",
    "proj.pacer.desc": "Social app for local running teams built with Expo Router and Supabase. Geo-located events are stored in PostGIS and team data is secured with Row Level Security. Features RSVPs, team chat, check-ins, Strava OAuth via a Supabase Edge Function, and shareable story cards for Instagram and WhatsApp.",

    "proj.curator.badge": "Mobile • Full-Stack • Recommendation",
    "proj.curator.desc": "One-tap venue recommender built with React Native and a Node.js/Express backend. Integrates the Google Places API with rating-filtered selection, no-repeat logic and response caching to cut API cost. Visit history is stored locally with deep links into native Maps; marketing site published on Vercel.",

    "proj.aytar.badge": "Frontend • Corporate • Freelance",
    "proj.aytar.desc": "Corporate website built with React and Vite featuring scroll-driven counters, a custom SVG world map and a fully responsive layout.",

    "proj.bahtinur.badge": "Frontend • Portfolio • Next.js",
    "proj.bahtinur.desc": "Artist portfolio built with Next.js 16 featuring scroll-linked parallax, an image-first gallery and complete SEO / Open Graph metadata.",

    "proj.nocciola.badge": "Frontend • Brand • i18n",
    "proj.nocciola.desc": "Pistachio-cream brand site built with React featuring EN/TR internationalisation, motion animations and downloadable PDF pitch decks.",

    "proj.melon.badge": "Startup \u2022 Tablet \u2022 Hospitality",
    "proj.melon.desc": "Tablet application designed for the hospitality industry, built with React Native and Expo Go for hotel in-room guest experiences. Developed high-fidelity UI components with fluid animations and optimized state management using Redux Toolkit and RTK Query. Also built the promotional website using React with TypeScript.",

    "proj.kloudser.badge": "UI/UX \u2022 Cybersecurity",
    "proj.kloudser.desc": "Complete web application UI/UX designed for a cybersecurity firm using Figma. Created high-fidelity wireframes, interactive prototypes, and responsive layouts with a focus on user-centered design principles to enhance usability and visual coherence.",

    "proj.iwebsa.badge": "Frontend \u2022 Remote",
    "proj.iwebsa.desc": "Converted Figma designs into responsive, pixel-perfect frontend components. Ensured cross-browser compatibility and implemented mobile-first responsive layouts with clean, semantic code architecture.",

    // Poster Designs
    "proj.posters.title": 'Poster <span class="text-accent">Designs</span>',
    "proj.posters.desc": "Visual content and poster designs crafted for brands and campaigns.",

    // Skills
    "skills.tag": "<skills>",
    "skills.title": 'Tech <span class="text-accent">Arsenal</span>',
    "skills.desc": "The tools and technologies I work with daily.",
    "skills.cat.lang": "Languages",
    "skills.cat.front": "Frontend & Mobile",
    "skills.cat.back": "Backend & Data",
    "skills.cat.devops": "DevOps & Cloud",

    // Education
    "edu.tag": "<education>",
    "edu.title": 'Education & <span class="text-accent">Certifications</span>',
    "edu.degree": "B.Sc. in Computer Technology and Information Systems",
    "edu.school": "Bilkent University, Ankara",
    "edu.date": "Feb 2021 — June 2025",
    "edu.gpa": "GPA: 3.06 / 4.00",
    "edu.honors": "High Honor & Honor Certificates",
    "edu.lang": '<strong>English</strong> — Advanced (IELTS 6.5)',
    "edu.karting": '<strong>Board Member</strong> — Bilkent Karting Society (2022–2023), Led marketing & visual content',

    // Contact
    "contact.tag": "<contact>",
    "contact.title": 'Let\'s build<br/><span class="text-accent">something.</span>',
    "contact.desc": "Open to new opportunities, collaborations, and interesting conversations.",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
    "contact.phone": "Phone",

    // Footer
    "footer.copy": "\u00a9 2026 Buse \u00c7elik. Crafted with precision.",
  },

  tr: {
    "about.big": "Hakkımda",
    "proj.more": "Diğer projeler",
    "edu.extra": "Ek bilgiler",
    "edu.certs": "Sertifikalar",
    "nav.menu": "Menü",
    "nav.design": "Tasarım",
    "nav.education": "Eğitim",
    "hero.localtime": "Yerel saat",
    "hero.now": "Şu an",
    "proj.posters.hint": "Sürükle veya kaydır →",
    "skills.cat.db": "Veritabanları",
    "skills.cat.ai": "Yapay Zekâ & Veri",
    "skills.cat.design": "Tasarım",
    "skills.cat.tools": "Araçlar",
    "footer.top": "Başa dön ↑",
    // Nav
    "nav.about": "Hakkımda",
    "nav.experience": "Deneyim",
    "nav.projects": "Projeler",
    "nav.skills": "Yetenekler",
    "nav.contact": "İletişim",

    // Hero
    "hero.badge": "Yeni fırsatlara açığım",
    "hero.subtitle": "Ölçeklenebilir sistemler tasarlıyor. Kusursuz deneyimler yaratıyor. Backend derinliği ile frontend zerafetini birleştiren full-stack mühendis.",
    "hero.cta1": "Projeleri Gör",
    "hero.cta2": "İletişime Geç",
    "hero.scroll": "Kaydır",
    "hero.location": "Ankara, Türkiye",
    "hero.meta": "Mühendis × Tasarımcı",

    // About
    "about.tag": "<hakkımda>",
    "about.title": '<span class="text-accent">Hibrit</span> Kimlik',
    "about.desc": "Mimari mühendislik hassasiyetinin piksel-mükemmel yaratıcı vizyonla buluştuğu yer.",
    "about.engine.title": "Motor",
    "about.engine.label": "Backend & Mimari",
    "about.engine.text": "Her şeyi güçlendiren görünmez altyapıyı inşa etmek. Ölçek için tasarlanmış mikroservisler, güvenlik katmanları ve veri boru hatları.",
    "about.interface.title": "Arayüz",
    "about.interface.label": "Frontend & Mobil",
    "about.interface.text": "Figma vizyonlarını yüksek performanslı, piksel-mükemmel deneyimlere dönüştürmek. Responsive web uygulamalarından çapraz platform mobil ürünlere.",
    "about.stat.years": "Yıl Deneyim",
    "about.stat.projects": "Teslim Edilen Proje",
    "about.stat.companies": "Şirket",
    "about.stat.certs": "Sertifika",

    // Experience
    "exp.tag": "<deneyim>",
    "exp.title": 'Profesyonel <span class="text-accent">Yolculuk</span>',
    "exp.desc": "Güvenlik analitiğinden startup ürün geliştirmeye — artan kapsam ve etki yörüngesi.",

    // Databoss
    "exp.databoss.role": "Yazılım Mühendisi",
    "exp.databoss.1": 'React, TypeScript ve Chainlit ile <strong>LangGraph çok ajanlı RAG</strong> backend üzerinde kurumsal <strong>LLM asistanı</strong> geliştirdi — sesli giriş, akışlı ses oynatma, rehberli turlar ve help-desk entegrasyonu',
    "exp.databoss.2": 'Asistanı <strong>Socket.IO / REST</strong> üzerinden gözetim ve iç platformlara gömerek ürün verisine bağlamsal erişim sağladı',
    "exp.databoss.3": 'NestJS, PostgreSQL, Redis ve MinIO ile <strong>RAG doküman alım pipeline\'ı</strong> kurdu — gerçek zamanlı ilerleme, hata kurtarma ve kendi kendini onaran işler',
    "exp.databoss.4": 'Yedi AI servisini (<strong>OCR, çeviri, özetleme, STT/TTS</strong>, içerik üretimi) iki dilli React/MUI arayüzünde birleştirdi',
    "exp.databoss.5": 'Tek bir imajın müşteriye özel tema, logo, yasal metin ve feature flag sunmasını sağlayan <strong>çalışma zamanı multi-tenant branding sistemi</strong> tasarladı (Docker + Nginx injection)',
    "exp.databoss.6": 'Canlı telemetri, görev/waypoint planlama, hedef takibi ve video akışı içeren <strong>drone komuta-kontrol paneli</strong> geliştirdi (React, MUI, Socket.IO)',
    "exp.databoss.7": '<strong>MapLibre/Leaflet, Spring Boot, Oracle ve Janus WebRTC</strong> ile video gözetim platformuna MGRS haritalama dahil full-stack özellikler kazandırdı',
    "exp.databoss.8": 'GIS senaryo analizi ve <strong>Apache Airflow</strong> pipeline\'ları içeren tahmine dayalı analitik platformunda front end\'i üstlendi, <strong>Spring Boot / Java 21</strong> servisleri geliştirdi',
    "exp.databoss.9": 'React, NestJS ve Spring Boot uygulamalarını <strong>Keycloak (OIDC, OAuth2/JWT, UMA)</strong> ile güvenceye aldı; yüksek hacimli verilerde <strong>PostgreSQL</strong> performansını iyileştirdi',
    "exp.databoss.10": 'Servisleri <strong>GitLab CI, Harbor ve Kubernetes</strong> ile konteyner olarak yayına aldı; müşterilere ve paydaşlara ürün demoları ve teknik sunumlar yaptı',

    // Soulmate
    "exp.soulmate.role": "Yazılım Mühendisi",
    "exp.soulmate.1": '<strong>React Native & Expo</strong> ile çapraz platform mobil uygulama için uçtan uca mimari liderliği',
    "exp.soulmate.2": '<strong>Python (Django REST)</strong> ile AI entegreli sohbet modülleri ve eşleştirme algoritmaları geliştirdi',
    "exp.soulmate.3": '<strong>Figma tasarım sistemlerini</strong> piksel-mükemmel, yüksek performanslı UI bileşenlerine dönüştürüyor',
    "exp.soulmate.4": 'Gerçek zamanlı veri için <strong>Firebase</strong> hizmetlerini (Auth, Firestore, Cloud Functions) uyguladı',

    // SippsHub
    "exp.sipps.role": "Yazılım Mühendisi",
    "exp.sipps.1": '<strong>React (TypeScript)</strong> ve <strong>Node.js/PostgreSQL</strong> ile full-stack responsive web uygulaması tasarladı',
    "exp.sipps.2": "Backend sorgu verimliliği ve frontend web vitals için ürün optimizasyonu liderliği yaptı",
    "exp.sipps.3": 'Entegre veri doğrulaması ile güvenli <strong>RESTful API\'ler</strong> geliştirdi',

    // Melon
    "exp.melon.role": "Frontend Geliştirici",
    "exp.melon.1": '<strong>React Native</strong> ile yüksek kaliteli animasyonlar içeren temel mobil UI bileşenleri geliştirdi',
    "exp.melon.2": '<strong>Redux Toolkit</strong> ve <strong>RTK Query</strong> ile durum yönetimini optimize etti',
    "exp.melon.3": "Kullanıcı geri bildirimleri doğrultusunda Agile ortamda ürün özellikleri üzerinde iterasyon yaptı",

    // FintelaAI
    "exp.fintela.role": "Frontend Geliştirici",
    "exp.fintela.1": '<strong>React.js</strong> ile responsive bir web uygulaması geliştirdi',
    "exp.fintela.2": "Temiz, yeniden kullanılabilir UI bileşenleri ve API entegrasyonu geliştirdi",

    // iWebsa
    "exp.iwebsa.role": "Frontend Geliştirici",
    "exp.iwebsa.1": '<strong>Figma</strong> tasarımlarını responsive, piksel-mükemmel frontend bileşenlerine dönüştürdü',
    "exp.iwebsa.2": "Çapraz tarayıcı uyumluluk ve mobil-öncelikli responsive düzenler sağladı",

    // Kloudser
    "exp.kloudser.role": "UI/UX Tasarımcı",
    "exp.kloudser.1": 'Figma kullanarak bir <strong>siber güvenlik firması için web uygulaması UI/UX\'i</strong> tasarladı',
    "exp.kloudser.2": "Yüksek kaliteli wireframe'ler, interaktif prototipler ve responsive düzenler oluşturdu",
    "exp.kloudser.3": 'Kullanılabilirlik ve görsel tutarlılığı artırmak için <strong>kullanıcı merkezli tasarım ilkelerine</strong> odaklandı',
    "exp.kloudser.4": "İş gereksinimlerini etkili UI bileşenlerine dönüştürmek için paydaşlarla işbirliği yaptı",

    // Databoss Social
    "exp.dbsocial.role": "Sosyal Medya İçerik Üreticisi & Grafik Tasarımcı",
    "exp.dbsocial.1": 'Şirketin <strong>LinkedIn tabanlı görsel içerik stratejisini</strong> tasarladı ve yönetti',
    "exp.dbsocial.2": '<strong>Posterler, broşürler, afişler, kartvizitler</strong> ve videolar dahil markalı görseller üretti',
    "exp.dbsocial.3": 'Marka kimliği yönergelerine uygun <strong>kurumsal kartvizit tasarımları</strong> oluşturdu',

    // Freelance Social
    "exp.freelance.role": "Sosyal Medya İçerik Üreticisi & Yöneticisi",
    "exp.freelance.company": "Serbest",
    "exp.freelance.1": 'Birden fazla müşteri için uçtan uca <strong>sosyal medya stratejisi</strong>, içerik üretimi ve marka kimliği yönetimi',
    "exp.freelance.2": '<strong>Posterler, reels, hikayeler</strong> ve tanıtım videoları dahil markalı görseller üretimi',
    "exp.freelance.3": '<strong>Kartvizitler, logolar, marka kimlikleri</strong> ve görsel içerik sistemleri sıfırdan tasarım',
    "exp.freelance.4": "Tutarlı, veriye dayalı içerik planlamasıyla kitle etkileşimini büyütme",
    "exp.freelance.clients": "Müşteriler",

    // Projects
    "proj.tag": "<projeler>",
    "proj.title": 'Öne Çıkan <span class="text-accent">Çalışmalar</span>',
    "proj.desc": "Tasarladığım, geliştirdiğim ve yayına aldığım ürünler ve platformlar.",
    "proj.visit": "Siteyi Ziyaret Et",
    "proj.arch": "Mimari",

    "proj.empati.badge": "Full-Stack \u2022 \u00c7ok Oyunculu",
    "proj.empati.desc": "Kahoot tarz\u0131nda ger\u00e7ek zamanl\u0131 \u00e7ok oyunculu bir kelime oyunu. Oyuncular, verilen bir konu i\u00e7in di\u011fer oyuncular\u0131n ne yazaca\u011f\u0131n\u0131 tahmin etmeye \u00e7al\u0131\u015f\u0131r. Turborepo ile monorepo mimarisi, Socket.IO ile ger\u00e7ek zamanl\u0131 WebSocket ileti\u015fimi, Redis ile real-time state y\u00f6netimi ve horizontal scaling deste\u011fi, sunucu taraf\u0131nda yetkilendirilmi\u015f oyun durumu, 6 haneli PIN ile oda sistemi ve retro piksel art esteti\u011fi. TV/bilgisayar i\u00e7in ana ekran, mobil cihazlar i\u00e7in oyuncu kontrol paneli.",

    "proj.soulmate.badge": "Startup \u2022 Kurucu",
    "proj.soulmate.desc": "iOS ve Android için AI destekli eşleştirme algoritmaları, WebSocket ile gerçek zamanlı sohbet ve Firebase destekli kimlik doğrulama içeren çapraz platform arkadaşlık uygulaması. Figma tasarım sistemlerinden production deployment'a uçtan uca mimari.",

    "proj.influence.badge": "Bitirme Projesi \u2022 Kurucu \u2022 Cross-Platform",
    "proj.influence.desc": "Markaları influencer'larla, etkinlik organizatörlerini sanatçılarla buluşturan tam ölçekli AI tabanlı öneri platformu. AI eşleştirme modeli, Docker deployment ve Figma'da kapsamlı UI/UX tasarımı ile cross-platform web ve mobil uygulamalar.",

    "proj.sipps.badge": "Full-Stack",
    "proj.sipps.desc": "React/TypeScript frontend ve Node.js/PostgreSQL backend ile full-stack responsive web uygulaması. Backend sorgu verimliliği ve frontend web vitals optimizasyonuna odaklı.",

    "proj.isaret.badge": "Frontend \u2022 Kurumsal",
    "proj.isaret.desc": "Bir gayrimenkul geliştirme şirketi için kurumsal web sitesi. Etkileyici görseller, interaktif düzenler ve profesyonel web varlığı sergileyen modern, responsive tasarım.",

    "proj.fintela.badge": "Frontend \u2022 AI",
    "proj.fintela.desc": "AI destekli finansal asistan web uygulaması. Temiz, yeniden kullanılabilir bileşenler ve dinamik API tabanlı veri görüntüleme ile responsive React.js arayüzü.",

    "proj.eminpt.badge": "Frontend \u2022 Serbest",
    "proj.eminpt.desc": "Ankara merkezli bir personal trainer i\u00e7in profesyonel portfolyo web sitesi. Animasyonlu arka planlar, iki dil deste\u011fi (TR/EN), m\u00fc\u015fteri d\u00f6n\u00fc\u015f\u00fcm galerisi, sertifika vitrini ve kolay ileti\u015fim i\u00e7in WhatsApp entegrasyonu ile modern koyu temal\u0131 tasar\u0131m.",

    "proj.finansce.badge": "Fintech • Flutter • İçerik Platformu",
    "proj.finansce.desc": "Flutter ve Riverpod ile Melos monorepo içinde Clean Architecture prensipleriyle geliştirilen abonelik tabanlı finans içerik uygulaması. Hesaplar, içerik ve bildirimler için Firebase Auth, Firestore, Cloud Functions ve Messaging kullanıldı. LiveKit sesli odalar, sunucuda üretilen kısa ömürlü token'larla içerik üretici/premium konuşmacı politikasını uygular; API Cloudflare Workers üzerinde çalışır.",

    "proj.pacer.badge": "Mobil • Sosyal • Koşu",
    "proj.pacer.desc": "Expo Router ve Supabase ile geliştirilen, yerel koşu takımları için sosyal uygulama. Konum tabanlı etkinlikler PostGIS'te saklanır, takım verileri Row Level Security ile korunur. RSVP, takım sohbeti, check-in, Supabase Edge Function üzerinden Strava OAuth ve Instagram/WhatsApp için paylaşılabilir hikâye kartları içerir.",

    "proj.curator.badge": "Mobil • Full-Stack • Öneri",
    "proj.curator.desc": "React Native ve Node.js/Express backend ile geliştirilen tek dokunuşla mekân öneri uygulaması. Google Places API; puan filtreli seçim, tekrar etmeme mantığı ve API maliyetini düşüren yanıt önbellekleme ile entegre edildi. Ziyaret geçmişi cihazda saklanır ve yerel Haritalar uygulamasına deep link verir; tanıtım sitesi Vercel'de yayınlandı.",

    "proj.aytar.badge": "Frontend • Kurumsal • Serbest",
    "proj.aytar.desc": "React ve Vite ile geliştirilen kurumsal web sitesi. Scroll ile tetiklenen sayaçlar, özel SVG dünya haritası ve tamamen responsive düzen.",

    "proj.bahtinur.badge": "Frontend • Portfolyo • Next.js",
    "proj.bahtinur.desc": "Next.js 16 ile geliştirilen sanatçı portfolyosu. Scroll'a bağlı parallax, görsel odaklı galeri ve eksiksiz SEO / Open Graph metadata.",

    "proj.nocciola.badge": "Frontend • Marka • i18n",
    "proj.nocciola.desc": "React ile geliştirilen fıstık kreması marka sitesi. EN/TR çoklu dil desteği, motion animasyonları ve indirilebilir PDF sunum dosyaları.",

    "proj.melon.badge": "Startup \u2022 Tablet \u2022 Otelcilik",
    "proj.melon.desc": "Otelcilik sekt\u00f6r\u00fc i\u00e7in tasarlanan, React Native ve Expo Go ile geli\u015ftirilen tablet uygulamas\u0131. Otel oda i\u00e7i misafir deneyimleri i\u00e7in y\u00fcksek kaliteli UI bile\u015fenleri ve ak\u0131c\u0131 animasyonlar geli\u015ftirildi. Redux Toolkit ve RTK Query ile durum y\u00f6netimi optimize edildi. Ayr\u0131ca React ve TypeScript ile tan\u0131t\u0131m web sitesi olu\u015fturuldu.",

    "proj.kloudser.badge": "UI/UX \u2022 Siber G\u00fcvenlik",
    "proj.kloudser.desc": "Figma kullanarak bir siber g\u00fcvenlik firmas\u0131 i\u00e7in tasarlanan kapsaml\u0131 web uygulamas\u0131 UI/UX\u2019i. Kullan\u0131labilirlik ve g\u00f6rsel tutarl\u0131l\u0131\u011f\u0131 art\u0131rmak i\u00e7in kullan\u0131c\u0131 merkezli tasar\u0131m ilkeleriyle y\u00fcksek kaliteli wireframe\u2019ler, interaktif prototipler ve responsive d\u00fczenler olu\u015fturuldu.",

    "proj.iwebsa.badge": "Frontend \u2022 Uzaktan",
    "proj.iwebsa.desc": "Figma tasar\u0131mlar\u0131 responsive, piksel-m\u00fckemmel frontend bile\u015fenlerine d\u00f6n\u00fc\u015ft\u00fcr\u00fcld\u00fc. Temiz, semantik kod mimarisiyle \u00e7apraz taray\u0131c\u0131 uyumluluk ve mobil-\u00f6ncelikli responsive d\u00fczenler sa\u011fland\u0131.",

    // Poster Designs
    "proj.posters.title": 'Afi\u015f <span class="text-accent">Tasar\u0131mlar\u0131</span>',
    "proj.posters.desc": "Markalar ve kampanyalar i\u00e7in tasarlanan g\u00f6rsel i\u00e7erikler ve afi\u015f tasar\u0131mlar\u0131.",

    // Skills
    "skills.tag": "<yetenekler>",
    "skills.title": 'Teknoloji <span class="text-accent">Cephaneliği</span>',
    "skills.desc": "Günlük kullandığım araçlar ve teknolojiler.",
    "skills.cat.lang": "Diller",
    "skills.cat.front": "Frontend & Mobil",
    "skills.cat.back": "Backend & Veri",
    "skills.cat.devops": "DevOps & Bulut",

    // Education
    "edu.tag": "<eğitim>",
    "edu.title": 'Eğitim & <span class="text-accent">Sertifikalar</span>',
    "edu.degree": "Bilgisayar Teknolojisi ve Bilişim Sistemleri Lisans",
    "edu.school": "Bilkent Üniversitesi, Ankara",
    "edu.date": "Şub 2021 — Haz 2025",
    "edu.gpa": "GNO: 3.06 / 4.00",
    "edu.honors": "Yüksek Onur & Onur Belgeleri",
    "edu.lang": '<strong>İngilizce</strong> — İleri Düzey (IELTS 6.5)',
    "edu.karting": '<strong>Yönetim Kurulu Üyesi</strong> — Bilkent Karting Topluluğu (2022–2023), Pazarlama & görsel içerik liderliği',

    // Contact
    "contact.tag": "<iletişim>",
    "contact.title": 'Hadi inşa edelim<br/><span class="text-accent">bir şeyler.</span>',
    "contact.desc": "Yeni fırsatlara, iş birliklerine ve ilginç sohbetlere açığım.",
    "contact.email": "E-posta",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub",
    "contact.phone": "Telefon",

    // Footer
    "footer.copy": "\u00a9 2026 Buse \u00c7elik. Titizlikle tasarlandı.",
  }
};

// Typing effect titles per language
const typingTitles = {
  en: [
    'Full-Stack Software Engineer',
    'Backend Architect',
    'Mobile Developer',
    'UI/UX Designer',
    'AI Integration Specialist',
    'DevOps Engineer',
    'System Designer',
  ],
  tr: [
    'Full-Stack Yazılım Mühendisi',
    'Backend Mimar',
    'Mobil Geliştirici',
    'UI/UX Tasarımcı',
    'AI Entegrasyon Uzmanı',
    'DevOps Mühendisi',
    'Sistem Tasarımcısı',
  ]
};

(function () {
  'use strict';

  let currentLang = 'en';
  try { currentLang = localStorage.getItem('lang') || 'en'; } catch (e) {}

  function applyTranslations(lang) {
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle active state
    document.querySelectorAll('.lang__opt').forEach(opt => {
      const active = opt.dataset.lang === lang;
      opt.classList.toggle('is-active', active);
      opt.setAttribute('aria-pressed', String(active));
    });

    // Re-run text splitting / effects on freshly injected markup
    if (window.__afterTranslate) {
      window.__afterTranslate();
    }

    // Update typing titles
    if (window.__updateTypingTitles) {
      window.__updateTypingTitles(lang);
    }

    try { localStorage.setItem('lang', lang); } catch (e) {}
    currentLang = lang;
  }

  // Language toggle click handler
  document.addEventListener('click', (e) => {
    const opt = e.target.closest('.lang__opt');
    if (opt && opt.dataset.lang) {
      const newLang = opt.dataset.lang;
      if (newLang !== currentLang) {
        applyTranslations(newLang);
      }
    }
  });

  // Apply on load (script.js registers __updateTypingTitles first, then calls this)
  window.__initLang = () => applyTranslations(currentLang);

  // Expose for external use
  window.__applyTranslations = applyTranslations;
  window.__getCurrentLang = () => currentLang;
})();
