import { Link } from "react-router-dom";
import CandidateCard from "../components/CandidateCard";

const candidates = [
  { id: 0, name: "Candidate A", bio: "A visionary leader." },
  { id: 1, name: "Candidate B", bio: "Champion of the people." },
  { id: 2, name: "Candidate C", bio: "Innovator and reformer." },
  { id: 3, name: "Candidate D", bio: "Experienced and steady." },
  { id: 4, name: "Candidate E", bio: "Bold and fearless." },
];

export default function Candidates() {
  return (
    <div>
      <div className="mt-20">
        <h1>Meet the Candidates</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          {candidates.map((candidate) => (
            <Link to={`/candidate/${candidate.id}`} key={candidate.id}>
              <CandidateCard candidate={candidate} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
