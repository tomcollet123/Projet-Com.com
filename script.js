let projects = JSON.parse(localStorage.getItem('projects')) || [];
let faqs = JSON.parse(localStorage.getItem('faqs')) || [];
let isLoggedIn = false;
let currentEditingId = null;
let currentEditingFaqId = null;
let tempImages = [];
let tempLinks = [];
let tempLogo = null;
let selectedContactType = null;
let adminEmail = localStorage.getItem('adminEmail') || 'admin@labnum-cecmed.fr';

const defaultProjects = [
    { id: 1, title: "Navigatio Digitalis", description: "Cum navibus nostris per maria datarum navigamus, innovatio technologiae nos ad futura aeterna ducit. Hoc proiectum caput est nostrae visionis.", status: "En cours", logo: null, images: [], links: [] },
    { id: 2, title: "Fortitudo Systematis", description: "Systema defensionis nostrae robustum et inexpugnabile. Protegimus civitates et regna contra minaceas ignotas et pericula sine nomine.", status: "En cours", logo: null, images: [], links: [] },
    { id: 3, title: "Nexus Cognoscentia", description: "Connexio omnium sapientiarum in unum corpus. Omnes informationes, omnes cognitiones, in uno loco centralissimo et luminoso.", status: "En cours", logo: null, images: [], links: [] },
    { id: 4, title: "Velocitas Operandi", description: "Celeritas est virtus nostra. Quod alii lente faciunt, nos velocissime et perfectissime exsequimur.", status: "En cours", logo: null, images: [], links: [] },
    { id: 5, title: "Architectura Futuro", description: "Aedificamus fundamina civitatum quas generationes venturae habitabunt. Visio nostra est aeterna.", status: "En cours", logo: null, images: [], links: [] },
    { id: 6, title: "Aurora Technologia", description: "Primus lux innovationis in tenebris erat. Hoc proiectum initium nostri itineris gloriosissimi fuit.", status: "Opérationnel", logo: null, images: [], links: [] },
    { id: 7, title: "Triumpbus Antiquus", description: "Sicut Ulysses Troiam vicit, nos quoque victoriam obtinuimus in procella digitali.", status: "Opérationnel", logo: null, images: [], links: [] },
    { id: 8, title: "Sapientia Aeterna", description: "Omnium sapientiarum collectio quae aeterna permanebit. Templum cognitionis humanae.", status: "Opérationnel", logo: null, images: [], links: [] },
    { id: 9, title: "Pax et Securitas", description: "Pacem civium defenimus. Securitas omnium nostrum est finis nobilissimus.", status: "Opérationnel", logo: null, images: [], links: [] },
    { id: 10, title: "Memoria Gloriosa", description: "Recordatio omnium victoriarum nostrarum et triumphorum qui aeterna sunt.", status: "Opérationnel", logo: null, images: [], links: [] }
];

const defaultFaqs = [
    { id: 1, question: "Qu'est-ce que LABNUM CECMED ?", answer: "LABNUM CECMED est un centre d'innovation et de défense spécialisé en technologies de pointe. Nous développons des solutions innovantes pour répondre aux défis technologiques contemporains, en combinant expertise technique et vision stratégique. Notre mission est de créer des outils et des systèmes qui propulsent les organisations vers l'avenir." },
    { id: 2, question: "Quels sont vos domaines d'expertise ?", answer: "Nos domaines d'expertise couvrent : l'innovation technologique, les systèmes de défense avancés, la cybersécurité, l'intelligence artificielle, l'architecture numérique, et la transformation digitale. Nous travaillons avec des partenaires stratégiques pour offrir des solutions complètes et intégrées qui répondent aux besoins les plus complexes." },
    { id: 3, question: "Comment puis-je collaborer avec vous ?", answer: "Nous accueillons les collaborations sous diverses formes : partenariats strategiques, projets conjoints, stages et recrutements. Vous pouvez nous contacter via notre formulaire de contact, ou directement à travers nos canaux officiels. Chaque projet est étudié individuellement pour assurer une alignement parfait avec nos valeurs et nos objectifs." },
    { id: 4, question: "Quels sont vos projets actuels ?", answer: "Nous gérons plusieurs projets en cours dans les domaines de l'IA, de la cybersécurité et de l'innovation technologique. Nos projets opérationnels incluent des solutions de sécurité avancées et des plateformes d'analyse de données. Consultez notre section 'Nos Projets' pour découvrir les détails de chaque initiative." },
    { id: 5, question: "Offrez-vous des services de consultation ?", answer: "Oui, nous offrons des services de consultation spécialisés pour les organisations cherchant à moderniser leurs infrastructures technologiques. Nos experts peuvent vous aider à évaluer vos besoins, définir une stratégie appropriée, et mettre en œuvre des solutions adaptées à votre contexte unique." },
    { id: 6, question: "Comment sont structurés vos équipes ?", answer: "Nos équipes sont organisées par domaines d'expertise : développement, sécurité, architecture, recherche et support client. Chaque équipe est composée de spécialistes hautement qualifiés ayant des années d'expérience dans leurs domaines respectifs. Cette structure nous permet de livrer des solutions de qualité exceptionnelle." },
    { id: 7, question: "Quelles certifications possédez-vous ?", answer: "LABNUM CECMED détient plusieurs certifications internationales incluant les standards ISO de sécurité, qualité et gestion. Nous respectons également les normes de conformité des données et les régulations internationales dans nos domaines d'activité. Notre engagement envers l'excellence est reflété par ces reconnaissances." }
];

if (projects.length === 0) {
    projects = defaultProjects;
    localStorage.setItem('projects', JSON.stringify(projects));
}

if (faqs.length === 0) {
    faqs = defaultFaqs;
    localStorage.setItem('faqs', JSON.stringify(faqs));
}

document.addEventListener('DOMContentLoaded', function() {
    displayProjects();
    displayFaqPage();
    setupEventListeners();
});

function setupEventListeners() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            document.getElementById('loginModal').classList.add('active');
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (document.getElementById('username').value
