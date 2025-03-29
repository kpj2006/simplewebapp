import { useParams } from "react-router-dom";

const candidates = [
  {
    id: 0,
    name: "Candidate A",
    bio: "Full-stack developer and blockchain specialist with a focus on decentralized solutions.",
    details:
      "Expert in React, Node.js, and Ethereum smart contracts. Passionate about building secure, scalable DApps.",
    image: "/src/assets/download.jpg",
  },
  {
    id: 1,
    name: "Candidate B",
    bio: "Innovative full-stack developer and blockchain advocate.",
    details:
      "Skilled in MERN stack and Hyperledger. Dedicated to creating transparent blockchain systems.",
    image: "/src/assets/download (1).jpg",
  },
  {
    id: 2,
    name: "Candidate C",
    bio: "Creative full-stack engineer and blockchain reformer.",
    details:
      "Proficient in JavaScript frameworks and Solidity. Focused on revolutionizing finance through blockchain.",
    image: "/src/assets/download (2).jpg",
  },
  {
    id: 3,
    name: "Candidate D",
    bio: "Experienced full-stack developer and blockchain expert.",
    details:
      "Master of Python, Django, and Corda. Committed to enterprise-grade blockchain solutions.",
    image: "/src/assets/download (3).jpg",
  },
  {
    id: 4,
    name: "Candidate E",
    bio: "Bold full-stack programmer and blockchain pioneer.",
    details:
      "Adept at Angular, Express, and Polkadot. Drives innovation in cross-chain technologies.",
    image: "/src/assets/download (4).jpg",
  },
];

export default function CandidateProfile() {
  const { id } = useParams();
  const candidate = candidates.find((c) => c.id === parseInt(id));

  if (!candidate) return <p>Candidate not found</p>;

  return (
    <div className="card">
      <img
        src={candidate.image}
        alt={candidate.name}
        className="w-48 h-48 object-cover rounded-full mx-auto mb-4"
      />
      <h1>{candidate.name}</h1>
      <p className="text-lg">{candidate.bio}</p>
      <p className="mt-4">{candidate.details}</p>
    </div>
  );
}
