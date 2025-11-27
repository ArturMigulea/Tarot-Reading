import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import MultiUseButton from "../Components/MultiUseButton";

export default function QuestionHistory() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setQuestions([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "users", firebaseUser.uid, "QuestionHistory"),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);
        const items = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setQuestions(items);
      } catch (err) {
        console.error("Failed to load QuestionHistory:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    if (!user) return;

    const ok = window.confirm("Delete this question from your history?");
    if (!ok) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "QuestionHistory", id));

      // Update UI without reloading
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("Could not delete this question. Check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-card">
          <p>Consulting the archives...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="history-page">
        <div className="history-card">
          <h1>My Question History</h1>
          <p>You need to be signed in to see your past questions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-card">
        <h1>My Question History</h1>

        {questions.length === 0 ? (
          <p>You haven&apos;t asked any questions while logged in yet.</p>
        ) : (
          <ul className="history-list">
            {questions.map((entry) => {
              const createdAt =
                entry.createdAt?.toDate?.().toLocaleString() ?? "Unknown time";
              return (
                <li key={entry.id} className="history-item">
                  <div className="history-item-main">
                    <div>
                      <div className="history-question">
                        {entry.question || <em>(No question text)</em>}
                      </div>
                      <div className="history-meta">{createdAt}</div>
                    </div>

                    <button
                      className="history-delete-button"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <MultiUseButton
            buttons={[
              { label: "Home", onClick: () => navigate("/") }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
