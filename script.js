// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    const mascotteSpeech = document.getElementById('mascotteSpeech');

    faqItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Fermer les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Ouvrir/fermer l'item actuel
            item.classList.toggle('active');

            // Mettre à jour le discours de la mascotte
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer').textContent;
                mascotteSpeech.textContent = answer;
            }
        });
    });
});

// Fonction pour ouvrir le modal FAQ
function openFaqModal(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const modal = document.getElementById('faqModal');
    const title = document.getElementById('faqModalTitle');
    const answer = document.getElementById('faqModalAnswer');

    if (faqItems[index]) {
        const question = faqItems[index].querySelector('.faq-question span').textContent;
        const answerText = faqItems[index].querySelector('.faq-answer').textContent;

        title.textContent = question;
        answer.textContent = answerText;

        modal.classList.add('active');
    }
}

// Fonction pour fermer le modal FAQ
function closeFaqModal() {
    document.getElementById('faqModal').classList.remove('active');
}
