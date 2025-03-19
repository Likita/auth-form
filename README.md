# Auth Form App

An authentication form application built with React, demonstrating client-side storage capabilities and user management.

## Live Demo
Check out the live demo: [Auth Form App](https://likita.github.io/auth-form/sign-in)

## Features

- 🔐 User Registration and Login
- 💾 Client-side Storage Architecture
  - IndexedDB for user data persistence
  - LocalStorage for session management
- 🎨 Modern UI with pure CSS
- 🌓 Automatic Dark/Light theme support
- 📱 Responsive Design
- 🔒 TypeScript for type safety
- ⚡️ Fast and lightweight
- ♿️ WCAG 2.1 Level AAA compliance
- 🧪 Test coverage
- 🛡️ Error handling

## Storage Architecture

This project implements a client-side storage solution to demonstrate user authentication flow:

### IndexedDB
- Acts as a mock server database
- Stores user registration data (email, hashed password, name)
- Enables persistent user data across browser sessions
- Allows new user registrations and authentication

### LocalStorage
- Manages user sessions
- Stores user data
- Maintains login state across page refreshes

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

This project is deployed using GitHub Pages. You can view the live demo at [https://likita.github.io/auth-form/sign-in](https://likita.github.io/auth-form/sign-in)

## Accessibility

The application follows WCAG 2.1 Level AAA guidelines:
- High contrast ratios exceeding AAA requirements
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Focus state management
- Semantic HTML structure

## Testing
The project includes comprehensive testing:
- Tests for atom components
- Storage mechanism for IndexedDB service testing

## Production Considerations
 
This is a demonstration project. In a production environment, sensitive data should never be stored in client-side storage mechanisms. Several improvements would be needed for a production environment:

### Architecture Improvements
- Use HTTPS
- Implement HTTP-only cookies for session management
- Replace client-side storage with a secure backend database
- Add server-side validation
- Add CSRF protection
- Email verification logic
- Limit login attempts
- Finish password recovery flow
- Implement 2FA, add a Passkeys option


---

Built with ❤️ using React.
