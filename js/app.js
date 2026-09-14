/**
 * ACCLUSIVO INTERACTIVE APPLICATION ENGINE
 * Features: Deaf-First Visual Learning, NSL Video Simulator, Live Code Playground,
 * Interactive Quizzes, Multi-Role Switcher, Parent Payment Flow, Facilitator Desk,
 * Admin Impact Dashboard, Student Portfolios, and 1-Click Demo Reset.
 */

class AcclusivoApp {
  constructor() {
    this.state = this.loadState();
    this.videoPlaying = false;
    this.videoPlaybackRate = 1.0;
    this.init();
  }

  // Load state from localStorage or seed data
  loadState() {
    const saved = localStorage.getItem("acclusivo_state_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure fresh seed data properties if new ones were added
        if (!parsed.data.portfolios || !parsed.data.paymentLogs) {
          parsed.data = JSON.parse(JSON.stringify(ACCLUSIVO_SEED_DATA));
        }
        return parsed;
      } catch (e) {
        console.error("Error parsing saved state, resetting to seed data", e);
      }
    }
    return {
      currentRole: "learner", // 'learner', 'parent', 'facilitator', 'admin', 'public', 'portfolios'
      activeLearnerId: "learner-1", // Chidiebere Okonkwo
      activeModuleId: "mod-2", // Default to Module 2 for rich interactive demo
      theme: "dark", // 'dark' or 'light'
      highContrast: false,
      fontScale: "normal",
      lowDataMode: false,
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
      theme: "dark",
      highContrast: false,
      fontScale: "normal",
      lowDataMode: false,
      data: JSON.parse(JSON.stringify(ACCLUSIVO_SEED_DATA)),
      userCodeDrafts: {},
      quizAnswers: {}
    };
    this.saveState();
    this.initA11ySettings();
    this.renderCurrentPersona();
    this.renderCurrentView();
    this.showVisualNotification(
      "Demo Data Reset! 🔄",
      "Pristine sample data reloaded across all cohorts, learners, and dashboards.",
      "gold"
    );
  }

  init() {
    this.bindGlobalControls();
    this.renderCurrentPersona();
    this.renderCurrentView();
    this.initA11ySettings();
  }

  // Visual Notification (Deaf-accessible alternative to audio bell)
  showVisualNotification(title, message, type = "cyan") {
    const toast = document.getElementById("visualToast");
    const flashOverlay = document.getElementById("visualFlash");
    
    if (flashOverlay) {
      flashOverlay.classList.add("flash");
      setTimeout(() => flashOverlay.classList.remove("flash"), 250);
    }

    if (toast) {
      toast.innerHTML = `
        <div style="font-size: 1.5rem;">${type === 'emerald' ? '✅' : type === 'gold' ? '🏆' : '🤟'}</div>
        <div>
          <strong style="color: #fff; display: block; font-size: 0.95rem;">${title}</strong>
          <span style="color: var(--text-muted); font-size: 0.85rem;">${message}</span>
        </div>
      `;
      toast.classList.add("active");
      setTimeout(() => toast.classList.remove("active"), 4000);
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
    const themeIcon = document.getElementById("themeIcon");
    const themeLabel = document.getElementById("themeLabel");
    const hcBtn = document.getElementById("toggleContrastBtn");
    const fontBtn = document.getElementById("toggleFontBtn");
    const lowDataBtn = document.getElementById("toggleLowDataBtn");

    if (themeBtn) {
      if (isLight) {
        if (themeIcon) themeIcon.textContent = "🌙";
        if (themeLabel) themeLabel.textContent = "Dark Theme";
        themeBtn.classList.add("active");
      } else {
        if (themeIcon) themeIcon.textContent = "☀️";
        if (themeLabel) themeLabel.textContent = "White Theme";
        themeBtn.classList.remove("active");
      }

      themeBtn.onclick = () => {
        const nextLight = !document.body.classList.contains("light-theme");
        document.body.classList.toggle("light-theme", nextLight);
        this.state.theme = nextLight ? "light" : "dark";

        if (nextLight) {
          if (themeIcon) themeIcon.textContent = "🌙";
          if (themeLabel) themeLabel.textContent = "Dark Theme";
          themeBtn.classList.add("active");
        } else {
          if (themeIcon) themeIcon.textContent = "☀️";
          if (themeLabel) themeLabel.textContent = "White Theme";
          themeBtn.classList.remove("active");
        }

        this.saveState();
        this.showVisualNotification(
          "Theme Updated",
          nextLight ? "White / Light Theme Enabled ☀️" : "Dark Slate Theme Enabled 🌙",
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
        this.showVisualNotification("Visual Display Updated", this.state.highContrast ? "High Contrast Mode (WCAG AAA) Enabled" : "Standard Palette Restored");
      };
    }

    if (fontBtn) {
      fontBtn.onclick = () => {
        if (this.state.fontScale === "normal") {
          this.state.fontScale = "large";
          document.body.classList.remove("font-xl");
          document.body.classList.add("font-lg");
          fontBtn.textContent = "Font: Large";
        } else if (this.state.fontScale === "large") {
          this.state.fontScale = "xlarge";
          document.body.classList.remove("font-lg");
          document.body.classList.add("font-xl");
          fontBtn.textContent = "Font: X-Large";
        } else {
          this.state.fontScale = "normal";
          document.body.classList.remove("font-lg", "font-xl");
          fontBtn.textContent = "Font: Normal";
        }
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
          this.state.lowDataMode ? "Video stream paused. Showing visual diagrams & gesture cards to save data." : "Streaming high-definition NSL video lessons."
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
      role: "Public Visitor",
      avatar: "👋"
    };

    if (personaBadge) {
      personaBadge.innerHTML = `
        <span class="user-avatar">${current.avatar}</span>
        <div>
          <span style="font-weight: 700; display: block; color: #fff; line-height: 1.2;">${current.name}</span>
          <span style="font-size: 0.75rem; color: var(--accent-cyan);">${current.role}</span>
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

    window.scrollTo({ top: 0, behavior: "smooth" });
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
     1. LEARNER VIEW & NSL LESSON PLAYER
     ========================================================================== */
  renderLearnerDashboard() {
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
  }

  // Code Playground Live Preview Handler
  updateCodePreview() {
    const editor = document.getElementById("codeEditorInput");
    const frame = document.getElementById("livePreviewFrame");
    if (!editor || !frame) return;

    const code = editor.value;
    this.state.userCodeDrafts[this.state.activeModuleId] = code;
    this.saveState();

    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(code);
    doc.close();
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
    this.saveState();
    this.renderLearnerDashboard();
    this.showVisualNotification("Module Loaded", `Switched to ${modId.toUpperCase()}`, "cyan");
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
      const input = document.getElementById("aiUserInput");
      if (input) setTimeout(() => input.focus(), 100);
    }
  }

  closeAIMentorModal() {
    const modal = document.getElementById("aiMentorModal");
    if (modal) modal.style.display = "none";
  }

  sendQuickAIPrompt(type) {
    let prompt = "";
    if (type === "audit") prompt = "Audit my current playground code for deaf accessibility standards.";
    else if (type === "nsl-gloss") prompt = "How do I sign 'Event Listener' in Nigerian Sign Language?";
    else if (type === "simplify-flexbox") prompt = "Explain CSS Flexbox in 3 plain visual steps.";
    else if (type === "contrast") prompt = "What are the recommended high-contrast color pairs for deaf learners?";

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
    botMsg.innerHTML = `<span style="color: var(--accent-cyan);">🤖 Ami is analyzing visually... 🤟</span>`;
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
      <button class="btn btn-secondary btn-sm" onclick="app.sendQuickAIPrompt('audit')">Run Instant Code Audit</button>
    `;
  }
}

// Initialize on page load
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new AcclusivoApp();
});

