import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x01BAADa9481cCe63CFAc52A5fDA003B304d00d7D";
const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "candidate",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [],
    name: "getVotes",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "candidate",
            type: "uint256",
          },
        ],
        internalType: "struct Voting.Vote[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_candidate",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "votes",
    outputs: [
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "candidate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

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
    setLoading(true); // Set loading to true
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Check if the user has already voted
      const hasAlreadyVoted = await contract.hasVoted(account);
      if (hasAlreadyVoted) {
        alert("You have already voted.");
        setLoading(false);
        return;
      }

      const tx = await contract.vote(candidate);
      await tx.wait();
      alert("Vote cast successfully");
      fetchVotes();
    } catch (error) {
      console.error("Error voting:", error);
      alert(`Error voting: ${error.message || "Unknown error occurred."}`);
    } finally {
      setLoading(false); // Set loading to false
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
          <button
            key={index}
            onClick={() => vote(index)}
            className="vote-btn"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Processing..." : `Vote for ${name}`}
          </button>
        ))}
      </div>
      <button onClick={fetchVotes} className="view-btn mt-6" disabled={loading}>
        {loading ? "Loading..." : "View Votes"}
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
