# LoginForm

A small, complete React website that demonstrates routing, reusable
components, responsive layouts and client-side form validation.

The project is a frontend-only demo: the login and contact forms validate
input in the browser and show a confirmation, but no data is sent to a
server.

## Features

- Multi-page routing with React Router (Home, About, Contact, Login, Help, 404)
- Client-side validation with inline, field-level error messages
- Accessible forms with `aria-invalid`, `aria-describedby` and live status messages
- Collapsible navigation for small screens
- Loading and success states while submitting forms
- Lazy-loaded routes with a suspense fallback
- Error boundary that keeps the layout usable if a page crashes
- Reduced-motion and keyboard-friendly focus styles
- Unit and component tests with Vitest and React Testing Library

## Tech stack

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)

## Project structure

```
src/
  components/   Navbar, Footer, TextField, ErrorBoundary, PageLoader, ScrollToTop
  hooks/        usePageTitle
  lib/          validation helpers
  pages/        home, about, contact, login, help, notFound
  test/         Vitest setup file
  App.jsx       routing, layout and shared shell
  index.css     global resets and base typography
  App.css       page and component styles
```

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the development server         |
| `npm run build`     | Create a production build in `dist/` |
| `npm run preview`   | Preview the production build         |
| `npm run lint`      | Run ESLint over the project          |
| `npm test`          | Run the test suite once              |
| `npm run test:watch`| Run tests in watch mode              |
| `npm run verify`    | Run lint, tests and a production build |

## Notes

The login and contact forms are intentionally not connected to a backend.
To make them functional, replace the simulated `setTimeout` submission with
a real `fetch` request to your authentication or messaging service.
