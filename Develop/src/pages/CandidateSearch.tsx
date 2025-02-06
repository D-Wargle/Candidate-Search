import { useState, useEffect, useCallback } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import CandidateCard from '../components/candidateCard/candidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const transformUserToCandidate = async (user: { login: string, id: number, avatarURL: string, htmlURL: string;}) => {
    const detailedUser = await searchGithubUser(user.login);
    return {
      id: user.id,
      name: detailedUser.name || "No name available",
      username: user.login,
      avatar: user.avatarURL,
      htmlURL: user.htmlURL,
      location: detailedUser.location || "No location available",
      company: detailedUser.company || "No company available",
      email: detailedUser.email || "No email available",
      bio: detailedUser.bio || "No bio available",
    };
  };
  
  const fetchCandidates = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      setCandidates(await Promise.all((await searchGithub()).map(transformUserToCandidate)));
    } catch {
      setError("Failed to load candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);
  
  const handleSave = () => {
    if (!candidates.length) return;
    setPotentialCandidates([...potentialCandidates, candidates[0]]);
    setCandidates(candidates.slice(1));
  };
  
  const handleSkip = () => candidates.length && setCandidates(candidates.slice(1));
  
  useEffect(() => {
    localStorage.setItem("potentialCandidates", JSON.stringify(potentialCandidates));
  }, [potentialCandidates]);
  
  if (loading) return <div>Loading candidates...</div>;
  if (error) return <div>{error}</div>;
  if (!candidates.length) return <div>No more candidates available!</div>;
  
  return (
    <div>
      <h2 style={{ fontSize: "60px", display: "flex", justifyContent: "center", margin: 0 }}>Candidate Search</h2>
      <CandidateCard candidate={candidates[0]} onSave={handleSave} onSkip={handleSkip} />
    </div>
  );
};

export default CandidateSearch;
