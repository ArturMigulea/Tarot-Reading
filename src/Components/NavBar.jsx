// Components/NavBar.jsx
import React from "react";
import { useLocation } from "react-router-dom";   // 👈 IMPORTANT
import "./NavBar.css";

const TABS = [
  { label: "Welcome", path: "/" },
  { label: "Seeking", path: "/Screens/TypeSelect" },
  { label: "Purr-Diction", path: "/Screens/FateReading" },
  { label: "Card Cat-alogue", path: "/Screens/LazySusan" },
  { label: "History", path: "/Screens/History" },
];

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="nav-bar-wrapper">
      <nav className="nav-bar">
        {TABS.map((tab, index) => {
          // Decide if tab is active based on the current URL
          const isActive =
            tab.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(tab.path);

          return (
            <React.Fragment key={tab.path}>
              <div
                className={
                  "nav-bar-item" + (isActive ? " nav-bar-item--active" : "")
                }
              >
                {tab.label}
              </div>

              {index < TABS.length - 1 && (
                <div className="nav-bar-separator nav-bar-item">—</div>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
