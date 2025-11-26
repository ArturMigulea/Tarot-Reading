import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const TABS = [
  { label: "Welcome", path: "/" },
  { label: "Seeking", path: "/Screens/TypeSelect" },
  { label: "Fate Reading", path: "/Screens/FateReading" },
  { label: "Full Deck", path: "/Screens/LazySusan" },
];

export default function NavBar() {
  return (
    <div className="nav-bar-wrapper">
      <nav className="nav-bar">
        {TABS.map((tab, index) => (
          <React.Fragment key={tab.path}>
            <NavLink
              to={tab.path}
              end={tab.path === "/"}
              className={({ isActive }) =>
                "nav-bar-item" +
                (isActive ? " nav-bar-item--active" : "")
              }
            >
              {tab.label}
            </NavLink>

            {/* Add separator except after last tab */}
            {index < TABS.length - 1 && (
              <div className="nav-bar-separator">—</div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
