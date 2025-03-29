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
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      alert(`Error voting: ${error.message || "Unknown error occurred."}`);
    } finally {
      setLoading(false);
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
    <div
      className="container mx-auto p-10 flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/download (6).jpg')",
        backgroundopacity: 0.8,
      }}
    >
      <h1>Cipher LNMIIT - Blockchain and Web3 Club</h1>
      <p>
        Welcome to Cipher LNMIIT, the blockchain and Web3 club of LNMIIT. Join
        us to explore the future of decentralized technology.
      </p>
      <button onClick={connectWallet} className="connect-btn">
        {account
          ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          : "Connect Wallet"}
      </button>
      <div className="flex justify-center space-x-4 mt-20">
        {["A", "B", "C", "D", "E"].map((name, index) => (
          <button
            key={index}
            onClick={() => vote(index)}
            className="vote-btn"
            disabled={loading}
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
