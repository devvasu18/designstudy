# Design Study - Next.js Social Media App

A modern, clean Next.js application with a proper tab-based navigation structure, featuring stories, profile management, stats, and user discovery.

## 🚀 **Features**

- **Clean Tab Navigation**: Home, Stats, Profile, and Discover pages
- **Stories Feature**: Interactive story viewing and uploading
- **User Profile**: Complete profile management with stats
- **Discover Users**: Find and connect with new users
- **Statistics Dashboard**: Comprehensive analytics and insights
- **Responsive Design**: Mobile-first responsive UI
- **Dummy API**: Complete mock API for all features

## 🏗️ **Tech Stack**

- **Framework**: Next.js 15.5.0 with App Router
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Built-in fetch with custom API layer
- **State Management**: React Context + Custom hooks

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 🔗 **API Endpoints**

All API endpoints return mock data for development:

- **GET** `/api/health` - API health check
- **GET** `/api/user` - Get user profile
- **PUT** `/api/user` - Update user profile
- **GET** `/api/stats?period=week` - Get user statistics
- **GET** `/api/stories` - Get all stories
- **POST** `/api/stories` - Upload new story
- **GET** `/api/discover?type=users&category=all` - Discover users/posts

## 📱 **App Structure**

### **Home Tab** (`/home`)
- User profile info card
- Interactive stories swiper
- Secret stalkers section

### **Stats Tab** (`/stats`)
- Follower/following analytics
- Engagement metrics
- Growth statistics

### **Profile Tab** (`/profile`)
- Profile management
- User information display

### **Discover Tab** (`/discover`)
- Find new users
- Filter by categories
- Search functionality

## ✨ **Clean Architecture**

- **Maintainable**: Clear separation of concerns
- **Scalable**: Easy to add new features
- **Reusable**: Component-based architecture
- **Performance**: Optimized with Next.js App Router

---

**Ready for development!** 🎉
