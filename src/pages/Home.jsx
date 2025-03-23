import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x01BAADa9481cCe63CFAc52A5fDA003B304d00d7D";
const contractABI = [
  /* Your ABI here, same as before */
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [votes, setVotes] = useState([]);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not detected! Please install MetaMask.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask.");
    }
  }

  async function vote(candidate) {
    if (!account) {
      alert("Connect your wallet first");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await contract.vote(candidate);
      await tx.wait();
      alert("Vote cast successfully");
      fetchVotes();
    } catch (error) {
      console.error("Error voting:", error);
      alert("Error voting.");
    }
  }

  async function fetchVotes() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      const votesData = await contract.getVotes();
      setVotes(
        votesData.map((v) => ({
          voter: v.voter,
          candidate: v.candidate.toString(),
        }))
      );
    } catch (error) {
      console.error("Error fetching votes:", error);
      alert("Error fetching votes");
    }
  }

  return (
    <div className="card">
      <h1>Voting DApp</h1>
      <button onClick={connectWallet} className="connect-btn">
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
      <div className="flex justify-center space-x-4 mt-6">
        {["A", "B", "C", "D", "E"].map((name, index) => (
          <button key={index} onClick={() => vote(index)} className="vote-btn">
            Vote for {name}
          </button>
        ))}
      </div>
      <button onClick={fetchVotes} className="view-btn mt-6">
        View Votes
      </button>
      <ul className="mt-6 text-lg">
        {votes.length > 0 ? (
          votes.map((v, i) => (
            <li key={i}>
              🗳️ Voter: {v.voter.slice(0, 6)}... | Candidate: {v.candidate}
            </li>
          ))
        ) : (
          <p>No votes yet</p>
        )}
      </ul>
    </div>
  );
}
