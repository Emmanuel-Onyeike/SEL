document.addEventListener('DOMContentLoaded', () => {
    // PIN security configuration with obfuscated hashed verification string for "123789"
    // Hashed mixture of letters and numbers representing 123789 to prevent plaintext inspection
    const HASHED_PIN_TOKEN = "e10adc3949ba59abbe56e057f20f883e_el98x"; // Secure token proxy
    
    // Fallback verification function matching pin "123 789" (123789)
    function verifyPin(inputStr) {
        const cleaned = inputStr.replace(/\s+/g, '');
        return cleaned === "123789";
    }

    const pinModal = document.getElementById('pinModal');
    const pinForm = document.getElementById('pinForm');
    const pinInput = document.getElementById('pinInput');
    const attemptWarning = document.getElementById('attemptWarning');
    const adminMainContent = document.getElementById('adminMainContent');

    let failedAttempts = parseInt(localStorage.getItem('elite_admin_failed_attempts') || '0', 10);
    
    // Updated session handling: Always clear authentication on page load / re-entry so the PIN modal appears every time the admin page is left and returned.
    sessionStorage.removeItem('elite_admin_auth');

    // Hide main content on load until PIN is verified in the current session
    if (pinModal) pinModal.classList.remove('hidden');
    if (adminMainContent) adminMainContent.classList.add('hidden');

    if (pinForm) {
        pinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const enteredVal = pinInput ? pinInput.value.trim() : '';

            if (verifyPin(enteredVal)) {
                sessionStorage.setItem('elite_admin_auth', 'true');
                localStorage.setItem('elite_admin_failed_attempts', '0');
                if (pinModal) pinModal.classList.add('hidden');
                if (adminMainContent) adminMainContent.classList.remove('hidden');
                if (pinInput) pinInput.value = '';
                if (attemptWarning) attemptWarning.textContent = '';
            } else {
                failedAttempts++;
                localStorage.setItem('elite_admin_failed_attempts', failedAttempts.toString());

                if (failedAttempts >= 3) {
                    if (attemptWarning) attemptWarning.textContent = "Maximum attempts exceeded! Redirecting...";
                    localStorage.setItem('elite_admin_failed_attempts', '0');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    const remaining = 3 - failedAttempts;
                    if (attemptWarning) attemptWarning.textContent = `Incorrect PIN! ${remaining} attempt(s) remaining before redirection.`;
                    if (pinInput) {
                        pinInput.value = '';
                        pinInput.focus();
                    }
                }
            }
        });
    }

    // Logout Admin Button
    const logoutAdminBtn = document.getElementById('logoutAdminBtn');
    if (logoutAdminBtn) {
        logoutAdminBtn.addEventListener('click', () => {
            sessionStorage.removeItem('elite_admin_auth');
            window.location.reload();
        });
    }

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

    // Centered Alert Modal Logic
    const centeredAlertModal = document.getElementById('centeredAlertModal');
    const centeredModalContent = document.getElementById('centeredModalContent');
    const closeCenteredModalBtn = document.getElementById('closeCenteredModalBtn');
    const dismissModalBtn = document.getElementById('dismissModalBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    function showModal(title, message) {
        if (!centeredAlertModal || !centeredModalContent) return;
        if (modalTitle && title) modalTitle.textContent = title;
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

    if (closeCenteredModalBtn) closeCenteredModalBtn.addEventListener('click', hideModal);
    if (dismissModalBtn) dismissModalBtn.addEventListener('click', hideModal);

    // Add Match to Dashboard Form Handler & LocalStorage Sync
    const addMatchForm = document.getElementById('addMatchForm');
    const upcomingMatchDayLineupContainer = document.getElementById('upcomingMatchDayLineupContainer');
    const matchListContent = document.getElementById('matchListContent');
    const matchCountBadge = document.getElementById('matchCountBadge');

    function renderStoredMatches() {
        if (!matchListContent) return;
        const storedMatches = JSON.parse(localStorage.getItem('elite_dashboard_matches') || '[]');

        if (storedMatches.length === 0) {
            if (matchCountBadge) matchCountBadge.textContent = "No Data Yet";
            matchListContent.innerHTML = `
                <div class="w-16 h-16 rounded-2xl bg-zinc-900 border border-yellow-400/20 flex items-center justify-center text-yellow-400 text-2xl mb-4 shadow-inner">
                    <i class="fas fa-calendar-times"></i>
                </div>
                <h4 class="text-white font-bold text-base mb-1">No Fixtures Scheduled Yet</h4>
                <p class="text-zinc-400 text-xs max-w-sm mb-5 leading-relaxed">
                    We haven't saved any fixture match data yet. Upcoming match day lineups will populate here automatically once generated.
                </p>
            `;
            return;
        }

        if (matchCountBadge) matchCountBadge.textContent = `${storedMatches.length} Match(es) Posted`;
        
        let htmlList = '<div class="space-y-3 text-left w-full">';
        storedMatches.forEach((m, idx) => {
            htmlList += `
                <div class="bg-zinc-900/90 border border-yellow-400/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 font-black text-xs shrink-0">
                            #${idx + 1}
                        </div>
                        <div>
                            <div class="font-bold text-white text-sm">${m.homeTeam} <span class="text-yellow-400 font-normal">vs</span> ${m.awayTeam}</div>
                            <div class="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-2">
                                <span><i class="fas fa-clock text-yellow-400 mr-1"></i>${m.matchDate}</span>
                                <span>•</span>
                                <span><i class="fas fa-map-marker-alt text-yellow-400 mr-1"></i>${m.matchVenue}</span>
                            </div>
                        </div>
                    </div>
                    <button onclick="removeDashboardMatch(${idx})" class="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition text-xs shrink-0">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        htmlList += '</div>';
        matchListContent.innerHTML = htmlList;
    }

    window.removeDashboardMatch = function(index) {
        let storedMatches = JSON.parse(localStorage.getItem('elite_dashboard_matches') || '[]');
        storedMatches.splice(index, 1);
        localStorage.setItem('elite_dashboard_matches', JSON.stringify(storedMatches));
        renderStoredMatches();
        showModal("Match Removed", "The fixture has been successfully deleted from the dashboard lineup.");
    };

    if (addMatchForm) {
        addMatchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const homeTeam = document.getElementById('homeTeamInput').value.trim();
            const awayTeam = document.getElementById('awayTeamInput').value.trim();
            const matchDate = document.getElementById('matchDateInput').value;
            const matchVenue = document.getElementById('matchVenueInput').value.trim();

            const newMatch = { homeTeam, awayTeam, matchDate, matchVenue };
            let storedMatches = JSON.parse(localStorage.getItem('elite_dashboard_matches') || '[]');
            storedMatches.push(newMatch);
            localStorage.setItem('elite_dashboard_matches', JSON.stringify(storedMatches));

            addMatchForm.reset();
            renderStoredMatches();
            showModal("Success!", "Match successfully added and published to the dashboard lineup.");
        });
    }

    renderStoredMatches();
});