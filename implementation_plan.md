# UiTM Academic Registration System — Implementation Plan

## Goal

Build a fully interactive, demo-ready frontend prototype of the UiTM Academic Registration System using **React + Vite + Tailwind CSS v3 + React Router v6 + Framer Motion**. The app simulates three user roles (Student, Advisor, Admin) with all 15 screens, validation logic, and cross-role state persistence within a browser session.

---

## User Review Required

> [!IMPORTANT]
> **UiTM Logo Asset**: The spec references `/src/assets/uitm-logo.png`. I did not find this file in the workspace. I have two options:
> 1. **Generate a placeholder logo** using the image generation tool (stylized "UiTM" text mark).
> 2. **Use an SVG text-based logo** as a fallback that you can replace later.
>
> Please confirm which approach you prefer, or provide the actual `uitm-logo.png` file.

> [!IMPORTANT]
> **Tailwind CSS Version**: The spec says "Tailwind CSS". I will use **Tailwind CSS v3** (stable, proven with Vite). Tailwind v4 has a different config approach. Please confirm v3 is acceptable.

> [!NOTE]
> **Reference Image**: The spec mentions `photo_2026-07-09_20-14-47.jpg` but it was not provided. I will design based on the detailed textual spec (professional academic portal, deep blue branding, clean cards). If you have this image, please share it so I can match the layout more precisely.

---

## Open Questions

1. **Font preference**: The spec doesn't specify a Google Font. I plan to use **Inter** (clean, professional, widely used in academic portals). Is this acceptable?
2. **Print functionality**: For the Registration Slip (Screen 12), should `window.print()` be triggered, or just show a toast? The spec says "printable document" — I'll implement actual `window.print()` with a print-optimized CSS stylesheet.
3. **Mobile responsiveness**: The spec mentions "responsive behavior" in polish. Should this be tablet-friendly only (min 768px) or fully mobile-responsive down to 320px?

---

## Proposed Changes

The entire project is new. Below is the full file tree grouped by component area.

---

### Phase 1: Project Scaffolding

#### [NEW] Project root files
- `package.json` — Vite + React + deps
- `vite.config.js` — Vite configuration  
- `tailwind.config.js` — Tailwind with custom UiTM colors
- `postcss.config.js` — PostCSS for Tailwind
- `index.html` — Entry HTML with Inter font, meta tags

