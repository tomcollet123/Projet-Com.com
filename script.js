// Variables globales
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let isLoggedIn = false;
let currentEditingId = null;

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
        status: "Terminé",
        images: [],
        links: []
    },
    {
        id: 7,
        title: "Triumpbus Antiquus",
        description: "Sicut Ulysses Troiam vicit, nos quoque victoriam obtinuimus in procella digitali.",
        status: "Terminé",
        images: [],
        links: []
    },
    {
        id: 8,
        title: "Sapientia Aeterna",
        description: "Omnium sapientiarum collectio quae aeterna permanebit. Templum cognitionis humanae.",
        status: "Terminé",
        images: [],
        links: []
    },
    {
        id: 9,
        title: "Pax et Securitas",
        description: "Pacem civium defenimus. Securitas omnium nostrum est finis nobilissimus.",
        status: "Terminé",
        images: [],
        links: []
    },
    {
        id: 10,
        title: "Memoria Gloriosa",
        description: "Recordatio omnium victoriarum nostrarum et triumphorum qui aeterna sunt.",
        status: "Terminé",
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
document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginModal').classList.add('active');
});

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('loginError').textContent = '';
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
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

document.getElementById('addProjectBtn').addEventListener('click', () => {
    currentEditingId = null;
    resetForm();
    document.getElementById('formSection').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Ajouter un projet';
    document.getElementById('deleteBtn').style.display = 'none';
});

function resetForm() {
    document.getElementById('projectForm').reset();
    document.getElementById('imagesList').innerHTML = '';
    document.getElementById('linksList').innerHTML = '';
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
    project.images.forEach((img, index) => {
        addImageToDOM(img, index);
    });

    // Afficher les liens
    document.getElementById('linksList').innerHTML = '';
    project.links.forEach((link, index) => {
        addLinkToDOM(link.label, link.url, index);
    });

    document.getElementById('formSection').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Modifier le projet';
    document.getElementById('deleteBtn').style.display = 'block';
}

// ===== DRAG & DROP IMAGES =====
const dragDropZone = document.getElementById('dragDropZone');
const imageInput = document.getElementById('imageInput');

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

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const project = currentEditingId ? projects.find(p => p.id === currentEditingId) : null;
                if (project) {
                    project.images.push(e.target.result);
                } else {
                    // Pour un nouveau projet, on stocke dans une variable temp
                    document.tempImages = document.tempImages || [];
                    document.tempImages.push(e.target.result);
                }
                addImageToDOM(e.target.result, getCurrentImageCount());
            };
            reader.readAsDataURL(file);
        }
    });
}

function getCurrentImageCount() {
    return document.getElementById('imagesList').children.length;
}

function addImageToDOM(src, index) {
    const list = document.getElementById('imagesList');
    const item = document.createElement('div');
    item.className = 'image-item';
    item.innerHTML = `
        <img src="${src}" alt="Image ${index + 1}">
        <button type="button" class="image-delete" onclick="deleteImage(${index})">✕</button>
    `;
    list.appendChild(item);
}

function deleteImage(index) {
    const project = currentEditingId ? projects.find(p => p.id === currentEditingId) : null;
    if (project) {
        project.images.splice(index, 1);
    } else {
        document.tempImages.splice(index, 1);
    }
    document.getElementById('imagesList').children[index].remove();
}

// ===== LIENS =====
function addLink() {
    const label = document.getElementById('linkLabel').value;
    const url = document.getElementById('linkUrl').value;

    if (label && url) {
        const project = currentEditingId ? projects.find(p => p.id === currentEditingId) : null;
        if (project) {
            project.links.push({ label, url });
        } else {
            document.tempLinks = document.tempLinks || [];
            document.tempLinks.push({ label, url });
        }
        addLinkToDOM(label, url, getCurrentLinkCount() - 1);
        document.getElementById('linkLabel').value = '';
        document.getElementById('linkUrl').value = '';
    }
}

function getCurrentLinkCount() {
    return document.getElementById('linksList').children.length;
}

function addLinkToDOM(label, url, index) {
    const list = document.getElementById('linksList');
    const item = document.createElement('div');
    item.className = 'link-item';
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
    const project = currentEditingId ? projects.find(p => p.id === currentEditingId) : null;
    if (project) {
        project.links.splice(index, 1);
    } else {
        document.tempLinks.splice(index, 1);
    }
    document.getElementById('linksList').children[index].remove();
}

// ===== SAUVEGARDER PROJET =====
document.getElementById('projectForm').addEventListener('submit', (e) => {
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
    } else {
        // Créer un nouveau projet
        const newProject = {
            id: Date.now(),
            title,
            description: desc,
            status,
            images: document.tempImages || [],
            links: document.tempLinks || []
        };
        projects.push(newProject);
        document.tempImages = [];
        document.tempLinks = [];
    }

    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
    displayProjectsList();
    cancelForm();
});

// ===== SUPPRIMER PROJET =====
document.getElementById('deleteBtn').addEventListener('click', () => {
    if (confirm('Es-tu sûr de vouloir supprimer ce projet ?')) {
        projects = projects.filter(p => p.id !== currentEditingId);
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjects();
        displayProjectsList();
        cancelForm();
    }
});

// ===== AFFICHER PROJETS SUR LA PAGE =====
function displayProjects() {
    const enCours = document.getElementById('projectsEnCours');
    const termines = document.getElementById('projectsTermines');

    enCours.innerHTML = '';
    termines.innerHTML = '';

    projects.forEach(project => {
        const bubble = createProjectBubble(project);

        if (project.status === 'En cours') {
            enCours.appendChild(bubble);
        } else if (project.status === 'Terminé') {
            termines.appendChild(bubble);
        }
    });
}

function createProjectBubble(project) {
    const bubble = document.createElement('div');
    bubble.className = 'project-bubble' + (project.status === 'Terminé' ? ' completed' : '');
    bubble.innerHTML = `<h4>${project.title}</h4>`;

    bubble.addEventListener('click', () => openProjectModal(project));

    return bubble;
}

// ===== MODAL PROJET =====
function openProjectModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDesc').textContent = project.description;

    // Afficher les images
    const imagesDiv = document.getElementById('modalImages');
    imagesDiv.innerHTML = '';
    if (project.images && project.images.length > 0) {
        project.images.forEach(img => {
            const imgEl = document.createElement('img');
            imgEl.src = img;
            imagesDiv.appendChild(imgEl);
        });
    }

    // Afficher les liens
    const linksDiv = document.getElementById('modalLinks');
    linksDiv.innerHTML = '';
    if (project.links && project.links.length > 0) {
        const title = document.createElement('h3');
        title.textContent = 'Liens utiles';
        linksDiv.appendChild(title);
        project.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.textContent = link.label;
            linksDiv.appendChild(a);
        });
    }

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
}

// Fermer le modal en cliquant dehors
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Fermer le modal avec Échap
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeAdmin();
    }
});

// Afficher les projets au chargement
displayProjects();
