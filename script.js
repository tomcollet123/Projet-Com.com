// Gestion des projets
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Rendre le formulaire visible/caché
document.getElementById('toggleAdminPanel').addEventListener('click', function() {
    const panel = document.getElementById('adminPanel');
    panel.classList.toggle('active');
});

// Ajouter un projet
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const project = {
        id: Date.now(),
        name: document.getElementById('projectName').value,
        desc: document.getElementById('projectDesc').value,
        status: document.getElementById('projectStatus').value
    };

    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    // Réinitialiser le formulaire
    this.reset();

    // Recharger l'affichage
    displayProjects();
});

// Afficher les projets
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

// Créer une bulle de projet
function createProjectBubble(project) {
    const bubble = document.createElement('div');
    bubble.className = 'project-bubble';
    bubble.innerHTML = `<h4>${project.name}</h4>`;

    bubble.addEventListener('click', function() {
        openModal(project);
    });

    return bubble;
}

// Ouvrir le modal
function openModal(project) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = project.name;
    document.getElementById('modalDesc').textContent = project.desc;
    document.getElementById('modalStatus').textContent = `Statut: ${project.status}`;
    modal.classList.add('active');
}

// Fermer le modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('projectModal').classList.remove('active');
});

// Fermer le modal en cliquant dehors
window.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Afficher les projets au chargement
displayProjects();
