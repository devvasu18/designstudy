# Project Structure

This Next.js project follows a well-organized, feature-based architecture with clear separation of concerns.

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (tabs)/                   # Route group for tabbed navigation
│   │   ├── layout.js             # Shared layout for all tabs
│   │   ├── home/page.js          # Home tab page
│   │   ├── stats/page.js         # Stats tab page
│   │   ├── profile/page.js       # Profile tab page
│   │   └── discover/page.js      # Discover tab page
│   ├── api/                      # API routes
│   ├── layout.js                 # Root layout
│   └── page.js                   # Root page (redirects to /home)
│
├── components/                   # React components
│   ├── features/                 # Feature-specific components
│   │   ├── profile/              # Profile-related components
│   │   │   ├── ProfileHeader.jsx
│   │   │   ├── ProfileInfoCard.jsx
│   │   │   └── index.js          # Export barrel
│   │   └── stories/              # Stories-related components
│   │       ├── StoriesSwiper.jsx
│   │       ├── StoryViewModal.jsx
│   │       ├── StoryViewModalSimple.jsx
│   │       └── index.js          # Export barrel
│   ├── pages/                    # Page-level components
│   │   ├── HomePageContent.jsx
│   │   ├── StatsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── DiscoverPage.jsx
│   ├── sections/                 # Section components
│   │   ├── SecretStalkersContent.jsx
│   │   └── OnClickFeatures.jsx
│   ├── ui/                       # Reusable UI components
│   │   ├── BottomNavigation.jsx
│   │   ├── NotificationToast.jsx
│   │   └── DisablePinchZoom.jsx
│   └── index.js                  # Component exports
│
├── context/                      # React contexts
│   ├── AppContext.js             # Global app state
│   └── AuthContext.jsx           # Authentication context
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.js                # Authentication hook
│   └── useScrollPosition.js      # Scroll position hook
│
├── lib/                          # Library code
│   ├── auth.js                   # Authentication utilities
│   ├── constants.js              # App constants
│   └── fetcher.js                # Data fetching utilities
│
├── services/                     # External service integrations
│   └── api.js                    # API service layer
│
├── styles/                       # Styling
│   ├── globals.css               # Global styles
│   └── variables.css             # CSS variables
│
├── types/                        # Type definitions (JSDoc)
│   └── index.js                  # Type definitions
│
└── utils/                        # Utility functions
    └── helpers.js                # Helper functions
```

## 🏗️ Architecture Principles

### 1. **Feature-Based Organization**
Components are organized by features (profile, stories) rather than technical concerns, making the codebase more maintainable and scalable.

### 2. **Clear Separation of Concerns**
- **Pages**: Route-level components that handle routing logic
- **Features**: Business logic components grouped by feature
- **UI**: Reusable, presentational components
- **Sections**: Larger composite components

### 3. **Proper Import Structure**
- Use barrel exports (`index.js`) for cleaner imports
- Consistent import paths using `@/` alias
- Feature-based imports where possible

### 4. **Shared State Management**
- Context providers for global state
- Custom hooks for reusable logic
- Proper state lifting and prop drilling

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 📝 Best Practices

1. **Component Naming**: Use PascalCase for component files
2. **Feature Grouping**: Keep related components together
3. **Export Patterns**: Use barrel exports for cleaner imports
4. **State Management**: Use Context for global state, local state for component-specific data
5. **File Organization**: Follow the established folder structure
6. **Import Order**: External libraries → Internal components → Relative imports

## 🔄 Migration Notes

This structure was refactored from a single-page component approach to a proper Next.js App Router structure with:
- Proper tab routing using route groups
- Feature-based component organization
- Shared layouts and state management
- Clean separation of business logic and presentation
