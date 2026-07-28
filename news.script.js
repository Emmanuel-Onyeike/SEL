document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuModal = document.getElementById('mobileMenuModal');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');

    function openMobileMenu() {
        if (!mobileMenuModal) return;
        mobileMenuModal.classList.remove('hidden');
        setTimeout(() => {
            if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('opacity-0');
            if (mobileMenuDrawer) mobileMenuDrawer.classList.remove('translate-x-full');
        }, 10);
    }

    function closeMobileMenu() {
        if (!mobileMenuModal) return;
        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('opacity-0');
        if (mobileMenuDrawer) mobileMenuDrawer.classList.add('translate-x-full');
        setTimeout(() => {
            mobileMenuModal.classList.add('hidden');
        }, 300);
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

    // Centered Modal Logic (Strictly Center Modal per Saved Information rules)
    const centeredAlertModal = document.getElementById('centeredAlertModal');
    const centeredModalContent = document.getElementById('centeredModalContent');
    const closeCenteredModalBtn = document.getElementById('closeCenteredModalBtn');
    const dismissModalBtn = document.getElementById('dismissModalBtn');
    const addNewsBtn = document.getElementById('addNewsBtn');
    const emptyStateNewsBtn = document.getElementById('emptyStateNewsBtn');
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

    if (addNewsBtn) {
        addNewsBtn.addEventListener('click', () => {
            showModal("No data yet. Article publishing is currently locked until league press parameters are set.");
        });
    }

    if (emptyStateNewsBtn) {
        emptyStateNewsBtn.addEventListener('click', () => {
            showModal("No data yet. Press updates and news feeds will unlock once official content is posted.");
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