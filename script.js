// Variables globales
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let isLoggedIn = false;
let currentEditingId = null;
let tempImages = [];
let tempLinks = [];
let tempLogo = null;

// Données par défaut
const defaultProjects = [
    {
        id: 1,
        title: "Navigatio Digitalis",
        description: "Cum navibus nostris per maria datarum navigamus, innovatio technologiae nos ad futura aeterna ducit. Hoc proiectum caput est nostrae visionis.",
        status: "En cours",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 2,
        title: "Fortitudo Systematis",
        description: "Systema defensionis nostrae robustum et inexpugnabile. Protegimus civitates et regna contra minaceas ignotas et pericula sine nomine.",
        status: "En cours",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 3,
        title: "Nexus Cognoscentia",
        description: "Connexio omnium sapientiarum in unum corpus. Omnes informationes, omnes cognitiones, in uno loco centralissimo et luminoso.",
        status: "En cours",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 4,
        title: "Velocitas Operandi",
        description: "Celeritas est virtus nostra. Quod alii lente faciunt, nos velocissime et perfectissime exsequimur.",
        status: "En cours",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 5,
        title: "Architectura Futuro",
        description: "Aedificamus fundamina civitatum quas generationes venturae habitabunt. Visio nostra est aeterna.",
        status: "En cours",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 6,
        title: "Aurora Technologia",
        description: "Primus lux innovationis in tenebris erat. Hoc proiectum initium nostri itineris gloriosissimi fuit.",
        status: "Opérationnel",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 7,
        title: "Triumpbus Antiquus",
        description: "Sicut Ulysses Troiam vicit, nos quoque victoriam obtinuimus in procella digitali.",
        status: "Opérationnel",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 8,
        title: "Sapientia Aeterna",
        description: "Omnium sapientiarum collectio quae aeterna permanebit. Templum cognitionis humanae.",
        status: "Opérationnel",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 9,
        title: "Pax et Securitas",
        description: "Pacem civium defenimus. Securitas omnium nostrum est finis nobilissimus.",
        status: "Opérationnel",
        logo: null,
        images: [],
        links: []
    },
    {
        id: 10,
        title: "Memoria Gloriosa",
        description: "Recordatio omnium victoriarum nostrarum et triumphorum qui aeterna sunt.",
        status: "Opérationnel",
        logo: null,
        images: [],
        links: []
    }
];

// Initialiser les projets
if (projects.length === 0) {
    projects = defaultProjects;
    localStorage.setItem('projects', JSON.stringify(projects));
}

// ===== LOGIN =====
document.addEventListener('DOMContentLoaded', function() {
    // Afficher les projets au chargement
    displayProjects();

    // Ajouter les événements au bouton login
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            document.getElementById('loginModal').classList.add('active');
        });
    }

    // Ajouter les événements au formulaire de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'Labnum.Admin' && password === 'Labnumc\'estcool') {
                isLoggedIn = true;
                closeLoginModal();
                openAdmin();
            } else {
                document.getElementById('loginError').textContent = '❌ Identifiant ou mot de passe incorrect';
            }
        });
    }

    // Ajouter les événements au formulaire de projet
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('projectTitle').value;
            const desc = document.getElementById('projectDesc').value;
            const status = document.getElementById('projectStatus').value;

            if (currentEditingId) {
                // Modifier un projet existant
                const project = projects.find(p => p.id === currentEditingId);
                project.title = title;
                project.description = desc;
                project.status = status;
                project.logo = tempLogo;
                project.images = tempImages;
                project.links = tempLinks;
            } else {
                // Créer un nouveau projet
                const newProject = {
                    id: Date.now(),
                    title,
                    description: desc,
                    status,
                    logo: tempLogo,
                    images: tempImages,
                    links: tempLinks
                };
                projects.
