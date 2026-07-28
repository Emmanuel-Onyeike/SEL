document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Elements
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

    // Centered Alert Modal Elements
    const triggerAlertBtn = document.getElementById('triggerAlertBtn');
    const centeredAlertModal = document.getElementById('centeredAlertModal');
    const centeredModalContent = document.getElementById('centeredModalContent');
    const closeCenteredModalBtn = document.getElementById('closeCenteredModalBtn');
    const dismissModalBtn = document.getElementById('dismissModalBtn');

    function openCenteredModal() {
        if (!centeredAlertModal || !centeredModalContent) return;
        centeredAlertModal.classList.remove('hidden');
        setTimeout(() => {
            centeredModalContent.classList.remove('scale-95', 'opacity-0');
            centeredModalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function closeCenteredModal() {
        if (!centeredAlertModal || !centeredModalContent) return;
        centeredModalContent.classList.remove('scale-100', 'opacity-100');
        centeredModalContent.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            centeredAlertModal.classList.add('hidden');
        }, 300);
    }

    if (triggerAlertBtn) triggerAlertBtn.addEventListener('click', openCenteredModal);
    if (closeCenteredModalBtn) closeCenteredModalBtn.addEventListener('click', closeCenteredModal);
    if (dismissModalBtn) dismissModalBtn.addEventListener('click', closeCenteredModal);
    
    // Close modal on outside backdrop click
    if (centeredAlertModal) {
        centeredAlertModal.addEventListener('click', (e) => {
            if (e.target === centeredAlertModal) {
                closeCenteredModal();
            }
        });
    }

    // Multilingual Greetings Rotation Loop
    const greetingsList = [
        "Welcome Back, Administrator", // English
        "Waffi, how far! Welcome back", // Nigerian Pidgin
        "Sannu da zuwa, Shugaba", // Hausa
        "Nno o, Onye Isi", // Igbo
        "E n ǹ de, Oga", // Yoruba
        "Bienvenue, Administrateur", // French
        "Bienvenido, Administrador", // Spanish
        "Bem-vindo, Administrador", // Portuguese
        "Akwaaba, Administrator", // Akan / Ghanaian
        "Mema wo akye, Boss", // Twi
        "Woezor, Mawu", // Ewe
        "Wilkommen, Administrator", // German
        "Benvenuto, Amministratore", // Italian
        "Welkom, Administrator", // Dutch
        "Välkommen, Administratör", // Swedish
        "Tervetuloa, Valvoja", // Finnish
        "Velkommen, Administrator", // Norwegian / Danish
        "Vitaj, Administrátor", // Slovak / Czech
        "Witaj, Administratorze", // Polish
        "Üdvözöljük, Adminisztrátor", // Hungarian
        "Bun venit, Administrator", // Romanian
        "Dobro pozhalovat, Administrator", // Russian
        "Hosgeldiniz, Yonetici", // Turkish
        "Yōkoso, Kanrisha", // Japanese
        "Hwan-yeong-hab-ni-da, Gwan-li-ja", // Korean
        "Huānyíng huílái, Guǎnlǐyuán", // Chinese (Mandarin)
        "Chào mừng trở lại, Quản trị viên", // Vietnamese
        "Selamat datang, Administrator", // Indonesian / Malay
        "Yassas, Diachiristis", // Greek
        "Baruch haba, Menahel", // Hebrew
        "Ahlan bik, Almudir", // Arabic
        "Namaste, Adhikari", // Hindi
        "ยินดีต้อนรับ ผู้ดูแลระบบ", // Thai
        "Välitatud, Administraator", // Estonian
        "Laud, Administrators", // Latvian
        "Sveiki, Administratoriau", // Lithuanian
        "Velkominn, Stjórnandi", // Icelandic
        "Failte, Riangaire", // Irish
        "Croeso, Gweinyddwr", // Welsh
        "Shatsih, Admin" // Zulu
    ];

    let currentGreetingIndex = 0;
    const greetingElement = document.getElementById("multilingualGreeting");

    function rotateGreeting() {
        if (!greetingElement) return;
        greetingElement.style.opacity = 0;
        setTimeout(() => {
            greetingElement.textContent = greetingsList[currentGreetingIndex];
            greetingElement.style.opacity = 1;
            greetingElement.style.transition = "opacity 0.5s ease-in-out";
            currentGreetingIndex = (currentGreetingIndex + 1) % greetingsList.length;
        }, 300);
    }

    if (greetingElement) {
        greetingElement.style.transition = "opacity 0.5s ease-in-out";
        setInterval(rotateGreeting, 3500);
    }
});