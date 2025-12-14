# 📚 BookNest - Your Library Companion

BookNest is a modern, feature-rich library management system built with React and Vite. It provides an intuitive interface for browsing books, making reservations, managing checkouts, and tracking your reading journey.

![BookNest Home Page](screenshots/home-page.png)

## ✨ Features

### 🏠 Home Page
- **Hero Section** with animated call-to-action
- **Featured Books** carousel with smooth animations
- **New Arrivals** section showcasing latest additions
- **Browse Collection** with comprehensive book grid
- **Staggered card animations** using Framer Motion
- **Dark/Light mode** toggle for comfortable reading

### 📖 Book Management
- **Detailed Book Views** with comprehensive information
- **Book Reservations** with real-time availability
- **Shopping Cart** functionality for multiple book checkouts
- **QR Code Generation** for easy book identification
- **Search and Filter** capabilities

### 👤 User Dashboard
- **Active Reservations** tracking
- **Borrowing History** with detailed records
- **Reading Statistics** and analytics
- **Favorite Books** management
- **Profile Management**

### 📧 Contact & Support
- **Contact Form** with EmailJS integration
- **Real-time form validation**
- **Success/Error notifications** via Toast system
- **Responsive design** for all devices

### 🎨 UI/UX Features
- **Responsive Navigation** with burger menu for mobile/tablet
- **Framer Motion Animations** throughout the app
- **Spring animations** for smooth transitions
- **Staggered menu items** in mobile navigation
- **Toast notifications** for user feedback
- **Glassmorphism effects** and modern design patterns

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd booknest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

   > **Note:** You'll need to create an account at [EmailJS](https://www.emailjs.com/) to get these credentials for the contact form functionality.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## 📦 Dependencies

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.2.0 | Core React library |
| `react-dom` | ^19.2.0 | React DOM rendering |
| `react-router-dom` | ^7.9.6 | Client-side routing |
| `motion` | ^12.23.24 | Framer Motion animations |
| `@emailjs/browser` | ^4.4.1 | Email service integration |
| `qrcode.react` | ^4.2.0 | QR code generation |
| `tailwindcss` | ^4.1.17 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.1.17 | Tailwind CSS Vite plugin |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.2.4 | Build tool and dev server |
| `@vitejs/plugin-react` | ^5.1.1 | React plugin for Vite |
| `eslint` | ^9.39.1 | Code linting |
| `autoprefixer` | ^10.4.22 | CSS autoprefixer |
| `postcss` | ^8.5.6 | CSS processing |
| `babel-plugin-react-compiler` | ^1.0.0 | React compiler plugin |

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `http://localhost:5173` |
| `npm run build` | Build production bundle to `dist/` directory |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 📁 Project Structure

```
booknest/
├── public/                 # Static assets
│   └── icons8-store-48.png
├── src/
│   ├── assets/            # Images and media files
│   ├── components/        # Reusable React components
│   │   ├── BookCard.jsx   # Book display card
│   │   ├── Navbar.jsx     # Navigation bar with responsive menu
│   │   └── ui/            # UI components (Toast, etc.)
│   ├── context/           # React Context for state management
│   │   ├── StateContext.jsx
│   │   └── reducers.js
│   ├── data/              # Static data and mock data
│   │   ├── books.js       # Book catalog
│   │   └── users.js       # User data
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── BookDetails.jsx # Individual book view
│   │   ├── Reserve.jsx    # Reservation page
│   │   ├── Checkout.jsx   # Checkout process
│   │   ├── Confirmation.jsx # Order confirmation
│   │   ├── Dashboard.jsx  # User dashboard
│   │   ├── Contact.jsx    # Contact form
│   │   └── Debug.jsx      # Development tools
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   ├── index.css          # Global styles
│   └── theme.css          # Theme variables
├── .env                   # Environment variables
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home-page.png)
*Modern landing page with featured books and smooth animations*

### Dashboard
![Dashboard](screenshots/dashboard-page.png)
*User dashboard showing active reservations and borrowing history*

### Reservations
![Reservations](screenshots/reserve-page.png)
*Book reservation interface with cart functionality*

### Contact Page
![Contact](screenshots/contact-page.png)
*Contact form with EmailJS integration*

## 🎯 Key Features Explained

### Responsive Navigation
The navbar adapts to different screen sizes:
- **Desktop (lg+)**: Traditional horizontal menu
- **Tablet/Mobile**: Burger menu with full-screen overlay
- **Animations**: Spring-based slide-in with staggered menu items

### State Management
Uses React Context API for global state management:
- Shopping cart state
- User authentication
- Theme preferences
- Reservation tracking

### Animation System
Framer Motion powers all animations:
- **Page transitions**: Smooth fade and slide effects
- **Card animations**: Staggered entrance animations
- **Hover effects**: Interactive micro-animations
- **Mobile menu**: Spring-based slide animations

### Theme System
Supports both light and dark modes:
- Persistent theme selection (localStorage)
- Smooth transitions between themes
- Consistent color palette across modes

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration. Modify `tailwind.config.js` to customize:
- Colors
- Spacing
- Breakpoints
- Typography

### Vite
Vite configuration is in `vite.config.js`. Current setup includes:
- React plugin with Babel compiler
- Fast refresh for development
- Optimized production builds

## 🌐 Browser Support

BookNest supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID for contact form | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | Yes |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite** for the blazing-fast build tool
- **Framer Motion** for beautiful animations
- **Tailwind CSS** for the utility-first CSS framework
- **EmailJS** for email service integration

## 📞 Support

For support, email support@booknest.com or open an issue in the repository.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
