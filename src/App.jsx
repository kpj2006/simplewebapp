import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x01BAADa9481cCe63CFAc52A5fDA003B304d00d7D";
const contractABI = [
  {
    inputs: [{ internalType: "uint256", name: "_candidate", type: "uint256" }],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotes",
    outputs: [
      { internalType: "struct Voting.Vote[]", name: "", type: "tuple[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default function VotingDapp() {
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
      if (accounts.length === 0) {
        alert("No accounts found. Please check MetaMask.");
        return;
      }
      setAccount(accounts[0]);
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Error connecting to MetaMask. Please try again.");
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
      fetchVotes(); // Refresh votes after casting
    } catch (error) {
      console.error("Error voting:", error);
      alert("Error voting. Please try again.");
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
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Voting DApp</h1>
      <button
        onClick={connectWallet}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
      <div className="flex justify-center space-x-2">
        {["A", "B", "C", "D", "E"].map((name, index) => (
          <button
            key={index}
            onClick={() => vote(index)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Vote for {name}
          </button>
        ))}
      </div>
      <button
        onClick={fetchVotes}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4"
      >
        View Previous Votes
      </button>
      <ul className="mt-4">
        {votes.length > 0 ? (
          votes.map((v, i) => (
            <li key={i} className="text-lg">
              🗳️ Voter: {v.voter} | Candidate: {v.candidate}
            </li>
          ))
        ) : (
          <p>No votes yet</p>
        )}
      </ul>
    </div>
  );
}
