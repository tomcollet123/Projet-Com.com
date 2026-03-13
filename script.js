// ===== AFFICHER PROJETS SUR LA PAGE =====
function displayProjects() {
    const orbitEnCours = document.getElementById('orbitEnCours');
    const orbitOperationnels = document.getElementById('orbitOperationnels');

    orbitEnCours.innerHTML = '';
    orbitOperationnels.innerHTML = '';

    const enCours = projects.filter(p => p.status === 'En cours');
    const operationnels = projects.filter(p => p.status === 'Opérationnel');

    enCours.forEach((project, index) => {
        const bubble = createOrbitBubble(project);
        orbitEnCours.appendChild(bubble);
    });

    operationnels.forEach((project, index) => {
        const bubble = createOrbitBubble(project);
        orbitOperationnels.appendChild(bubble);
    });
}

function createOrbitBubble(project) {
    const item = document.createElement('div');
    item.className = 'orbit-item';

    const bubble = document.createElement('div');
    bubble.className = 'orbit-bubble';
    bubble.innerHTML = `<h4>${project.title}</h4>`;

    bubble.addEventListener('click', () => openProjectModal(project));

    item.appendChild(bubble);
    return item;
}
