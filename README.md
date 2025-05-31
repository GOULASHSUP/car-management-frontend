# SecondGear — Car Management Web App (Frontend)

This is the frontend of the **SecondGear** Car Management System — a responsive and modern web app for managing second-hand car listings. The frontend is built using Vue 3, TypeScript, Vite, and Tailwind CSS. Imagine it as a platform in a used car dealership where this page would be displayed for the customers to browse through the cars while waiting.

## Features

- Admin login & registration
- Add, update, and delete cars with real-time form validation
- Dynamic single car detail pages
- Sorting and pagination on car listings
- Sold-out indicator with styling
- Discount pricing logic and display
- Responsive design across devices
- Toast notifications and loading indicators

## Tech Stack

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- REST API integration (see backend)

## Project Setup

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Run the development server**  
   ```bash
   npm run dev
   ```

3. **Build for production**  
   ```bash
   npm run build
   ```

## Authentication

Admin features (like adding or editing cars) are protected by a login system. If an unauthenticated user attempts access, they're redirected to the login page. Currently anyone can also register as an admin for testing purposes.

## Folder Structure

```
src/
├── components/          # Shared UI components (e.g. LoadingMessage)
├── interfaces/          # TypeScript interfaces
├── modules/             # Composables for cars and auth logic
│   └── auth/
├── router/              # Vue Router setup with route guards
├── views/               # Main pages (Home, Admin, Auth, CarDetails)
```

## Backend API

This project communicates with the [Car Management API](https://ments-api.onrender.com/) via REST.

## License

This project is built for educational purposes as part of a semester project at EASV.