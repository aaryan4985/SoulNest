# SoulNest

A full-stack web application with a React + Tailwind frontend and Express backend.

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/aaryan4985/SoulNest.git
cd SoulNest
```

### 2. Install dependencies

#### Frontend

```
cd frontend
npm install
```

#### Backend

```
cd ../backend
npm install
```

### 3. Run the applications

#### Start the backend server

```
cd backend
npm start
```

#### Start the frontend (in a new terminal)

```
cd frontend
npm start
```

### 4. Open in browser

Visit [http://localhost:3000](http://localhost:3000) for the frontend.
Backend runs on [http://localhost:5000](http://localhost:5000) by default.

## Tailwind CSS

Tailwind is already configured. Use utility classes in your React components. If you add new files, make sure they are included in `tailwind.config.js` content paths.

## Project Structure

- `frontend/` — React + Tailwind app
- `backend/` — Express API server

## Customization

- Update page templates in `frontend/src/pages/`
- Add backend logic in `backend/controllers/` and routes in `backend/routes/`

---

Feel free to update this README as your project evolves!
