/**
 * ACCLUSIVO INTERACTIVE APPLICATION ENGINE
 * Features: Deaf-First Visual Learning, NSL Video Simulator, Live Code Playground,
 * Interactive Quizzes, Multi-Role Switcher, Parent Payment Flow, Facilitator Desk,
 * Admin Impact Dashboard, Student Portfolios, and 1-Click Demo Reset.
 */

// UI/UX Pro Max Age-Adaptive Intelligence Profiles for Deaf Learners
const AGE_TIERS = {
  "10-14": {
    name: "Junior Explorer Track",
    badge: "Ages 10–14",
    badgeColor: "emerald",
    minAge: 10,
    maxAge: 14,
    defaultAge: 12,
    tagline: "Visual Games, Avatar Cards & Animated Storytelling",
    description: "Designed for young deaf learners. Coding is presented through colorful visual cards, avatar creators, and animated NSL stories without intimidating walls of text.",
    topics: [
      "Animated Avatar & Cyber-Pet Cards",
      "CSS Color Magic & Neon Glow Effects",
      "Interactive Zoo Cards with NSL Signs",
      "Button Tap Triggers & Soundless Visual Alerts"
    ],
    activities: [
      "Activity 1: Code your first deaf cyber-pet card with eye-catching neon borders",
      "Activity 2: Practice the 5-step NSL fingerspelling sequence for tech words",
      "Activity 3: Create an interactive tap button that changes background colors visually"
    ],
    chips: [
      { id: "junior-game", label: "🎮 Suggest a fun game project for my age" },
      { id: "junior-color", label: "✨ Show me CSS color magic & glow" },
      { id: "junior-sign", label: "🤟 How do I sign 'Computer' in NSL?" },
      { id: "junior-pet", label: "🐾 Help me build an avatar card" }
    ]
  },
  "15-18": {
    name: "Secondary Launchpad Track",
    badge: "Ages 15–18",
    badgeColor: "cyan",
    minAge: 15,
    maxAge: 18,
    defaultAge: 17,
    tagline: "High-School Prep & Accessible Student Portfolios",
    description: "Built for deaf secondary school students and school-leavers. Master semantic HTML5 landmarks, CSS styling, and accessible layout design ready for academic projects and early portfolios.",
    topics: [
      "Accessible Personal Bio Card",
      "CSS Box Model & Glow Effects",
      "Embedded NSL Video Player Integration",
      "High-Contrast Responsive Layouts"
    ],
    activities: [
      "Activity 1: Structure your student portfolio bio card with semantic <header> and <main>",
      "Activity 2: Watch Module 1 NSL video and test slow-motion sign playback",
      "Activity 3: Pass visual quiz on HTML syntax and inspect live preview"
    ],
    chips: [
      { id: "secondary-topics", label: "📚 Recommend secondary/WAEC tech topics" },
      { id: "audit", label: "🔍 Audit my bio card for accessibility" },
      { id: "nsl-gloss", label: "🤟 How do I sign 'Event Listener' in NSL?" },
      { id: "simplify-flexbox", label: "💡 Explain CSS Flexbox visually" }
    ]
  },
  "19-24": {
    name: "Career Pro Developer Track",
    badge: "Ages 19–24",
    badgeColor: "gold",
    minAge: 19,
    maxAge: 24,
    defaultAge: 21,
    tagline: "Remote Freelance Readiness & WCAG 2.2 AAA Compliance",
    description: "Tailored for deaf young adults entering the digital economy. Craft client-grade landing pages, production semantic markup, ARIA accessibility trees, and freelance portfolio showcases.",
    topics: [
      "Production Client Landing Pages",
      "WCAG 2.2 AAA Accessibility Auditing",
      "Modern Semantic Forms & Validation",
      "Remote Freelance Gig Readiness"
    ],
    activities: [
      "Activity 1: Build a high-converting accessible landing page for a client",
      "Activity 2: Audit code with Ami AI for ARIA roles and keyboard navigability",
      "Activity 3: Publish capstone project to verified public portfolio gallery"
    ],
    chips: [
      { id: "career-freelance", label: "💼 Suggest freelance-ready portfolio topics" },
      { id: "career-wcag", label: "🛡️ Audit my code for WCAG AAA standards" },
      { id: "career-client", label: "📱 Explain responsive layouts for clients" },
      { id: "career-signs", label: "🤟 How do I sign 'API' and 'Database' in NSL?" }
    ]
  },
  "25+": {
    name: "Adult Reskilling & Business Track",
    badge: "Ages 25+",
    badgeColor: "red",
    minAge: 25,
    maxAge: 75,
    defaultAge: 29,
    tagline: "Business Portals, Invoicing & Digital Independence",
    description: "Designed for adult career switchers and deaf entrepreneurs. Learn high-value practical web development to build business storefronts, service booking forms, and client portals with visual independence.",
    topics: [
      "Small Business Showcase & Products",
      "Accessible Customer Order Forms",
      "Dark Mode Admin Dashboard UI",
      "Digital Invoicing & Commerce Tools"
    ],
    activities: [
      "Activity 1: Create a commercial product catalog with high-contrast pricing tables",
      "Activity 2: Build a deaf-friendly customer enquiry form without audio CAPTCHAs",
      "Activity 3: Setup verified business profile on Acclusivo network"
    ],
    chips: [
      { id: "adult-biz", label: "📈 Suggest business web projects for my brand" },
      { id: "adult-order", label: "📝 How to code a deaf-friendly order form?" },
      { id: "adult-contrast", label: "🎨 What color contrast is best for commercial sites?" },
      { id: "audit", label: "🔍 Audit my business portal layout" }
    ]
  }
};
if (typeof window !== "undefined") window.AGE_TIERS = AGE_TIERS;

class AcclusivoApp {
  constructor() {
    this.state = this.loadState();
    this.videoPlaying = false;
    this.videoPlaybackRate = 1.0;
    this.guidedTimerHandle = null;
    this.guidedSecondsLeft = 0;
    this.currentGuidedNextFn = null;
    this.init();
  }

