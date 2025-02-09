import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";
import List from "../components/candidateTable";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("potentialCandidates");
    if (storedCandidates) {
      setSavedCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  const handleRemove = (candidate: Candidate) => {
    const updatedCandidates = savedCandidates.filter((c) => c.id !== candidate.id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("potentialCandidates", JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return (
      <div style={{ padding: "20px", color: "white", minHeight: "100vh", textAlign: "center" }}>
        <h2>No candidates have been accepted!</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", color: "white", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "60px" }}>Potential Candidates</h2>
      <List
        candidates={savedCandidates}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default SavedCandidates;