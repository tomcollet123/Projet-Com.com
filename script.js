// Variables globales
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let isLoggedIn = false;
let currentEditingId = null;
let tempImages = [];
let tempLinks = [];

// Données par défaut
const defaultProjects = [
    {
        id: 1,
        title: "Navigatio Digitalis",
        description: "Cum navibus nostris per maria datarum navigamus, innovatio technologiae nos ad futura aeterna ducit. Hoc proiectum caput est nostrae visionis.",
        status: "En cours",
        images: [],
        links: []
    },
    {
        id: 2,
        title: "Fortitudo Systematis",
        description: "Systema defensionis nostrae robustum et inexpugnabile. Protegimus civitates et regna contra minaceas ignotas et pericula sine nomine.",
        status: "En cours",
        images: [],
        links: []
    },
    {
        id: 3,
        title: "Nexus Cognoscentia",
        description: "Connexio omnium sapientiarum in unum corpus. Omnes informationes, omnes cognitiones, in uno loco centralissimo et luminoso.",
        status: "En cours",
        images: [],
        links: []
    },
    {
        id: 4,
        title: "Velocitas Operandi",
        description: "Celeritas est virtus nostra. Quod alii lente faciunt, nos velocissime et perfectissime exsequimur.",
        status: "En cours",
        images: [],
        links: []
    },
    {
        id: 5,
        title: "Architectura Futuro",
        description: "Aedificamus fundamina civitatum quas generationes venturae habitabunt. Visio nostra est aeterna.",
        status: "En cours",
        images: [],
        links: []
    },
    {
        id: 6,
        title: "Aurora Technologia",
        description: "Primus lux innovationis in tenebris erat. Hoc proiectum initium nostri itineris gloriosissimi fuit.",
        status: "Opérationnel",
        images: [],
        links: []
    },
    {
        id: 7,
        title: "Triumpbus Antiquus",
        description: "Sicut Ulysses Troiam vicit, nos quoque victoriam obtinuimus in procella digitali.",
        status: "Opérationnel",
        images: [],
        links: []
    },
    {
        id: 8,
        title: "Sapientia Aeterna",
        description: "Omnium sapientiarum collectio quae aeterna permanebit. Templum cognitionis humanae.",
        status: "Opérationnel",
        images: [],
        links: []
    },
    {
        id: 9,
        title: "Pax et Securitas",
        description: "Pacem civium defenimus. Securitas omnium nostrum est finis nobilissimus.",
        status: "Opérationnel",
        images: [],
        links: []
    },
    {
        id: 10,
        title: "Memoria Gloriosa",
        description: "Recordatio omnium victoriarum nostrarum et triumphorum qui aeterna sunt.",
        status: "Opérationnel",
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
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            document.getElementById('loginModal').classList.add('active');
        });
    }
});

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('loginError').textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
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
});

// ===== ADMIN PANEL =====
function openAdmin() {
    document.getElementById('adminOverlay').classList.add('active');
    displayProjectsList();
}

function closeAdmin() {
    document.getElementById('adminOverlay').classList.remove('active');
    cancelForm();
}

function logout() {
    isLoggedIn = false;
    closeAdmin();
}

document.addEventListener('DOMContentLoaded', () => {
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            currentEditingId = null;
            resetForm();
            document.getElementById('formSection').style.display = 'block';
            document.getElementById('formTitle').textContent = 'Ajouter un projet';
            document.getElementById('deleteBtn').style.display = 'none';
        });
    }
});

function resetForm() {
    const form = document.getElementById('projectForm');
    if (form) {
        form.reset();
    }
    document.getElementById('imagesList').innerHTML = '';
    document.getElementById('linksList').innerHTML = '';
    tempImages = [];
    tempLinks = [];
    currentEditingId = null;
}

function cancelForm() {
    document.getElementById('formSection').style.display = 'none';
    resetForm();
}

// ===== AFFICHER PROJETS =====
function displayProjectsList() {
    const list = document.getElementById('projectsList');
    list.innerHTML = '';

    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-item';
        item.innerHTML = `
            <div class="project-item-name">
                <div style="font-weight: 900;">${project.title}</div>
                <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.7); margin-top: 5px;">${project.status}</div>
            </div>
            <span class="project-item-status">${project.status === 'En cours' ? '⏳' : '✅'}</span>
            <button class="project-item-edit" onclick="editProject(${project.id})">✏️ Éditer</button>
        `;
        list.appendChild(item);
    });
}

function editProject(id) {
    currentEditingId = id;
    const project = projects.find(p => p.id === id);

    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDesc').value = project.description;
    document.getElementById('projectStatus').value = project.status;

    // Afficher les images
    document.getElementById('imagesList').innerHTML = '';
    tempImages = [...project.images];
    project.images.forEach((img, index) => {
        addImageToDOM(img, index);
    });

    // Afficher les liens
    document.getElementById('linksList').innerHTML = '';
    tempLinks = JSON.parse(JSON.stringify(project.links));
    project.links.forEach((link, index) => {
        addLinkToDOM(link.label, link.url, index);
    });

    document.getElementById('formSection').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Modifier le projet';
    document.getElementById('deleteBtn').style.display = 'block';
}

