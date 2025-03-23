export default function CandidateCard({ candidate }) {
  return (
    <div className="card text-center">
      <h2 className="text-xl font-semibold">{candidate.name}</h2>
      <p>{candidate.bio}</p>
    </div>
  );
}