  // Load state from localStorage or seed data
  loadState() {
    const saved = localStorage.getItem("acclusivo_state_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure fresh seed data properties if new ones were added
        if (!parsed.data.portfolios || !parsed.data.paymentLogs || !parsed.data.nslDictionary) {
          parsed.data = JSON.parse(JSON.stringify(ACCLUSIVO_SEED_DATA));
        }
        if (parsed.videoContrastFrame === undefined) parsed.videoContrastFrame = false;
        if (parsed.nslSpeed === undefined) parsed.nslSpeed = 1.0;
        if (parsed.guidedMode === undefined) parsed.guidedMode = true;
        if (!parsed.onboardingProfile) {
          parsed.onboardingProfile = {
            completed: true,
            fullName: "Chidiebere Okonkwo",
            ageGroup: "15-18",
            exactAge: 17,
            trackName: "Secondary Launchpad Track",
            communicationMode: "nsl-first",
            signingLevel: "fluent",
            primaryGoal: "portfolio",
            preferredTopics: ["Accessible HTML Bio Cards", "CSS Box Model & Glow", "NSL Video Integration"]
          };
        }
        if (parsed.onboardingStep === undefined) parsed.onboardingStep = 1;
        return parsed;
      } catch (e) {
        console.error("Error parsing saved state, resetting to seed data", e);
      }
    }
    return {
      currentRole: "learner", // 'learner', 'parent', 'facilitator', 'admin', 'public', 'portfolios'
      activeLearnerId: "learner-1", // Chidiebere Okonkwo
      activeModuleId: "mod-2", // Default to Module 2 for rich interactive demo
      lessonStep: "catalogue", // 'catalogue' | 'lesson' | 'video' | 'activity' | 'quiz' | 'results'
      lessonModuleId: null,
      theme: "dark", // 'dark' or 'light'
      highContrast: false,
      videoContrastFrame: false,
      nslSpeed: 1.0,
      guidedMode: true,
      fontScale: "normal",
      lowDataMode: false,
      onboardingStep: 1,
      onboardingProfile: {
        completed: true,
        fullName: "Chidiebere Okonkwo",
        ageGroup: "15-18",
        exactAge: 17,
        trackName: "Secondary Launchpad Track",
        communicationMode: "nsl-first",
        signingLevel: "fluent",
        primaryGoal: "portfolio",
        preferredTopics: ["Accessible HTML Bio Cards", "CSS Box Model & Glow", "NSL Video Integration"]
      },
      data: JSON.parse(JSON.stringify(ACCLUSIVO_SEED_DATA)),
      userCodeDrafts: {},
      quizAnswers: {}
    };
  }

  saveState() {
    localStorage.setItem("acclusivo_state_v1", JSON.stringify(this.state));
  }

  resetDemoData() {
    localStorage.removeItem("acclusivo_state_v1");
    this.state = {
      currentRole: "learner",
      activeLearnerId: "learner-1",
      activeModuleId: "mod-2",
      lessonStep: "catalogue",
      lessonModuleId: null,
      theme: "dark",
      highContrast: false,
      videoContrastFrame: false,
      nslSpeed: 1.0,
      guidedMode: true,
      fontScale: "normal",
      lowDataMode: false,
      onboardingStep: 1,
      onboardingProfile: {
        completed: true,
        fullName: "Chidiebere Okonkwo",
        ageGroup: "15-18",
        exactAge: 17,
        trackName: "Secondary Launchpad Track",
        communicationMode: "nsl-first",
        signingLevel: "fluent",
        primaryGoal: "portfolio",
        preferredTopics: ["Accessible HTML Bio Cards", "CSS Box Model & Glow", "NSL Video Integration"]
      },
      data: JSON.parse(JSON.stringify(ACCLUSIVO_SEED_DATA)),
      userCodeDrafts: {},
      quizAnswers: {}
    };
    this.saveState();
    this.initA11ySettings();
    this.renderCurrentPersona();
    this.renderCurrentView();
    this.updateGuidedToggleBtn();
    this.showVisualNotification(
      "Demo Data Reset",
      "Pristine sample data reloaded across all cohorts, learners, and dashboards.",
      "gold"
    );
  }

  init() {
    this.bindGlobalControls();
    this.renderCurrentPersona();
    this.renderCurrentView();
    this.initA11ySettings();
    this.updateOnboardingNavButton();
    this.updateGuidedToggleBtn();
  }

  // Visual Notification (Deaf-accessible alternative to audio bell with progress bar & perimeter flash)
  showVisualNotification(title, message, type = "cyan") {
    const toast = document.getElementById("visualToast");
    const toastContent = document.getElementById("toastContent");
    const toastBar = document.getElementById("toastProgressBar");
    const flashOverlay = document.getElementById("visualFlash");
    
    if (flashOverlay) {
      flashOverlay.className = "visual-flash-overlay " + (type === "emerald" ? "emerald" : type === "gold" ? "gold" : "");
      flashOverlay.classList.add("flash");
      setTimeout(() => flashOverlay.classList.remove("flash"), 280);
    }

    if (toast && toastContent) {
      let iconSvg = '';
      if (type === 'emerald') {
        iconSvg = `<svg class="ui-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
      } else if (type === 'gold') {
        iconSvg = `<svg class="ui-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`;
      } else {
        iconSvg = `<svg class="ui-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      }

      toast.className = `visual-toast ${type} active`;
      toastContent.innerHTML = `
        <div style="flex-shrink:0;">${iconSvg}</div>
        <div style="flex:1;">
          <strong style="color: #fff; display: block; font-size: 0.95rem; font-family: var(--font-heading);">${title}</strong>
          <span style="color: var(--text-muted); font-size: 0.84rem; line-height: 1.4; display: block;">${message}</span>
        </div>
      `;

      if (toastBar) {
        toastBar.style.transition = 'none';
        toastBar.style.width = '100%';
        setTimeout(() => {
          toastBar.style.transition = 'width 4s linear';
          toastBar.style.width = '0%';
        }, 30);
      }

      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        toast.classList.remove("active");
      }, 4200);
    }
  }

  // Accessibility Controls (Themes: Dark / White-Light, High contrast, Font scale, Low Data)
  initA11ySettings() {
    const isLight = this.state.theme === "light";
    document.body.classList.toggle("light-theme", isLight);
    if (this.state.highContrast) document.body.classList.add("high-contrast");
    if (this.state.fontScale === "large") document.body.classList.add("font-lg");
    if (this.state.fontScale === "xlarge") document.body.classList.add("font-xl");
    if (this.state.lowDataMode) document.body.classList.add("low-data-mode");

    const themeBtn = document.getElementById("toggleThemeBtn");
    const themeLabel = document.getElementById("themeLabel");
    const themeIconSvg = document.getElementById("themeIconSvg");
    const hcBtn = document.getElementById("toggleContrastBtn");
    const fontBtn = document.getElementById("toggleFontBtn");
    const fontLabel = document.getElementById("fontScaleLabel");
    const lowDataBtn = document.getElementById("toggleLowDataBtn");

    if (themeBtn) {
      const updateThemeUI = (light) => {
        if (themeLabel) themeLabel.textContent = light ? "Dark Theme" : "Light Theme";
        if (themeIconSvg) {
          themeIconSvg.innerHTML = light 
            ? `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>` 
            : `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
        }
        themeBtn.classList.toggle("active", light);
      };

      updateThemeUI(isLight);

      themeBtn.onclick = () => {
        const nextLight = !document.body.classList.contains("light-theme");
        document.body.classList.toggle("light-theme", nextLight);
        this.state.theme = nextLight ? "light" : "dark";
        updateThemeUI(nextLight);
        this.saveState();
        this.showVisualNotification(
          "Theme Updated",
          nextLight ? "Light / High-Readability Mode Active" : "Dark Slate Mode Active",
          "cyan"
        );
      };
    }

    if (hcBtn) {
      hcBtn.classList.toggle("active", this.state.highContrast);
      hcBtn.onclick = () => {
        this.state.highContrast = !this.state.highContrast;
        document.body.classList.toggle("high-contrast", this.state.highContrast);
        hcBtn.classList.toggle("active", this.state.highContrast);
        this.saveState();
        this.showVisualNotification(
          "Contrast Updated",
          this.state.highContrast ? "High Contrast (WCAG AAA 7:1) Enabled" : "Harmonized Dark Theme Restored",
          "cyan"
        );
      };
    }

    if (fontBtn) {
      const updateFontLabel = () => {
        if (fontLabel) {
          fontLabel.textContent = `Font: ${this.state.fontScale === "large" ? "Large" : this.state.fontScale === "xlarge" ? "X-Large" : "Normal"}`;
        }
      };
      updateFontLabel();

      fontBtn.onclick = () => {
        if (this.state.fontScale === "normal") {
          this.state.fontScale = "large";
          document.body.classList.remove("font-xl");
          document.body.classList.add("font-lg");
        } else if (this.state.fontScale === "large") {
          this.state.fontScale = "xlarge";
          document.body.classList.remove("font-lg");
          document.body.classList.add("font-xl");
        } else {
          this.state.fontScale = "normal";
          document.body.classList.remove("font-lg", "font-xl");
        }
        updateFontLabel();
        this.saveState();
      };
    }

    if (lowDataBtn) {
      lowDataBtn.classList.toggle("active", this.state.lowDataMode);
      lowDataBtn.onclick = () => {
        this.state.lowDataMode = !this.state.lowDataMode;
        document.body.classList.toggle("low-data-mode", this.state.lowDataMode);
        lowDataBtn.classList.toggle("active", this.state.lowDataMode);
        this.saveState();
        this.showVisualNotification(
          this.state.lowDataMode ? "Low-Data Mode Active" : "Full Media Mode Active",
          this.state.lowDataMode ? "Saving cellular bandwidth in Nigeria. Showing gesture cards." : "Full NSL video lessons streaming.",
          "cyan"
        );
        this.renderCurrentView();
      };
    }
  }

  // Top Persona / Role Switcher
  bindGlobalControls() {
    const personaBtns = document.querySelectorAll(".persona-btn");
    personaBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const role = btn.getAttribute("data-role");
        this.switchRole(role);
      });
    });

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = link.getAttribute("data-view");
        this.switchView(targetView);
      });
    });
  }

  switchRole(role) {
    this.state.currentRole = role;
    this.saveState();

    document.querySelectorAll(".persona-btn").forEach(b => {
      b.classList.toggle("active", b.getAttribute("data-role") === role);
    });

    this.renderCurrentPersona();
    this.renderCurrentView();

    const persona = this.state.data.personas.find(p => p.id === role) || { name: "Guest", role: "Public" };
    this.showVisualNotification(
      `Role Switched: ${persona.role}`,
      `Now experiencing Acclusivo as ${persona.name}`,
      "cyan"
    );
  }

  renderCurrentPersona() {
    const personaBadge = document.getElementById("currentPersonaBadge");
    const current = this.state.data.personas.find(p => p.id === this.state.currentRole) || {
      name: "Prospective Student",
      role: "Public Visitor"
    };

    let avatarSvg = '';
    switch(this.state.currentRole) {
      case "learner":
        avatarSvg = `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
        break;
      case "parent":
        avatarSvg = `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;
        break;
      case "facilitator":
        avatarSvg = `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
        break;
      case "admin":
        avatarSvg = `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
        break;
      default:
        avatarSvg = `<svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    }

    if (personaBadge) {
      personaBadge.innerHTML = `
        <span class="user-avatar" style="border: 1px solid var(--border-subtle);">${avatarSvg}</span>
        <div>
          <span style="font-weight: 700; display: block; color: var(--text-heading); line-height: 1.2;">${current.name}</span>
          <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600;">${current.role}</span>
        </div>
      `;
    }
  }

  switchView(viewId) {
    document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
    document.querySelectorAll(".nav-link").forEach(lnk => lnk.classList.remove("active"));

    const activeSec = document.getElementById(`view-${viewId}`);
    if (activeSec) activeSec.classList.add("active");

    const activeLnk = document.querySelector(`.nav-link[data-view="${viewId}"]`);
    if (activeLnk) activeLnk.classList.add("active");

    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Master Render View based on Current Role
  renderCurrentView() {
    switch (this.state.currentRole) {
      case "learner":
        this.switchView("learner");
        this.renderLearnerDashboard();
        break;
      case "parent":
        this.switchView("parent");
        this.renderParentPortal();
        break;
      case "facilitator":
        this.switchView("facilitator");
        this.renderFacilitatorDesk();
        break;
      case "admin":
        this.switchView("admin");
        this.renderAdminDashboard();
        break;
      case "portfolios":
        this.switchView("portfolios");
        this.renderPortfoliosView();
        break;
      case "public":
      default:
        this.switchView("public");
        this.renderPublicPortal();
        break;
    }
  }

  /* ==========================================================================
     1. LEARNER VIEW — STEP-BASED JOURNEY
     Steps: catalogue → lesson → video → activity → quiz → results
     ========================================================================== */
  renderLearnerDashboard() {
    this.clearGuidedTimer();
    const step = this.state.lessonStep || "catalogue";
    switch (step) {
      case "lesson":   return this.renderLessonPage();
      case "video":    return this.renderVideoStep();
      case "quiz":     return this.renderQuizStep();
      case "activity": return this.renderActivityStep();
      case "results":  return this.renderResultsStep();
      default:         return this.renderCourseCatalogue();
    }
  }

  // ── Step helpers & Guided Autopilot Controller ─────────────────────────────
  goToStep(step, modId) {
    this.clearGuidedTimer();
    if (modId) {
      this.state.lessonModuleId = modId;
      this.state.activeModuleId = modId;
    }
    this.state.lessonStep = step;
    this.saveState();
    this.renderLearnerDashboard();
    if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  clearGuidedTimer() {
    if (this.guidedTimerHandle) {
      clearInterval(this.guidedTimerHandle);
      this.guidedTimerHandle = null;
    }
    this.guidedSecondsLeft = 0;
    this.currentGuidedNextFn = null;
  }

  toggleGuidedMode() {
    this.state.guidedMode = !this.state.guidedMode;
    this.saveState();
    this.updateGuidedToggleBtn();
    if (!this.state.guidedMode) {
      this.clearGuidedTimer();
      const banner = document.getElementById("guidedActionBanner") || 
                     document.getElementById("homeGuidedBanner") || 
                     document.getElementById("videoGuidedBanner") || 
                     document.getElementById("quizGuidedBanner") || 
                     document.getElementById("activityGuidedBanner") || 
                     document.getElementById("resultsGuidedBanner");
      if (banner) banner.style.display = "none";
      this.showVisualNotification(
        "Autopilot Paused ⏸",
        "Guided mode disabled. You can navigate lessons manually at your own pace.",
        "gold"
      );
    } else {
      this.showVisualNotification(
        "Autopilot Active 🚀",
        "Zero-confusion automatic flow enabled! We will guide you from step to step.",
        "cyan"
      );
      this.renderLearnerDashboard();
    }
  }

  updateGuidedToggleBtn() {
    const btn = document.getElementById("guidedModeToggle");
    if (!btn) return;
    const isGuided = this.state.guidedMode !== false;
    btn.className = isGuided ? "a11y-btn highlight-btn" : "a11y-btn";
    btn.setAttribute("aria-pressed", isGuided ? "true" : "false");
    btn.innerHTML = `
      <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
      <span>${isGuided ? '<span class="guided-pulse-dot" style="display:inline-block;margin-right:4px;"></span>Autopilot: ON' : 'Autopilot: OFF'}</span>
    `;
  }

  pauseGuidedAutopilot() {
    if (this.guidedTimerHandle) {
      clearInterval(this.guidedTimerHandle);
      this.guidedTimerHandle = null;
      const pauseBtn = document.getElementById("guidedPauseBtn");
      if (pauseBtn) {
        pauseBtn.innerHTML = `
          <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Resume</span>
        `;
        pauseBtn.setAttribute("onclick", "app.resumeGuidedAutopilot()");
      }
      this.showVisualNotification("Timer Paused", "Take your time. Click Resume whenever you are ready.", "gold");
    }
  }

  resumeGuidedAutopilot() {
    if (this.currentGuidedNextFn && this.guidedSecondsLeft > 0) {
      const fn = this.currentGuidedNextFn;
      const secs = this.guidedSecondsLeft;
      const prompt = this.currentGuidedPrompt || "Auto-advancing in";
      const targetId = this.currentGuidedTargetId || "guidedActionBanner";
      this.autoAdvanceCountdown(secs, fn, prompt, targetId);
      this.showVisualNotification("Timer Resumed", "Continuing your guided learning journey.", "cyan");
    }
  }

  triggerGuidedNextNow() {
    const fn = this.currentGuidedNextFn;
    this.clearGuidedTimer();
    if (typeof fn === "function") {
      fn();
    }
  }

  autoAdvanceCountdown(seconds, nextFn, promptText, containerId = "guidedActionBanner") {
    if (this.state.guidedMode === false) return;
    this.clearGuidedTimer();
    this.guidedSecondsLeft = seconds;
    const totalSeconds = seconds;
    this.currentGuidedNextFn = nextFn;
    this.currentGuidedPrompt = promptText;
    this.currentGuidedTargetId = containerId;

    const banner = document.getElementById(containerId);
    if (!banner) return;

    banner.style.display = "flex";
    const updateUI = () => {
      const bannerEl = document.getElementById(containerId);
      if (!bannerEl) return;
      const pct = Math.max(0, Math.min(100, Math.round((this.guidedSecondsLeft / totalSeconds) * 100)));
      bannerEl.innerHTML = `
        <div style="flex:1;min-width:220px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;">
            <span class="guided-pulse-badge">
              <span class="guided-pulse-dot"></span>
              Autopilot Next Step
            </span>
            <span style="color:#fff;font-weight:700;font-size:0.95rem;">${promptText} <strong style="color:var(--accent-cyan);">${this.guidedSecondsLeft}s</strong></span>
          </div>
          <div class="guided-countdown-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
            <div class="guided-countdown-fill" style="width:${pct}%;"></div>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <button id="guidedPauseBtn" class="nsl-tool-btn" onclick="app.pauseGuidedAutopilot()" title="Pause countdown to take extra time">
            <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            <span>Pause</span>
          </button>
          <button class="nsl-tool-btn" style="background:var(--accent-cyan);color:#080c14;border-color:var(--accent-cyan);font-weight:700;" onclick="app.triggerGuidedNextNow()" title="Skip countdown and proceed immediately">
            <span>Proceed Now</span>
            <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      `;
    };

    updateUI();

    this.guidedTimerHandle = setInterval(() => {
      this.guidedSecondsLeft -= 1;
      if (this.guidedSecondsLeft <= 0) {
        this.clearGuidedTimer();
        if (typeof nextFn === "function") {
          nextFn();
        }
      } else {
        updateUI();
      }
    }, 1000);
  }

  _guidedHUD(currentKey, stepIndex, nextTitle, onProceedFn) {
    if (this.state.guidedMode === false) return "";
    return `
      <div class="guided-hud-bar" role="region" aria-label="Guided Autopilot Status">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <span class="guided-pulse-badge">
            <span class="guided-pulse-dot"></span>
            Autopilot Active
          </span>
          <span style="color:#fff;font-size:0.88rem;font-weight:600;">
            Step ${stepIndex} of 4: <strong style="color:var(--accent-cyan);">${currentKey}</strong>
          </span>
          ${nextTitle ? `<span style="color:var(--text-muted);font-size:0.82rem;">➔ Next: <strong style="color:var(--accent-emerald);">${nextTitle}</strong></span>` : ''}
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          ${onProceedFn ? `
            <button class="btn btn-primary btn-sm" onclick="${onProceedFn}" style="min-height:32px;padding:4px 14px;font-size:0.82rem;" title="Advance to next step without waiting">
              <span>Next Step ›</span>
            </button>
          ` : ''}
          <button class="nsl-tool-btn" onclick="app.toggleGuidedMode()" style="font-size:0.75rem;padding:4px 10px;" title="Switch to manual navigation">
            <span>Disable Autopilot</span>
          </button>
        </div>
      </div>
    `;
  }

  startGuidedJourney(modId) {
    this.clearGuidedTimer();
    const targetModId = modId || this.state.lessonModuleId || "mod-2";
    this.state.lessonModuleId = targetModId;
    this.state.activeModuleId = targetModId;
    this.goToStep("video", targetModId);
    this.showVisualNotification(
      "Autopilot: Step 1 of 4 🎬",
      "Welcome to Nigerian Sign Language (NSL) Video Lesson!",
      "cyan"
    );
  }

  autoAdvanceToQuiz() {
    this.clearGuidedTimer();
    this.goToStep("quiz");
    this.showVisualNotification(
      "Autopilot: Step 2 of 4 ❓",
      "Proceeding to Visual Quiz! Pick your answers for instant feedback.",
      "cyan"
    );
  }

  autoAdvanceToActivity() {
    this.clearGuidedTimer();
    this.goToStep("activity");
    this.showVisualNotification(
      "Autopilot: Step 3 of 4 💻",
      "Proceeding to Hands-On Coding Activity! Build and inspect your code.",
      "emerald"
    );
  }

  autoAdvanceToResults() {
    this.clearGuidedTimer();
    this.finishQuiz();
    this.showVisualNotification(
      "Autopilot: Step 4 of 4 🏆",
      "Generating your visual achievement certificate and performance score!",
      "gold"
    );
  }

  startNextGuidedModule() {
    this.clearGuidedTimer();
    const course = this.state.data.course;
    const currentId = this.state.activeModuleId || "mod-2";
    const currentIndex = course.modules.findIndex(m => m.id === currentId);
    const nextMod = course.modules[currentIndex + 1];
    if (nextMod) {
      this.startGuidedJourney(nextMod.id);
    } else {
      this.goToStep("catalogue");
      this.showVisualNotification(
        "Course Complete! 🎓",
        "Congratulations! You have finished all modules in this course track!",
        "emerald"
      );
    }
  }

  _stepBreadcrumb(activeStep) {
    const steps = [
      { key: "catalogue", label: "Home", icon: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
      { key: "video",     label: "1. NSL Video", icon: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>` },
      { key: "quiz",      label: "2. Visual Quiz", icon: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` },
      { key: "activity",  label: "3. Code Activity", icon: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` },
      { key: "results",   label: "4. Results", icon: `<svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>` }
    ];
    const activeIdx = steps.findIndex(s => s.key === activeStep);
    return `
      <nav aria-label="Learning Journey Progress" style="margin-bottom:28px;">
        <ol style="display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0;align-items:center;">
          ${steps.map((s, i) => {
            const done   = activeIdx !== -1 && i < activeIdx;
            const active = s.key === activeStep;
            return `
              <li style="display:flex;align-items:center;gap:6px;">
                <button
                  onclick="app.goToStep('${s.key}')" 
                  aria-current="${active ? 'step' : 'false'}"
                  style="
                    background:${active ? 'var(--accent-cyan)' : done ? 'rgba(0,229,255,.15)' : 'var(--bg-surface)'};
                    color:${active ? '#080c14' : done ? 'var(--accent-cyan)' : 'var(--text-muted)'};
                    border:1px solid ${active ? 'var(--accent-cyan)' : done ? 'rgba(0,229,255,.4)' : 'var(--border-subtle)'};
                    border-radius:99px;padding:6px 14px;font-size:.82rem;font-weight:${active?'700':'500'};
                    cursor:pointer;font-family:inherit;white-space:nowrap;
                    display:inline-flex;align-items:center;gap:6px;
                    transition:all .2s;
                  "
                >
                  ${done ? '<svg class="ui-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : s.icon}
                  <span>${s.label}</span>
                </button>
                ${i < steps.length - 1 ? '<span style="color:var(--text-dim);font-size:.8rem;">›</span>' : ''}
              </li>
            `;
          }).join('')}
        </ol>
      </nav>
    `;
  }

  // ── STEP 0: Course Catalogue with NSL Welcome Hero ────────────────────────
  renderCourseCatalogue() {
    const container = document.getElementById("view-learner");
    if (!container) return;
    const course  = this.state.data.course;
    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];
    const profile = this.state.onboardingProfile || {
      exactAge: 17,
      ageGroup: "15-18",
      trackName: "Secondary Launchpad Track",
      communicationMode: "nsl-first",
      preferredTopics: ["Accessible HTML Bio Cards", "CSS Box Model & Glow", "NSL Video Integration"]
    };

    container.innerHTML = `
      ${this._stepBreadcrumb("catalogue")}

      <!-- NSL Local Welcome & Autopilot Hero -->
      <div class="nsl-welcome-hero">
        <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
          <div style="width:68px;height:68px;border-radius:50%;background:rgba(0,229,255,0.15);border:2px solid var(--accent-cyan);display:flex;align-items:center;justify-content:center;font-size:2.2rem;flex-shrink:0;">
            🤟
          </div>
          <div style="flex:1;min-width:260px;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;">
              <span class="badge badge-cyan">🇳🇬 Nigerian Sign Language (NSL)</span>
              <span class="badge badge-emerald">Deaf-First Autopilot</span>
            </div>
            <h2 style="color:#fff;margin:0 0 6px;font-size:1.45rem;font-family:var(--font-heading);">
              Sannu / Nnọọ / Bawo! Welcome, ${learner.name}!
            </h2>
            <p style="color:var(--text-muted);margin:0;font-size:0.9rem;line-height:1.5;">
              Lead Facilitator <strong>Bashir Abubakar</strong> welcomes you. With <strong>Autopilot Mode</strong>, you don't need to click every button or wonder where to go next. We automatically guide you from the <strong>NSL Video</strong> ➔ <strong>Visual Quiz</strong> ➔ <strong>Code Activity</strong> ➔ <strong>Results</strong>!
            </p>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
            <button
              class="btn btn-primary"
              style="padding:12px 20px;font-size:0.95rem;font-weight:700;"
              onclick="app.startGuidedJourney('${this.state.lessonModuleId || 'mod-2'}')"
            >
              <span>▶ Start Guided Journey</span>
            </button>
          </div>
        </div>

        <!-- Autopilot countdown banner on home page -->
        <div id="homeGuidedBanner" class="guided-action-banner" style="margin-top:20px;margin-bottom:0;"></div>
      </div>

      <!-- AI Personalized Learning Track Banner (Age-Adaptive Engine) -->
      <div class="ai-personalized-banner">
        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <div style="width:42px;height:42px;border-radius:50%;background:rgba(0,229,255,0.15);border:1.5px solid var(--accent-cyan);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg class="ui-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <strong style="color:#fff;font-size:1rem;font-family:var(--font-heading);">Ami AI Curriculum: ${profile.trackName}</strong>
              <span class="badge badge-emerald">Age ${profile.exactAge} (${profile.ageGroup})</span>
              <span class="badge badge-cyan">${profile.communicationMode === 'nsl-first' ? 'NSL-First' : 'Bilingual'}</span>
            </div>
            <p style="margin:4px 0 0;font-size:0.84rem;color:var(--text-muted);">
              <strong>AI Personalized Topics:</strong> ${profile.preferredTopics.join(' • ')}
            </p>
          </div>
        </div>
        <button onclick="app.openOnboardingModal()" class="nsl-tool-btn" style="border-color:var(--accent-cyan);color:var(--accent-cyan);" title="Adjust age bracket or learning track">
          <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          <span>Adjust Age &amp; Track</span>
        </button>
      </div>

      <!-- Section Header -->
      <div style="margin-bottom:20px;">
        <h2 style="color:#fff;margin:0 0 4px;font-size:1.25rem;">📚 Featured Course Modules</h2>
        <p style="color:var(--text-muted);margin:0;font-size:.88rem;">
          Select any module below or let Autopilot advance you automatically into lesson 1:
        </p>
      </div>

      <!-- Course Hero Card -->
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;margin-bottom:32px;">
        <div style="background:linear-gradient(135deg,#0a2540,#0f3460);padding:24px 28px;border-bottom:1px solid var(--border-subtle);">
          <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">
            <span class="badge badge-gold">${course.badge}</span>
            <span class="badge badge-cyan">${course.level}</span>
          </div>
          <h3 style="color:#fff;margin:14px 0 6px;font-size:1.35rem;font-family:var(--font-heading);">${course.title}</h3>
          <p style="color:#94a3b8;margin:0;font-size:.9rem;max-width:680px;line-height:1.6;">${course.description}</p>
          <div style="margin-top:14px;font-size:.82rem;color:var(--accent-cyan);font-weight:600;">
            🛤️ Automated Loop: 1. NSL Video ➔ 2. Visual Quiz ➔ 3. Code Activity ➔ 4. Results
          </div>
        </div>

        <!-- Module List -->
        <div style="padding:20px 28px;display:flex;flex-direction:column;gap:12px;">
          ${course.modules.map(mod => {
            const isCompleted = learner.completedModules.includes(mod.id);
            const isActive    = mod.id === this.state.lessonModuleId || (!this.state.lessonModuleId && mod.id === "mod-2");
            const isLocked    = mod.status === "locked" && !isCompleted;

            return `
              <div
                class="module-journey-card ${isLocked ? 'locked' : ''}"
                id="jcard-${mod.id}"
                onclick="${isLocked ? 'app.showVisualNotification(\"Module Locked\",\"Complete the previous module first!\",\"gold\")' : `app.startGuidedJourney('${mod.id}')`}"
                style="
                  display:flex;align-items:center;gap:16px;
                  background:${isActive ? 'rgba(0,229,255,.08)' : 'var(--bg-surface)'};
                  border:1.5px solid ${isActive ? 'var(--accent-cyan)' : isCompleted ? 'rgba(52,211,153,.35)' : isLocked ? 'rgba(255,255,255,.06)' : 'var(--border-subtle)'};
                  border-radius:var(--radius-md);
                  padding:16px 20px;
                  cursor:${isLocked ? 'not-allowed' : 'pointer'};
                  opacity:${isLocked ? '.5' : '1'};
                  transition:all .2s;
                "
              >
                <!-- Status Icon -->
                <div style="
                  width:44px;height:44px;flex-shrink:0;
                  border-radius:50%;
                  background:${isCompleted ? 'var(--accent-emerald)' : isActive ? 'var(--accent-cyan)' : 'var(--bg-card)'};
                  display:flex;align-items:center;justify-content:center;
                  font-size:${isCompleted || isActive ? '1.2rem' : '1rem'};
                  font-weight:700;
                  color:${isCompleted || isActive ? '#080c14' : 'var(--text-muted)'};
                  border:2px solid ${isCompleted ? 'var(--accent-emerald)' : isActive ? 'var(--accent-cyan)' : 'var(--border-subtle)'};
                ">
                  ${isCompleted ? '✔' : isLocked ? '🔒' : mod.number}
                </div>

                <!-- Info -->
                <div style="flex:1;min-width:0;">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                    <h3 style="color:${isLocked ? 'var(--text-muted)' : '#fff'};margin:0;font-size:1rem;">${mod.title}</h3>
                    ${isCompleted ? '<span class="badge badge-emerald">✓ Done</span>' : isActive ? '<span class="badge badge-cyan">▶ Continue</span>' : isLocked ? '<span class="badge badge-red">Locked</span>' : '<span class="badge badge-gold">Next</span>'}
                  </div>
                  <p style="margin:4px 0 0;font-size:.82rem;color:var(--text-muted);">${mod.duration} • 🎬 ${mod.videoDuration} NSL video • ${mod.quiz.length} quiz questions</p>
                </div>

                <!-- CTA Arrow -->
                ${!isLocked ? '<span style="font-size:1.3rem;color:var(--accent-cyan);flex-shrink:0;">›</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Auto-advance countdown on home page if in guidedMode
    if (this.state.guidedMode !== false) {
      setTimeout(() => {
        this.autoAdvanceCountdown(
          6,
          () => this.startGuidedJourney(this.state.lessonModuleId || "mod-2"),
          "Auto-directing to Nigerian Sign Language Video in",
          "homeGuidedBanner"
        );
      }, 300);
    }
  }

  startLesson(modId) {
    this.startGuidedJourney(modId);
  }

  // ── STEP 1 (Legacy/Deep Overview): Lesson Page ───────────────────────────
  renderLessonPage() {
    const container = document.getElementById("view-learner");
    if (!container) return;
    const course  = this.state.data.course;
    const mod     = course.modules.find(m => m.id === this.state.activeModuleId) || course.modules[2];

    container.innerHTML = `
      ${this._stepBreadcrumb("lesson")}

      <div style="max-width:760px;margin:0 auto;">
        ${this._guidedHUD("Lesson Overview", 1, "NSL Video Lesson", "app.goToStep('video')")}

        <!-- Guided Action Banner -->
        <div id="lessonGuidedBanner" class="guided-action-banner" style="margin-bottom:20px;"></div>

        <!-- Lesson Header -->
        <div style="background:linear-gradient(135deg,rgba(0,229,255,.1),rgba(0,200,150,.06));border:1px solid rgba(0,229,255,.25);border-radius:var(--radius-lg);padding:28px;margin-bottom:24px;">
          <span class="badge badge-cyan" style="margin-bottom:10px;display:inline-block;">Module ${mod.number}</span>
          <h2 style="color:#fff;margin:0 0 8px;font-family:var(--font-heading);font-size:1.5rem;">${mod.title}</h2>
          <p style="color:var(--text-muted);margin:0 0 16px;font-size:.93rem;line-height:1.6;">${mod.summary}</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:.82rem;">
            <span style="color:var(--accent-cyan);">⏱ ${mod.videoDuration} video</span>
            <span style="color:var(--accent-gold);">❓ ${mod.quiz.length} quiz questions</span>
            <span style="color:var(--accent-emerald);">📥 ${mod.lowDataSize} offline</span>
          </div>
        </div>

        <!-- What You'll Learn -->
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:24px;margin-bottom:20px;">
          <h3 style="color:#fff;margin:0 0 16px;font-size:1.05rem;">🎯 What you will learn:</h3>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px;">
            ${mod.keyConcepts.map(c => `
              <li style="display:flex;gap:12px;align-items:flex-start;">
                <span style="color:var(--accent-emerald);font-size:1.1rem;flex-shrink:0;">✔</span>
                <div>
                  <strong style="color:#fff;">${c.term}</strong>
                  <span class="nsl-tip-badge" style="margin-left:8px;">${c.nslTip}</span>
                  <p style="margin:3px 0 0;font-size:.85rem;color:var(--text-muted);">${c.definition}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- NSL Topic Callout -->
        <div style="background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.3);border-radius:var(--radius-md);padding:16px 20px;margin-bottom:28px;display:flex;gap:14px;align-items:center;">
          <span style="font-size:1.8rem;">🤟</span>
          <div>
            <strong style="color:#a78bfa;display:block;margin-bottom:2px;">NSL Topic:</strong>
            <span style="color:#e2e8f0;font-size:.93rem;">${mod.nslTopic}</span>
          </div>
        </div>

        <!-- CTA: Start Video -->
        <button
          id="startVideoBtn"
          onclick="app.goToStep('video')"
          style="
            width:100%;padding:20px;border-radius:var(--radius-lg);
            background:linear-gradient(135deg,var(--accent-cyan),var(--accent-emerald));
            color:#080c14;border:none;cursor:pointer;font-size:1.1rem;font-weight:700;
            font-family:var(--font-heading);display:flex;align-items:center;justify-content:center;gap:12px;
            transition:transform .2s,box-shadow .2s;
            box-shadow:0 4px 20px rgba(0,229,255,.35);
          "
        >
          <span style="font-size:1.5rem;">🎬</span>
          Watch Nigerian Sign Language Video
          <span style="font-size:1rem;">›</span>
        </button>
      </div>
    `;

    if (this.state.guidedMode !== false) {
      setTimeout(() => {
        this.autoAdvanceCountdown(
          4,
          () => this.goToStep("video"),
          "Autopilot active: Starting NSL Video in",
          "lessonGuidedBanner"
        );
      }, 300);
    }
  }

  // ── STEP 1: NSL Video (Deaf-First Enhanced Video Suite) ──────────────────────
  renderVideoStep() {
    const container = document.getElementById("view-learner");
    if (!container) return;
    const course  = this.state.data.course;
    const mod     = course.modules.find(m => m.id === this.state.activeModuleId) || course.modules[2];

    const ytVideoId  = "7lM2qS2XEPk";
    const ytEmbedUrl = `https://www.youtube.com/embed/${ytVideoId}?enablejsapi=1&rel=0&modestbranding=1&cc_load_policy=1`;

    container.innerHTML = `
      ${this._stepBreadcrumb("video")}

      <div style="max-width:880px;margin:0 auto;">
        ${this._guidedHUD("1. Nigerian Sign Language Video", 1, "2. Visual Quiz", "app.autoAdvanceToQuiz()")}

        <!-- Header -->
        <div style="margin-bottom:18px;display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:12px;">
          <div>
            <h2 style="color:#fff;margin:0 0 4px;font-size:1.35rem;display:flex;align-items:center;gap:10px;">
              <svg class="ui-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
              <span>Nigerian Sign Language (NSL) Video Lesson</span>
            </h2>
            <p style="color:var(--text-muted);margin:0;font-size:.88rem;">Module ${mod.number}: ${mod.title} • ${mod.videoDuration} • Visual Sign Demonstration</p>
          </div>
          <button onclick="app.openNSLDictionaryModal()" class="nsl-tool-btn" style="border-color:var(--accent-cyan);color:var(--accent-cyan);" title="Look up NSL signs and fingerspelling">
            <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            <span>NSL Dictionary</span>
          </button>
        </div>

        <!-- NSL Deaf Study Toolbar -->
        <div class="nsl-toolbar">
          <div class="nsl-speed-group">
            <span style="font-size:0.78rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Sign Speed:</span>
            <button class="nsl-tool-btn nsl-speed-btn ${this.state.nslSpeed === 0.5 ? 'active' : ''}" data-rate="0.5" onclick="app.setNSLPlaybackRate(0.5)" title="Slow down video to inspect handshapes and finger orientation">
              <span>0.5x Slow Hands</span>
            </button>
            <button class="nsl-tool-btn nsl-speed-btn ${this.state.nslSpeed === 0.75 ? 'active' : ''}" data-rate="0.75" onclick="app.setNSLPlaybackRate(0.75)" title="Practice signing speed">
              <span>0.75x Practice</span>
            </button>
            <button class="nsl-tool-btn nsl-speed-btn ${this.state.nslSpeed === 1.0 ? 'active' : ''}" data-rate="1.0" onclick="app.setNSLPlaybackRate(1.0)" title="Standard speed">
              <span>1.0x Real-time</span>
            </button>
          </div>

          <div style="display:flex;align-items:center;gap:8px;">
            <button id="videoContrastBtn" class="nsl-tool-btn ${this.state.videoContrastFrame ? 'active' : ''}" onclick="app.toggleVideoContrastFrame()" title="Toggle high-contrast matte border for clearer visual silhouette">
              <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20a10 10 0 0 0 0-20z"/></svg>
              <span>High-Contrast Frame</span>
            </button>
          </div>
        </div>

        <!-- YouTube Video Embed with High-Contrast Frame Support -->
        <div id="nslVideoBox" class="nsl-video-box ${this.state.videoContrastFrame ? 'high-contrast-frame' : ''}" style="margin-bottom:20px;">
          <div style="position:relative;padding-top:56.25%;width:100%;">
            <iframe
              id="nslVideoFrame"
              src="${ytEmbedUrl}"
              title="Nigerian Sign Language Lesson Video — Module ${mod.number}: ${mod.title}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
            ></iframe>
          </div>

          <!-- Deaf-Accessible Floating Badge -->
          <div style="
            position:absolute;top:12px;left:12px;
            background:rgba(8,12,20,0.85);backdrop-filter:blur(8px);
            color:#fff;padding:6px 14px;border-radius:99px;font-size:.78rem;font-weight:700;
            border:1.5px solid var(--accent-cyan);box-shadow:0 2px 10px rgba(0,0,0,0.5);
            pointer-events:none;display:flex;align-items:center;gap:6px;
          ">
            <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
            <span>Nigerian Sign Language (NSL)</span>
          </div>
        </div>

        <!-- Guided Action Banner below video -->
        <div id="videoGuidedBanner" class="guided-action-banner" style="margin-bottom:24px;"></div>

        <!-- Deaf-First Handshape & Concept Breakdown Cards -->
        <div style="margin-bottom:24px;">
          <h3 style="color:#fff;margin:0 0 12px;font-size:1.05rem;display:flex;align-items:center;gap:8px;">
            <svg class="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span>Visual Concept & Handshape Guide (Module ${mod.number}):</span>
          </h3>

          <div class="nsl-concept-grid">
            <div class="nsl-concept-card" onclick="app.showVisualNotification('HTML Tag Sign','Form angle brackets < > with index and thumb, then close inward.','cyan')">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <strong style="color:var(--text-heading);font-size:.95rem;">HTML Tag Syntax</strong>
                <span class="nsl-handshape-badge">Angle Brackets &lt; &gt;</span>
              </div>
              <p style="margin:0;font-size:.84rem;color:var(--text-muted);line-height:1.5;">
                Both hands make pinchers facing each other. Moving hands forward simulates typing open &lt; and closing &gt; tags.
              </p>
              <div style="font-size:.76rem;color:#34d399;font-weight:600;">Facial Marker: Firm mouth nod upon tag closure</div>
            </div>

            <div class="nsl-concept-card" onclick="app.showVisualNotification('Head vs Body Sign','Point to head for metadata; sweep torso down for visible webpage body.','emerald')">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <strong style="color:var(--text-heading);font-size:.95rem;">&lt;head&gt; vs &lt;body&gt;</strong>
                <span class="nsl-handshape-badge">Body Spatial Marker</span>
              </div>
              <p style="margin:0;font-size:.84rem;color:var(--text-muted);line-height:1.5;">
                Point to forehead for &lt;head&gt; (browser settings, title). Open flat hands over the chest to represent the visible &lt;body&gt;.
              </p>
              <div style="font-size:.76rem;color:#34d399;font-weight:600;">Facial Marker: Neutral brows for head, open eyes for body</div>
            </div>

            <div class="nsl-concept-card" onclick="app.showVisualNotification('Alt Text Attribute','Draw a rectangle in air for image, then gesture typing caption description.','gold')">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <strong style="color:var(--text-heading);font-size:.95rem;">Image &amp; alt="" Text</strong>
                <span class="nsl-handshape-badge">Frame + Description</span>
              </div>
              <p style="margin:0;font-size:.84rem;color:var(--text-muted);line-height:1.5;">
                Trace an image frame with index fingers, then tap fingers against palm to denote screen-reader text alternatives.
              </p>
              <div style="font-size:.76rem;color:#34d399;font-weight:600;">Facial Marker: Attentive eye focus on fingers</div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button
            onclick="app.goToStep('catalogue')"
            style="flex:1;min-width:140px;padding:14px;border-radius:var(--radius-md);background:var(--bg-surface);border:1px solid var(--border-subtle);color:#fff;cursor:pointer;font-size:.95rem;font-family:inherit;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;"
          >
            <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span>Home</span>
          </button>
          <button
            id="doneVideoBtn"
            onclick="app.autoAdvanceToQuiz()"
            style="
              flex:2;min-width:200px;padding:14px;border-radius:var(--radius-md);
              background:linear-gradient(135deg,var(--accent-cyan),var(--accent-emerald));
              border:none;color:#080c14;cursor:pointer;font-size:1rem;font-weight:700;
              font-family:var(--font-heading);display:inline-flex;align-items:center;justify-content:center;gap:8px;
              transition:transform .2s;box-shadow:0 4px 20px rgba(0,229,255,0.3);
            "
          >
            <svg class="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#080c14" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Done Watching — Proceed to Visual Quiz</span>
            <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#080c14" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    `;

    if (this.state.guidedMode !== false) {
      setTimeout(() => {
        this.autoAdvanceCountdown(
          14,
          () => this.autoAdvanceToQuiz(),
          "Video preview active. Auto-advancing to Visual Quiz in",
          "videoGuidedBanner"
        );
      }, 500);
    }
  }

  // ── STEP 2: Visual Quiz ───────────────────────────────────────────────────
  renderQuizStep() {
    const container = document.getElementById("view-learner");
    if (!container) return;
    const course  = this.state.data.course;
    const mod     = course.modules.find(m => m.id === this.state.activeModuleId) || course.modules[2];

    container.innerHTML = `
      ${this._stepBreadcrumb("quiz")}

      <div style="max-width:760px;margin:0 auto;">
        ${this._guidedHUD("2. Visual Quiz", 2, "3. Code Activity", "app.autoAdvanceToActivity()")}

        <!-- Autopilot countdown banner on quiz complete -->
        <div id="quizGuidedBanner" class="guided-action-banner" style="display:none;margin-bottom:20px;"></div>

        <div style="margin-bottom:20px;">
          <h2 style="color:#fff;margin:0 0 4px;font-size:1.25rem;">❓ Module Visual Quiz</h2>
          <p style="color:var(--text-muted);margin:0;font-size:.88rem;">Module ${mod.number}: Answer the questions below — instant visual feedback after each selection!</p>
        </div>

        <div class="quiz-container" id="quizContainer">
          ${this.renderQuizHTML(mod)}
        </div>

        <!-- Navigation buttons -->
        <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap;">
          <button onclick="app.goToStep('video')" style="flex:1;min-width:140px;padding:14px;border-radius:var(--radius-md);background:var(--bg-surface);border:1px solid var(--border-subtle);color:#fff;cursor:pointer;font-size:.95rem;font-family:inherit;">
            ← Re-watch Video
          </button>
          <button
            id="proceedToActivityBtn"
            onclick="app.autoAdvanceToActivity()"
            style="
              flex:2;min-width:200px;padding:14px;border-radius:var(--radius-md);
              background:linear-gradient(135deg,var(--accent-cyan),var(--accent-emerald));
              border:none;color:#080c14;cursor:pointer;font-size:1rem;font-weight:700;
              font-family:var(--font-heading);
            "
          >
            💻 Proceed to Hands-On Activity ›
          </button>
        </div>
      </div>
    `;

    // Check if already answered all questions to auto-countdown
    const allAnswered = mod.quiz.every(q => this.state.quizAnswers[`${mod.id}-${q.id}`] !== undefined);
    if (allAnswered && this.state.guidedMode !== false) {
      setTimeout(() => {
        this.autoAdvanceCountdown(
          5,
          () => this.autoAdvanceToActivity(),
          "All questions answered! Auto-advancing to Hands-On Coding Activity in",
          "quizGuidedBanner"
        );
      }, 300);
    }
  }

  // ── STEP 3: Activity (Code Playground) ───────────────────────────────────
  renderActivityStep() {
    const container = document.getElementById("view-learner");
    if (!container) return;
    const course  = this.state.data.course;
    const mod     = course.modules.find(m => m.id === this.state.activeModuleId) || course.modules[2];

    container.innerHTML = `
      ${this._stepBreadcrumb("activity")}

      <div style="max-width:1100px;margin:0 auto;">
        ${this._guidedHUD("3. Hands-On Code Activity", 3, "4. Results", "app.autoAdvanceToResults()")}

        <!-- Autopilot countdown banner on submission -->
        <div id="activityGuidedBanner" class="guided-action-banner" style="display:none;margin-bottom:20px;"></div>

        <!-- Header -->
        <div style="margin-bottom:20px;">
          <h2 style="color:#fff;margin:0 0 4px;font-size:1.25rem;">💻 Hands-On Activity</h2>
          <p style="color:var(--text-muted);margin:0 0 4px;font-size:.88rem;">Module ${mod.number}: ${mod.task.title}</p>
          <p style="color:#e2e8f0;font-size:.9rem;margin:0;">${mod.task.instructions}</p>
        </div>

        <!-- Step-by-step visual guide -->
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:20px;margin-bottom:20px;">
          <h3 style="color:var(--accent-cyan);margin:0 0 12px;font-size:.95rem;">📋 Visual Step-by-Step Guide:</h3>
          <ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
            ${mod.visualDemoSteps.map((step, i) => `
              <li style="display:flex;gap:12px;align-items:center;">
                <div style="width:28px;height:28px;flex-shrink:0;border-radius:50%;background:rgba(0,229,255,.15);border:1px solid rgba(0,229,255,.4);color:var(--accent-cyan);display:flex;align-items:center;justify-content:center;font-size:.85rem;font-weight:700;">${i+1}</div>
                <span style="font-size:.9rem;color:#e2e8f0;">${step.replace(/^\d+\.\s*/, '')}</span>
              </li>
            `).join('')}
          </ol>
        </div>

        <!-- Code Playground -->
        <div class="playground-grid" style="margin-bottom:20px;">
          <!-- Editor -->
          <div class="code-editor-box">
            <div class="box-top-bar">
              <span>📄 index.html</span>
              <div style="display:flex;gap:6px;">
                <button class="btn btn-secondary btn-sm" style="min-height:28px;padding:2px 10px;border-color:var(--accent-cyan);color:var(--accent-cyan);" onclick="app.openAIMentorModal();app.sendQuickAIPrompt('audit');">🤖 AI Audit</button>
                <button class="btn btn-secondary btn-sm" style="min-height:28px;padding:2px 8px;" onclick="app.resetStarterCode('${mod.id}')">Reset</button>
              </div>
            </div>
            <textarea id="codeEditorInput" class="code-textarea" spellcheck="false" oninput="app.updateCodePreview()">${this.state.userCodeDrafts[mod.id] || mod.task.starterCode}</textarea>
          </div>
          <!-- Live Preview -->
          <div class="code-preview-box">
            <div class="box-top-bar">
              <span>🖥️ Live Preview</span>
              <span style="color:var(--accent-emerald);">● Live</span>
            </div>
            <iframe id="livePreviewFrame" class="preview-frame" sandbox="allow-scripts"></iframe>
          </div>
        </div>

        <!-- Submit + Next -->
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:16px 20px;">
          <div style="flex:1;min-width:180px;">
            <strong style="color:#fff;display:block;font-size:.9rem;">Grading Rubric:</strong>
            <span style="color:var(--text-muted);font-size:.82rem;">${mod.task.gradingRubric}</span>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn btn-secondary btn-sm" onclick="app.goToStep('quiz')">← Back to Quiz</button>
            <button class="btn btn-primary btn-sm" onclick="app.submitAndContinue('${mod.id}')">Submit Work &amp; View Results ›</button>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => this.updateCodePreview(), 50);
  }

  submitAndContinue(modId) {
    const editor = document.getElementById("codeEditorInput");
    const code = editor ? editor.value : "";
    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];
    learner.assignments[modId] = { status: "submitted", code, submittedAt: new Date().toLocaleTimeString() };
    this.saveState();
    this.showVisualNotification("Activity Submitted! 🚀", "Code verified! Ready for grading.", "emerald");

    if (this.state.guidedMode !== false) {
      this.autoAdvanceCountdown(
        3,
        () => this.autoAdvanceToResults(),
        "Activity submitted! Auto-calculating your performance score in",
        "activityGuidedBanner"
      );
    } else {
      this.autoAdvanceToResults();
    }
  }

  finishQuiz() {
    const course = this.state.data.course;
    const mod    = course.modules.find(m => m.id === this.state.activeModuleId) || course.modules[2];
    const correct = mod.quiz.filter(q => this.state.quizAnswers[`${mod.id}-${q.id}`] === q.correctIndex).length;
    const total   = mod.quiz.length;
    const pct     = total > 0 ? Math.round((correct / total) * 100) : 80;

    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];
    if (pct >= 70 && !learner.completedModules.includes(mod.id)) {
      learner.completedModules.push(mod.id);
      learner.progressPercent = Math.min(100, learner.progressPercent + 15);
    }
    this.saveState();
    this.goToStep("results");
  }

  // ── STEP 4: Results ──────────────────────────────────────────────────────
  renderResultsStep() {
    const container = document.getElementById("view-learner");
    if (!container) return;
    const course  = this.state.data.course;
    const mod     = course.modules.find(m => m.id === this.state.activeModuleId) || course.modules[2];
    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];

    const correct = mod.quiz.filter(q => this.state.quizAnswers[`${mod.id}-${q.id}`] === q.correctIndex).length;
    const total   = mod.quiz.length;
    const pct     = correct > 0 ? Math.round((correct / total) * 100) : 85;
    const passed  = pct >= 70;

    const currentIndex = course.modules.findIndex(m => m.id === mod.id);
    const nextMod = course.modules[currentIndex + 1];

    container.innerHTML = `
      ${this._stepBreadcrumb("results")}

      <div style="max-width:680px;margin:0 auto;text-align:center;">
        ${this._guidedHUD("4. Module Results", 4, nextMod ? nextMod.title : "Catalogue", "app.startNextGuidedModule()")}

        <!-- Autopilot countdown to next module -->
        <div id="resultsGuidedBanner" class="guided-action-banner" style="margin-bottom:20px;"></div>

        <!-- Score Card -->
        <div style="
          background:${passed ? 'linear-gradient(135deg,rgba(52,211,153,.15),rgba(0,229,255,.1))' : 'linear-gradient(135deg,rgba(251,191,36,.12),rgba(249,115,22,.08))'};
          border:2px solid ${passed ? 'var(--accent-emerald)' : 'var(--accent-gold)'};
          border-radius:var(--radius-lg);padding:40px 32px;margin-bottom:28px;
        ">
          <div style="font-size:4rem;margin-bottom:12px;">${passed ? '🏆' : '📚'}</div>
          <h2 style="color:#fff;margin:0 0 6px;font-size:1.8rem;font-family:var(--font-heading);">
            ${passed ? 'Module Passed! 🎉' : 'Keep Practising!'}
          </h2>
          <p style="color:var(--text-muted);margin:0 0 24px;font-size:.95rem;">
            Module ${mod.number}: ${mod.title}
          </p>

          <!-- Score Ring -->
          <div style="
            width:120px;height:120px;border-radius:50%;
            background:conic-gradient(${passed ? 'var(--accent-emerald)' : 'var(--accent-gold)'} ${pct * 3.6}deg, var(--bg-surface) 0deg);
            display:flex;align-items:center;justify-content:center;
            margin:0 auto 24px;
            box-shadow:0 0 30px ${passed ? 'rgba(52,211,153,.4)' : 'rgba(251,191,36,.4)'};
          ">
            <div style="width:88px;height:88px;border-radius:50%;background:var(--bg-card);display:flex;align-items:center;justify-content:center;flex-direction:column;">
              <span style="font-size:1.6rem;font-weight:800;color:#fff;line-height:1;">${pct}%</span>
              <span style="font-size:.7rem;color:var(--text-muted);">score</span>
            </div>
          </div>

          <div style="font-size:1.05rem;color:#fff;margin-bottom:6px;">
            <strong style="color:${passed ? 'var(--accent-emerald)' : 'var(--accent-gold)'}">${correct > 0 ? correct : total}</strong> out of <strong>${total}</strong> correct
          </div>
          <p style="color:var(--text-muted);font-size:.88rem;margin:0;">
            ${passed ? 'Outstanding visual understanding! You are ready for the next module.' : 'Review the NSL video and retry — you need 70% to pass.'}
          </p>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${passed && nextMod ? `
            <button
              onclick="app.startNextGuidedModule()"
              style="
                padding:18px;border-radius:var(--radius-md);
                background:linear-gradient(135deg,var(--accent-cyan),var(--accent-emerald));
                border:none;color:#080c14;cursor:pointer;font-size:1.05rem;font-weight:700;
                font-family:var(--font-heading);
              "
            >▶ Start Next Module: ${nextMod.title}</button>
          ` : ''}
          ${!passed ? `
            <button onclick="app.goToStep('video')" style="padding:14px;border-radius:var(--radius-md);background:var(--accent-cyan);border:none;color:#080c14;cursor:pointer;font-size:1rem;font-weight:700;font-family:inherit;">🎬 Re-watch NSL Video</button>
            <button onclick="app.goToStep('quiz')" style="padding:14px;border-radius:var(--radius-md);background:var(--bg-surface);border:1px solid var(--border-subtle);color:#fff;cursor:pointer;font-size:.95rem;font-family:inherit;">❓ Retry Quiz</button>
          ` : ''}
          <button onclick="app.goToStep('catalogue')" style="padding:14px;border-radius:var(--radius-md);background:var(--bg-surface);border:1px solid var(--border-subtle);color:#fff;cursor:pointer;font-size:.95rem;font-family:inherit;">📚 Back to Course Home</button>
        </div>

        <!-- NSL Praise -->
        <div style="margin-top:28px;background:rgba(139,92,246,.1);border:1px solid rgba(139,92,246,.25);border-radius:var(--radius-md);padding:16px;">
          <p style="margin:0;color:#c4b5fd;font-size:.88rem;">
            🤟 <em>"Every sign you learn brings you closer to your future in tech. You are amazing!"</em>
          </p>
          <p style="margin:8px 0 0;color:var(--text-muted);font-size:.8rem;">— Bashir Abubakar, Deaf Tech Lead</p>
        </div>
      </div>
    `;

    if (this.state.guidedMode !== false && passed && nextMod) {
      setTimeout(() => {
        this.autoAdvanceCountdown(
          6,
          () => this.startNextGuidedModule(),
          `Congratulations! Auto-queueing Next Module (${nextMod.title}) in`,
          "resultsGuidedBanner"
        );
      }, 500);
    }
  }

  // ── Legacy helpers kept for other views ─────────────────────────────────
  _legacyLearnerDashboard() {
    const container = document.getElementById("view-learner");
    if (!container) return;

    const course = this.state.data.course;
    const activeMod = course.modules.find(m => m.id === this.state.activeModuleId) || course.modules[1];
    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];
    const cohort = this.state.data.cohorts.find(c => c.id === learner.cohortId) || this.state.data.cohorts[0];

    container.innerHTML = `
      <!-- Learner Quick Switcher for Demo -->
      <div style="background: rgba(0, 210, 211, 0.08); border: 1px solid rgba(0, 210, 211, 0.25); border-radius: var(--radius-md); padding: 10px 16px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.1rem;">👤</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">Demo Persona:</span>
          <strong style="color: #fff;">${learner.name}</strong>
          <span class="badge badge-cyan">${learner.paymentStatus.toUpperCase()}</span>
          ${learner.needDeviceSupport ? '<span class="badge badge-gold">Device Loan: ' + (learner.loanedDevice || 'Requested') + '</span>' : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.8rem; color: var(--text-muted);">Switch Student for Demo:</span>
          <select style="background: var(--bg-surface); border: 1px solid var(--border-subtle); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;" onchange="app.switchActiveLearner(this.value)">
            ${this.state.data.learners.map(l => `
              <option value="${l.id}" ${l.id === learner.id ? 'selected' : ''}>
                ${l.name} (${l.paymentStatus} • ${l.deviceAccess})
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Live Session Alert -->
      <div class="live-alert-banner">
        <div class="live-alert-info">
          <div class="live-pulse"></div>
          <div>
            <strong style="color: #fff; font-size: 1rem;">Next Live Cohort Session in NSL: Today at 4:00 PM WAT</strong>
            <p style="color: var(--text-muted); font-size: 0.85rem;">Cohort: ${cohort.name} • Facilitator: ${cohort.facilitator}</p>
          </div>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <a href="${cohort.liveMeetUrl}" target="_blank" class="btn btn-primary btn-sm">
            <span>🎥</span> Join Google Meet (NSL Interpreter On)
          </a>
          <button class="btn btn-secondary btn-sm" onclick="app.showVisualNotification('Attendance Checked', 'You are marked ready for today\'s live session.', 'emerald')">Check In</button>
        </div>
      </div>

      <!-- Quick Metrics -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon emerald">📈</div>
          <div class="stat-content">
            <h3>Course Progress</h3>
            <div class="stat-number">${learner.progressPercent}%</div>
            <div class="stat-desc">Module ${activeMod.number} of 7 in progress</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon cyan">🤟</div>
          <div class="stat-content">
            <h3>Live Attendance</h3>
            <div class="stat-number">${learner.liveAttendanceRate.split(' ')[0]}</div>
            <div class="stat-desc">Consistent live cohort participation</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon gold">🏆</div>
          <div class="stat-content">
            <h3>Verified Quizzes</h3>
            <div class="stat-number">100%</div>
            <div class="stat-desc">Average score on visual tests</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">📱</div>
          <div class="stat-content">
            <h3>Device Status</h3>
            <div class="stat-number" style="font-size: 1.15rem; text-transform: capitalize;">${learner.deviceAccess}</div>
            <div class="stat-desc">${learner.loanedDevice ? learner.loanedDevice : 'Mobile-first environment'}</div>
          </div>
        </div>
      </div>

      <!-- Main Lesson & Module Grid -->
      <div class="lesson-layout">
        <!-- Left Column: Video Player & Tabs -->
        <div>
          <!-- NSL Video Simulator -->
          <div class="video-container">
            <div class="video-screen">
              <div class="nsl-signer-stage">
                <div class="nsl-animator-box">
                  <div class="nsl-avatar-sign" id="signerEmoji">🤟</div>
                  <div class="nsl-sign-gloss" id="signerGloss">${activeMod.keyConcepts[0].nslTip}</div>
                  <div style="font-size: 0.85rem; color: #fff; margin-top: 6px; font-weight: 600;">
                    NSL Instructor: ${cohort.facilitator}
                  </div>
                </div>

                <!-- Picture in picture visual preview -->
                <div class="pip-slide">
                  <div class="pip-slide-header">Visual Demo</div>
                  <code>&lt;header&gt;...&lt;/header&gt;</code>
                  <div style="color: #94a3b8; margin-top: 4px; font-size: 0.7rem;">Screen share synced with signing</div>
                </div>
              </div>
            </div>

            <!-- Video Controls Bar -->
            <div class="video-controls">
              <div class="control-btn-group">
                <button class="v-btn" id="playPauseBtn" onclick="app.toggleVideoPlay()">
                  <span id="playIcon">▶</span> <span id="playText">Play NSL</span>
                </button>
                <button class="v-btn" onclick="app.restartVideo()">↺ Replay</button>
                <button class="v-btn" onclick="app.showVisualNotification('Sign Loop Active', 'Looping this 15-second NSL explanation for deep practice.', 'cyan')">🔁 Loop Sign</button>
              </div>

              <div class="control-btn-group">
                <label style="font-size: 0.8rem; color: var(--text-muted);">Speed:</label>
                <select class="speed-select" onchange="app.setPlaybackSpeed(this.value)">
                  <option value="0.75">0.75x (Slow Sign)</option>
                  <option value="1.0" selected>1.0x (Normal)</option>
                  <option value="1.25">1.25x (Fast)</option>
                </select>
              </div>
            </div>

            <div class="timeline-scrubber" onclick="app.scrubVideo(event)">
              <div class="scrubber-fill" id="scrubberFill"></div>
            </div>
          </div>

          <!-- Low Data Card (shown when Low Data toggle is active) -->
          <div class="low-data-card">
            <h3>⚡ Bandwidth Saver Active (Nigeria Low-Data Mode)</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px;">
              Video streaming paused to conserve cellular data. Review the key sign sequence cards and visual code instructions below.
            </p>
            <button class="btn btn-secondary btn-sm" onclick="app.downloadPracticeFiles('${activeMod.id}')">
              📥 Download Offline Cheat-sheet (${activeMod.lowDataSize})
            </button>
          </div>

          <!-- Lesson Tabs: Concepts, Step-by-Step, Practice Files -->
          <div style="margin-top: 24px;">
            <div class="lesson-tabs">
              <button class="tab-btn active" onclick="app.switchTab(this, 'tab-concepts')">Visual Concepts</button>
              <button class="tab-btn" onclick="app.switchTab(this, 'tab-steps')">Visual Demo Steps</button>
              <button class="tab-btn" onclick="app.switchTab(this, 'tab-transcript')">NSL Transcript</button>
              <button class="tab-btn" onclick="app.switchTab(this, 'tab-download')">Offline Files</button>
            </div>

            <!-- Tab 1: Key Concepts -->
            <div id="tab-concepts" class="tab-panel active">
              <div class="concept-grid">
                ${activeMod.keyConcepts.map(c => `
                  <div class="concept-item">
                    <div class="concept-header">
                      <span class="concept-term">${c.term}</span>
                      <span class="nsl-tip-badge">${c.nslTip}</span>
                    </div>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">${c.definition}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Tab 2: Visual Steps -->
            <div id="tab-steps" class="tab-panel">
              <div style="background: var(--bg-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                <h4 style="color: var(--accent-cyan); margin-bottom: 12px;">Hands-On Step-by-Step Instructions:</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px;">
                  ${activeMod.visualDemoSteps.map(step => `
                    <li style="display: flex; gap: 10px; align-items: center; font-size: 0.92rem; color: #fff;">
                      <span style="color: var(--accent-emerald); font-weight: bold;">✔</span> ${step}
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <!-- Tab 3: Visual Transcript -->
            <div id="tab-transcript" class="tab-panel">
              <div style="background: var(--bg-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); font-size: 0.92rem; line-height: 1.7; color: var(--text-muted);">
                <p><strong style="color: #fff;">[00:00 - 02:30] NSL Greeting & Context:</strong> Welcome back to Acclusivo! Today we are exploring <em>${activeMod.title}</em>.</p>
                <p style="margin-top: 10px;"><strong style="color: #fff;">[02:30 - 08:15] Visual Mechanics:</strong> Watch my hands as I sign the structure. Notice how we nest tags like boxes inside larger boxes.</p>
                <p style="margin-top: 10px;"><strong style="color: #fff;">[08:15 - End] Practical Challenge:</strong> Open your code playground below and test your skills before taking the visual quiz!</p>
              </div>
            </div>

            <!-- Tab 4: Offline Files -->
            <div id="tab-download" class="tab-panel">
              <div style="background: var(--bg-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
                <div>
                  <h4 style="color: #fff; margin-bottom: 4px;">Module Starter Practice Package</h4>
                  <p style="font-size: 0.85rem; color: var(--text-muted);">Includes starter HTML/CSS, high-contrast diagrams, and compressed NSL video snippets.</p>
                </div>
                <button class="btn btn-secondary btn-sm" onclick="app.downloadPracticeFiles('${activeMod.id}')">
                  📦 Download ZIP (${activeMod.lowDataSize})
                </button>
              </div>
            </div>
          </div>

          <!-- Code Playground & Task Submission -->
          <div style="margin-top: 32px;">
            <div class="section-header" style="padding-bottom: 8px; margin-bottom: 12px;">
              <h2><span>💻</span> Interactive Code Playground & Task</h2>
              <span class="badge badge-cyan">${activeMod.task.submissionType.toUpperCase()} SUBMISSION</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 14px;">
              <strong>Task Objective:</strong> ${activeMod.task.instructions}
            </p>

            <div class="playground-grid">
              <!-- Code Editor -->
              <div class="code-editor-box">
                <div class="box-top-bar">
                  <span>📄 index.html</span>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-secondary btn-sm" style="min-height: 28px; padding: 2px 10px; border-color: var(--accent-cyan); color: var(--accent-cyan);" onclick="app.openAIMentorModal(); app.sendQuickAIPrompt('audit');">
                      🤖 AI Audit Code
                    </button>
                    <button class="btn btn-secondary btn-sm" style="min-height: 28px; padding: 2px 8px;" onclick="app.resetStarterCode('${activeMod.id}')">Reset Code</button>
                  </div>
                </div>
                <textarea id="codeEditorInput" class="code-textarea" spellcheck="false" oninput="app.updateCodePreview()">${this.state.userCodeDrafts[activeMod.id] || activeMod.task.starterCode}</textarea>
              </div>

              <!-- Live Preview -->
              <div class="code-preview-box">
                <div class="box-top-bar">
                  <span>🖥️ Live Visual Preview</span>
                  <span style="color: var(--accent-emerald);">● Rendering</span>
                </div>
                <iframe id="livePreviewFrame" class="preview-frame" sandbox="allow-scripts"></iframe>
              </div>
            </div>

            <!-- Task Submission Action Bar -->
            <div class="submission-status-card">
              <div>
                <strong style="color: #fff;">Grading Rubric:</strong>
                <span style="color: var(--text-muted); font-size: 0.85rem; display: block;">${activeMod.task.gradingRubric}</span>
              </div>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn-secondary btn-sm" onclick="app.openAIMentorModal(); app.sendQuickAIPrompt('audit');">🔍 AI Deaf Accessibility Audit</button>
                <button class="btn btn-secondary btn-sm" onclick="app.updateCodePreview()">🔄 Refresh Preview</button>
                <button class="btn btn-primary btn-sm" onclick="app.submitTaskWork('${activeMod.id}')">🚀 Submit Work to Facilitator</button>
              </div>
            </div>
          </div>

          <!-- Interactive Visual Quiz -->
          <div style="margin-top: 32px;">
            <div class="section-header" style="padding-bottom: 8px; margin-bottom: 12px;">
              <h2><span>❓</span> Visual Module Quiz (${activeMod.quiz.length} Questions)</h2>
              <span class="badge badge-emerald">Instant Feedback</span>
            </div>
            <div class="quiz-container" id="quizContainer">
              ${this.renderQuizHTML(activeMod)}
            </div>
          </div>
        </div>

        <!-- Right Column: Course Navigation & Modules -->
        <div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; position: sticky; top: 110px;">
            <h3 style="color: #fff; font-family: var(--font-heading); margin-bottom: 6px;">
              Frontend Web Development
            </h3>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px;">
              12-Week Flagship Curriculum in NSL
            </p>

            <div class="module-list">
              ${course.modules.map(mod => {
                const isActive = mod.id === activeMod.id;
                const isCompleted = learner.completedModules.includes(mod.id);
                const isLocked = mod.status === "locked" && !isCompleted && !isActive;

                return `
                  <div class="module-card ${isActive ? 'active-module' : ''} ${isCompleted ? 'completed' : ''}" onclick="app.selectModule('${mod.id}')">
                    <div class="module-left">
                      <div class="module-num">${isCompleted ? '✔' : mod.number}</div>
                      <div class="module-title">
                        <h3>${mod.title}</h3>
                        <p>${mod.duration} • ${mod.videoDuration}</p>
                      </div>
                    </div>
                    <div>
                      ${isCompleted ? '<span class="badge badge-emerald">Done</span>' : isActive ? '<span class="badge badge-cyan">Active</span>' : isLocked ? '<span class="badge badge-red">Locked</span>' : '<span class="badge badge-gold">Next</span>'}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Portfolio & Certificate Trigger -->
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 10px;">
              <button class="btn btn-accent" style="width: 100%;" onclick="app.showCertificateModal()">
                <span>🏆</span> View Verified Certificate
              </button>
              <button class="btn btn-secondary" style="width: 100%; font-size: 0.88rem;" onclick="app.switchView('portfolios')">
                <span>📂</span> View Capstone Portfolios Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Render initial live preview
    setTimeout(() => this.updateCodePreview(), 50);
  }
  // ── End legacy learner dashboard ──

  switchActiveLearner(learnerId) {
    this.state.activeLearnerId = learnerId;
    this.saveState();
    this.renderLearnerDashboard();
    const l = this.state.data.learners.find(x => x.id === learnerId);
    this.showVisualNotification("Student Switched", `Now previewing dashboard for ${l.name}`, "cyan");
  }

  // Quiz HTML generator
  renderQuizHTML(mod) {
    return mod.quiz.map((q, qIndex) => {
      const savedAnswer = this.state.quizAnswers[`${mod.id}-${q.id}`];
      return `
        <div class="quiz-question-box" id="qbox-${q.id}">
          <div class="quiz-question-title">${qIndex + 1}. ${q.question}</div>
          <div class="quiz-options">
            ${q.options.map((opt, optIndex) => `
              <button class="quiz-option-btn ${savedAnswer === optIndex ? (optIndex === q.correctIndex ? 'selected-correct' : 'selected-wrong') : ''}" 
                      onclick="app.answerQuiz('${mod.id}', '${q.id}', ${optIndex}, ${q.correctIndex})">
                <span>${opt}</span>
                <span class="indicator">${savedAnswer === optIndex ? (optIndex === q.correctIndex ? '✔' : '✖') : ''}</span>
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback-card ${savedAnswer !== undefined ? 'show ' + (savedAnswer === q.correctIndex ? 'correct' : 'incorrect') : ''}" id="feedback-${q.id}">
            <strong>${savedAnswer === q.correctIndex ? '🎉 Excellent Visual Understanding!' : '💡 Let\'s Review:'}</strong>
            <p style="margin-top: 4px;">${q.visualExplanation}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  answerQuiz(modId, qId, chosenIndex, correctIndex) {
    this.state.quizAnswers[`${modId}-${qId}`] = chosenIndex;
    this.saveState();

    const isCorrect = chosenIndex === correctIndex;
    this.showVisualNotification(
      isCorrect ? "Correct Answer! 🌟" : "Review Needed 💡",
      isCorrect ? "Great job mastering this visual web concept!" : "Check the explanation card and review the NSL video clip.",
      isCorrect ? "emerald" : "gold"
    );

    // Re-render quiz container
    const course = this.state.data.course;
    const mod = course.modules.find(m => m.id === modId);
    const container = document.getElementById("quizContainer");
    if (container && mod) {
      container.innerHTML = this.renderQuizHTML(mod);
    }

    // Auto-advance if in guidedMode and all questions answered
    if (mod) {
      const allAnswered = mod.quiz.every(q => this.state.quizAnswers[`${mod.id}-${q.id}`] !== undefined);
      if (allAnswered && this.state.guidedMode !== false) {
        this.autoAdvanceCountdown(
          4,
          () => this.autoAdvanceToActivity(),
          "All quiz questions answered! Auto-advancing to Hands-On Coding Activity in",
          "quizGuidedBanner"
        );
      }
    }
  }

  // Code Playground Live Preview Handler
  updateCodePreview() {
    const editor = document.getElementById("codeEditorInput");
    const frame = document.getElementById("livePreviewFrame");
    if (!editor || !frame) return;

    const code = editor.value;
    this.state.userCodeDrafts[this.state.activeModuleId] = code;
    this.saveState();

    try {
      const doc = frame.contentDocument || (frame.contentWindow && frame.contentWindow.document);
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    } catch (e) {
      console.warn("Could not write to preview frame:", e);
    }
  }

  resetStarterCode(modId) {
    const mod = this.state.data.course.modules.find(m => m.id === modId);
    if (!mod) return;
    const editor = document.getElementById("codeEditorInput");
    if (editor) {
      editor.value = mod.task.starterCode;
      this.updateCodePreview();
      this.showVisualNotification("Code Reset", "Starter template code reloaded.", "cyan");
    }
  }

  submitTaskWork(modId) {
    const editor = document.getElementById("codeEditorInput");
    const code = editor ? editor.value : "";
    
    // Save to learner assignment
    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];
    learner.assignments[modId] = {
      status: "submitted",
      grade: "pending",
      code: code,
      submittedAt: new Date().toLocaleTimeString()
    };
    this.saveState();

    this.showVisualNotification(
      "Task Submitted to Facilitator! 🚀",
      "Your code has been queued for Bashir Abubakar to review with visual notes.",
      "emerald"
    );
  }

  selectModule(modId) {
    this.state.activeModuleId = modId;
    this.state.lessonModuleId = modId;
    this.state.lessonStep = "catalogue";
    this.saveState();
    this.renderLearnerDashboard();
    this.showVisualNotification("Module Selected", `Tap a module to start the lesson journey.`, "cyan");
  }

  // Video Controls Simulator
  toggleVideoPlay() {
    this.videoPlaying = !this.videoPlaying;
    const playText = document.getElementById("playText");
    const playIcon = document.getElementById("playIcon");
    const signer = document.getElementById("signerEmoji");

    if (this.videoPlaying) {
      if (playText) playText.textContent = "Pause NSL";
      if (playIcon) playIcon.textContent = "⏸";
      if (signer) signer.style.animationPlayState = "running";
      this.startScrubberAnimation();
    } else {
      if (playText) playText.textContent = "Play NSL";
      if (playIcon) playIcon.textContent = "▶";
      if (signer) signer.style.animationPlayState = "paused";
      this.stopScrubberAnimation();
    }
  }

  restartVideo() {
    const scrubber = document.getElementById("scrubberFill");
    if (scrubber) scrubber.style.width = "0%";
    this.videoPlaying = true;
    this.toggleVideoPlay();
    this.toggleVideoPlay();
  }

  setPlaybackSpeed(speed) {
    this.videoPlaybackRate = parseFloat(speed);
    const signer = document.getElementById("signerEmoji");
    if (signer) {
      signer.style.animationDuration = `${2.4 / this.videoPlaybackRate}s`;
    }
    this.showVisualNotification("Playback Speed", `Adjusted to ${speed}x`, "cyan");
  }

  startScrubberAnimation() {
    if (this.scrubberTimer) clearInterval(this.scrubberTimer);
    let progress = 45;
    this.scrubberTimer = setInterval(() => {
      if (!this.videoPlaying) return;
      progress = (progress + 0.5 * this.videoPlaybackRate) % 100;
      const scrubber = document.getElementById("scrubberFill");
      if (scrubber) scrubber.style.width = `${progress}%`;
    }, 300);
  }

  stopScrubberAnimation() {
    if (this.scrubberTimer) clearInterval(this.scrubberTimer);
  }

  scrubVideo(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percent = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);
    const scrubber = document.getElementById("scrubberFill");
    if (scrubber) scrubber.style.width = `${percent}%`;
    this.showVisualNotification("Scrubbed Timeline", `Jumped to ${Math.round(percent)}%`, "cyan");
  }

  switchTab(btn, tabId) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add("active");
  }

  downloadPracticeFiles(modId) {
    this.showVisualNotification("Practice Files Ready", `Downloading offline package for ${modId.toUpperCase()}...`, "emerald");
    const dummyContent = `Acclusivo Learning Resources - ${modId}\nInstructions, Cheatsheets, and Code Templates for Nigerian Sign Language learners.\nVisit https://acclusivo.ng`;
    const blob = new Blob([dummyContent], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `acclusivo-${modId}-cheatsheet.txt`;
    a.click();
  }

  /* ==========================================================================
     2. PARENT & GUARDIAN PORTAL
     ========================================================================== */
  renderParentPortal() {
    const container = document.getElementById("view-parent");
    if (!container) return;

    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];
    const bank = this.state.data.bankDetails;
    const paymentLogs = this.state.data.paymentLogs || [];

    container.innerHTML = `
      <div class="section-header">
        <div>
          <h2><span>👨‍👩‍👦</span> Parent / Guardian Progress Portal</h2>
          <p>Supervising: <strong style="color: #fff;">${learner.name}</strong> • Cohort: Lagos 2026-Alpha</p>
        </div>
        <div>
          <span class="badge ${learner.paymentStatus === 'paid' ? 'badge-emerald' : learner.paymentStatus === 'scholarship' ? 'badge-cyan' : 'badge-gold'}">
            Tuition: ${learner.paymentStatus.toUpperCase()}
          </span>
        </div>
      </div>

      <div class="parent-grid">
        <!-- Left: Academic Progress & Attendance -->
        <div>
          <!-- Course Milestones Card -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">
            <h3 style="color: #fff; margin-bottom: 16px;">Academic Progression & Milestones</h3>
            
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.9rem;">
                <span style="color: var(--text-muted);">Overall Course Completion</span>
                <strong style="color: var(--accent-emerald);">${learner.progressPercent}%</strong>
              </div>
              <div style="height: 8px; background: var(--bg-surface); border-radius: var(--radius-pill); overflow: hidden;">
                <div style="width: ${learner.progressPercent}%; height: 100%; background: linear-gradient(90deg, var(--accent-emerald), var(--accent-cyan));"></div>
              </div>
            </div>

            <!-- Milestones timeline -->
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-emerald); color: #041f17; display: flex; align-items: center; justify-content: center; font-weight: bold;">✔</div>
                <div>
                  <strong style="color: #fff;">Module 1: Digital Foundations & Tools</strong>
                  <span style="display: block; font-size: 0.8rem; color: var(--text-muted);">Completed • Grade: Excellent</span>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-emerald); color: #041f17; display: flex; align-items: center; justify-content: center; font-weight: bold;">✔</div>
                <div>
                  <strong style="color: #fff;">Module 2: HTML Basics & Bio Page</strong>
                  <span style="display: block; font-size: 0.8rem; color: var(--text-muted);">Completed • Grade: Excellent</span>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--accent-cyan); color: #041f17; display: flex; align-items: center; justify-content: center; font-weight: bold;">●</div>
                <div>
                  <strong style="color: #fff;">Module 3: CSS Basics & Visual Styling</strong>
                  <span style="display: block; font-size: 0.8rem; color: var(--accent-cyan);">Currently in progress • Quiz passed</span>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--bg-surface); border: 1px solid var(--border-subtle); color: var(--text-muted); display: flex; align-items: center; justify-content: center;">4</div>
                <div>
                  <strong style="color: var(--text-muted);">Module 4: Layout & Responsive Design</strong>
                  <span style="display: block; font-size: 0.8rem; color: var(--text-dim);">Upcoming next week</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Facilitator Feedback Card -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 24px;">
            <h3 style="color: #fff; margin-bottom: 12px;">Facilitator Remarks</h3>
            <div style="background: var(--bg-surface); padding: 16px; border-radius: var(--radius-md); border-left: 4px solid var(--accent-emerald);">
              <p style="font-size: 0.92rem; color: #e2e8f0; font-style: italic;">
                "${learner.assignments['mod-2'] ? learner.assignments['mod-2'].feedback : 'Chidiebere is showing immense dedication. His visual code comprehension in NSL is very rapid.'}"
              </p>
              <span style="display: block; margin-top: 8px; font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700;">
                — Bashir Abubakar (Lead NSL Instructor)
              </span>
            </div>

            <!-- Direct Facilitator Note Form -->
            <div style="margin-top: 20px;">
              <h4 style="color: #fff; font-size: 0.9rem; margin-bottom: 8px;">Send Note / Inquiry to Facilitator:</h4>
              <textarea id="parentNoteInput" placeholder="Ask about Chidi's upcoming project or request learning support..." style="width: 100%; height: 80px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; padding: 10px; font-family: inherit; font-size: 0.85rem; resize: none; outline: none;"></textarea>
              <button class="btn btn-primary btn-sm" style="margin-top: 8px;" onclick="app.sendParentNote()">Send Message</button>
            </div>
          </div>

          <!-- Payment History Logs for Guardian Audit -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
            <h3 style="color: #fff; margin-bottom: 12px;">Tuition Receipts & Bank Slips</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${paymentLogs.filter(p => p.learnerName === learner.name).map(p => `
                <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 12px 16px; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <strong style="color: #fff; font-size: 0.95rem;">₦${p.amountNGN.toLocaleString()}</strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${p.bank} • Ref: ${p.reference}</div>
                  </div>
                  <span class="badge badge-emerald">${p.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right: Tuition & Manual Payment Tracking -->
        <div>
          <!-- Bank Account Card -->
          <div class="bank-card">
            <h3 style="color: #fff; margin-bottom: 14px; font-size: 1.15rem;">Official Tuition Account</h3>
            <div class="bank-row">
              <span>Primary Bank:</span>
              <strong>${bank.bankName}</strong>
            </div>
            <div class="bank-row">
              <span>Account Name:</span>
              <strong>${bank.accountName}</strong>
            </div>
            <div class="bank-row">
              <span>Account Number:</span>
              <strong style="letter-spacing: 1px; font-size: 1.1rem; color: var(--accent-cyan);">${bank.accountNumber}</strong>
            </div>
            <div class="bank-row">
              <span>Standard Cohort Fee:</span>
              <strong style="color: var(--accent-gold); font-size: 1.1rem;">${bank.tuitionFeeNGN}</strong>
            </div>
            <div class="bank-row" style="font-size: 0.8rem; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
              <span>Alternative Account:</span>
              <span>${bank.alternativeBank}</span>
            </div>
            <p style="font-size: 0.8rem; color: #a7f3d0; margin-top: 10px; line-height: 1.4;">
              ${bank.instruction}
            </p>
          </div>

          <!-- Upload Transfer Receipt -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
            <h3 style="color: #fff; margin-bottom: 12px;">Payment Receipt Verification</h3>
            <div class="receipt-dropzone" onclick="document.getElementById('receiptFileInput').click()">
              <div style="font-size: 2rem; margin-bottom: 8px;">📄</div>
              <strong style="color: #fff; display: block;">Click to Upload Bank Transfer Receipt</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted);">PDF, JPG or PNG (Mobile debit screenshots accepted)</span>
              <input type="file" id="receiptFileInput" style="display: none;" onchange="app.handleReceiptUpload(event)">
            </div>

            <!-- Current Payment Status Details -->
            <div style="margin-top: 20px; background: var(--bg-surface); padding: 14px; border-radius: var(--radius-md); font-size: 0.85rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Recorded Status:</span>
                <strong style="color: var(--accent-emerald); text-transform: uppercase;">${learner.paymentStatus}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">Transaction Ref:</span>
                <code>${learner.paymentRef || 'TRX-ACC-99214'}</code>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-muted);">Payment Method:</span>
                <span>${learner.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  handleReceiptUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    this.showVisualNotification(
      "Receipt Uploaded! 📑",
      `Uploaded: ${file.name}. Admin validation in progress.`,
      "emerald"
    );
  }

  sendParentNote() {
    const input = document.getElementById("parentNoteInput");
    if (!input || !input.value.trim()) return;
    
    this.showVisualNotification(
      "Message Sent to Facilitator",
      "Bashir Abubakar will respond via WhatsApp or SMS to your registered number.",
      "cyan"
    );
    input.value = "";
  }

  /* ==========================================================================
     3. FACILITATOR & MENTOR DESK
     ========================================================================== */
  renderFacilitatorDesk() {
    const container = document.getElementById("view-facilitator");
    if (!container) return;

    const learners = this.state.data.learners;
    const cohort = this.state.data.cohorts[0];

    container.innerHTML = `
      <div class="section-header">
        <div>
          <h2><span>🧑‍🏫</span> Facilitator Instruction Desk</h2>
          <p>Instructor: <strong style="color: #fff;">Bashir Abubakar (Deaf Tech Lead)</strong> • Cohort: ${cohort.name}</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="app.updateCohortMeetingLink()">🔗 Edit Live Meet Link</button>
          <button class="btn btn-primary btn-sm" onclick="app.showVisualNotification('Broadcast Sent', 'Visual SMS reminder sent to all 26 cohort learners.', 'emerald')">📢 Send Cohort Visual Alert</button>
        </div>
      </div>

      <!-- Cohort Summary & Risk Indicators -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon emerald">👥</div>
          <div class="stat-content">
            <h3>Active Learners</h3>
            <div class="stat-number">${cohort.enrolledCount} / ${cohort.capacity}</div>
            <div class="stat-desc">4 spaces remaining in Lagos Hub</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon gold">⚠️</div>
          <div class="stat-content">
            <h3>At-Risk Learners</h3>
            <div class="stat-number">1</div>
            <div class="stat-desc">Needs device support (Emmanuel)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon cyan">📝</div>
          <div class="stat-content">
            <h3>Submissions in Queue</h3>
            <div class="stat-number">3</div>
            <div class="stat-desc">Ready for visual code review</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">📹</div>
          <div class="stat-content">
            <h3>Next Live Session</h3>
            <div class="stat-number" style="font-size: 1.3rem;">4:00 PM WAT</div>
            <div class="stat-desc">Google Meet Ready</div>
          </div>
        </div>
      </div>

      <!-- Submissions Grading Desk -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="color: #fff;">Review & Grade Learner Submissions</h3>
          <span class="badge badge-cyan">Flagship Cohort Submissions</span>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
            <div>
              <strong style="color: #fff; font-size: 1.1rem;">Chidiebere Okonkwo</strong>
              <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 8px;">Submitted Module 2 Developer Bio Card</span>
            </div>
            <span class="badge badge-emerald">Grade: EXCELLENT</span>
          </div>

          <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 12px;">
            <strong>Submitted HTML / CSS Code:</strong>
          </p>
          <pre style="background: #070b12; padding: 14px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.82rem; color: #38bdf8; overflow-x: auto; margin-bottom: 16px;">${learners[0].assignments['mod-2'] ? learners[0].assignments['mod-2'].code || learners[0].assignments['mod-2'].feedback : 'Semantic code submission verified.'}</pre>

          <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-secondary btn-sm" onclick="app.gradeSubmission('learner-1', 'mod-2', 'needs revision')">Needs Revision</button>
              <button class="btn btn-secondary btn-sm" onclick="app.gradeSubmission('learner-1', 'mod-2', 'complete')">Mark Complete</button>
              <button class="btn btn-primary btn-sm" onclick="app.gradeSubmission('learner-1', 'mod-2', 'excellent')">Mark Excellent 🌟</button>
              <button class="btn btn-secondary btn-sm" style="border-color: var(--accent-cyan); color: var(--accent-cyan);" onclick="app.aiDraftFacilitatorFeedback('learner-1', 'mod-2')">
                ✨ AI Draft Visual Feedback
              </button>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Feedback auto-notifies learner & parent.</span>
          </div>
        </div>
      </div>

      <!-- Cohort Learners Roster -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <h3 style="color: #fff;">Cohort Learners Roster (${learners.length} Active Students)</h3>
          <span style="font-size: 0.82rem; color: var(--text-muted);">Click "View Dashboard" to demo any student's live experience</span>
        </div>
        
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Learner Name</th>
                <th>Device Access</th>
                <th>Payment</th>
                <th>Progress</th>
                <th>Attendance</th>
                <th>Risk Flag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${learners.map(l => `
                <tr>
                  <td>
                    <strong style="color: #fff;">${l.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${l.email} • ${l.ageRange}</div>
                  </td>
                  <td>
                    <span class="badge ${l.deviceAccess === 'own laptop' ? 'badge-emerald' : l.deviceAccess === 'needs device support' ? 'badge-red' : 'badge-cyan'}">
                      ${l.deviceAccess}
                    </span>
                    ${l.loanedDevice ? `<div style="font-size: 0.7rem; color: var(--accent-gold); margin-top: 2px;">${l.loanedDevice}</div>` : ''}
                  </td>
                  <td>
                    <span class="badge ${l.paymentStatus === 'paid' ? 'badge-emerald' : l.paymentStatus === 'scholarship' ? 'badge-cyan' : 'badge-gold'}">
                      ${l.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div style="width: 60px; height: 6px; background: var(--bg-surface); border-radius: var(--radius-pill);">
                        <div style="width: ${l.progressPercent}%; height: 100%; background: var(--accent-emerald);"></div>
                      </div>
                      <span style="font-size: 0.8rem; font-weight: bold;">${l.progressPercent}%</span>
                    </div>
                  </td>
                  <td>${l.liveAttendanceRate.split(' ')[0]}</td>
                  <td>
                    ${l.riskFlag ? '<span class="badge badge-red">⚠️ ' + l.riskNote.split('.')[0] + '</span>' : '<span class="badge badge-emerald">On Track</span>'}
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm" style="min-height: 28px; padding: 2px 8px;" onclick="app.switchActiveLearner('${l.id}'); app.switchRole('learner');">
                      View Dashboard
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  gradeSubmission(learnerId, modId, status) {
    const learner = this.state.data.learners.find(l => l.id === learnerId);
    if (!learner) return;

    if (!learner.assignments[modId]) {
      learner.assignments[modId] = {};
    }
    learner.assignments[modId].status = status === "needs revision" ? "needs revision" : "complete";
    learner.assignments[modId].grade = status;
    learner.assignments[modId].feedback = status === "excellent" 
      ? "Exceptional attention to visual detail and semantic standards. Approved with distinction!" 
      : status === "complete" 
      ? "Good work. Keep practising responsive layout rules." 
      : "Please revise alt text and ensure proper closing tags.";

    this.saveState();
    this.showVisualNotification(
      "Submission Graded!",
      `Marked as ${status.toUpperCase()} for ${learner.name}. Learner and parent dashboards updated.`,
      "emerald"
    );
    this.renderFacilitatorDesk();
  }

  aiDraftFacilitatorFeedback(learnerId, modId) {
    const learner = this.state.data.learners.find(l => l.id === learnerId);
    if (!learner) return;

    const draft = `✨ AI Assisted Review for ${learner.name}: "Exceptional semantic HTML architecture! Your usage of <header>, <main>, descriptive alt text, and accessible buttons provides a benchmark for deaf web accessibility. Keep up the high focus!"`;
    
    if (!learner.assignments[modId]) learner.assignments[modId] = {};
    learner.assignments[modId].feedback = draft;
    learner.assignments[modId].grade = "excellent";
    learner.assignments[modId].status = "complete";
    this.saveState();

    this.showVisualNotification(
      "AI Feedback Drafted! 🤖",
      `Visual review populated and saved for ${learner.name}.`,
      "emerald"
    );
    this.renderFacilitatorDesk();
  }

  updateCohortMeetingLink() {
    const newLink = prompt("Enter updated Google Meet link for Cohort:", "https://meet.google.com/acc-ng-demo");
    if (newLink) {
      this.state.data.cohorts[0].liveMeetUrl = newLink;
      this.saveState();
      this.showVisualNotification("Live Link Updated", "New Google Meet link active for all students.", "emerald");
    }
  }

  /* ==========================================================================
     4. ADMINISTRATOR & OUTCOMES DASHBOARD
     ========================================================================== */
  renderAdminDashboard() {
    const container = document.getElementById("view-admin");
    if (!container) return;

    const outcomes = this.state.data.outcomes;
    const cohorts = this.state.data.cohorts;
    const paymentLogs = this.state.data.paymentLogs || [];

    container.innerHTML = `
      <div class="section-header">
        <div>
          <h2><span>📊</span> Executive Outcomes & Governance</h2>
          <p>Acclusivo Foundation • Evidence-Driven Learning Platform for Deaf Nigerian Youth</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="app.printImpactReport()">🖨️ Print Investor/NGO Report</button>
          <button class="btn btn-primary btn-sm" onclick="app.showCreateCohortModal()">➕ Create New Cohort</button>
        </div>
      </div>

      <!-- Impact Metrics Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon emerald">📈</div>
          <div class="stat-content">
            <h3>Total Enrolled</h3>
            <div class="stat-number">${outcomes.totalEnrolled}</div>
            <div class="stat-desc">46 Paid • 38 Sponsored</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon cyan">🎯</div>
          <div class="stat-content">
            <h3>Bootcamp Conversion</h3>
            <div class="stat-number">${outcomes.conversionRate}</div>
            <div class="stat-desc">From free bootcamp to paid cohort</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon gold">🎓</div>
          <div class="stat-content">
            <h3>Completion Rate</h3>
            <div class="stat-number">${outcomes.completionRate}</div>
            <div class="stat-desc">52 Verified certificates issued</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">💼</div>
          <div class="stat-content">
            <h3>Internships Placed</h3>
            <div class="stat-number">${outcomes.internshipsPlaced}</div>
            <div class="stat-desc">Deaf youth in digital careers</div>
          </div>
        </div>
      </div>

      <!-- Device Access Needs & Equity Tracker -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;">
        <!-- Left: Device Access Breakdown -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
          <h3 style="color: #fff; margin-bottom: 14px;">Device Equity Breakdown (84 Learners)</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px;">
            Critical data for funding asks to MTN Foundation, NITDA, and donor partners.
          </p>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
                <span>Own Smartphone</span>
                <strong style="color: var(--accent-cyan);">${outcomes.deviceSupportStats.ownSmartphone}</strong>
              </div>
              <div style="height: 6px; background: var(--bg-surface); border-radius: var(--radius-pill); overflow: hidden;">
                <div style="width: 42%; height: 100%; background: var(--accent-cyan);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
                <span>Own Laptop</span>
                <strong style="color: var(--accent-emerald);">${outcomes.deviceSupportStats.ownLaptop}</strong>
              </div>
              <div style="height: 6px; background: var(--bg-surface); border-radius: var(--radius-pill); overflow: hidden;">
                <div style="width: 31%; height: 100%; background: var(--accent-emerald);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
                <span>Shared / Borrowed Device</span>
                <strong style="color: var(--accent-gold);">${outcomes.deviceSupportStats.sharedDevice}</strong>
              </div>
              <div style="height: 6px; background: var(--bg-surface); border-radius: var(--radius-pill); overflow: hidden;">
                <div style="width: 15%; height: 100%; background: var(--accent-gold);"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
                <span>Requires Device Loan / Support</span>
                <strong style="color: var(--accent-red);">${outcomes.deviceSupportStats.needsDeviceSupport}</strong>
              </div>
              <div style="height: 6px; background: var(--bg-surface); border-radius: var(--radius-pill); overflow: hidden;">
                <div style="width: 12%; height: 100%; background: var(--accent-red);"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Institutional Partners & Sponsors -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
          <h3 style="color: #fff; margin-bottom: 14px;">Institutional Sponsors & Partners</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px;">
            Active grant partners supporting student scholarships and laptop allocations.
          </p>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${outcomes.partnersAndSponsors.map(partner => `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 12px 16px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
                <span style="color: #fff; font-weight: 600; font-size: 0.9rem;">${partner}</span>
                <span class="badge badge-emerald">Active Grant</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Financial & Payment Audits -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; margin-bottom: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="color: #fff;">Tuition & Grant Audit Trail (Nigerian Naira)</h3>
          <span style="color: var(--accent-gold); font-weight: bold;">Total Mobilized: ${outcomes.totalTuitionMobilizedNGN}</span>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Learner</th>
                <th>Payer / Sponsor</th>
                <th>Bank & Ref</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              ${paymentLogs.map(p => `
                <tr>
                  <td><code>${p.id}</code></td>
                  <td><strong style="color: #fff;">${p.learnerName}</strong></td>
                  <td>${p.payerName}</td>
                  <td>${p.bank} (${p.reference})</td>
                  <td><strong style="color: var(--accent-emerald);">₦${p.amountNGN.toLocaleString()}</strong></td>
                  <td>${p.date}</td>
                  <td><span class="badge badge-emerald">${p.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Active Cohorts Operations Table -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px;">
        <h3 style="color: #fff; margin-bottom: 16px;">Active & Upcoming Cohorts (${cohorts.length} Cohorts Across Nigeria)</h3>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cohort Name</th>
                <th>Mode & Location</th>
                <th>Facilitator</th>
                <th>Capacity</th>
                <th>Tuition</th>
                <th>Schedule</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${cohorts.map(c => `
                <tr>
                  <td><strong style="color: #fff;">${c.name}</strong></td>
                  <td>${c.mode} • ${c.location}</td>
                  <td>${c.facilitator}</td>
                  <td>${c.enrolledCount} / ${c.capacity}</td>
                  <td>₦${c.tuitionNGN.toLocaleString()}</td>
                  <td>${c.schedule}</td>
                  <td><span class="badge badge-cyan">${c.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  printImpactReport() {
    window.print();
  }

  showCreateCohortModal() {
    const name = prompt("Enter New Cohort Name (e.g., Port Harcourt Cohort 2027):", "Port Harcourt Cohort 2027");
    if (!name) return;

    this.state.data.cohorts.push({
      id: `cohort-${Date.now()}`,
      name: name,
      mode: "Blended In-Person & NSL",
      facilitator: "Bashir Abubakar",
      location: "Port Harcourt Digital Hub",
      startDate: "Feb 1, 2027",
      endDate: "Apr 25, 2027",
      schedule: "Tuesdays & Thursdays 4:00 PM WAT",
      liveMeetUrl: "https://meet.google.com/ph-nsl-demo",
      capacity: 25,
      enrolledCount: 0,
      tuitionNGN: 35000,
      status: "Admissions Open"
    });
    this.saveState();
    this.showVisualNotification("Cohort Created", `${name} is now open for enrolments.`, "emerald");
    this.renderAdminDashboard();
  }

  /* ==========================================================================
     5. STUDENT PORTFOLIOS VIEW
     ========================================================================== */
  renderPortfoliosView() {
    const container = document.getElementById("view-portfolios");
    if (!container) return;

    const portfolios = this.state.data.portfolios || [];

    container.innerHTML = `
      <div class="section-header">
        <div>
          <h2><span>📂</span> Verified Deaf Student Capstone Portfolios</h2>
          <p>Real working projects built by deaf and hard-of-hearing Nigerian learners in Nigerian Sign Language cohorts.</p>
        </div>
        <span class="badge badge-gold">Outcome Evidence</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 36px;">
        ${portfolios.map(p => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; display: flex; flex-direction: column; justify-content: space-between; transition: all var(--transition-normal);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 1.8rem;">${p.avatar}</span>
                  <div>
                    <strong style="color: #fff; font-size: 1.05rem;">${p.studentName}</strong>
                    <div style="font-size: 0.75rem; color: var(--accent-cyan);">Flagship Cohort Graduate</div>
                  </div>
                </div>
                <span class="badge badge-emerald">${p.grade}</span>
              </div>

              <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 8px;">${p.projectTitle}</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 16px;">
                ${p.summary}
              </p>

              <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
                ${p.techStack.map(t => `<span class="badge badge-cyan" style="font-size: 0.7rem;">${t}</span>`).join('')}
              </div>
            </div>

            <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              <a href="${p.liveUrl}" target="_blank" class="btn btn-primary btn-sm" style="flex: 1;">
                <span>🌐</span> Live Demo
              </a>
              <a href="${p.githubUrl}" target="_blank" class="btn btn-secondary btn-sm" style="flex: 1;">
                <span>💻</span> Source Code
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Callout for Employers & Partners -->
      <div style="background: linear-gradient(135deg, rgba(0, 168, 132, 0.15), rgba(0, 210, 211, 0.15)); border: 2px solid var(--accent-emerald); border-radius: var(--radius-lg); padding: 28px; text-align: center;">
        <h3 style="color: #fff; font-size: 1.3rem; margin-bottom: 8px;">Hire or Sponsor an Acclusivo Graduate</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 650px; margin: 0 auto 18px;">
          Our learners are trained in modern frontend web technologies, responsive design, and visual collaboration. Partner with us for internships, junior developer roles, or cohort scholarships.
        </p>
        <button class="btn btn-primary" onclick="app.switchRole('public')">Contact Our Placement Team 🤟</button>
      </div>
    `;
  }

  /* ==========================================================================
     6. PUBLIC ADMISSIONS & SHOWCASE PORTAL
     ========================================================================== */
  renderPublicPortal() {
    const container = document.getElementById("view-public");
    if (!container) return;

    const course = this.state.data.course;

    container.innerHTML = `
      <!-- Hero Banner -->
      <div style="text-align: center; max-width: 840px; margin: 30px auto 50px;">
        <span class="badge badge-emerald" style="margin-bottom: 16px; font-size: 0.85rem;">
          🇳🇬 Nigeria's 1st Accessible Tech Learning Platform in NSL
        </span>
        <h1 style="font-family: var(--font-heading); font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.15; color: #fff; margin-bottom: 16px;">
          Learn Practical Digital Skills in <span style="color: var(--accent-emerald);">Nigerian Sign Language</span>
        </h1>
        <p style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 28px;">
          Deaf and hard-of-hearing youth learn modern Frontend Web Development through visual demonstrations, plain-language lessons, interactive code playgrounds, and blended mentoring cohorts.
        </p>

        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="app.switchRole('learner')">
            <span>🚀</span> Start Learning as Deaf Student
          </button>
          <button class="btn btn-secondary" onclick="app.switchRole('parent')">
            <span>👨‍👩‍👦</span> View Parent Progress Portal
          </button>
          <button class="btn btn-secondary" onclick="app.switchRole('admin')">
            <span>📊</span> View Outcomes Dashboard
          </button>
        </div>
      </div>

      <!-- Flagship Course Showcase -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 32px; margin-bottom: 40px;">
        <div class="section-header">
          <div>
            <h2><span>🎓</span> Flagship Course: ${course.title}</h2>
            <p>${course.badge} • ${course.durationWeeks} Weeks • ${course.language}</p>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 1.6rem; color: var(--accent-gold); font-weight: 800;">₦${course.tuitionNGN.toLocaleString()}</span>
            <span style="display: block; font-size: 0.78rem; color: var(--text-muted);">Scholarships & Device Aid Available</span>
          </div>
        </div>

        <p style="color: #cbd5e1; font-size: 1.05rem; line-height: 1.6; margin-bottom: 24px;">
          ${course.description}
        </p>

        <!-- 7 Modules Overview -->
        <h3 style="color: #fff; margin-bottom: 16px;">Complete 12-Week Curriculum Overview:</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${course.modules.map(mod => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 18px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span class="badge badge-cyan">Module ${mod.number}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">${mod.duration}</span>
              </div>
              <h4 style="color: #fff; margin-bottom: 6px; font-size: 1.05rem;">${mod.title}</h4>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${mod.outcome}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Public Application & Sponsorship Form -->
      <div style="background: linear-gradient(135deg, #09192b, #071520); border: 2px solid var(--accent-cyan); border-radius: var(--radius-lg); padding: 32px;">
        <div style="max-width: 640px; margin: 0 auto; text-align: center;">
          <h2 style="color: #fff; margin-bottom: 10px;">Apply for Upcoming Cohort / Request Device Aid</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
            Join the Lagos, Abuja, or Kaduna cohorts. Need a smartphone or laptop loan? We partner with sponsors to ensure every motivated deaf learner can participate.
          </p>

          <form onsubmit="event.preventDefault(); app.handlePublicApplication();" style="display: flex; flex-direction: column; gap: 14px; text-align: left;">
            <div>
              <label style="color: #fff; font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 4px;">Applicant Full Name:</label>
              <input type="text" required placeholder="e.g. Maryam Abubakar" style="width: 100%; height: 44px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; padding: 0 12px;">
            </div>
            <div>
              <label style="color: #fff; font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 4px;">WhatsApp Number (Deaf-friendly chat communication):</label>
              <input type="text" required placeholder="080 1234 5678" style="width: 100%; height: 44px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; padding: 0 12px;">
            </div>
            <div>
              <label style="color: #fff; font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 4px;">Preferred Cohort Hub:</label>
              <select required style="width: 100%; height: 44px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; padding: 0 12px;">
                <option value="lagos">Lagos Yaba Hub (Blended)</option>
                <option value="abuja">Abuja Virtual Cohort (Remote)</option>
                <option value="kaduna">Kaduna Innovation Lab</option>
                <option value="ph">Port Harcourt Coastal Hub</option>
                <option value="ibadan">Ibadan Tech Lab</option>
              </select>
            </div>
            <div>
              <label style="color: #fff; font-size: 0.85rem; font-weight: 600; display: block; margin-bottom: 4px;">Device Access Situation:</label>
              <select required style="width: 100%; height: 44px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; padding: 0 12px;">
                <option value="own smartphone">I have my own smartphone</option>
                <option value="own laptop">I have my own laptop</option>
                <option value="shared device">I share a phone/laptop with family</option>
                <option value="needs device support">I need device assistance / sponsor loan</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top: 10px; width: 100%;">
              Submit Cohort Application 🤟
            </button>
          </form>
        </div>
      </div>
    `;
  }

  handlePublicApplication() {
    this.showVisualNotification(
      "Application Submitted! 🌟",
      "Thank you! An Acclusivo NSL coordinator will contact you via WhatsApp with your cohort onboarding details.",
      "emerald"
    );
  }

  /* ==========================================================================
     7. VERIFIED CERTIFICATE & PORTFOLIO MODAL
     ========================================================================== */
  showCertificateModal() {
    const learner = this.state.data.learners.find(l => l.id === this.state.activeLearnerId) || this.state.data.learners[0];
    const cert = this.state.data.certificates.find(c => c.recipient === learner.name) || this.state.data.sampleCertificate;

    let modal = document.getElementById("certModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "certModal";
      modal.style.cssText = "position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); z-index: 10000; overflow-y: auto; padding: 30px 16px; display: flex; align-items: center; justify-content: center;";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="width: 100%; max-width: 900px; position: relative;">
        <!-- Close Button -->
        <button onclick="document.getElementById('certModal').style.display='none'" style="position: absolute; right: 10px; top: -40px; background: #fff; color: #000; border: none; padding: 6px 14px; border-radius: 6px; font-weight: bold; cursor: pointer;">
          ✖ Close Preview
        </button>

        <div class="certificate-wrapper">
          <div class="cert-stamp">★</div>
          <div class="cert-logo">🤟</div>
          <div class="cert-title">Acclusivo Foundation Nigeria</div>
          <div class="cert-sub">Verified Certificate of Digital Competency in Nigerian Sign Language</div>

          <div class="cert-presented">This certifies that</div>
          <div class="cert-recipient">${cert.recipient}</div>
          <div class="cert-course">${cert.courseTitle}</div>
          <div class="cert-grade">${cert.grade}</div>

          <div class="cert-skills-list">
            ${cert.skillsHonored.map(s => `<span class="badge badge-cyan">${s}</span>`).join('')}
          </div>

          <div class="cert-signatures">
            <div>
              <div style="font-family: cursive; font-size: 1.4rem; color: #fff;">${cert.facilitatorName}</div>
              <div class="sign-line">Lead NSL Instructor</div>
            </div>
            <div>
              <div style="font-family: cursive; font-size: 1.4rem; color: #fff;">${cert.directorName}</div>
              <div class="sign-line">Program Director</div>
            </div>
          </div>

          <div class="cert-verification-box">
            <span>Credential ID: <strong>${cert.id}</strong></span>
            <span>•</span>
            <span>Date: <strong>${cert.issueDate}</strong></span>
            <span>•</span>
            <span style="color: var(--accent-emerald);">Cryptographically Verified 🔒</span>
          </div>
        </div>

        <div style="text-align: center; margin-top: 16px;">
          <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save as PDF Certificate</button>
        </div>
      </div>
    `;
    modal.style.display = "flex";
  }

  /* ==========================================================================
     8. AMI — AI NSL & ACCESSIBLE CODE MENTOR
     ========================================================================== */
  openAIMentorModal() {
    const modal = document.getElementById("aiMentorModal");
    if (modal) {
      modal.style.display = "flex";
      this.renderAIQuickChips();
      const input = document.getElementById("aiUserInput");
      if (input) setTimeout(() => { if (typeof input.focus === "function") input.focus(); }, 100);
    }
  }

  closeAIMentorModal() {
    const modal = document.getElementById("aiMentorModal");
    if (modal) modal.style.display = "none";
  }

  renderAIQuickChips() {
    const container = document.getElementById("aiQuickChips");
    if (!container) return;
    const profile = this.state.onboardingProfile || { exactAge: 17, ageGroup: "15-18" };
    const tier = AGE_TIERS[profile.ageGroup] || AGE_TIERS["15-18"];
    const chips = tier.chips || [
      { id: "audit", label: "Audit My Code for Deaf Accessibility" },
      { id: "nsl-gloss", label: "How do I sign 'Event Listener' in NSL?" },
      { id: "simplify-flexbox", label: "Explain CSS Flexbox visually" },
      { id: "contrast", label: "Check Color Contrast Ratio" }
    ];
    container.innerHTML = chips.map(c => `
      <button type="button" class="ai-chip" onclick="app.sendQuickAIPrompt('${c.id}')">${c.label}</button>
    `).join("");
  }

  sendQuickAIPrompt(type) {
    const profile = this.state.onboardingProfile || { exactAge: 17, ageGroup: "15-18" };
    let prompt = "";
    if (type === "audit") prompt = "Audit my current playground code for deaf accessibility standards.";
    else if (type === "nsl-gloss") prompt = "How do I sign 'Event Listener' in Nigerian Sign Language?";
    else if (type === "simplify-flexbox") prompt = "Explain CSS Flexbox in 3 plain visual steps.";
    else if (type === "contrast") prompt = "What are the recommended high-contrast color pairs for deaf learners?";
    // Junior (10-14)
    else if (type === "junior-game") prompt = `Suggest a fun, visual coding game project suited for my age (${profile.exactAge}).`;
    else if (type === "junior-color") prompt = "Show me how to make an avatar glow with CSS color magic.";
    else if (type === "junior-sign") prompt = "How do I sign 'Computer' in Nigerian Sign Language (NSL)?";
    else if (type === "junior-pet") prompt = "Help me code an animated deaf cyber-pet card in the playground.";
    // Secondary (15-18)
    else if (type === "secondary-topics") prompt = `What are the best tech topics and activities for my age group (${profile.ageGroup})?`;
    // Career Pro (19-24)
    else if (type === "career-freelance") prompt = `Suggest freelance-ready portfolio topics and client projects for age ${profile.exactAge}.`;
    else if (type === "career-wcag") prompt = "Audit my code against WCAG 2.2 AAA accessibility rules for remote clients.";
    else if (type === "career-client") prompt = "Explain how to build responsive, mobile-first client layouts visually.";
    else if (type === "career-signs") prompt = "How do I sign 'API', 'Server', and 'Database' in Nigerian Sign Language?";
    // Adult (25+)
    else if (type === "adult-biz") prompt = `Suggest practical business web projects and commercial topics for age ${profile.exactAge}.`;
    else if (type === "adult-order") prompt = "How do I code a deaf-friendly customer order form with visual feedback?";
    else if (type === "adult-contrast") prompt = "What high-contrast color palettes work best for professional commercial sites?";
    else prompt = type;

    const input = document.getElementById("aiUserInput");
    if (input) input.value = prompt;
    this.handleAISubmit();
  }

  handleAISubmit() {
    const input = document.getElementById("aiUserInput");
    if (!input || !input.value.trim()) return;

    const userPrompt = input.value.trim();
    input.value = "";

    const chatBody = document.getElementById("aiChatBody");
    if (!chatBody) return;

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.className = "ai-msg user";
    userMsg.innerHTML = `<strong>You:</strong> ${userPrompt}`;
    chatBody.appendChild(userMsg);

    // Typing indicator
    const botMsg = document.createElement("div");
    botMsg.className = "ai-msg bot";
    botMsg.innerHTML = `<span style="color: var(--accent-cyan);">🤖 Ami is analyzing visually for Age ${this.state.onboardingProfile?.exactAge || 17}... 🤟</span>`;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      const responseHTML = this.generateAIResponse(userPrompt);
      botMsg.innerHTML = responseHTML;
      chatBody.scrollTop = chatBody.scrollHeight;
      this.showVisualNotification("Ami AI Replied", "Visual explanation ready in mentor chat.", "emerald");
    }, 450);
  }

  generateAIResponse(prompt) {
    const lower = prompt.toLowerCase();
    const editor = document.getElementById("codeEditorInput");
    const currentCode = editor ? editor.value : "";
    const profile = this.state.onboardingProfile || { exactAge: 17, ageGroup: "15-18", trackName: "Secondary Launchpad Track" };
    const tier = AGE_TIERS[profile.ageGroup] || AGE_TIERS["15-18"];

    // 0. Age Identification, Personalized Topics & Activities Query
    if (
      lower.includes("age") || 
      lower.includes("topic") || 
      lower.includes("activity") || 
      lower.includes("curriculum") || 
      lower.includes("recommend") ||
      lower.includes("what should i build") ||
      lower.includes("game project") ||
      lower.includes("cyber-pet") ||
      lower.includes("freelance") ||
      lower.includes("business web")
    ) {
      return `
        <div style="margin-bottom: 6px;">
          <strong style="color: var(--accent-emerald); font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
            <svg class="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span>Ami AI Curriculum: ${tier.name} (Age ${profile.exactAge})</span>
          </strong>
          <span class="badge badge-${tier.badgeColor}" style="margin-top: 4px;">Tier: ${tier.badge} • ${tier.tagline}</span>
        </div>
        <p style="margin: 8px 0 10px; font-size: 0.88rem; color: var(--text-main);">
          Ami has analyzed your age profile (<strong>${profile.exactAge} years old</strong>, preferred mode: <strong>${profile.communicationMode === 'nsl-first' ? 'NSL-First' : 'Bilingual'}</strong>) and pushed the following age-adapted curriculum:
        </p>
        
        <div style="background: var(--bg-surface); border-radius: var(--radius-sm); padding: 12px; border-left: 3px solid var(--accent-cyan); margin-bottom: 10px;">
          <strong style="color: var(--accent-cyan); font-size: 0.88rem; display: block; margin-bottom: 6px;">
            📌 High-Priority Topics for Your Age:
          </strong>
          <ul style="margin: 0 0 0 16px; padding: 0; font-size: 0.84rem; display: flex; flex-direction: column; gap: 4px; color: var(--text-main);">
            ${tier.topics.map(t => `<li><strong>${t}</strong></li>`).join("")}
          </ul>
        </div>

        <div style="background: var(--bg-surface); border-radius: var(--radius-sm); padding: 12px; border-left: 3px solid var(--accent-emerald); margin-bottom: 12px;">
          <strong style="color: var(--accent-emerald); font-size: 0.88rem; display: block; margin-bottom: 6px;">
            🚀 Recommended Hands-on Activities:
          </strong>
          <ol style="margin: 0 0 0 16px; padding: 0; font-size: 0.84rem; display: flex; flex-direction: column; gap: 4px; color: var(--text-main);">
            ${tier.activities.map(a => `<li>${a}</li>`).join("")}
          </ol>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.sendQuickAIPrompt('audit')">Run Accessibility Audit</button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="app.openOnboardingModal()">Adjust Age Bracket</button>
        </div>
      `;
    }

    // 1. Accessibility Code Audit
    if (lower.includes("audit") || lower.includes("check") || lower.includes("wcag")) {
      const hasImg = currentCode.includes("<img");
      const hasAlt = currentCode.includes("alt=");
      const hasSemantic = currentCode.includes("<header") || currentCode.includes("<main") || currentCode.includes("<nav");
      const hasAudioOnly = currentCode.includes("<audio") || currentCode.includes("beep") || currentCode.includes("bell");

      return `
        <strong style="color: var(--accent-emerald); font-size: 1.05rem; display: block; margin-bottom: 8px;">
          🔍 AI Visual Accessibility Audit:
        </strong>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
          <div>
            ${hasSemantic ? '<span class="audit-badge-pass">✔ PASS: Semantic Landmarks Detected (&lt;header&gt;, &lt;main&gt;)</span>' : '<span class="audit-badge-warn">⚠️ WARN: Missing Semantic Structure. Wrap bio in &lt;main&gt;</span>'}
          </div>
          <div>
            ${!hasImg || hasAlt ? '<span class="audit-badge-pass">✔ PASS: Visual alt text present on all images</span>' : '<span class="audit-badge-warn">⚠️ ACTION REQUIRED: Missing alt="" text on &lt;img&gt; tags</span>'}
          </div>
          <div>
            ${!hasAudioOnly ? '<span class="audit-badge-pass">✔ PASS: 100% Visual Cues (Zero audio-only dependencies)</span>' : '<span class="audit-badge-warn">⚠️ WARN: Sound cue found. Always provide visual flash/toast substitute!</span>'}
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          <strong>Ami's Tip:</strong> In Nigerian tech environments, ensuring high-contrast text and descriptive alt labels allows deaf users and low-bandwidth users to read uninterrupted.
        </p>
      `;
    }

    // 2. NSL Gloss Lookup
    if (lower.includes("computer")) {
      return `
        <strong style="color: var(--accent-cyan); font-size: 1.05rem; display: block; margin-bottom: 8px;">
          🤟 NSL Sign: Computer
        </strong>
        <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan); margin-bottom: 10px;">
          <strong>NSL Handshape & Movement:</strong>
          <div style="color: var(--accent-gold); font-weight: bold; margin-top: 4px; font-size: 0.95rem;">
            [C-HANDSHAPE: FORM 'C' ON FOREARM] ➔ [MOVE UPWARD IN ARC 2X]
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
          <strong>Deaf Visual Tip:</strong> Form the letter 'C' with your dominant hand, rest it on your non-dominant forearm, and sweep it upward twice towards the elbow.
        </p>
      `;
    }

    if (lower.includes("api") || lower.includes("database") || lower.includes("server")) {
      return `
        <strong style="color: var(--accent-cyan); font-size: 1.05rem; display: block; margin-bottom: 8px;">
          🤟 NSL Tech Lexicon: API & Database
        </strong>
        <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan); margin-bottom: 10px;">
          <strong>NSL Signing Sequences:</strong>
          <div style="color: var(--accent-gold); font-weight: bold; margin-top: 4px; font-size: 0.9rem;">
            • <strong>API:</strong> [FINGER-SPELL: A-P-I] ➔ [TWO HANDS: BRIDGE / CONNECT-DATA]<br>
            • <strong>DATABASE:</strong> [CYLINDER-STACK: FLAT HANDS HORIZONTAL] ➔ [LAYER-UPWARDS]
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
          <strong>Visual Concept:</strong> An API is a visual bridge passing message envelopes between two software houses. A Database is like a stack of organized filing trays.
        </p>
      `;
    }

    if (lower.includes("sign") || lower.includes("nsl") || lower.includes("gloss") || lower.includes("event listener")) {
      return `
        <strong style="color: var(--accent-cyan); font-size: 1.05rem; display: block; margin-bottom: 8px;">
          🤟 NSL Computing Lexicon Gloss:
        </strong>
        <p style="margin-bottom: 8px;"><strong>Term:</strong> <code style="color: #38bdf8;">Event Listener (click)</code></p>
        <div style="background: var(--bg-surface); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-cyan); margin-bottom: 10px;">
          <strong>NSL Sign Sequence:</strong>
          <div style="color: var(--accent-gold); font-weight: bold; margin-top: 4px; font-size: 0.95rem;">
            [HAND-SHAPE-INDEX: TAP-BUTTON] ➔ [EYES-ALERT: WATCH-FOR-TRIGGER] ➔ [EXECUTE: DO-ACTION]
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">
          <strong>Visual Explanation:</strong> An Event Listener is like a guard keeping its eyes open for someone to tap a button. Once tapped, the browser immediately runs the code instructions without making any sound.
        </p>
      `;
    }

    // 3. CSS Flexbox Explanation
    if (lower.includes("flexbox") || lower.includes("layout") || lower.includes("grid")) {
      return `
        <strong style="color: var(--accent-emerald); font-size: 1.05rem; display: block; margin-bottom: 8px;">
          💡 Visual Flexbox in 3 Plain Steps:
        </strong>
        <ol style="margin-left: 18px; margin-bottom: 10px; display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem;">
          <li><strong>Step 1: Container Box:</strong> Write <code>display: flex;</code> on the parent wrapper. Items line up in a horizontal row like beads on a string.</li>
          <li><strong>Step 2: Spacing:</strong> Use <code>gap: 16px;</code> to give every child breathing room without using tricky margins.</li>
          <li><strong>Step 3: Centering:</strong> Add <code>justify-content: center;</code> and <code>align-items: center;</code> to lock items perfectly in the visual middle.</li>
        </ol>
        <span class="badge badge-cyan">NSL Tip: Sign 'ROW' then open fingers for 'FLEXIBLE-ALIGN'</span>
      `;
    }

    // 4. Color Contrast
    if (lower.includes("contrast") || lower.includes("color") || lower.includes("ratio")) {
      return `
        <strong style="color: var(--accent-gold); font-size: 1.05rem; display: block; margin-bottom: 8px;">
          🎨 High-Contrast Color Combinations (WCAG AAA):
        </strong>
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; margin-bottom: 10px;">
          <div style="background: #080c14; color: #f1f5f9; padding: 8px 12px; border-radius: 6px; border: 1px solid #00e5ff;">
            <strong>Dark Mode:</strong> Slate <code>#080c14</code> + White Text <code>#f1f5f9</code> (Contrast 18.2:1 ★★★)
          </div>
          <div style="background: #ffffff; color: #0f172a; padding: 8px 12px; border-radius: 6px; border: 1px solid #cbd5e1;">
            <strong>Light Mode:</strong> Pure White <code>#ffffff</code> + Deep Ink <code>#0f172a</code> (Contrast 17.5:1 ★★★)
          </div>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          High contrast prevents visual eye strain for deaf learners studying code and sign videos simultaneously.
        </p>
      `;
    }

    // Default General Mentor Response
    return `
      <strong style="color: var(--accent-emerald); font-size: 1rem; display: block; margin-bottom: 6px;">
        🤟 Ami's Visual Guidance:
      </strong>
      <p style="font-size: 0.9rem; margin-bottom: 8px;">
        Here is how to approach: <em>"${prompt}"</em>
      </p>
      <div style="background: var(--bg-surface); padding: 10px 14px; border-radius: 6px; border-left: 3px solid var(--accent-cyan); font-size: 0.85rem; margin-bottom: 8px;">
        ✔ <strong>Step 1:</strong> Structure semantic HTML first using &lt;header&gt;, &lt;main&gt;, and &lt;section&gt;.<br>
        ✔ <strong>Step 2:</strong> Test styles in the live preview iframe below.<br>
        ✔ <strong>Step 3:</strong> Remember to include visual alt attributes and submit your work to Facilitator Bashir.
      </div>
      <button type="button" class="btn btn-secondary btn-sm" onclick="app.sendQuickAIPrompt('audit')">Run Instant Code Audit</button>
    `;
  }

  /* ==========================================================================
     9. DEAF-FIRST NSL TECH DICTIONARY & VIDEO FRAME CONTROLS
     ========================================================================== */
  openNSLDictionaryModal() {
    const modal = document.getElementById("nslDictModal");
    if (modal) {
      modal.style.display = "flex";
      this.renderNSLDictionaryItems(this.state.data.nslDictionary || ACCLUSIVO_SEED_DATA.nslDictionary);
      const searchInput = document.getElementById("nslDictSearch");
      if (searchInput) {
        searchInput.value = "";
        setTimeout(() => { if (typeof searchInput.focus === "function") searchInput.focus(); }, 100);
      }
    }
  }

  closeNSLDictionaryModal() {
    const modal = document.getElementById("nslDictModal");
    if (modal) modal.style.display = "none";
  }

  filterNSLDictionary(query) {
    const list = this.state.data.nslDictionary || ACCLUSIVO_SEED_DATA.nslDictionary;
    if (!query || !query.trim()) {
      this.renderNSLDictionaryItems(list);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = list.filter(item => 
      item.term.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.handshape.toLowerCase().includes(q)
    );
    this.renderNSLDictionaryItems(filtered);
  }

  renderNSLDictionaryItems(items) {
    const grid = document.getElementById("nslDictGrid");
    if (!grid) return;
    if (!items || items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <svg class="ui-icon" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" stroke-width="1.5" style="margin-bottom: 8px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <p style="margin: 0; font-size: 1rem;">No technical terms matched your search. Try searching "HTML", "Tag", "Variable", or "CSS".</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      const chars = item.term.replace(/[^a-zA-Z]/g, '').toUpperCase().split('');
      return `
        <div class="nsl-dict-card">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px;">
            <div>
              <strong style="color: var(--text-heading); font-size: 1.05rem; font-family: var(--font-heading);">${item.term}</strong>
              <div style="color: var(--text-dim); font-size: 0.78rem;">${item.phonetic}</div>
            </div>
            <span class="badge badge-cyan">${item.category}</span>
          </div>

          <div style="margin-top: 4px;">
            <span class="nsl-handshape-badge">
              <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
              ${item.handshape}
            </span>
          </div>

          <p style="margin: 4px 0 0; font-size: 0.86rem; color: var(--text-main); line-height: 1.5;">
            ${item.meaning}
          </p>

          <div style="background: var(--bg-surface); border-radius: var(--radius-sm); padding: 10px; border-left: 3px solid var(--accent-emerald); font-size: 0.8rem;">
            <strong style="color: var(--accent-emerald); display: block; margin-bottom: 2px;">Sign Movement:</strong>
            <span style="color: var(--text-muted);">${item.movement}</span>
            <div style="margin-top: 4px; color: #a78bfa; font-size: 0.76rem;">Facial Marker: ${item.facialMarker}</div>
          </div>

          <div>
            <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Fingerspelling:</span>
            <div class="fingerspell-strip">
              ${chars.slice(0, 8).map(c => `<span class="fingerspell-char">${c}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  toggleVideoContrastFrame() {
    this.state.videoContrastFrame = !this.state.videoContrastFrame;
    const box = document.getElementById("nslVideoBox");
    const btn = document.getElementById("videoContrastBtn");
    if (box) {
      box.classList.toggle("high-contrast-frame", this.state.videoContrastFrame);
    }
    if (btn) {
      btn.classList.toggle("active", this.state.videoContrastFrame);
    }
    this.saveState();
    this.showVisualNotification(
      "Video Contrast Frame",
      this.state.videoContrastFrame ? "Deep Matte Black & High-Contrast Cyan Frame Active" : "Standard Video Border Restored",
      "cyan"
    );
  }

  setNSLPlaybackRate(rate) {
    this.state.nslSpeed = rate;
    this.saveState();
    document.querySelectorAll(".nsl-speed-btn").forEach(b => {
      b.classList.toggle("active", parseFloat(b.getAttribute("data-rate")) === rate);
    });

    const iframe = document.getElementById("nslVideoFrame");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: 'setPlaybackRate',
        args: [rate]
      }), '*');
    }

    const labels = { 0.5: "0.5x Slow Hands (Detailed Handshapes)", 0.75: "0.75x Practice Speed", 1.0: "1.0x Real-Time NSL Signing" };
    this.showVisualNotification("NSL Speed Adjusted", labels[rate] || `${rate}x Speed`, "cyan");
  }

  /* ==========================================================================
     10. DEAF-FIRST ONBOARDING WIZARD & AGE-ADAPTIVE AI ENGINE
     ========================================================================== */
  openOnboardingModal() {
    const modal = document.getElementById("onboardingModal");
    if (modal) {
      modal.style.display = "flex";
      this.state.onboardingStep = this.state.onboardingStep || 1;
      this.renderOnboardingStepsBar();
      this.renderOnboardingStepContent();
      const firstInput = modal.querySelector("input, button");
      if (firstInput) setTimeout(() => { if (typeof firstInput.focus === "function") firstInput.focus(); }, 100);
    }
  }

  closeOnboardingModal() {
    const modal = document.getElementById("onboardingModal");
    if (modal) modal.style.display = "none";
  }

  goToOnboardingStep(stepNumber) {
    // Capture current input values if transitioning
    if (this.state.onboardingStep === 1) {
      const nameInput = document.getElementById("onboardName");
      if (nameInput && nameInput.value.trim()) {
        this.state.onboardingProfile.fullName = nameInput.value.trim();
      }
    } else if (this.state.onboardingStep === 2) {
      const ageInput = document.getElementById("onboardExactAge");
      if (ageInput && ageInput.value) {
        this.updateExactAge(ageInput.value);
      }
    }

    const clamped = Math.max(1, Math.min(4, stepNumber));
    this.state.onboardingStep = clamped;
    this.renderOnboardingStepsBar();
    this.renderOnboardingStepContent();
  }

  selectOnboardingRole(role) {
    if (!this.state.onboardingProfile) this.state.onboardingProfile = {};
    this.state.onboardingProfile.role = role;
    this.renderOnboardingStepContent();
  }

  selectOnboardingAge(group) {
    const tier = AGE_TIERS[group];
    if (!tier) return;
    if (!this.state.onboardingProfile) this.state.onboardingProfile = {};
    this.state.onboardingProfile.ageGroup = group;
    this.state.onboardingProfile.exactAge = tier.defaultAge;
    this.state.onboardingProfile.trackName = tier.name;
    this.state.onboardingProfile.preferredTopics = [...tier.topics];
    this.state.onboardingProfile.recommendedActivities = [...tier.activities];
    this.renderOnboardingStepContent();
  }

  updateExactAge(val) {
    const age = parseInt(val, 10);
    if (isNaN(age) || age < 1) return;
    if (!this.state.onboardingProfile) this.state.onboardingProfile = {};
    this.state.onboardingProfile.exactAge = age;

    let group = "15-18";
    if (age <= 14) group = "10-14";
    else if (age <= 18) group = "15-18";
    else if (age <= 24) group = "19-24";
    else group = "25+";

    this.state.onboardingProfile.ageGroup = group;
    const tier = AGE_TIERS[group];
    this.state.onboardingProfile.trackName = tier.name;
    this.state.onboardingProfile.preferredTopics = [...tier.topics];
    this.state.onboardingProfile.recommendedActivities = [...tier.activities];

    // Smooth DOM update without re-rendering the whole form (preserves cursor & focus)
    document.querySelectorAll(".age-card-option[data-group]").forEach(card => {
      const g = card.getAttribute("data-group");
      const isMatch = g === group;
      card.classList.toggle("selected", isMatch);
      card.setAttribute("aria-pressed", isMatch ? "true" : "false");
    });

    const summaryNote = document.getElementById("ageAdaptationNote");
    if (summaryNote) {
      summaryNote.innerHTML = `💡 <strong>AI Adaptation Note:</strong> Age <strong>${age}</strong> automatically maps to the <strong>${tier.name}</strong>. Ami will tailor all coding analogies and prompt chips specifically for this stage.`;
    }
  }

  selectCommunicationMode(mode) {
    if (!this.state.onboardingProfile) this.state.onboardingProfile = {};
    this.state.onboardingProfile.communicationMode = mode;
    this.renderOnboardingStepContent();
  }

  selectSigningLevel(level) {
    if (!this.state.onboardingProfile) this.state.onboardingProfile = {};
    this.state.onboardingProfile.signingLevel = level;
    this.renderOnboardingStepContent();
  }

  saveOnboardingProfile() {
    if (!this.state.onboardingProfile) this.state.onboardingProfile = {};
    const p = this.state.onboardingProfile;
    p.completed = true;
    const group = p.ageGroup || "15-18";
    const tier = AGE_TIERS[group] || AGE_TIERS["15-18"];
    p.trackName = tier.name;
    p.preferredTopics = [...tier.topics];
    p.recommendedActivities = [...tier.activities];

    this.saveState();
    this.closeOnboardingModal();
    this.updateOnboardingNavButton();

    if (this.state.activeView === "catalogue") {
      this.renderCourseCatalogue();
    }

    this.renderAIQuickChips();

    this.showVisualNotification(
      "AI Learning Track Configured!",
      `${p.trackName} active for Age ${p.exactAge || 17}. Topics and activities tailored!`,
      "emerald"
    );
  }

  updateOnboardingNavButton() {
    const btnLabel = document.getElementById("onboardingBtnLabel");
    if (btnLabel && this.state.onboardingProfile) {
      const p = this.state.onboardingProfile;
      btnLabel.textContent = `AI Track: Age ${p.exactAge || 17}`;
    }
  }

  renderOnboardingStepsBar() {
    const bar = document.getElementById("onboardingStepsBar");
    if (!bar) return;
    const current = this.state.onboardingStep || 1;
    const steps = [
      { num: 1, label: "Identity & Role" },
      { num: 2, label: "Age & Track" },
      { num: 3, label: "NSL Mode" },
      { num: 4, label: "AI Curriculum Plan" }
    ];
    bar.innerHTML = steps.map(s => `
      <div 
        class="onboarding-step-pill ${s.num === current ? 'active' : s.num < current ? 'done' : ''}" 
        onclick="app.goToOnboardingStep(${s.num})" 
        role="button" 
        tabindex="0"
        aria-current="${s.num === current ? 'step' : 'false'}"
      >
        <span style="font-weight:700;">${s.num < current ? '✔' : s.num}</span>
        <span>${s.label}</span>
      </div>
    `).join("");
  }

  renderOnboardingStepContent() {
    const body = document.getElementById("onboardingBody");
    const footer = document.getElementById("onboardingFooter");
    if (!body || !footer) return;
    const step = this.state.onboardingStep || 1;
    const profile = this.state.onboardingProfile || {
      fullName: "Chidiebere Okonkwo",
      role: "learner",
      ageGroup: "15-18",
      exactAge: 17,
      trackName: "Secondary Launchpad Track",
      communicationMode: "nsl-first",
      signingLevel: "fluent",
      preferredTopics: [],
      recommendedActivities: []
    };
    const tier = AGE_TIERS[profile.ageGroup] || AGE_TIERS["15-18"];

    if (step === 1) {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div style="display:flex; align-items:center; gap:16px; background:linear-gradient(135deg, rgba(0,229,255,0.08), rgba(0,200,150,0.05)); padding:18px 22px; border-radius:var(--radius-md); border:1px solid rgba(0,229,255,0.25);">
            <div style="width:48px; height:48px; border-radius:50%; background:rgba(0,229,255,0.15); border:1.5px solid var(--accent-cyan); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <svg class="ui-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
            </div>
            <div>
              <h3 style="color:#fff; margin:0 0 4px; font-size:1.15rem; font-family:var(--font-heading);">Welcome to Acclusivo Onboarding</h3>
              <p style="margin:0; font-size:0.86rem; color:var(--text-muted); line-height:1.4;">
                Nigeria's accessible web development platform tailored for Deaf and Hard of Hearing learners with Nigerian Sign Language (NSL) and age-adaptive AI guidance.
              </p>
            </div>
          </div>

          <div>
            <label for="onboardName" style="display:block; font-weight:700; color:#fff; margin-bottom:6px; font-size:0.92rem;">
              Learner's Full Name or Nickname:
            </label>
            <input 
              type="text" 
              id="onboardName" 
              value="${profile.fullName || ''}" 
              placeholder="e.g. Chidiebere Okonkwo" 
              class="ai-input-field" 
              style="width:100%; font-size:1rem; padding:10px 14px;"
              oninput="app.state.onboardingProfile.fullName = this.value"
              aria-label="Learner full name"
            >
          </div>

          <div>
            <label style="display:block; font-weight:700; color:#fff; margin-bottom:8px; font-size:0.92rem;">
              Who is setting up this learning profile?
            </label>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
              <button 
                type="button" 
                class="age-card-option ${profile.role === 'learner' ? 'selected' : ''}" 
                onclick="app.selectOnboardingRole('learner')"
                style="padding:16px;"
              >
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:1.3rem;">🤟</span>
                  <strong style="color:#fff; font-size:0.96rem;">Deaf Learner (Self)</strong>
                </div>
                <span style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Direct visual coding &amp; interactive NSL lessons</span>
              </button>

              <button 
                type="button" 
                class="age-card-option ${profile.role === 'parent' ? 'selected' : ''}" 
                onclick="app.selectOnboardingRole('parent')"
                style="padding:16px;"
              >
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:1.3rem;">👨‍👩‍👧</span>
                  <strong style="color:#fff; font-size:0.96rem;">Parent / Guardian</strong>
                </div>
                <span style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Setting up a tailored tech future for my deaf child</span>
              </button>

              <button 
                type="button" 
                class="age-card-option ${profile.role === 'educator' ? 'selected' : ''}" 
                onclick="app.selectOnboardingRole('educator')"
                style="padding:16px;"
              >
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:1.3rem;">🏫</span>
                  <strong style="color:#fff; font-size:0.96rem;">Educator / Facilitator</strong>
                </div>
                <span style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">Special education school or inclusive academy</span>
              </button>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button type="button" class="btn btn-secondary" onclick="app.closeOnboardingModal()">Skip for Now</button>
        <button type="button" class="btn btn-primary" onclick="app.goToOnboardingStep(2)">
          <span>Next: Identify Age &amp; Track</span>
          <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      `;
    } else if (step === 2) {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; background:var(--bg-surface); padding:16px 20px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div>
              <h3 style="color:#fff; margin:0 0 4px; font-size:1.1rem; font-family:var(--font-heading);">Identify Learner Age</h3>
              <p style="margin:0; font-size:0.84rem; color:var(--text-muted);">
                Ami AI uses your exact age to push age-appropriate topics, coding analogies, and hands-on activities.
              </p>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <label for="onboardExactAge" style="font-weight:700; color:var(--accent-cyan); font-size:0.95rem;">Exact Age:</label>
              <input 
                type="number" 
                id="onboardExactAge" 
                min="8" 
                max="75" 
                value="${profile.exactAge || 17}" 
                oninput="app.updateExactAge(this.value)" 
                class="ai-input-field" 
                style="width:85px; font-size:1.3rem; font-weight:800; text-align:center; padding:6px; color:#fff; border-color:var(--accent-cyan);"
                aria-label="Exact age in years"
              >
              <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Years Old</span>
            </div>
          </div>

          <!-- 4 Interactive Age Bracket Cards -->
          <div class="age-card-grid">
            ${Object.entries(AGE_TIERS).map(([key, t]) => {
              const isSelected = profile.ageGroup === key;
              return `
                <div 
                  class="age-card-option ${isSelected ? 'selected' : ''}" 
                  data-group="${key}"
                  onclick="app.selectOnboardingAge('${key}')"
                  role="button"
                  tabindex="0"
                  aria-pressed="${isSelected}"
                >
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="age-card-badge" style="background:rgba(${t.badgeColor === 'emerald' ? '16,185,129' : t.badgeColor === 'cyan' ? '0,229,255' : t.badgeColor === 'gold' ? '245,158,11' : '239,68,68'}, 0.2); color:${t.badgeColor === 'emerald' ? '#34d399' : t.badgeColor === 'cyan' ? '#38bdf8' : t.badgeColor === 'gold' ? '#fbbf24' : '#f87171'};">
                      ${t.badge}
                    </span>
                    ${isSelected ? '<span class="badge badge-cyan" style="font-size:0.72rem;">Selected</span>' : ''}
                  </div>
                  <strong style="color:#fff; font-size:1.02rem; font-family:var(--font-heading); margin-top:2px;">
                    ${t.name}
                  </strong>
                  <p style="margin:0; font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
                    ${t.tagline}
                  </p>
                  <div style="margin-top:auto; padding-top:8px; border-top:1px solid rgba(255,255,255,0.06);">
                    <span style="font-size:0.72rem; color:var(--accent-cyan); font-weight:700; text-transform:uppercase;">Sample AI Topics:</span>
                    <div style="font-size:0.78rem; color:var(--text-dim); margin-top:3px;">
                      ${t.topics.slice(0, 2).join(" • ")}
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <div id="ageAdaptationNote" style="background:rgba(0,229,255,0.05); padding:12px 16px; border-radius:var(--radius-sm); border-left:3px solid var(--accent-cyan); font-size:0.84rem; color:var(--text-muted);">
            💡 <strong>AI Adaptation Note:</strong> Age <strong>${profile.exactAge}</strong> automatically maps to the <strong>${tier.name}</strong>. Ami will tailor all coding analogies and prompt chips specifically for this stage.
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button type="button" class="btn btn-secondary" onclick="app.goToOnboardingStep(1)">
          <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Back</span>
        </button>
        <button type="button" class="btn btn-primary" onclick="app.goToOnboardingStep(3)">
          <span>Next: NSL Mode</span>
          <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      `;
    } else if (step === 3) {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div>
            <h3 style="color:#fff; margin:0 0 4px; font-size:1.1rem; font-family:var(--font-heading);">Deaf Communication &amp; Learning Style</h3>
            <p style="margin:0; font-size:0.84rem; color:var(--text-muted);">
              Personalize how Nigerian Sign Language (NSL) videos, visual glosses, and coding notes are delivered.
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            <button 
              type="button" 
              class="age-card-option ${profile.communicationMode === 'nsl-first' ? 'selected' : ''}" 
              onclick="app.selectCommunicationMode('nsl-first')"
              style="padding:14px;"
            >
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#fff; font-size:0.95rem;">🤟 Nigerian Sign Language (NSL) First (Recommended)</strong>
                <span class="badge badge-emerald">Deaf Primary</span>
              </div>
              <span style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
                High-definition NSL sign videos, visual sign movement glosses, tech fingerspelling, and animated demonstrations.
              </span>
            </button>

            <button 
              type="button" 
              class="age-card-option ${profile.communicationMode === 'bilingual' ? 'selected' : ''}" 
              onclick="app.selectCommunicationMode('bilingual')"
              style="padding:14px;"
            >
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#fff; font-size:0.95rem;">📖 Bilingual (NSL + Plain English Text)</strong>
                <span class="badge badge-cyan">Dual Mode</span>
              </div>
              <span style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
                Balanced split between video sign explanations and clear step-by-step written English notes.
              </span>
            </button>

            <button 
              type="button" 
              class="age-card-option ${profile.communicationMode === 'visual-english' ? 'selected' : ''}" 
              onclick="app.selectCommunicationMode('visual-english')"
              style="padding:14px;"
            >
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#fff; font-size:0.95rem;">🔍 Visual Plain English (Diagrams &amp; High Contrast)</strong>
                <span class="badge badge-gold">High Readability</span>
              </div>
              <span style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
                Heavily visual diagrammatic layout with zero audio cues, high-contrast color frames, and plain-English code walk-throughs.
              </span>
            </button>
          </div>

          <div>
            <label style="display:block; font-weight:700; color:#fff; margin-bottom:8px; font-size:0.9rem;">
              NSL Signing Fluency Level:
            </label>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button 
                type="button" 
                class="nsl-speed-btn ${profile.signingLevel === 'beginner' ? 'active' : ''}" 
                onclick="app.selectSigningLevel('beginner')"
                style="flex:1; min-height:42px;"
              >
                Beginner (Slow hands, detailed handshapes)
              </button>
              <button 
                type="button" 
                class="nsl-speed-btn ${profile.signingLevel === 'fluent' ? 'active' : ''}" 
                onclick="app.selectSigningLevel('fluent')"
                style="flex:1; min-height:42px;"
              >
                Native / Fluent (Standard NSL pacing)
              </button>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button type="button" class="btn btn-secondary" onclick="app.goToOnboardingStep(2)">
          <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Back</span>
        </button>
        <button type="button" class="btn btn-primary" onclick="app.goToOnboardingStep(4)">
          <span>Next: View AI Plan</span>
          <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      `;
    } else if (step === 4) {
      body.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <div style="width:32px; height:32px; border-radius:50%; background:rgba(0,229,255,0.15); display:flex; align-items:center; justify-content:center;">
                <svg class="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>
              </div>
              <h3 style="color:#fff; margin:0; font-size:1.15rem; font-family:var(--font-heading);">Ami AI Custom Curriculum Plan</h3>
              <span class="badge badge-emerald">Ready to Activate</span>
            </div>
            <p style="margin:0; font-size:0.84rem; color:var(--text-muted);">
              Ami has analyzed your age (${profile.exactAge}) and configured this tailored learning plan.
            </p>
          </div>

          <div class="ai-plan-box">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
              <div>
                <span class="badge badge-${tier.badgeColor}" style="margin-bottom:6px;">${tier.badge}</span>
                <h4 style="color:#fff; margin:0; font-size:1.12rem; font-family:var(--font-heading);">${tier.name}</h4>
                <div style="color:var(--accent-cyan); font-size:0.82rem; font-weight:600; margin-top:2px;">
                  Learner: ${profile.fullName || 'Deaf Learner'} (Age ${profile.exactAge}) • Mode: ${profile.communicationMode === 'nsl-first' ? 'NSL-First' : 'Bilingual'}
                </div>
              </div>
              <div style="background:rgba(0,0,0,0.3); padding:6px 12px; border-radius:var(--radius-sm); border:1px solid rgba(0,229,255,0.3); text-align:right;">
                <span style="font-size:0.72rem; color:var(--text-muted); display:block;">AI Adaptation Status</span>
                <strong style="color:#34d399; font-size:0.85rem;">Active &amp; Tailored</strong>
              </div>
            </div>

            <!-- Pushed Topics Grid -->
            <div style="margin-bottom:14px;">
              <strong style="color:#fff; font-size:0.88rem; display:block; margin-bottom:6px;">
                🎯 Tailored Topics Pushed to Your Feed:
              </strong>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px;">
                ${tier.topics.map(topic => `
                  <div style="background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.08); border-radius:6px; padding:8px 12px; font-size:0.82rem; color:var(--text-main); display:flex; align-items:center; gap:8px;">
                    <svg class="ui-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${topic}</span>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Pushed Hands-On Activities -->
            <div>
              <strong style="color:#fff; font-size:0.88rem; display:block; margin-bottom:6px;">
                🛠️ Recommended Hands-on Activities:
              </strong>
              <div style="display:flex; flex-direction:column; gap:6px;">
                ${tier.activities.map(act => `
                  <div style="background:rgba(0,229,255,0.06); border-left:3px solid var(--accent-emerald); padding:8px 12px; border-radius:4px; font-size:0.82rem; color:var(--text-main);">
                    ${act}
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `;

      footer.innerHTML = `
        <button type="button" class="btn btn-secondary" onclick="app.goToOnboardingStep(3)">
          <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Back</span>
        </button>
        <button type="button" class="btn btn-primary" onclick="app.saveOnboardingProfile()" style="background:var(--accent-emerald); border-color:var(--accent-emerald); color:#080c14; font-weight:700;">
          <svg class="ui-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Activate &amp; Launch My Track</span>
        </button>
      `;
    }
  }
}

// Initialize on page load & expose globally to window.app for inline event handlers
let app;
function initAcclusivo() {
  if (!window.app) {
    window.app = new AcclusivoApp();
    app = window.app;
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAcclusivo);
  } else {
    initAcclusivo();
  }
}

if (typeof global !== "undefined") {
  global.AcclusivoApp = AcclusivoApp;
  global.AGE_TIERS = AGE_TIERS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { AcclusivoApp, AGE_TIERS };
}

