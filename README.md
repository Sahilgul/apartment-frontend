# Apartment Platform – React + Vite Frontend

This is the frontend of the **University Apartment Platform**, built using **React** and **Vite**. The app integrates with a Flask backend that provides APIs for apartment listings, user authentication, reviews, user management, and search functionality.

## 🌐 Live Demo
> Add link here (optional)

---

## 📁 Project Structure
```
apartment-platform/
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── images/             # Image assets
│       └── fonts/              # Custom fonts
├── src/
│   ├── api/                    # Axios instances and endpoint services
│   │   ├── auth.js
│   │   ├── listings.js
│   │   ├── reviews.js
│   │   ├── users.js
│   │   ├── search.js
│   │   └── index.js            # Axios base config
│   ├── assets/
│   │   ├── images/
│   │   ├── styles/
│   │   │   ├── global.css      # Global styles
│   │   │   ├── theme.css
│   │   │   └── variables.css
│   │   └── fonts/
│   ├── components/
│   │   ├── auth/               # Login/Register/Auth Modal
│   │   ├── listings/           # Cards, Forms, Detail pages
│   │   ├── reviews/            # Reviews UI
│   │   ├── search/             # Search bar and filters
│   │   ├── ui/                 # Navbar, Footer, Loaders, etc.
│   │   └── user/               # User profile, listings
│   ├── contexts/               # React context providers
│   │   ├── AuthContext.jsx
│   │   ├── ListingsContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useListings.js
│   │   ├── useReviews.js
│   │   └── useUser.js
│   ├── pages/                  # All page-level views
│   │   ├── auth/
│   │   ├── listings/
│   │   ├── reviews/
│   │   ├── search/
│   │   ├── user/
│   │   ├── HomePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── PublicPage.jsx
│   ├── routes/                 # Routing configuration
│   │   ├── AppRoutes.jsx
│   │   └── routes.js
│   ├── store/                  # Redux or Context state
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── listingsSlice.js
│   │   │   └── reviewsSlice.js
│   │   └── store.js
│   ├── utils/                  # Helper functions and constants
│   │   ├── auth.js
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validation.js
│   ├── App.jsx                 # Root app component
│   ├── main.jsx                # App entry point
│   └── index.css
├── .env                        # Environment variables
├── .env.development
├── .env.production
├── .gitignore
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── README.md                   # This file
└── jsconfig.json               # JS project settings
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
$ git clone https://github.com/Sahilgul/apartment-frontend.git
$ cd apartment-platform

# Install dependencies
$ npm install

# Set environment variables
$ cp .env.development .env

# Start development server
$ npm run dev
```

---

## 🔌 API Integration
This frontend integrates with a Flask backend through REST APIs. Below are key modules and their roles:

### 🔐 Authentication
- Register/Login using `auth.js`
- Manage tokens via `AuthContext`
- Role-based access control for tenants and landlords

### 🏠 Listings
- Browse, create, edit, delete listings via `listings.js`
- Components: `ListingCard`, `ListingForm`, `ListingDetail`
- Integration with maps (if applicable)

### ⭐ Reviews
- Create/update/delete reviews using `reviews.js`
- Components: `ReviewCard`, `ReviewForm`, `ReviewsList`
- Star-based rating system

### 🔍 Search
- Keyword and filter search (`search.js`)
- Filter by location, price, room type, amenities, etc.

### 👤 User
- View/update user profile
- View listings posted by a user
- Manage favorites/bookmarks (if implemented)

---

## 🧠 State Management
React Context is used for:
- Authentication (AuthContext)
- Listings (ListingsContext)
- Theme toggling (ThemeContext)

Optionally enhanced with Redux Toolkit for scalable state management (authSlice, listingsSlice, reviewsSlice).

---

## 🛡️ Protected Routes
Certain pages (e.g., dashboard, create/edit listing, review submission) are protected using route guards. Unauthorized users are redirected to login.

---

## 🎨 Styling
- Tailwind CSS or custom CSS (based on your stack)
- `global.css` defines resets and body typography
- `theme.css` enables dark/light theme switching
- Responsive utilities used across components

---

## 🧪 Testing (Optional)
You can add unit and integration tests using:
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Cypress for E2E testing (optional)

---

## 🚀 Deployment
To build for production:
```bash
npm run build
```
This will generate the static files in the `dist/` folder.
You can deploy using:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)
- Any static hosting provider

---

## 📬 Contact
For any questions, contributions, or issues, feel free to:
- Open a GitHub Issue
- Contact: `your-email@example.com`

---

## 📜 License
This project is licensed under the **MIT License**. Feel free to fork and use!

---

## ✅ To-Do
- [ ] Add unit and integration tests
- [ ] Enhance form validation and error feedback
- [ ] Ensure full mobile responsiveness
- [ ] Integrate Nivo charts for usage analytics
- [ ] Add real-time notifications for landlords/tenants
- [ ] Use WebSockets or polling for live updates
- [ ] Add user bookmarks or saved listings

