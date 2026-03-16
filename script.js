// ============================================
//    GESTION DES SECTIONS
// ============================================

function showSection(sectionName) {
    // Cacher toutes les sections
    document.getElementById('accueil-section').style.display = 'none';
    document.getElementById('projets-section').classList.remove('active');

    // Mettre à jour la navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Afficher la section demandée
    if (sectionName === 'accueil') {
        document.getElementById('accueil-section').style.display = 'block';
        document.querySelector('[onclick="showSection(\'accueil\')"]').classList.add('active');
        window.scrollTo(0, 0);
    } else if (sectionName === 'projets') {
        document.getElementById('projets-section').classList.add('active');
        document.querySelector('[onclick="showSection(\'projets\')"]').classList.add('active');
        window.scrollTo(0, 0);
    }
}