```
npx -y create-vite@latest ./ --template react
npm install react-router-dom framer-motion
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

---

### Phase 2: Design System & Global State

#### [NEW] [index.css](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/index.css)
- Tailwind directives (`@tailwind base/components/utilities`)
- Custom utility classes for UiTM branding
- Print-specific `@media print` styles (hide sidebar/topbar)

#### [NEW] [mockData.js](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/data/mockData.js)
Contains all fake data:
- **Student profile**: `{ id: '2024123456', name: 'Ahmad Farhan bin Ismail', faculty: 'Faculty of Computer & Mathematical Sciences', semester: 4, program: 'CS230 - Computer Science', cgpa: 3.45, registeredCourses: [] }`
- **Course catalog** (12 courses across CS/Math with realistic UiTM codes like CSC580, MAT421, etc.)
  - 3 courses with prerequisites (for validation failure demo)
  - 1 course with `availableSeats: 0` (for seat failure demo)
  - Each course has: `id, code, name, credits, lecturer, day, startTime, endTime, venue, totalSeats, availableSeats, prerequisites[]`
- **Lecturer profile**: `{ id: 'L001', name: 'Dr. Norazlina binti Ahmad', department: 'Computer Science' }`
- **Admin stats**: Static enrollment numbers
- **Timetable slots**: Derived from registered courses

#### [NEW] [AppContext.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/context/AppContext.jsx)
React Context providing:
- `user` (null | { role, username, profile })
- `login(username)` — sets role based on username prefix
- `logout()` — clears state
- `courses` — mutable course catalog (seats decrement)
- `selectedCourses` — array of course IDs in current registration session
- `addCourse(id)` / `removeCourse(id)`
- `registrationPhase` — 'draft' | 'pending' | 'approved' | 'rejected'
- `submitRegistration()` / `approveRegistration()` / `rejectRegistration()`
- `totalCredits` — computed from selectedCourses
- `validationResults` — computed: credits check, prereq check, seats check
- `toasts` — toast notification queue
- `showToast(message, type)` — push toast

---

### Phase 3: Layouts & Core Components

#### [NEW] [AuthLayout.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/layouts/AuthLayout.jsx)
- Centered card layout with UiTM gradient background
- Logo at top, card in center

#### [NEW] [DashboardLayout.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/layouts/DashboardLayout.jsx)
- Collapsible sidebar (240px) with:
  - UiTM logo at top
  - Role-based navigation items
  - Logout button at bottom
- Top bar with:
  - Page title
  - Notification bell (cosmetic)
  - User avatar + name dropdown

#### Common Components (`/src/components/common/`):
| File | Purpose |
|------|---------|
| [UiTMLogo.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/UiTMLogo.jsx) | Logo wrapper with size prop |
| [PrimaryButton.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/PrimaryButton.jsx) | Loading state, whileTap scale animation |
| [SecondaryButton.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/SecondaryButton.jsx) | Outlined variant |
| [StatCard.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/StatCard.jsx) | Number + label + icon with hover lift |
| [StatusBadge.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/StatusBadge.jsx) | Green/yellow/red pill badges |
| [ToastManager.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/ToastManager.jsx) | Fixed bottom-right toast stack with AnimatePresence |
| [ValidationStep.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/ValidationStep.jsx) | Animated check/cross with label |
| [PrintWrapper.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/common/PrintWrapper.jsx) | Wraps content, adds print button |

#### Specific Components (`/src/components/specific/`):
| File | Purpose |
|------|---------|
| [CourseDataTable.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/specific/CourseDataTable.jsx) | Sortable course table with Register buttons |
| [TimetableGrid.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/specific/TimetableGrid.jsx) | Weekly time×day matrix |
| [CourseSummaryPanel.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/specific/CourseSummaryPanel.jsx) | Floating sidebar showing selected courses & credits |
| [ApprovalCard.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/components/specific/ApprovalCard.jsx) | Student submission card for lecturer view |

---

### Phase 4: Student Pages (10 screens)

#### [NEW] [SplashScreen.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/pages/SplashScreen.jsx) — Route: `/`
- Full-screen UiTM branded intro
- Animated logo entrance (scale + fade)
- "Get Started" button → `/login`
- Gradient background: deep blue to darker blue

#### [NEW] [Login.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/pages/Login.jsx) — Route: `/login`
- Username + password fields (password is cosmetic)
- On submit: 1s simulated loading, then route based on username:
  - `demo_student` → `/student/dashboard`
  - `demo_advisor` → `/lecturer/dashboard`
  - `demo_admin` → `/admin/dashboard`
  - Anything else → show error toast

#### Student Pages (`/src/pages/student/`):
| File | Route | Key Implementation Details |
|------|-------|---------------------------|
| `Dashboard.jsx` | `/student/dashboard` | 6 clickable StatCards (Registration, Timetable, Fees, Slip, Profile, Validation). Cards have icons and subtle hover animations. |
| `Profile.jsx` | `/student/profile` | Static profile card. "Edit Profile" → toast. Shows student photo placeholder, academic details. |
| `CourseRegistration.jsx` | `/student/courses` | Full course table + floating summary panel. Search/filter by code/name. Register button toggles course selection. |
| `CourseDetails.jsx` | `/student/courses/:id` | Course info card: syllabus, prerequisites list, seat count bar, lecturer info. Primary "Add to Registration" button. |
| `Validation.jsx` | `/student/validation` | 3 animated ValidationSteps. Computes pass/fail from context. Submit button disabled if any fail. |
| `PendingApproval.jsx` | `/student/pending` | Waiting state with animated hourglass/spinner. "Back to Dashboard" link. If already approved → auto-redirect to success. |
| `RegistrationSuccess.jsx` | `/student/success` | Green checkmark pop animation. Two CTAs: "View Timetable" and "View Registration Slip". |
| `Timetable.jsx` | `/student/timetable` | TimetableGrid component with registered courses color-coded. |
| `FeeStatus.jsx` | `/student/fees` | Fee breakdown table. Total calculation. "Print Receipt" → `window.print()`. |
| `RegistrationSlip.jsx` | `/student/slip` | Formal document layout. UiTM logo centered. Student details, course table, date, barcode placeholder. Print-optimized. |

---

### Phase 5: Staff Pages (3 screens)

#### [NEW] Lecturer Pages (`/src/pages/lecturer/`):
| File | Route | Details |
|------|-------|---------|
| `Dashboard.jsx` | `/lecturer/dashboard` | StatCards for assigned courses, total students, pending approvals. Pending Approvals section shows ApprovalCards. Click "Approve" → changes registration phase in context. |

#### [NEW] Admin Pages (`/src/pages/admin/`):
| File | Route | Details |
|------|-------|---------|
| `Dashboard.jsx` | `/admin/dashboard` | Quick-link cards: Manage Students, Manage Lecturers, Manage Courses, System Settings. Each triggers toast. Overview stats. |
| `Reports.jsx` | `/admin/reports` | Simulated bar/pie charts using CSS-only (no chart library needed — styled divs). "Generate Report" shows 2s spinner then success toast. |

---

### Phase 6: Routing & App Assembly

#### [NEW] [App.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/App.jsx)
- `BrowserRouter` wrapping all routes
- Route guards: redirect unauthenticated users to `/login`
- Role-based route protection
- `AnimatePresence` for page transitions
- `ToastManager` rendered globally

#### [NEW] [main.jsx](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/main.jsx)
- React root render with `AppProvider` wrapping `App`

---

### Phase 7: Utilities

#### [NEW] [utils/helpers.js](file:///c:/Users/Mimdal/Documents/GitHub/UITM%20academic%20registration/src/utils/helpers.js)
- `calculateTotalCredits(courses)` — sums credit values
- `checkPrerequisites(course, completedCourses)` — returns pass/fail
- `formatTime(time)` — 24h to 12h conversion
- `generateSlipNumber()` — fake reference number

---

## Verification Plan

### Automated Tests
Not applicable for this demo prototype. Verification is manual and visual.

### Manual Verification
1. **`npm run dev`** — Confirm the app starts without errors on `localhost:5173`
2. **Happy Path walkthrough**: Login as `demo_student` → register 3 courses → validate (all green) → submit → see pending
3. **Validation Failures**:
   - Select course with missing prerequisite → red X on validation
   - Select 7+ courses → credit limit exceeded → red X
   - Select 0-seat course → seat failure → red X
4. **Advisor Flow**: Login as `demo_advisor` → see pending approval → click Approve → re-login as student → see success screen
5. **Admin Flow**: Login as `demo_admin` → navigate dashboard → click Reports → generate report
6. **Dead-End Buttons**: Click "Edit Profile", "Manage Settings" → confirm toast appears
7. **Print**: Open Registration Slip → trigger print → confirm clean output (no sidebar/nav)
8. **Navigation**: Verify all sidebar links route correctly per role

### Total File Count
~35 new files across the project structure.
