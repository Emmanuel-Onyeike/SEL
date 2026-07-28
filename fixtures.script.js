document.addEventListener('DOMContentLoaded', () => {
    const centeredAlertModal = document.getElementById('centeredAlertModal');
    const centeredModalContent = document.getElementById('centeredModalContent');
    const closeCenteredModalBtn = document.getElementById('closeCenteredModalBtn');
    const dismissModalBtn = document.getElementById('dismissModalBtn');
    const scheduleFixtureBtn = document.getElementById('scheduleFixtureBtn');
    const modalMessage = document.getElementById('modalMessage');

    function showModal(message) {
        if (!centeredAlertModal || !centeredModalContent) return;
        if (modalMessage && message) modalMessage.textContent = message;
        
        centeredAlertModal.classList.remove('hidden');
        setTimeout(() => {
            centeredModalContent.classList.remove('scale-95', 'opacity-0');
            centeredModalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function hideModal() {
        if (!centeredAlertModal || !centeredModalContent) return;
        centeredModalContent.classList.remove('scale-100', 'opacity-100');
        centeredModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            centeredAlertModal.classList.add('hidden');
        }, 300);
    }

    if (scheduleFixtureBtn) {
        scheduleFixtureBtn.addEventListener('click', () => {
            showModal("No data yet. Fixture scheduling interface is currently locked until team rosters are saved in the system database.");
        });
    }

    if (closeCenteredModalBtn) closeCenteredModalBtn.addEventListener('click', hideModal);
    if (dismissModalBtn) dismissModalBtn.addEventListener('click', hideModal);
    
    if (centeredAlertModal) {
        centeredAlertModal.addEventListener('click', (e) => {
            if (e.target === centeredAlertModal) {
                hideModal();
            }
        });
    }
});