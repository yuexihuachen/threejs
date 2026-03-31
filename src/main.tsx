import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);