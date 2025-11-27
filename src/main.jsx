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

console.log("Artist Credits:");
console.log("• Megan Lynn Kott");
console.log("• Corina Migulea");

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
