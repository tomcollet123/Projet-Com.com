// Ouvrir le modal
function openModal(title, desc) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    modal.classList.add('active');
}

// Fermer le modal
function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
}

// Fermer le modal en cliquant dehors
window.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
