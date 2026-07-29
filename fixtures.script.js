document.addEventListener('DOMContentLoaded', () => {
    // —— Mobile menu ——
    const modal = document.getElementById('mobileMenuModal');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    const drawer = document.getElementById('mobileMenuDrawer');
    const openBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('closeMobileMenuBtn');
  
    function openMenu() {
      if (!modal || !drawer) return;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        if (backdrop) {
          backdrop.classList.remove('opacity-0');
          backdrop.classList.add('opacity-100');
        }
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
      });
    }
  
    function closeMenu() {
      if (!modal || !drawer) return;
      if (backdrop) {
        backdrop.classList.add('opacity-0');
        backdrop.classList.remove('opacity-100');
      }
      drawer.classList.add('translate-x-full');
      drawer.classList.remove('translate-x-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  
    if (openBtn) openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);
  
    // —— Centered alert modal ——
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
        showModal(
          'No data yet. Fixture scheduling interface is currently locked until team rosters are saved in the system database.'
        );
      });
    }
  
    if (closeCenteredModalBtn) closeCenteredModalBtn.addEventListener('click', hideModal);
    if (dismissModalBtn) dismissModalBtn.addEventListener('click', hideModal);
  
    if (centeredAlertModal) {
      centeredAlertModal.addEventListener('click', (e) => {
        if (e.target === centeredAlertModal) hideModal();
      });
    }
  
    window.showFixtureModal = showModal;
  });