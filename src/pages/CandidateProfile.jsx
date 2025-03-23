import { useParams } from "react-router-dom";

const candidates = [
  {
    id: 0,
    name: "Candidate A",
    bio: "A visionary leader with a focus on technology.",
    details: "Lorem ipsum...",
  },
  {
    id: 1,
    name: "Candidate B",
    bio: "Champion of the people.",
    details: "Dolor sit amet...",
  },
  {
    id: 2,
    name: "Candidate C",
    bio: "Innovator and reformer.",
    details: "Consectetur adipiscing...",
  },
  {
    id: 3,
    name: "Candidate D",
    bio: "Experienced and steady.",
    details: "Elit sed do...",
  },
  {
    id: 4,
    name: "Candidate E",
    bio: "Bold and fearless.",
    details: "Eiusmod tempor...",
  },
];

export default function CandidateProfile() {
  const { id } = useParams();
  const candidate = candidates.find((c) => c.id === parseInt(id));

  if (!candidate) return <p>Candidate not found</p>;

  return (
    <div className="card">
      <h1>{candidate.name}</h1>
      <p className="text-lg">{candidate.bio}</p>
      <p className="mt-4">{candidate.details}</p>
    </div>
  );
}
