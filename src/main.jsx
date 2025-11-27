/*
* ---------------------------------------------------------
*  Project Contributors
*  © 2025 Lilianne Boucher-Pfliger, Artur Migulea, Maxwell Innes
* ---------------------------------------------------------
*/

console.log("Project Contributors:");
console.log("• Lilianne Boucher-Pfliger");
console.log("• Artur Migulea");
console.log("• Maxwell Innes");

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
