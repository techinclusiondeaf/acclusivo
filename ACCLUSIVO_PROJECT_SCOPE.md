# 🤟 ACCLUSIVO — Complete Project Scope Document

> **Empowering Deaf & Hard-of-Hearing Youth in Nigeria with Practical Digital Skills**
> *NSL-First · Mobile-First · Accessibility-First*

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [The Problem](#2-the-problem)
3. [Product Vision and Mission](#3-product-vision-and-mission)
4. [Business Model](#4-business-model)
5. [Target Users and Personas](#5-target-users-and-personas)
6. [Learner Journey (Core Flow)](#6-learner-journey-core-flow)
7. [Platform Architecture](#7-platform-architecture)
8. [Built Features (Current State)](#8-built-features-current-state)
9. [File Structure](#9-file-structure)
10. [Data Model](#10-data-model)
11. [Flagship Course Frontend Web Development](#11-flagship-course-frontend-web-development)
12. [Accessibility Standards](#12-accessibility-standards)
13. [Content Standards](#13-content-standards)
14. [Information Architecture](#14-information-architecture)
15. [Delivery Roadmap](#15-delivery-roadmap)
16. [Success Metrics](#16-success-metrics)
17. [Tech Stack](#17-tech-stack)
18. [Non-Goals Version 1](#18-non-goals-version-1)
19. [Product Principle](#19-product-principle)

---

## 1. Executive Summary

**Acclusivo** is a mobile-first, accessible digital skills learning platform designed specifically for deaf and hard-of-hearing young people in Nigeria. It delivers practical tech education through Nigerian Sign Language (NSL) video lessons, visual demonstrations, interactive quizzes, hands-on activities, and blended cohort mentoring.

The platform currently operates a flagship **12-week Frontend Web Development** cohort from the Yaba Tech Hub in Lagos, with virtual cohorts also running in Abuja and Kaduna. The first payer is the **parent or guardian** who enrols their deaf child and monitors progress through a dedicated parent portal.

| Item | Detail |
|------|--------|
| Platform Name | Acclusivo |
| Organisation | Acclusivo Education Foundation Nigeria |
| HQ | Yaba Tech Hub, 29 Herbert Macaulay Way, Lagos |
| Contact | hello@acclusivo.ng · +234 803 123 4567 (WhatsApp/SMS) |
| Active Cohorts | Lagos 2026-Alpha, Abuja Virtual, Kaduna Hub 2026 |
| Flagship Tuition | N35,000 per 12-week cohort |
| Primary Language | Nigerian Sign Language (NSL) + Visual Plain English |

---

## 2. The Problem

Most digital-skills courses in Nigeria are designed exclusively for hearing learners. The gap for deaf and hard-of-hearing learners is deep:

- Captions alone do not make complex technical ideas accessible for many deaf learners
- Qualified NSL tech instructors are extremely scarce across Nigeria
- Physical classroom space is limited in major hubs (Lagos, Abuja, Kaduna, Port Harcourt)
- Device and data inequality — many learners are on low-cost Android smartphones with limited data
- K-12 scheduling constraints — many learners are in school during standard training hours
- No structured pathway from free bootcamp to paid course to portfolio to employment for deaf coders

---

## 3. Product Vision and Mission

### Vision
A Nigeria where every deaf young person can learn, prove, and launch a career in tech — in their own language.

### Mission
Acclusivo turns a small, instructor-led training programme into a reusable, scalable, accessible-learning system:

```
NSL Lesson Video
  -> Visual Example and Demo
    -> Plain-Language Explanation
      -> Hands-On Activity
        -> Quiz
          -> Mentor Feedback
            -> Portfolio Project
              -> Certificate
```

The platform supplements live Google Meet / Zoom cohort sessions rather than replacing teachers.

---

## 4. Business Model

### First Payer: Parent / Guardian

Based on the Deaf community lived experience and Acclusivo current operations, the **primary paying customer is the parent or guardian** of a deaf learner.

```
Parent/Guardian  --pays-->  Acclusivo Foundation
                                    |
                                    v
                          Deaf Learner enrolled
                          in cohort course
                                    |
                                    v
                          NSL Lesson -> Activity
                          -> Quiz -> Certificate
```

**Payment Flow:**
1. Parent or guardian submits an enquiry or application form (device access, preferred course, learner details)
2. Admin confirms enrolment manually and records payment status
3. Parent makes a bank transfer to the official Acclusivo account
4. Admin marks payment as paid — learner gains full access
5. Parent views child progress, milestones, and facilitator remarks in the Parent Portal

**Payment States:** `pending` · `part-paid` · `paid` · `sponsored` · `scholarship`

**Tuition:** N35,000 per 12-week cohort (bank transfer; Flutterwave/Paystack integration planned for Phase 2)

### Future Revenue Streams (Phase 3+)

| Stream | Description |
|--------|-------------|
| NGO / School Sponsorships | Sponsor cohort seats for learners who cannot afford fees |
| Corporate Sponsors | Companies fund device loans and data for at-risk learners |
| Facilitator Training | Train NSL-fluent educators to run Acclusivo cohorts in new states |
| Certification Fees | Verified digital certificates for graduates |

---

## 5. Target Users and Personas

### Active Demo Personas

| Role | Name | Detail |
|------|------|--------|
| Deaf Learner | Chidiebere Okonkwo | Surulere, Lagos · Own smartphone · Cohort 2026-Alpha |
| Parent / Guardian | Mrs. Ngozi Okonkwo | Linked to Chidiebere · Payment: Paid · WhatsApp contact |
| Facilitator | Bashir Abubakar | Deaf Tech Lead · 6+ yrs experience · Frontend + NSL Computing Lexicon |
| Admin | Amina Yusuf | Program Director · Acclusivo Education Foundation |

### User Needs Summary

| User | Core Need | Key Actions |
|------|-----------|-------------|
| Deaf Learner | Learn tech in NSL without audio dependency | Watch lessons, do activities, take quizzes, submit work, get certificate |
| Parent / Guardian | Confidence that fees are well spent and child is progressing | View progress, milestones, payment receipts, facilitator remarks |
| Facilitator / Mentor | Teach and support learners efficiently across cohorts | Publish lessons, review code submissions, leave feedback, track at-risk learners |
| Administrator | Operate cohorts and generate impact evidence for sponsors | Manage users, payments, devices, cohorts, outcomes dashboard |
| Sponsor / NGO (Phase 3) | Fund equitable access and measure social impact | View sponsored learners, completion rates, portfolio outcomes |

---

## 6. Learner Journey (Core Flow)

The Deaf learner navigates **six sequential steps** per module. Navigation is always visible via a breadcrumb at the top of every screen.

```
Step 0: Course Catalogue
  |
  v  (tap a module)
Step 1: Lesson Page
  |  (see: title, summary, NSL topic, key concepts)
  v
Step 2: NSL Video
  |  (YouTube embed -- youtu.be/7lM2qS2XEPk -- CC enabled, fullscreen)
  v
Step 3: Hands-On Activity
  |  (visual step guide + live code playground + AI audit)
  v
Step 4: Quiz
  |  (3-5 MCQ questions, instant visual feedback per answer)
  v
Step 5: Results
  |  (score ring, pass/fail, "Start Next Module" or "Re-watch and Retry")
  v
Step 0: Course Catalogue  (loops back)
```

### Journey Rules

- Pass mark: 70% on quiz to unlock next module and earn completion credit
- Retry: Learner can re-watch the NSL video and retry quiz unlimited times
- Progress saved: All state persisted to localStorage; survives page refresh
- Locked modules: Cannot be accessed until the previous module is completed

---

## 7. Platform Architecture

### View Routing (Role-Based)

The platform serves **six role-based views** from a single-page application:

```
index.html
  |-- view-learner      (Step-based 6-step journey: Catalogue to Results)
  |-- view-parent       (Progress and payment portal for guardian)
  |-- view-facilitator  (Cohort management and submission grading desk)
  |-- view-admin        (Impact metrics and cohort outcomes dashboard)
  |-- view-portfolios   (Student capstone portfolio gallery)
  |-- view-public       (Public course catalogue and admissions page)
```

### State Machine (Learner Steps)

```javascript
state.lessonStep: 'catalogue' | 'lesson' | 'video' | 'activity' | 'quiz' | 'results'
state.activeModuleId: 'mod-1' | 'mod-2' | 'mod-3' | ...
state.lessonModuleId: the last module the user entered
state.quizAnswers: { 'mod-3-q3-1': 1, ... }  // persisted per module per question
```

---

## 8. Built Features (Current State)

### Learner Dashboard (Step-Based Journey)

| Feature | Status |
|---------|--------|
| 6-step breadcrumb navigation | Built |
| Welcome banner with live progress percentage | Built |
| Featured course card and module list | Built |
| Module status: Done / Active / Next / Locked | Built |
| Lesson overview page (concepts, NSL topic) | Built |
| YouTube NSL video embed (16:9, CC, fullscreen) | Built |
| Deaf-accessible video overlay badge | Built |
| Hands-on code playground (textarea + live preview iframe) | Built |
| Visual step-by-step activity guide | Built |
| AI code audit button (Ami AI mentor) | Built |
| Interactive quiz (MCQ, instant visual feedback) | Built |
| Score ring results page (conic gradient) | Built |
| Auto-pass at 70 percent + module unlock | Built |
| Start Next Module CTA on pass | Built |
| Re-watch and Retry CTA on fail | Built |

### Parent / Guardian Portal

| Feature | Status |
|---------|--------|
| Learner academic progression timeline | Built |
| Overall progress bar | Built |
| Facilitator remarks card | Built |
| Parent-to-facilitator note/inquiry form | Built |
| Tuition receipts and payment log | Built |
| Official bank account display | Built |
| Receipt upload (PDF / JPG / PNG) | Built |
| Payment status display | Built |

### Facilitator Desk

| Feature | Status |
|---------|--------|
| Cohort summary stats (active learners, at-risk, queue) | Built |
| Learner submission viewer (code preview) | Built |
| Grade actions: Needs Revision / Complete / Excellent | Built |
| AI-draft facilitator feedback | Built |
| Cohort live-session link manager | Built |
| Broadcast visual SMS alert to cohort | Built |

### Admin Outcomes Dashboard

| Feature | Status |
|---------|--------|
| Cohort KPI cards | Built |
| Enrolment and payment conversion chart | Built |
| At-risk learner flags | Built |
| Device support tracker | Built |
| Certificate generation trigger | Built |

### Global Accessibility Controls

| Feature | Status |
|---------|--------|
| Dark / Light theme toggle | Built |
| High-contrast mode (WCAG AAA) | Built |
| Font size: Normal / Large / X-Large | Built |
| Low-data mode (pauses video, shows offline cards) | Built |
| Visual flash notification (deaf bell substitute) | Built |
| Visual toast notifications (role=status, aria-live) | Built |
| Ami AI Mentor modal (NSL signs, code audit, flexbox) | Built |
| Demo data reset button | Built |

---

## 9. File Structure

```
ACCLUSIVO/
|-- index.html                  (206 lines -- single-page app shell)
|-- css/
|   |-- style.css               (~1,750 lines -- full design system)
|-- js/
|   |-- app.js                  (~2,400 lines -- application engine)
|   |-- data.js                 (~1,064 lines -- seed data)
|-- assets/                     (reserved for images, icons, offline files)
|-- ACCLUSIVO_PROJECT_SCOPE.md  (this file)
```

### app.js Key Methods

```
AcclusivoApp class
  |-- renderLearnerDashboard()     step router
  |-- renderCourseCatalogue()      Step 0
  |-- renderLessonPage()           Step 1
  |-- renderVideoStep()            Step 2 (YouTube embed)
  |-- renderActivityStep()         Step 3 (code playground)
  |-- renderQuizStep()             Step 4
  |-- renderResultsStep()          Step 5
  |-- finishQuiz()                 score calculation + module unlock
  |-- submitAndContinue()          activity submission + advance to quiz
  |-- goToStep()                   step navigation + scroll to top
  |-- renderParentPortal()
  |-- renderFacilitatorDesk()
  |-- renderAdminDashboard()
  |-- renderPortfoliosView()
  |-- renderPublicPortal()
  |-- Ami AI Mentor engine
```

---

## 10. Data Model

### Platform

```
platform
  name, tagline, contactEmail, phone, headquarters, defaultCohort
```

### Users

```
User
  id, name, email, role, avatar, badge, location
  deviceAccess: 'own laptop' | 'own smartphone' | 'borrowed' | 'needs support'
  accessibility preferences

Guardian (extends User)
  linkedLearner, learnerId
  paymentStatus: 'pending' | 'part-paid' | 'paid' | 'sponsored' | 'scholarship'
  paymentRef, paymentMethod, phone
```

### Course Structure

```
Course
  id, title, badge, level, language
  tuitionNGN, durationWeeks, description, learningPath
  modules[]
    Module
      id, number, title, outcome
      duration, status: 'completed' | 'in-progress' | 'locked'
      nslTopic, videoDuration, lowDataSize, summary
      keyConcepts[]: { term, nslTip, definition }
      visualDemoSteps[]
      quiz[]: { id, question, options[], correctIndex, visualExplanation }
      task: { id, title, instructions, starterCode, submissionType, gradingRubric }
```

### Learner Progress

```
Learner
  id, name, cohortId, paymentStatus
  progressPercent, completedModules[]
  liveAttendanceRate, needDeviceSupport, loanedDevice
  paymentRef, paymentMethod
  assignments: { modId: { status, grade, code, feedback, submittedAt } }
```

### Cohort

```
Cohort
  id, name, facilitator, location
  schedule, enrolledCount, capacity
  startDate, endDate, liveMeetUrl
```

### Portfolio and Certificate

```
Portfolio
  learnerId, learnerName, projectTitle
  description, tech[]
  liveUrl, certificateId, testimonial
```

---

## 11. Flagship Course Frontend Web Development

**Duration:** 12 weeks | **Fee:** N35,000 | **Level:** Beginner to Career-Ready

| # | Module Title | Learner Outcome | Duration | Video |
|---|-------------|-----------------|----------|-------|
| 1 | Digital Foundations and Workspace Setup | Browser, VS Code, file structure | Week 1-2 | 11m 45s |
| 2 | HTML Basics and Semantic Page Structure | Build a one-page profile with semantic tags | Week 3-4 | 14m 20s |
| 3 | CSS Basics: Styling and Accessible Visual Design | High-contrast styles, box model, typography | Week 5-6 | 16m 10s |
| 4 | Layout and Responsive Design | Flexbox, Grid, mobile-first media queries | Week 7-8 | 18m 05s |
| 5 | JavaScript Introduction | DOM manipulation, event listeners, interactivity | Week 9-10 | Planned |
| 6 | Portfolio Project | Publish a 3-page website + README | Week 11 | Planned |
| 7 | Demo Day and Certificate | Present project, receive graded feedback | Week 12 | Planned |

### Each Module Includes

- One NSL concept video (embedded YouTube, captions on)
- Visual step-by-step demo instructions
- Plain-language written recap
- 3-5 multiple-choice quiz questions with instant visual feedback
- Live code playground with starter code and live preview
- Offline practice package download (compressed, mobile-friendly)
- NSL sign glosses for all key technical terms

---

## 12. Accessibility Standards

Acclusivo targets **WCAG 2.2 AAA** compliance across all views.

### Core Principles

- NSL is the primary instructional language -- English text supports, never replaces
- No audio-only instructions -- every key instruction is visually available
- No auto-playing video -- learner controls all playback
- High contrast -- minimum 4.5:1 text, dark mode default (#080c14 bg / #f1f5f9 text = 18.2:1)
- Large touch targets -- minimum 44x44px for all interactive elements
- Mobile-first -- designed for 360px viewport (budget Android phones)
- Descriptive alt text on all images
- Semantic HTML: header, main, nav, section, aria-label, role
- Visual flash notifications -- substitute for audio bell alerts
- Live regions: role=status + aria-live=polite for toast notifications
- Keyboard navigation -- all interactive elements focusable
- Low-data mode -- pauses video, shows offline card, shows NSL gesture cards

### Deaf-Specific Design Choices

| Challenge | Design Solution |
|-----------|----------------|
| Audio alert bells | Visual screen flash + toast notification |
| Audio-only error messages | Colour + icon + text feedback |
| Complex jargon | NSL gloss tips on every technical term |
| Video quality vs. data | Low-data mode toggle (saves ~75% bandwidth) |
| Slow internet | Offline cheatsheet download per module |
| Signing visibility | CC auto-enabled on YouTube embed |

---

## 13. Content Standards

- NSL videos are recorded with deaf Nigerian facilitators as lead instructors
- One concept per short video where possible
- Include visible demonstrations: diagrams, screenshots, worked code examples
- Record content ownership, contributor credit, and reuse permissions for every lesson
- International subject experts may contribute lesson plans, but local facilitators adapt content for NSL and Nigerian context
- All learner photos, videos, testimonials, and portfolios require explicit consent (guardian consent for minors)

---

## 14. Information Architecture

```
Public Pages (no login required)
  /              Home (mission, impact stats, NSL demo)
  /courses       Course catalogue with fees
  /bootcamp      Free introductory bootcamp
  /apply         Application and enquiry form
  /parents       Parent information and FAQ
  /contact       WhatsApp / SMS / email

Learner Area (authenticated)
  /dashboard     Course Catalogue (Step 0)
  /lesson/:id    Lesson Overview (Step 1)
  /video/:id     NSL Video (Step 2)
  /activity/:id  Code Playground (Step 3)
  /quiz/:id      Quiz (Step 4)
  /results/:id   Results (Step 5)
  /portfolio     Capstone portfolio gallery
  /certificate   Downloadable verified certificate

Parent Area (authenticated)
  /parent/progress   Learner academic milestones
  /parent/payment    Bank details + receipt upload + history
  /parent/messages   Facilitator communication

Facilitator Area (authenticated)
  /facilitator/cohorts     My assigned cohorts
  /facilitator/learners    Learner progress tracker
  /facilitator/submissions Submission grading desk
  /facilitator/content     Lesson and quiz editor

Admin Area (authenticated)
  /admin/cohorts   Create and manage cohorts
  /admin/users     Learner, guardian, and staff accounts
  /admin/payments  Payment status and manual confirmation
  /admin/devices   Device loan tracker
  /admin/outcomes  Impact metrics dashboard
  /admin/reports   Export for sponsors and NGO reporting
```

---

## 15. Delivery Roadmap

### Phase 0 -- Foundation (Complete)

- [x] Project folder structure created
- [x] Full design system (CSS variables, dark/light theme, typography)
- [x] Single-page application shell with 6 role-based views
- [x] Complete seed data for all personas, courses, cohorts, and learners
- [x] Role switcher and persona badge in global nav
- [x] Accessibility controls (theme, contrast, font, low-data)
- [x] Visual flash and toast notification system (deaf-accessible)

### Phase 1 -- MVP Learner Journey (Complete)

- [x] 6-step learner journey: Catalogue to Lesson to Video to Activity to Quiz to Results
- [x] YouTube NSL video embed (youtu.be/7lM2qS2XEPk) with CC and fullscreen
- [x] Breadcrumb step navigation
- [x] Live code playground (textarea editor + iframe live preview)
- [x] Interactive MCQ quiz with instant visual feedback
- [x] Score ring results page
- [x] Module pass/fail logic (70 percent = pass, auto-unlock next module)
- [x] Start Next Module and Re-watch and Retry CTAs
- [x] State persisted to localStorage
- [x] Ami AI NSL and Code Mentor modal

### Phase 1 -- MVP Supporting Portals (Complete)

- [x] Parent portal: progress timeline, payment info, receipt upload, facilitator remarks
- [x] Facilitator desk: submission grading, cohort stats, live session management
- [x] Admin outcomes dashboard: KPIs, enrolment funnel, device tracker
- [x] Student portfolios gallery
- [x] Public admissions page

### Phase 2 -- Real Auth and Backend (Next)

- [ ] User authentication (email + phone/WhatsApp login, no password for accessibility)
- [ ] Database: Supabase or Firebase (persistent across devices)
- [ ] Parent-linked account registration
- [ ] Admin manual payment confirmation workflow
- [ ] Facilitator submission review with feedback notification
- [ ] Nigerian payment gateway: Flutterwave or Paystack (after manual workflow proven)
- [ ] WhatsApp notification integration (session reminders, submission alerts)
- [ ] Certificate PDF generation (learner name, module, date, QR code)
- [ ] Progressive Web App (PWA) -- offline mode, install to home screen

### Phase 3 -- Scale Responsibly

- [ ] Sponsored cohort seats (NGO / corporate)
- [ ] School / NGO reporting dashboard
- [ ] Facilitator onboarding workflow + NSL content studio guide
- [ ] Second course: Python for Data (after demand is proven)
- [ ] Multi-state expansion: Abuja, Kaduna, Port Harcourt, Ibadan live hubs
- [ ] Learner employment and internship outcome tracking
- [ ] International subject expert partner programme

---

## 16. Success Metrics

### Pilot Cohort Targets (Lagos 2026-Alpha)

| Metric | Target |
|--------|--------|
| Module 1-4 completion rate | 80 percent or more of enrolled learners |
| Portfolio project submission | 70 percent or more of learners |
| Parent progress updates sent | 2 or more per cohort per learner |
| Facilitator feedback without spreadsheets | 100 percent (platform only) |
| Consented learner/parent testimonials | 3 or more case studies |
| Learners needing device/data support identified | 100 percent flagged for sponsorship ask |

### Platform Quality Metrics

| Metric | Target |
|--------|--------|
| Page load time on 3G mobile | Less than 3 seconds |
| Quiz completion after video | 75 percent or more |
| Re-watch rate per failed quiz | Tracked per module |
| Parent portal login after enrolment | 60 percent or more within 1 week |
| Low-data mode adoption | Tracked per cohort location |

---

## 17. Tech Stack

### Current (Demo / Prototype)

| Layer | Technology | Reason |
|-------|-----------|--------|
| Structure | HTML5 (semantic) | WCAG-compliant, works on any device |
| Logic | Vanilla JavaScript (ES6+ class) | Zero dependencies, fast on low-end phones |
| Styling | Vanilla CSS + CSS custom properties | Full design system, no framework overhead |
| Fonts | Google Fonts (Plus Jakarta Sans, Space Grotesk, JetBrains Mono) | Modern, legible, Nigerian-friendly |
| Video | YouTube embed (iframe) | Free, CDN-backed, CC support built-in |
| State | localStorage | No backend required for prototype |
| Dev Server | http-server (npm) | Zero config local preview |

### Planned (Phase 2+)

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js (React) or SvelteKit |
| Backend / API | Supabase (Postgres + auth + storage) |
| Auth | Supabase Auth (magic link / OTP -- no password) |
| Payments | Flutterwave or Paystack |
| Notifications | WhatsApp Business API (deaf-accessible) |
| File Storage | Supabase Storage (receipt uploads, portfolio files) |
| Hosting | Vercel (frontend) + Supabase (backend) |
| Offline / PWA | Service Worker + Cache API |

---

## 18. Non-Goals Version 1

These are explicitly out of scope for the first release:

- Full marketplace or course store with many subjects
- Job board or social network
- AI tutor that replaces a human NSL instructor
- Multi-country localisation (e.g. ASL or BSL variants)
- Python, data analytics, and other courses launched simultaneously
- Fully automated payment and certificate workflows before outcomes are proven
- Live video streaming (cohort sessions use Google Meet / Zoom)
- Audio features (the platform must be fully usable without sound)

---

## 19. Product Principle

> **Every feature must answer one question:**
>
> Does this help a deaf learner understand, practise, and prove a practical digital skill -- or help Acclusivo deliver that learning to more people without losing accessibility and trust?
>
> If the answer is no, do not build it yet.

---

## Appendix A -- NSL Video Reference

- YouTube URL: https://youtu.be/7lM2qS2XEPk
- Embed ID: 7lM2qS2XEPk
- Embed Settings: rel=0, modestbranding=1, cc_load_policy=1
- Format: 16:9 responsive iframe, fullscreen enabled

---

## Appendix B -- Key Contacts and Accounts

| Item | Detail |
|------|--------|
| Platform email | hello@acclusivo.ng |
| WhatsApp / SMS | +234 803 123 4567 |
| GitHub repo | github.com/techinclusiondeaf/acclusivo |
| Locations | Lagos, Abuja, Kaduna, Port Harcourt, Ibadan |
| Cohort default | lagos-2026-alpha |

---

*Last updated: September 2026 · Acclusivo Education Foundation Nigeria*
