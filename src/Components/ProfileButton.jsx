// src/Components/ProfileButton.jsx
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  // Form states
  const [mode, setMode] = useState("signin"); // "signin" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

	const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  const toggleOpen = () => setOpen((prev) => !prev);

  /* ---------- LOGIN ---------- */
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  /* ---------- SIGN UP ---------- */
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!displayName.trim()) {
      setError("Please enter a display name.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: displayName.trim(),
      });

      setOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  /* ---------- GOOGLE LOGIN ---------- */
  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await signInWithPopup(auth, googleProvider);
      setOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => signOut(auth);

  return (
    <div className="profile-wrapper">
      {/* Profile circle */}
      <button className="profile-button" onClick={toggleOpen}>
        {user?.photoURL ? (
          <img src={user.photoURL} alt="profile" />
        ) : (
          <span className="profile-initial">
            {user?.displayName?.[0] || "?"}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="profile-menu">
					{user ? (
						<>
							<div className="profile-info">
								<strong>{user.displayName || "User"}</strong>
								<div className="profile-email">{user.email}</div>
							</div>

							<button
								className="profile-action-button"
								onClick={() => {
									setOpen(false);
									navigate("../Screens/History");
								}}
								style={{ marginBottom: "6px" }}
							>
								My Questions
							</button>

							<button className="profile-action-button" onClick={handleLogout}>
								Log out
							</button>
						</>
					) : (
            <>
              <h3 style={{ marginBottom: "8px" }}>
                {mode === "signin" ? "Sign In" : "Sign Up"}
              </h3>

              {error && <div className="auth-error">{error}</div>}

              {/* SIGN IN FORM */}
              {mode === "signin" && (
                <form onSubmit={handleEmailSignIn} className="auth-form">
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="profile-action-button" type="submit">
                    Sign In
                  </button>
                </form>
              )}

              {/* SIGN UP FORM */}
              {mode === "signup" && (
                <form onSubmit={handleEmailSignUp} className="auth-form">
                  <input
                    className="auth-input"
                    type="text"
                    placeholder="Display Name"
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                  <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    className="auth-input"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button className="profile-action-button" type="submit">
                    Sign Up
                  </button>
                </form>
              )}

              {/* Toggle between sign in <-> sign up */}
              <button
                className="profile-alt-button"
                onClick={() =>
                  setMode(mode === "signin" ? "signup" : "signin")
                }
              >
                {mode === "signin"
                  ? "Create an account"
                  : "Already have an account?"}
              </button>

              <div className="auth-divider">or</div>

              <button
                className="profile-action-button"
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
