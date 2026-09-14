/**
 * ACCLUSIVO PLATFORM SAMPLE DATA & DEMO ENGINE
 * Comprehensive dataset for live demonstrations, presentations to NGOs, sponsors, and educators.
 * Context: Nigerian Sign Language (NSL) First, Mobile-First, Blended Cohort Model.
 */

const ACCLUSIVO_SEED_DATA = {
  platform: {
    name: "Acclusivo",
    tagline: "Empowering Deaf & Hard-of-Hearing Youth in Nigeria with Practical Digital Skills",
    contactEmail: "hello@acclusivo.ng",
    phone: "+234 803 123 4567 (WhatsApp / SMS - Deaf Friendly)",
    headquarters: "Yaba Tech Hub, 29 Herbert Macaulay Way, Lagos, Nigeria",
    defaultCohort: "lagos-2026-alpha"
  },

  // Role Personas for instant live demonstration
  personas: [
    {
      id: "learner",
      name: "Chidiebere Okonkwo",
      email: "chidi.okonkwo@acclusivo.ng",
      role: "Learner",
      avatar: "👨‍💻",
      badge: "Cohort 2026-Alpha",
      location: "Surulere, Lagos",
      deviceAccess: "own smartphone",
      needSupport: false
    },
    {
      id: "parent",
      name: "Mrs. Ngozi Okonkwo",
      email: "ngozi.okonkwo@gmail.com",
      role: "Parent / Guardian",
      avatar: "👩‍💼",
      linkedLearner: "Chidiebere Okonkwo",
      learnerId: "learner-1",
      paymentStatus: "paid",
      phone: "+234 802 333 4455"
    },
    {
      id: "facilitator",
      name: "Bashir Abubakar (Deaf Tech Lead)",
      email: "bashir.a@acclusivo.ng",
      role: "Facilitator & Lead NSL Instructor",
      avatar: "🤟",
      cohorts: ["lagos-2026-alpha", "abuja-virtual", "kdn-hub-2026"],
      specialty: "Frontend Architecture & NSL Computing Lexicon",
      bio: "Deaf software engineer and community educator with 6+ years experience training deaf Nigerian youth in accessible software design."
    },
    {
      id: "admin",
      name: "Amina Yusuf",
      email: "amina.y@acclusivo.ng",
      role: "Program Director & Admin",
      avatar: "⚡",
      organization: "Acclusivo Education Foundation"
    }
  ],

  // Flagship 12-Week Course
  course: {
    id: "frontend-dev",
    title: "Frontend Web Development in Nigerian Sign Language",
    badge: "Flagship 12-Week Cohort",
    level: "Beginner to Career-Ready",
    language: "Nigerian Sign Language (NSL) + Visual Plain English",
    tuitionNGN: 35000,
    durationWeeks: 12,
    description: "Master modern web development using NSL video lessons, visual demonstrations, interactive code playgrounds, and weekly live mentoring in deaf-friendly blended cohorts.",
    learningPath: "NSL Video -> Visual Demo -> Simple Explanation -> Quick Quiz -> Hands-on Task -> Mentor Feedback -> Portfolio -> Certificate",
    modules: [
      {
        id: "mod-1",
        number: 1,
        title: "Digital Foundations & Workspace Setup",
        outcome: "Master the browser, file explorer, VS Code, and visual shortcuts.",
        duration: "Week 1 - 2",
        status: "completed",
        nslTopic: "Introduction to Web, Browsers, and Visual Coding in NSL",
        videoDuration: "11m 45s",
        lowDataSize: "14 MB (Compressed NSL visual stream)",
        summary: "Learn how the Internet delivers websites to your phone and laptop. Set up your coding folder, install VS Code with deaf-friendly extensions, and understand how files connect.",
        keyConcepts: [
          { term: "Web Browser", nslTip: "Sign 'WINDOW' + 'SURF'", definition: "The software (Chrome, Edge) that renders HTML & CSS into visual web pages." },
          { term: "Code Editor", nslTip: "Sign 'BOOK' + 'WRITE-KEYBOARD'", definition: "VS Code is where we write instruction text for computers." },
          { term: "File Folder Structure", nslTip: "Sign 'BOX' inside 'BOX'", definition: "Keeping index.html, style.css, and images in one clean folder." }
        ],
        visualDemoSteps: [
          "1. Open VS Code on your laptop or mobile browser",
          "2. Create a folder named 'my-first-site'",
          "3. Create a new file named 'index.html'",
          "4. Preview the page in Google Chrome"
        ],
        quiz: [
          {
            id: "q1-1",
            question: "What is the primary role of a Web Browser (like Chrome or Edge)?",
            options: [
              "To store your passwords and charge money",
              "To read HTML/CSS code and display visual web pages on your screen",
              "To physically connect cables to the internet tower",
              "To record video of your face"
            ],
            correctIndex: 1,
            visualExplanation: "Correct! The browser translates code files (HTML, CSS) into the visual buttons, colors, and text you see on screen."
          },
          {
            id: "q1-2",
            question: "Where should you keep your project's images, HTML, and CSS files?",
            options: [
              "Scattered in different download folders randomly",
              "In one dedicated, organised project folder (e.g., 'my-first-site')",
              "Only in your email inbox",
              "Deleted immediately after typing"
            ],
            correctIndex: 1,
            visualExplanation: "Correct! Keeping files inside one clean project folder ensures links and images don't break."
          },
          {
            id: "q1-3",
            question: "Why do we use Visual Code hints and extensions in VS Code?",
            options: [
              "To play sound effects when typing",
              "To provide visual autocomplete, color coding, and error highlights without sound alerts",
              "To make your computer battery drain faster",
              "To lock your screen"
            ],
            correctIndex: 1,
            visualExplanation: "Correct! Visual syntax highlighting and color indicators give immediate visual feedback as you type code."
          }
        ],
        task: {
          id: "task-1",
          title: "Create Your Project Directory & Starter Workspace",
          instructions: "Create a folder named 'acclusivo-starter', create 'index.html', write a welcoming heading 'Hello Nigeria!', and verify it opens in your browser.",
          starterCode: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My First NSL Site</title>\n</head>\n<body>\n  <h1>Hello Nigeria! 🇳🇬</h1>\n  <p>I am learning Web Development with Acclusivo in Nigerian Sign Language!</p>\n</body>\n</html>",
          submissionType: "code",
          gradingRubric: "Folder structure verified, valid HTML doctype, heading and paragraph displayed."
        }
      },
      {
        id: "mod-2",
        number: 2,
        title: "HTML Basics & Semantic Page Structure",
        outcome: "Build a structured one-page personal profile using semantic tags.",
        duration: "Week 3 - 4",
        status: "completed",
        nslTopic: "Semantic Elements, Links, Images & Deaf-Accessible Web Structure",
        videoDuration: "14m 20s",
        lowDataSize: "18 MB",
        summary: "HTML is the skeleton of the web. Discover headings (h1-h6), paragraphs, image tags with descriptive alt text, lists, buttons, and accessibility landmarks.",
        keyConcepts: [
          { term: "Semantic HTML", nslTip: "Sign 'MEANING' + 'TAG'", definition: "Using <header>, <main>, <article>, and <nav> so readers and computers understand page structure." },
          { term: "Image Alt Text", nslTip: "Sign 'PICTURE' + 'DESCRIBE'", definition: "Writing visual text descriptions for images so everyone knows what is shown." },
          { term: "Hyperlinks (<a>)", nslTip: "Sign 'CHAIN-LINK' + 'CONNECT'", definition: "Tying web pages together across the internet." }
        ],
        visualDemoSteps: [
          "1. Wrap top brand & navigation in <header>",
          "2. Place your main bio and skills in <main>",
          "3. Add an accessible photo with alt='Portrait of Chidiebere, web developer'",
          "4. Build a list of your 3 top digital skills using <ul> and <li>"
        ],
        quiz: [
          {
            id: "q2-1",
            question: "Why must every <img> tag include an 'alt' attribute?",
            options: [
              "It makes the image download twice as fast",
              "It provides a clear visual description if image fails or for screen readers",
              "It changes the image color to red",
              "It is only required on Sunday"
            ],
            correctIndex: 1,
            visualExplanation: "Spot on! The 'alt' text is an essential accessibility standard describing visual contents to assistive tools or slow networks."
          },
          {
            id: "q2-2",
            question: "Which HTML tag is used for the single primary, most important title on a page?",
            options: [
              "<h6>",
              "<p>",
              "<h1>",
              "<button>"
            ],
            correctIndex: 2,
            visualExplanation: "Correct! <h1> defines the top-level main heading on each webpage."
          },
          {
            id: "q2-3",
            question: "Which tag is best for creating a clickable button that performs an action?",
            options: [
              "<button>",
              "<div>",
              "<span>",
              "<b>"
            ],
            correctIndex: 0,
            visualExplanation: "Correct! The native <button> tag has built-in keyboard accessibility and focus management."
          }
        ],
        task: {
          id: "task-2",
          title: "Build Your Accessible Developer Bio Card",
          instructions: "Write semantic HTML with a header, profile picture with alt text, an 'About Me' paragraph in plain language, a list of 3 skills, and a clickable contact link.",
          starterCode: "<div class=\"bio-card\">\n  <header>\n    <h1>Chidiebere Okonkwo</h1>\n    <p class=\"badge\">Deaf Tech Scholar 🤟</p>\n  </header>\n  <main>\n    <img src=\"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop\" alt=\"Portrait of Chidiebere smiling\">\n    <p>I am a deaf frontend developer based in Lagos, Nigeria. I build accessible websites using HTML, CSS and NSL visual communication.</p>\n    <h3>My Skills:</h3>\n    <ul>\n      <li>Semantic HTML5</li>\n      <li>Accessible CSS Design</li>\n      <li>Visual Problem Solving</li>\n    </ul>\n    <a href=\"#contact\" class=\"btn\">Message Me</a>\n  </main>\n</div>",
          submissionType: "code",
          gradingRubric: "Semantic tags used, descriptive alt text, valid list, working link."
        }
      },
      {
        id: "mod-3",
        number: 3,
        title: "CSS Basics: Styling & Accessible Visual Design",
        outcome: "Style a simple web page with high contrast, legible typography, and cards.",
        duration: "Week 5 - 6",
        status: "in-progress",
        nslTopic: "Colors, Box Model, Contrast Ratios & Visual Spacing",
        videoDuration: "16m 10s",
        lowDataSize: "21 MB",
        summary: "Transform plain HTML into gorgeous visual interfaces. Learn CSS selectors, the box model (margin, border, padding, content), color contrast rules, and buttons.",
        keyConcepts: [
          { term: "Box Model", nslTip: "Sign 'BOX' with 4 layers", definition: "Every element on a screen has Content, Padding, Border, and Margin." },
          { term: "Color Contrast", nslTip: "Sign 'DARK' vs 'LIGHT' EYE-CLEAR", definition: "Ensuring text is easy to read against backgrounds (WCAG standard)." },
          { term: "Visual Hierarchy", nslTip: "Sign 'BIG' to 'SMALL' IMPORTANT", definition: "Using font size, weights, and colors to guide the viewer's eye." }
        ],
        visualDemoSteps: [
          "1. Set background-color to dark slate (#0d1117) and text color to white (#f0f6fc)",
          "2. Add padding: 24px inside card container for breathing room",
          "3. Round corners with border-radius: 12px",
          "4. Create glowing hover state on buttons with cursor: pointer"
        ],
        quiz: [
          {
            id: "q3-1",
            question: "In the CSS Box Model, what is the space BETWEEN the element's content and its border?",
            options: [
              "Margin",
              "Padding",
              "Outline",
              "Width"
            ],
            correctIndex: 1,
            visualExplanation: "Exact! Padding sits directly inside the border around your content."
          },
          {
            id: "q3-2",
            question: "Why is high contrast between text and background important for deaf and hard-of-hearing learners?",
            options: [
              "It makes your computer run cooler",
              "Deaf learners process all technical instructions visually; high contrast prevents eye fatigue and enhances clarity",
              "It is required by the Nigerian government constitution",
              "It changes the font from English to French"
            ],
            correctIndex: 1,
            visualExplanation: "True! Visual clarity and high contrast reduce cognitive fatigue and make code, diagrams, and signs effortlessly readable."
          },
          {
            id: "q3-3",
            question: "Which CSS property rounds the sharp edges of a card or button?",
            options: [
              "border-round: 50%",
              "corner-style: curve",
              "border-radius: 12px",
              "box-circle: yes"
            ],
            correctIndex: 2,
            visualExplanation: "Correct! 'border-radius' curves element borders smoothly."
          }
        ],
        task: {
          id: "task-3",
          title: "Style an Accessible Nigerian Tech Showcase Card",
          instructions: "Use modern CSS variables, set a 4.5:1 minimum contrast ratio, style a hero button with active hover states, and add 20px padding around all content.",
          starterCode: "<style>\n  .showcase {\n    background: #0f172a;\n    color: #f8fafc;\n    padding: 24px;\n    border-radius: 16px;\n    border: 2px solid #00a884;\n    max-width: 400px;\n    font-family: sans-serif;\n  }\n  .showcase h2 {\n    color: #38bdf8;\n    margin-top: 0;\n  }\n  .tag {\n    background: #00a884;\n    color: #042f2e;\n    padding: 4px 10px;\n    border-radius: 99px;\n    font-weight: bold;\n    font-size: 12px;\n  }\n  .btn {\n    display: inline-block;\n    background: #38bdf8;\n    color: #0f172a;\n    padding: 10px 20px;\n    text-decoration: none;\n    border-radius: 8px;\n    font-weight: 600;\n    margin-top: 16px;\n    transition: transform 0.2s;\n  }\n  .btn:hover {\n    transform: scale(1.05);\n    background: #7dd3fc;\n  }\n</style>\n<div class=\"showcase\">\n  <span class=\"tag\">NSL Tech Hub</span>\n  <h2>Deaf Innovation Nigeria</h2>\n  <p>Learn to build modern digital products. Visual learning designed for high focus and deep skills.</p>\n  <a href=\"#\" class=\"btn\">Explore Modules 🚀</a>\n</div>",
          submissionType: "code",
          gradingRubric: "Proper CSS syntax, minimum 4.5:1 contrast, box-model spacing, interactive hover state."
        }
      },
      {
        id: "mod-4",
        number: 4,
        title: "Layout & Responsive Design for Mobile & Desktop",
        outcome: "Build layouts that adapt smoothly to budget Android smartphones and laptops.",
        duration: "Week 7 - 8",
        status: "locked",
        nslTopic: "CSS Flexbox, CSS Grid & Media Queries for Budget Smartphones",
        videoDuration: "18m 05s",
        lowDataSize: "24 MB",
        summary: "Over 80% of Nigerian learners browse on mobile. Learn Flexbox to align items effortlessly and CSS Grid for two-dimensional dashboards that flex from 360px phones to large monitors.",
        keyConcepts: [
          { term: "Flexbox (display: flex)", nslTip: "Sign 'ROW' or 'COLUMN' FLEXIBLE", definition: "Arranging elements along a one-dimensional row or column." },
          { term: "Media Query (@media)", nslTip: "Sign 'SCREEN-SIZE' CHECK", definition: "Applying different CSS rules when screen width is mobile (<768px) vs desktop." },
          { term: "Mobile-First Design", nslTip: "Sign 'PHONE-FIRST' THEN 'LAPTOP'", definition: "Designing for small screens first, then expanding for larger screens." }
        ],
        visualDemoSteps: [
          "1. Use display: flex and gap: 16px to align navigation items",
          "2. Use flex-wrap: wrap so items don't overflow on small phone screens",
          "3. Add @media (min-width: 768px) for multi-column desktop views"
        ],
        quiz: [
          {
            id: "q4-1",
            question: "Why is a 'Mobile-First' design strategy crucial for tech education in Nigeria?",
            options: [
              "Because desktop computers cannot display websites anymore",
              "Most young learners and families access the internet primarily on smartphones with varied screen sizes",
              "It is only required for social media apps",
              "Phones use different HTML tags than computers"
            ],
            correctIndex: 1,
            visualExplanation: "Spot on! Prioritising mobile layouts ensures learners on affordable smartphones have a first-class experience."
          },
          {
            id: "q4-2",
            question: "Which Flexbox property centers items vertically along the cross-axis?",
            options: [
              "justify-content: center",
              "align-items: center",
              "flex-direction: vertical",
              "text-align: middle"
            ],
            correctIndex: 1,
            visualExplanation: "Correct! 'align-items: center' centers children vertically along the cross axis."
          },
          {
            id: "q4-3",
            question: "What CSS rule allows you to apply special styling only when screen width is over 768px?",
            options: [
              "@screen (width > 768px)",
              "@media (min-width: 768px)",
              "@mobile-switch: 768",
              "if-desktop: true"
            ],
            correctIndex: 1,
            visualExplanation: "Correct! '@media (min-width: 768px)' is standard responsive CSS."
          }
        ],
        task: {
          id: "task-4",
          title: "Build a Responsive 3-Card Tech Gallery",
          instructions: "Create a 3-card grid that displays 1 column on mobile and 3 columns on tablet/desktop using CSS Grid or Flexbox with gap: 16px.",
          starterCode: "<!-- Mobile-First Responsive Grid -->\n<div class=\"grid-container\">\n  <div class=\"card\"><h3>1. NSL Video</h3><p>Visual sign instructions</p></div>\n  <div class=\"card\"><h3>2. Live Playground</h3><p>Instant code previews</p></div>\n  <div class=\"card\"><h3>3. Mentor Review</h3><p>Constructive visual feedback</p></div>\n</div>",
          submissionType: "code",
          gradingRubric: "Responsive behavior tested, clean gap spacing, cards stack properly on mobile."
        }
      },
      {
        id: "mod-5",
        number: 5,
        title: "JavaScript Introduction: Visual Interactivity",
        outcome: "Add user interactions, toggle buttons, and visual notification toasts.",
        duration: "Week 9 - 10",
        status: "locked",
        nslTopic: "Variables, Functions, Event Listeners & Visual DOM Updates",
        videoDuration: "21m 30s",
        lowDataSize: "28 MB",
        summary: "JavaScript makes web pages come alive. Because deaf learners do not rely on audio chimes, learn how to build visual toasts, glowing badges, toggles, and modal dialogues.",
        keyConcepts: [
          { term: "Event Listener", nslTip: "Sign 'CLICK' -> 'TRIGGER ACTION'", definition: "Telling the browser to watch for user clicks, keypresses, or form inputs." },
          { term: "DOM (Document Object Model)", nslTip: "Sign 'TREE' of WEB ELEMENTS", definition: "The living structure of HTML elements that JavaScript can modify in real time." },
          { term: "Visual Toast Notification", nslTip: "Sign 'POPUP BANNER' VISUAL", definition: "A high-visibility banner giving instant visual confirmation without sound." }
        ],
        visualDemoSteps: [
          "1. Select a button with document.getElementById('myBtn')",
          "2. Add a click event: button.addEventListener('click', doSomething)",
          "3. Change text or toggle CSS classes: element.classList.toggle('active')"
        ],
        quiz: [
          {
            id: "q5-1",
            question: "How should a web app notify a deaf user that an action (like file save) succeeded?",
            options: [
              "Play a quiet audio bell sound only",
              "Display a clear, high-contrast visual toast notification or status badge on screen",
              "Send a letter in the mail",
              "Turn off the user's phone"
            ],
            correctIndex: 1,
            visualExplanation: "Correct! Visual confirmations (toasts, glowing badges, checkmarks) provide accessible, immediate feedback."
          },
          {
            id: "q5-2",
            question: "Which JavaScript method is used to listen for a user click on a button?",
            options: [
              "element.listenToUser()",
              "element.addEventListener('click', callback)",
              "element.whenUserPresses()",
              "element.triggerMouse()"
            ],
            correctIndex: 1,
            visualExplanation: "Exact! 'addEventListener('click', ...)' is standard DOM event handling."
          },
          {
            id: "q5-3",
            question: "Which property allows you to change the text content inside an HTML element dynamically?",
            options: [
              "element.textContent = 'New Text'",
              "element.writeText('New Text')",
              "element.color = 'text'",
              "element.font = 'new'"
            ],
            correctIndex: 0,
            visualExplanation: "Correct! 'element.textContent' safely updates the rendered text."
          }
        ],
        task: {
          id: "task-5",
          title: "Build an Interactive High-Contrast Theme Switcher",
          instructions: "Create a button that toggles between Dark Slate and High-Contrast Mode on click, displaying a visual feedback toast on change.",
          starterCode: "<button id=\"contrastBtn\" class=\"btn\">Toggle High-Contrast 🌓</button>\n<div id=\"toast\" class=\"toast hidden\">High Contrast Mode Activated!</div>",
          submissionType: "code",
          gradingRubric: "Working click listener, class toggle, visual banner shown."
        }
      },
      {
        id: "mod-6",
        number: 6,
        title: "Capstone Portfolio Project: 3-Page Website",
        outcome: "Publish a complete 3-page developer portfolio with working code and project proof.",
        duration: "Week 11",
        status: "locked",
        nslTopic: "Project Architecture, Git/GitHub Pages, Visual Documentation",
        videoDuration: "17m 40s",
        lowDataSize: "22 MB",
        summary: "Synthesize everything learned. Build your personal 3-page developer portfolio showcasing your biography, NSL skills video link, project demos, and a working contact form.",
        keyConcepts: [
          { term: "Portfolio", nslTip: "Sign 'COLLECTION' of MY WORK", definition: "Living proof of practical skills you can show to employers and clients." },
          { term: "Web Hosting", nslTip: "Sign 'STORE ON CLOUD' LIVE URL", definition: "Deploying code on GitHub Pages or Vercel so anyone with internet can view it." }
        ],
        visualDemoSteps: [
          "1. Structure Page 1: Home & Bio",
          "2. Structure Page 2: Projects Showcase with live code links",
          "3. Structure Page 3: Accessible Contact & WhatsApp link",
          "4. Verify responsive design on both phone and laptop"
        ],
        quiz: [
          {
            id: "q6-1",
            question: "Why is a verified project portfolio more valuable than a paper certificate alone?",
            options: [
              "It is heavier to carry",
              "Employers and clients can visually test your real working code and projects",
              "It takes up space on your phone",
              "It eliminates the need for an internet connection"
            ],
            correctIndex: 1,
            visualExplanation: "Spot on! Real, working project evidence proves practical competency."
          },
          {
            id: "q6-2",
            question: "What should every project in your tech portfolio include?",
            options: [
              "Only the title and no explanation",
              "A working demo link, screenshot, description of problem solved, and tools used",
              "A secret password only you know",
              "A photo of your keyboard"
            ],
            correctIndex: 1,
            visualExplanation: "Correct! Clear visual screenshots, tool tags, and live demos showcase true capability."
          }
        ],
        task: {
          id: "task-6",
          title: "Submit Your 3-Page Capstone Portfolio",
          instructions: "Submit your live portfolio URL and GitHub repository link for facilitator code review and peer feedback.",
          starterCode: "https://chidiebere-dev.github.io/portfolio",
          submissionType: "link",
          gradingRubric: "Valid 3-page site, responsive layout, accessible contrast, semantic HTML, verified hosting link."
        }
      },
      {
        id: "mod-7",
        number: 7,
        title: "Demo Day & Acclusivo Verified Certification",
        outcome: "Present project to peers and mentors, receive final review, and earn verified certificate.",
        duration: "Week 12",
        status: "locked",
        nslTopic: "Live Presentation in NSL, Career Progression & Certificate Verification",
        videoDuration: "12m 15s",
        lowDataSize: "15 MB",
        summary: "Celebrate your transformation into a certified frontend web developer. Present your portfolio in Nigerian Sign Language, receive mentor feedback, and unlock your verified digital certificate.",
        keyConcepts: [
          { term: "Demo Day", nslTip: "Sign 'SHOW' + 'EXPLAIN WORK' AUDIENCE", definition: "Presenting your technical creation to mentors, peers, and potential employers." },
          { term: "Verified Certificate", nslTip: "Sign 'OFFICIAL STAMP' SECURE", definition: "A cryptographic credential backed by Acclusivo proving your course completion." }
        ],
        visualDemoSteps: [
          "1. Prepare 3-minute project walkthrough in NSL",
          "2. Join the live Google Meet cohort session",
          "3. Share screen and demonstrate mobile responsiveness",
          "4. Receive certified digital credential with verifiable QR code"
        ],
        quiz: [
          {
            id: "q7-1",
            question: "What does the QR code on your Acclusivo Certificate do?",
            options: [
              "Plays an audio podcast",
              "Allows any employer, sponsor, or university to instantly verify the authenticity of your skills online",
              "Deletes your project files",
              "Charges your bank account"
            ],
            correctIndex: 1,
            visualExplanation: "Spot on! The QR code provides instant cryptographic verification of your authentic skills credential."
          }
        ],
        task: {
          id: "task-7",
          title: "Submit Final Portfolio Video & Presentation Notes",
          instructions: "Upload your 2-minute project walkthrough video in NSL or written presentation summary for final certificate release.",
          starterCode: "https://drive.google.com/file/d/acclusivo-chidi-demo/view",
          submissionType: "link",
          gradingRubric: "Complete demonstration, responsive proof, signed walkthrough."
        }
      }
    ]
  },

  // 5 Active & Upcoming Cohorts Across Nigeria
  cohorts: [
    {
      id: "lagos-2026-alpha",
      name: "Lagos Cohort 2026-Alpha (Flagship)",
      mode: "Blended (In-person Hub + Online NSL)",
      facilitator: "Bashir Abubakar (Deaf Tech Lead)",
      location: "Yaba Tech Hub, Lagos & Google Meet",
      startDate: "Oct 5, 2026",
      endDate: "Dec 20, 2026",
      schedule: "Tuesdays & Thursdays, 4:00 PM - 5:30 PM WAT (After K-12 hours)",
      liveMeetUrl: "https://meet.google.com/acc-ng-demo",
      capacity: 30,
      enrolledCount: 26,
      tuitionNGN: 35000,
      status: "Active - Week 5"
    },
    {
      id: "abuja-virtual",
      name: "Abuja Virtual Cohort (Fully Remote)",
      mode: "Online (Low-Data NSL Streams + Live Meet)",
      facilitator: "Fatima Garba (NSL Mentor)",
      location: "Remote Google Meet & WhatsApp",
      startDate: "Nov 2, 2026",
      endDate: "Jan 25, 2027",
      schedule: "Mondays & Wednesdays, 4:30 PM - 6:00 PM WAT",
      liveMeetUrl: "https://meet.google.com/abj-nsl-demo",
      capacity: 25,
      enrolledCount: 21,
      tuitionNGN: 35000,
      status: "Admissions Open"
    },
    {
      id: "kaduna-hub",
      name: "Kaduna Innovation Hub Cohort",
      mode: "Blended with In-Person Lab Access",
      facilitator: "Ibrahim Lawal (NSL Educator)",
      location: "Kaduna ICT Centre, Independence Way",
      startDate: "Dec 1, 2026",
      endDate: "Feb 28, 2027",
      schedule: "Saturdays 10:00 AM - 1:00 PM WAT",
      liveMeetUrl: "https://meet.google.com/kdn-nsl-demo",
      capacity: 20,
      enrolledCount: 18,
      tuitionNGN: 35000,
      status: "Sponsored (100% Scholarship by NITDA)"
    },
    {
      id: "ph-hub-2027",
      name: "Port Harcourt Coastal Cohort",
      mode: "Blended Hub Sessions",
      facilitator: "Tonye Briggs",
      location: "Port Harcourt Tech Creek, Rivers State",
      startDate: "Jan 12, 2027",
      endDate: "Apr 5, 2027",
      schedule: "Tuesdays & Fridays, 4:00 PM WAT",
      liveMeetUrl: "https://meet.google.com/ph-nsl-demo",
      capacity: 25,
      enrolledCount: 12,
      tuitionNGN: 35000,
      status: "Early Bird Enrolment"
    },
    {
      id: "ibadan-deaf-hub",
      name: "Ibadan Youth Digital Bootcamp",
      mode: "Weekend Blended Intensive",
      facilitator: "Kehinde Adebayo",
      location: "University of Ibadan Tech Lab",
      startDate: "Feb 6, 2027",
      endDate: "Apr 30, 2027",
      schedule: "Saturdays 1:00 PM - 4:00 PM WAT",
      liveMeetUrl: "https://meet.google.com/ibd-nsl-demo",
      capacity: 20,
      enrolledCount: 7,
      tuitionNGN: 35000,
      status: "Scholarship Applications Active"
    }
  ],

  // 8 Detailed Sample Learners representing diverse backgrounds & devices
  learners: [
    {
      id: "learner-1",
      name: "Chidiebere Okonkwo",
      cohortId: "lagos-2026-alpha",
      email: "chidi.okonkwo@acclusivo.ng",
      phone: "0803 234 5678",
      ageRange: "16-19",
      schoolLevel: "Secondary School Grad",
      guardianName: "Mrs. Ngozi Okonkwo",
      guardianPhone: "0802 333 4455",
      deviceAccess: "own smartphone",
      needDeviceSupport: false,
      paymentStatus: "paid",
      paymentMethod: "Manual Bank Transfer (Access Bank)",
      paymentRef: "TRX-ACC-99214",
      amountPaidNGN: 35000,
      progressPercent: 42,
      completedModules: ["mod-1", "mod-2"],
      currentModule: "mod-3",
      liveAttendanceRate: "92% (11 of 12 sessions)",
      quizScores: { "mod-1": 100, "mod-2": 100, "mod-3": 66 },
      assignments: {
        "mod-1": { status: "complete", grade: "excellent", feedback: "Clean directory structure and well-nested HTML tags. Great attention to visual spacing!" },
        "mod-2": { status: "complete", grade: "excellent", feedback: "Outstanding bio card! Alt text is descriptive and semantic tags are correctly chosen." },
        "mod-3": { status: "submitted", grade: "pending", code: "/* Chidi's Accessible CSS Card Draft */" }
      },
      portfolio: {
        title: "Chidiebere's Accessible Deaf Developer Showcase",
        url: "https://chidi-deaf-dev.github.io",
        github: "https://github.com/chidi-okonkwo/accessible-portfolio",
        summary: "A high-contrast 3-page developer portfolio featuring an NSL video intro, project gallery, and accessible contact form.",
        technologies: ["HTML5", "CSS3 Variables", "WCAG AAA Standards", "NSL Video Integration"],
        demoGrade: "94% (With Distinction)"
      },
      riskFlag: false,
      riskNote: "Consistently on time, very active in live NSL video questions."
    },
    {
      id: "learner-2",
      name: "Zainab Bello",
      cohortId: "lagos-2026-alpha",
      email: "zainab.bello@acclusivo.ng",
      phone: "0812 456 7890",
      ageRange: "19-24",
      schoolLevel: "Polytechnic Student (Kaduna Poly)",
      guardianName: "Alhaji Bello",
      guardianPhone: "0803 777 9900",
      deviceAccess: "needs device support",
      needDeviceSupport: true,
      loanedDevice: "Lenovo ThinkPad X270 (Loaned via MTN Foundation)",
      deviceSerial: "MTN-DEV-2026-042",
      paymentStatus: "scholarship",
      paymentMethod: "MTN Foundation Tech Inclusion Scholarship",
      amountPaidNGN: 35000,
      progressPercent: 71,
      completedModules: ["mod-1", "mod-2", "mod-3", "mod-4", "mod-5"],
      currentModule: "mod-6",
      liveAttendanceRate: "100% (12 of 12 sessions)",
      quizScores: { "mod-1": 100, "mod-2": 100, "mod-3": 100, "mod-4": 100, "mod-5": 100 },
      assignments: {
        "mod-1": { status: "complete", grade: "excellent", feedback: "Pristine file naming and structure." },
        "mod-2": { status: "complete", grade: "excellent", feedback: "Flawless semantic markup with rich visual descriptions." },
        "mod-3": { status: "complete", grade: "excellent", feedback: "Beautiful contrast ratios and responsive box-model spacing." },
        "mod-4": { status: "complete", grade: "excellent", feedback: "Seamless responsive mobile-first grid." },
        "mod-5": { status: "complete", grade: "excellent", feedback: "Interactive high-contrast theme switcher with visual toast." }
      },
      portfolio: {
        title: "Northern Deaf Artisans Directory",
        url: "https://zainab-bello.github.io/deaf-artisans",
        github: "https://github.com/zainab-b/deaf-artisans",
        summary: "A web platform connecting deaf weavers, leatherworkers, and tailors across Northern Nigeria with online buyers.",
        technologies: ["Semantic HTML5", "Responsive Grid", "Visual Filter JS", "WhatsApp API Direct"],
        demoGrade: "98% (Honor Roll)"
      },
      riskFlag: false,
      riskNote: "Top performing student in cohort. Candidate for junior developer internship."
    },
    {
      id: "learner-3",
      name: "Emmanuel Adeyemi",
      cohortId: "lagos-2026-alpha",
      email: "emmanuel.a@acclusivo.ng",
      phone: "0809 888 1234",
      ageRange: "14-16",
      schoolLevel: "Senior Secondary (SS2 - Wesley School for Deaf)",
      guardianName: "Pastor David Adeyemi",
      guardianPhone: "0803 111 4433",
      deviceAccess: "borrowed/shared device",
      needDeviceSupport: true,
      paymentStatus: "part-paid",
      paymentMethod: "Bank Transfer (₦20,000 paid / ₦15,000 balance)",
      paymentRef: "TRX-ACC-88312",
      amountPaidNGN: 20000,
      progressPercent: 28,
      completedModules: ["mod-1"],
      currentModule: "mod-2",
      liveAttendanceRate: "66% (Missed 2 sessions due to device sharing with sibling)",
      quizScores: { "mod-1": 100, "mod-2": 66 },
      assignments: {
        "mod-1": { status: "complete", grade: "complete", feedback: "Good start. Remember to indent your tags cleanly." },
        "mod-2": { status: "needs revision", grade: "needs revision", feedback: "Please add alt text to your profile image and close your <ul> tag." }
      },
      portfolio: null,
      riskFlag: true,
      riskNote: "Needs device loan. Family of 4 shares 1 Android phone after school. Recommended for upcoming donor laptop allocation."
    },
    {
      id: "learner-4",
      name: "Blessing Danjuma",
      cohortId: "lagos-2026-alpha",
      email: "blessing.d@acclusivo.ng",
      phone: "0703 111 9900",
      ageRange: "16-19",
      schoolLevel: "Secondary School Grad",
      guardianName: "Mrs. Sarah Danjuma",
      guardianPhone: "0806 555 7788",
      deviceAccess: "own laptop",
      needDeviceSupport: false,
      paymentStatus: "sponsored",
      paymentMethod: "NITDA Digital Literacy Grant (Lagos State Deaf Association)",
      amountPaidNGN: 35000,
      progressPercent: 42,
      completedModules: ["mod-1", "mod-2"],
      currentModule: "mod-3",
      liveAttendanceRate: "88%",
      quizScores: { "mod-1": 100, "mod-2": 100, "mod-3": 100 },
      assignments: {
        "mod-1": { status: "complete", grade: "excellent", feedback: "Well structured." },
        "mod-2": { status: "complete", grade: "complete", feedback: "Great work on the skill tags." }
      },
      portfolio: {
        title: "Naija Deaf Health & First Aid Guide",
        url: "https://blessing-dev.github.io/health-guide",
        github: "https://github.com/blessing-d/deaf-health-guide",
        summary: "Visual first-aid emergency procedures illustrated in Nigerian Sign Language diagrams.",
        technologies: ["HTML5", "CSS Flexbox", "Visual SVG Infographics"],
        demoGrade: "91%"
      },
      riskFlag: false,
      riskNote: "Consistently on time and participates enthusiastically in peer reviews."
    },
    {
      id: "learner-5",
      name: "Faruk Sani",
      cohortId: "kaduna-hub",
      email: "faruk.sani@acclusivo.ng",
      phone: "0805 444 3210",
      ageRange: "19-24",
      schoolLevel: "Vocational Trainee",
      guardianName: "Mallam Sani Garba",
      guardianPhone: "0802 888 9911",
      deviceAccess: "needs device support",
      needDeviceSupport: true,
      loanedDevice: "HP ProBook 430 (Loaned via NITDA Kaduna Lab)",
      deviceSerial: "NITDA-KDN-019",
      paymentStatus: "sponsored",
      paymentMethod: "NITDA Northern Tech Empowerment Fund",
      amountPaidNGN: 35000,
      progressPercent: 57,
      completedModules: ["mod-1", "mod-2", "mod-3", "mod-4"],
      currentModule: "mod-5",
      liveAttendanceRate: "95%",
      quizScores: { "mod-1": 100, "mod-2": 100, "mod-3": 100, "mod-4": 100 },
      assignments: {
        "mod-1": { status: "complete", grade: "excellent", feedback: "Solid foundational work." },
        "mod-2": { status: "complete", grade: "excellent", feedback: "High semantic accuracy." },
        "mod-3": { status: "complete", grade: "excellent", feedback: "Impressive color choices." },
        "mod-4": { status: "complete", grade: "excellent", feedback: "Responsive on both mobile and laptop." }
      },
      portfolio: {
        title: "Kaduna Agri-Produce Exchange in NSL",
        url: "https://faruk-sani.github.io/agri-trade",
        github: "https://github.com/faruk-s/agri-trade",
        summary: "Mobile-first agricultural marketplace tailored for deaf grain and ginger farmers in Kaduna state.",
        technologies: ["Mobile-first CSS Grid", "Plain Language UI", "Visual Price Ticker"],
        demoGrade: "95%"
      },
      riskFlag: false,
      riskNote: "Highly self-driven, assisting other cohort members in Kaduna lab."
    },
    {
      id: "learner-6",
      name: "Goodness Ezechukwu",
      cohortId: "lagos-2026-alpha",
      email: "goodness.e@acclusivo.ng",
      phone: "0708 777 2211",
      ageRange: "16-19",
      schoolLevel: "High School Leaver",
      guardianName: "Chief Ezechukwu",
      guardianPhone: "0803 444 8877",
      deviceAccess: "own laptop",
      needDeviceSupport: false,
      paymentStatus: "paid",
      paymentMethod: "Manual Bank Transfer (GTBank)",
      paymentRef: "TRX-GTB-11904",
      amountPaidNGN: 35000,
      progressPercent: 42,
      completedModules: ["mod-1", "mod-2"],
      currentModule: "mod-3",
      liveAttendanceRate: "90%",
      quizScores: { "mod-1": 100, "mod-2": 100 },
      assignments: {
        "mod-1": { status: "complete", grade: "complete", feedback: "Clean start." },
        "mod-2": { status: "complete", grade: "excellent", feedback: "Creative design." }
      },
      portfolio: null,
      riskFlag: false,
      riskNote: "Good progress."
    },
    {
      id: "learner-7",
      name: "Tobiloba Adeleke",
      cohortId: "lagos-2026-alpha",
      email: "tobiloba.a@acclusivo.ng",
      phone: "0814 333 5566",
      ageRange: "19-24",
      schoolLevel: "University Undergraduate (Unilag)",
      guardianName: "Mrs. Toyin Adeleke",
      guardianPhone: "0802 666 1122",
      deviceAccess: "own smartphone",
      needDeviceSupport: false,
      paymentStatus: "paid",
      paymentMethod: "Bank Transfer (Zenith Bank)",
      paymentRef: "TRX-ZEN-44091",
      amountPaidNGN: 35000,
      progressPercent: 42,
      completedModules: ["mod-1", "mod-2"],
      currentModule: "mod-3",
      liveAttendanceRate: "100%",
      quizScores: { "mod-1": 100, "mod-2": 100 },
      assignments: {
        "mod-1": { status: "complete", grade: "excellent", feedback: "Superb." },
        "mod-2": { status: "complete", grade: "excellent", feedback: "Very polished." }
      },
      portfolio: null,
      riskFlag: false,
      riskNote: "Consistently punctual and very helpful in WhatsApp group."
    },
    {
      id: "learner-8",
      name: "Aisha Mohammed",
      cohortId: "abuja-virtual",
      email: "aisha.m@acclusivo.ng",
      phone: "0802 999 4433",
      ageRange: "16-19",
      schoolLevel: "Secondary School Grad",
      guardianName: "Hajiya Maryam Mohammed",
      guardianPhone: "0803 222 1199",
      deviceAccess: "borrowed/shared device",
      needDeviceSupport: true,
      paymentStatus: "scholarship",
      paymentMethod: "UNICEF Inclusive Girls in Tech Grant",
      amountPaidNGN: 35000,
      progressPercent: 28,
      completedModules: ["mod-1"],
      currentModule: "mod-2",
      liveAttendanceRate: "82%",
      quizScores: { "mod-1": 100 },
      assignments: {
        "mod-1": { status: "complete", grade: "complete", feedback: "Well organized." }
      },
      portfolio: null,
      riskFlag: false,
      riskNote: "Excelling in visual logic."
    }
  ],

  // Verified Cryptographic Certificates for demo
  certificates: [
    {
      id: "CERT-ACC-2026-NG-8842",
      recipient: "Chidiebere Okonkwo",
      courseTitle: "Frontend Web Development in Nigerian Sign Language",
      cohort: "Lagos Cohort 2026-Alpha",
      issueDate: "September 14, 2026",
      facilitatorName: "Bashir Abubakar",
      directorName: "Amina Yusuf",
      verificationUrl: "https://acclusivo.ng/verify/CERT-ACC-2026-NG-8842",
      skillsHonored: [
        "Semantic HTML5 Architecture",
        "Accessible High-Contrast CSS Design",
        "Mobile-First Responsive Layouts",
        "Visual JavaScript & DOM Interactivity",
        "Nigerian Sign Language Tech Communication"
      ],
      grade: "Completed with Distinction (94% Capstone Score)"
    },
    {
      id: "CERT-ACC-2026-NG-7731",
      recipient: "Zainab Bello",
      courseTitle: "Frontend Web Development in Nigerian Sign Language",
      cohort: "Lagos Cohort 2026-Alpha",
      issueDate: "September 10, 2026",
      facilitatorName: "Bashir Abubakar",
      directorName: "Amina Yusuf",
      verificationUrl: "https://acclusivo.ng/verify/CERT-ACC-2026-NG-7731",
      skillsHonored: [
        "Frontend Web Architecture",
        "Accessible Design (WCAG AAA)",
        "CSS Grid & Flexbox Systems",
        "DOM Event Engineering",
        "NSL Technical Presentation"
      ],
      grade: "First Class Honors (98% Capstone Score)"
    }
  ],

  // Single active sample certificate for the current modal
  sampleCertificate: {
    id: "CERT-ACC-2026-NG-8842",
    recipient: "Chidiebere Okonkwo",
    courseTitle: "Frontend Web Development in Nigerian Sign Language",
    cohort: "Lagos Cohort 2026-Alpha",
    issueDate: "September 14, 2026",
    facilitatorName: "Bashir Abubakar",
    directorName: "Amina Yusuf",
    verificationUrl: "https://acclusivo.ng/verify/CERT-ACC-2026-NG-8842",
    skillsHonored: [
      "Semantic HTML5 Architecture",
      "Accessible High-Contrast CSS Design",
      "Mobile-First Responsive Layouts",
      "Visual JavaScript & DOM Interactivity",
      "Nigerian Sign Language Tech Communication"
    ],
    grade: "Completed with Distinction (94% Capstone Score)"
  },

  // Student Portfolio Showcase (Real Capstone Evidence)
  portfolios: [
    {
      id: "port-1",
      studentName: "Chidiebere Okonkwo",
      avatar: "👨‍💻",
      projectTitle: "Deaf Community Business Hub Lagos",
      summary: "A high-contrast, mobile-first marketplace indexing 24 deaf-owned businesses in Lagos with direct WhatsApp video/chat integration.",
      liveUrl: "https://chidi-deaf-dev.github.io/lagos-hub",
      githubUrl: "https://github.com/chidi-okonkwo/lagos-deaf-hub",
      techStack: ["Semantic HTML5", "Responsive CSS", "WhatsApp API", "NSL Video Clips"],
      grade: "94% • Excellent"
    },
    {
      id: "port-2",
      studentName: "Zainab Bello",
      avatar: "👩‍💻",
      projectTitle: "Northern Deaf Artisans Directory",
      summary: "Showcases handcrafted leatherwork, pottery, and textile goods created by deaf artisans in Kaduna and Kano.",
      liveUrl: "https://zainab-bello.github.io/deaf-artisans",
      githubUrl: "https://github.com/zainab-b/deaf-artisans",
      techStack: ["HTML5", "CSS Grid", "Filterable JavaScript", "High-Contrast Theme"],
      grade: "98% • Top Honor"
    },
    {
      id: "port-3",
      studentName: "Blessing Danjuma",
      avatar: "👩‍🔬",
      projectTitle: "Accessible Health & First Aid Guide in NSL",
      summary: "Visual first-aid emergency procedures illustrated with animated Nigerian Sign Language diagrams for fast visual recall.",
      liveUrl: "https://blessing-dev.github.io/health-guide",
      githubUrl: "https://github.com/blessing-d/deaf-health-guide",
      techStack: ["Semantic Markup", "Flexbox Cards", "Deaf Accessibility Best Practices"],
      grade: "91% • Excellent"
    },
    {
      id: "port-4",
      studentName: "Faruk Sani",
      avatar: "👨‍🌾",
      projectTitle: "Kaduna Agri-Produce Exchange",
      summary: "Connecting deaf grain and ginger farmers directly with wholesale food aggregators in Kaduna and Zaria.",
      liveUrl: "https://faruk-sani.github.io/agri-trade",
      githubUrl: "https://github.com/faruk-s/agri-trade",
      techStack: ["Mobile-First Design", "Plain English Explanations", "Accessible Tables"],
      grade: "95% • Excellent"
    }
  ],

  // Outcomes & Impact Metrics (For Admin & Investor/NGO presentation)
  outcomes: {
    totalEnrolled: 84,
    bootcampParticipants: 125,
    paidLearners: 46,
    sponsoredLearners: 38,
    conversionRate: "67.2%",
    completionRate: "83.5%",
    deviceSupportStats: {
      ownSmartphone: "42% (35 learners)",
      ownLaptop: "31% (26 learners)",
      sharedDevice: "15% (13 learners)",
      needsDeviceSupport: "12% (10 learners)"
    },
    liveSessionAttendanceAvg: "89.4%",
    portfoliosSubmitted: 58,
    certificatesIssued: 52,
    internshipsPlaced: 14,
    totalTuitionMobilizedNGN: "₦2,940,000",
    scholarshipFundsMobilizedNGN: "₦1,330,000",
    deviceLoansIssued: 16,
    partnersAndSponsors: [
      "NITDA (National Information Tech Dev Agency)",
      "MTN Foundation Nigeria",
      "Lagos State Deaf Association (LSDA)",
      "Open Tech Accessibility Collaborative",
      "UNICEF Generation Unlimited Nigeria"
    ]
  },

  // Bank details for manual payment confirmation
  bankDetails: {
    bankName: "Access Bank Plc",
    accountName: "Acclusivo Accessible Tech Foundation",
    accountNumber: "0123456789",
    sortCode: "044150149",
    tuitionFeeNGN: "₦35,000",
    alternativeBank: "Guaranty Trust Bank (GTBank) — 0987654321",
    instruction: "Make transfer via mobile banking app, USSD (*901# or *737#), screenshot the debit receipt, and upload it below for immediate administrator validation."
  },

  // Sample Payment Log for Admin & Parent audits
  paymentLogs: [
    {
      id: "PAY-001",
      learnerName: "Chidiebere Okonkwo",
      payerName: "Mrs. Ngozi Okonkwo",
      bank: "Access Bank",
      amountNGN: 35000,
      reference: "TRX-ACC-99214",
      date: "Oct 2, 2026",
      status: "Verified & Approved",
      receiptFile: "access_bank_debit_slip_99214.png"
    },
    {
      id: "PAY-002",
      learnerName: "Goodness Ezechukwu",
      payerName: "Chief Ezechukwu",
      bank: "GTBank",
      amountNGN: 35000,
      reference: "TRX-GTB-11904",
      date: "Oct 4, 2026",
      status: "Verified & Approved",
      receiptFile: "gtbank_transfer_advice_11904.pdf"
    },
    {
      id: "PAY-003",
      learnerName: "Emmanuel Adeyemi",
      payerName: "Pastor David Adeyemi",
      bank: "Access Bank",
      amountNGN: 20000,
      reference: "TRX-ACC-88312",
      date: "Oct 6, 2026",
      status: "Part-Paid (₦15,000 Balance)",
      receiptFile: "access_bank_slip_88312.jpg"
    },
    {
      id: "PAY-004",
      learnerName: "Zainab Bello",
      payerName: "MTN Foundation Nigeria",
      bank: "Stanbic IBTC Direct Grant",
      amountNGN: 35000,
      reference: "MTN-INCL-GRANT-2026",
      date: "Sep 28, 2026",
      status: "Sponsored (100% Scholarship)",
      receiptFile: "mtn_scholarship_award_letter.pdf"
    }
  ]
};