// ===== DRAG & DROP IMAGES =====
document.addEventListener('DOMContentLoaded', () => {
    const dragDropZone = document.getElementById('dragDropZone');
    const imageInput = document.getElementById('imageInput');

    if (dragDropZone && imageInput) {
        dragDropZone.addEventListener('click', () => imageInput.click());

        dragDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dragDropZone.classList.add('dragover');
        });

        dragDropZone.addEventListener('dragleave', () => {
            dragDropZone.classList.remove('dragover');
        });

        dragDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dragDropZone.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });

        imageInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                tempImages.push(e.target.result);
                if (currentEditingId) {
                    const project = projects.find(p => p.id === currentEditingId);
                    project.images = tempImages;
                }
                addImageToDOM(e.target.result, tempImages.length - 1);
            };
            reader.readAsDataURL(file);
        }
    });
}

function addImageToDOM(src, index) {
    const list = document.getElementById('imagesList');
    const item = document.createElement('div');
    item.className = 'image-item';
    item.id = `image-${index}`;
    item.innerHTML = `
        <img src="${src}" alt="Image ${index + 1}">
        <button type="button" class="image-delete" onclick="deleteImage(${index})">✕</button>
    `;
    list.appendChild(item);
}

function deleteImage(index) {
    tempImages.splice(index, 1);
    if (currentEditingId) {
        const project = projects.find(p => p.id === currentEditingId);
        project.images = tempImages;
    }
    displayImagesInForm();
}

function displayImagesInForm() {
    const list = document.getElementById('imagesList');
    list.innerHTML = '';
    tempImages.forEach((img, index) => {
        addImageToDOM(img, index);
    });
}

// ===== LIENS =====
function addLink() {
    const label = document.getElementById('linkLabel').value;
    const url = document.getElementById('linkUrl').value;

    if (label && url) {
        tempLinks.push({ label, url });
        if (currentEditingId) {
            const project = projects.find(p => p.id === currentEditingId);
            project.links = tempLinks;
        }
        displayLinksInForm();
        document.getElementById('linkLabel').value = '';
        document.getElementById('linkUrl').value = '';
    }
}

function addLinkToDOM(label, url, index) {
    const list = document.getElementById('linksList');
    const item = document.createElement('div');
    item.className = 'link-item';
    item.id = `link-${index}`;
    item.innerHTML = `
        <div class="link-item-info">
            <div class="link-label">${label}</div>
            <div class="link-url">${url}</div>
        </div>
        <button type="button" class="link-delete" onclick="deleteLink(${index})">✕</button>
    `;
    list.appendChild(item);
}

function deleteLink(index) {
    tempLinks.splice(index, 1);
    if (currentEditingId) {
        const project = projects.find(p => p.id === currentEditingId);
        project.links = tempLinks;
    }
    displayLinksInForm();
}

function displayLinksInForm() {
    const list = document.getElementById('linksList');
    list.innerHTML = '';
    tempLinks.forEach((link, index) => {
        addLinkToDOM(link.label, link.url, index);
    });
}

// ===== SAUVEGARDER PROJET =====
document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
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
                project.images = tempImages;
                project.links = tempLinks;
            } else {
                // Créer un nouveau projet
                const newProject = {
                    id: Date.now(),
                    title,
                    description: desc,
                    status,
                    images: tempImages,
                    links: tempLinks
                };
                projects.push(newProject);
            }

            localStorage.setItem('projects', JSON.stringify(projects));
            displayProjects();
            displayProjectsList();
            cancelForm();
        });
    }
});

// ===== SUPPRIMER PROJET =====
document.addEventListener('DOMContentLoaded', () => {
    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('Es-tu sûr de vouloir supprimer ce projet ?')) {
                projects = projects.filter(p => p.id !== currentEditingId);
                localStorage.setItem('projects', JSON.stringify(projects));
                displayProjects();
                displayProjectsList();
                cancelForm();
            }
        });
    }
});

// ===== AFFICHER PROJETS SUR LA PAGE =====
function displayProjects() {
    const orbitEnCours = document.getElementById('orbitEnCours');
    const orbitOperationnels = document.getElementById('orbitOperationnels');

    if (!orbitEnCours || !orbitOperationnels) return;

    orbitEnCours.innerHTML = '';
    orbitOperationnels.innerHTML = '';

    const enCours = projects.filter(p => p.status === 'En cours');
    const operationnels = projects.filter(p => p.status === 'Opérationnel');

    enCours.forEach((project) => {
        const bubble = createOrbitBubble(project);
        orbitEnCours.appendChild(bubble);
    });

    operationnels.forEach((project) => {
        const bubble = createOrbitBubble(project);
        orbitOperationn`

