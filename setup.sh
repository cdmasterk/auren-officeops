#!/bin/bash
# 🚀 Auren Labs — OfficeOps Setup Script
# Author: Kristijan (Kris) Krnjevic
# Description: Creates a fully configured React + Tailwind + Vite environment for Auren Labs OfficeOps

APP_NAME="auren-officeops"

echo "📦 Creating project folder: $APP_NAME"
mkdir $APP_NAME && cd $APP_NAME

echo "⚙️ Initializing Vite + React..."
npm create vite@latest . -- --template react

echo "📚 Installing dependencies..."
npm install react-router-dom recharts
npm install -D tailwindcss postcss autoprefixer

echo "🧩 Initializing Tailwind..."
npx tailwindcss init -p

# Update Tailwind config
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        auren: {
          navy: '#0B2E4E',
          blue: '#0090E5',
          cyan: '#1DA1F2',
          orange: '#F45B2E',
          bg: '#F8FAFD'
        }
      },
      boxShadow: {
        soft: '0 6px 24px rgba(11,46,78,0.08)'
      },
      borderRadius: {
        xl2: '1rem'
      }
    }
  },
  plugins: []
};
EOF

echo "🧱 Creating folder structure..."
mkdir -p src/{components,modules,styles,widgets,data}

echo "🎨 Adding global Tailwind CSS file..."
cat > src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --auren-border: rgba(0,0,0,0.15);
}

* { box-sizing: border-box; }
body { @apply text-slate-800; }

.btn {
  @apply inline-flex items-center justify-center px-4 py-2 rounded-xl border bg-white hover:bg-auren-bg transition;
  border-color: var(--auren-border);
}
.btn-primary { @apply text-white bg-auren-blue border border-auren-blue; }
.btn-outline { @apply bg-white text-auren-navy; border-color: var(--auren-border); }
.btn-ghost { @apply bg-transparent text-auren-navy; border-color: var(--auren-border); }
.card { @apply bg-white rounded-2xl shadow-soft border; border-color: var(--auren-border); }
.card-title { @apply font-semibold text-auren-navy; }
EOF

echo "📄 Adding base files..."
cat > src/main.jsx << 'EOF'
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
EOF

cat > src/App.jsx << 'EOF'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './modules/Dashboard';

export default function App() {
  return (
    <div className="min-h-screen bg-auren-bg p-6">
      <h1 className="text-3xl font-semibold text-auren-navy mb-6">
        Auren Labs — OfficeOps
      </h1>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
EOF

cat > src/modules/Dashboard.jsx << 'EOF'
import React from 'react';
export default function Dashboard() {
  return (
    <div className="card p-6">
      <h2 className="card-title mb-3">Welcome to Auren Labs OfficeOps</h2>
      <p>This is a minimal dashboard placeholder — add components next.</p>
    </div>
  );
}
EOF

echo "✅ Installation complete!"
echo "▶ To start development:"
echo "   cd $APP_NAME"
echo "   npm run dev"
