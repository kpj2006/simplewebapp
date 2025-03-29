import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-wsop-black text-white">
      {/* About Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl uppercase font-bold text-wsop-gold mb-6">
          About Voting DApp
        </h1>
        <div className="max-w-3xl text-lg leading-relaxed space-y-4">
          <p>
            Voting DApp is a pioneering decentralized application designed to
            transform the voting process by harnessing the power of blockchain
            technology. Built for a hackathon, this project reimagines
            traditional voting systems, offering a secure, transparent, and
            tamper-proof alternative to centralized methods. Whether it’s an
            election, a poll, or a community decision, Voting DApp ensures every
            vote counts with an intuitive design inspired by sleek, professional
            interfaces.
          </p>
          <p>
            Our mission is to address the core flaws of conventional
            voting—fraud, lack of transparency, and accessibility
            barriers—through blockchain’s decentralized framework. By enabling
            instant vote recording, one-vote-per-address integrity (simulated
            for demo purposes), and an auditable ledger, Voting DApp
            demonstrates how decentralized apps (DApps) can empower democratic
            processes. Curious about DApp mechanics? Explore the{" "}
            <a
              href="https://www.google.com/search?q=rules+of+voting+dapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crypto-cyan hover:underline"
            >
              rules of voting DApps
            </a>{" "}
            to see how blockchain enforces fairness, adapted here for voting
            rather than games or governance.
          </p>
          <p>
            Developed using React and Tailwind CSS, Voting DApp strikes a
            balance between technical sophistication and user-friendly design.
            It’s a proof-of-concept for a future where voting is secure,
            verifiable, and accessible to all, built on the trustless foundation
            of blockchain.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black p-2 text-center text-sm">
        © 2025 Voting DApp | Powered by Blockchain
      </footer>
    </div>
  );
};

export default About;
