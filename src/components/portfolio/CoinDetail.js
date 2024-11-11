import React from 'react';
import { useParams } from 'react-router-dom';

const coinDetails = {
  bitcoin: {
    title: "Bitcoin: The Pioneer of Cryptocurrency",
    content: `Bitcoin, created by the pseudonymous Satoshi Nakamoto in 2009, represents the world's first decentralized cryptocurrency. It introduced blockchain technology and has become the gold standard of digital assets.

Key Features:
• Decentralized peer-to-peer network
• Limited supply of 21 million coins
• Proof-of-Work consensus mechanism
• Highly secure and transparent transactions

Recent Developments:
Bitcoin continues to gain institutional adoption and serves as a store of value in modern portfolios. Its influence on the financial world grows as more companies and countries embrace cryptocurrency technology.`
  },
  ethereum: {
    title: "Ethereum: The World Computer",
    content: `Ethereum, launched in 2015 by Vitalik Buterin, is a decentralized platform that enables smart contracts and decentralized applications (dApps). It has revolutionized blockchain technology beyond simple transactions.

Key Features:
• Smart contract functionality
• ERC-20 token standard
• Proof-of-Stake consensus (post-merge)
• Vibrant DeFi ecosystem

Recent Developments:
The successful transition to Proof-of-Stake has significantly reduced Ethereum's energy consumption while maintaining network security and decentralization.`
  },
  tether: {
    title: "Tether: The Leading Stablecoin",
    content: `Tether (USDT) is a stablecoin pegged to the US Dollar, providing a bridge between traditional fiat currencies and cryptocurrencies. It plays a crucial role in crypto trading and value transfer.

Key Features:
• 1:1 USD peg
• High liquidity
• Wide exchange support
• Regular attestations

Recent Developments:
Tether continues to maintain its position as the most widely used stablecoin, despite increased competition and regulatory scrutiny.`
  },
  'realio-network': {
    title: "Realio Network: Tokenizing Real-World Assets",
    content: `Realio Network (RIO) is a digital asset issuance and investment platform focused on real estate and other real-world assets. It bridges traditional finance with blockchain technology.

Key Features:
• Asset tokenization platform
• Compliance-focused approach
• Cross-chain functionality
• Real estate focus

Recent Developments:
Realio Network is expanding its ecosystem and partnerships to bring more real-world assets onto the blockchain.`
  },
  gamercoin: {
    title: "GamerCoin: Gaming Meets Blockchain",
    content: `GamerCoin (GHX) is a cryptocurrency designed for the gaming industry, enabling new possibilities for in-game economies and player rewards.

Key Features:
• Gaming-focused token
• Cross-game compatibility
• Player reward system
• NFT integration

Recent Developments:
GamerCoin continues to expand its partnerships with game developers and platforms to increase adoption.`
  },
  argocoin: {
    title: "ArgoCoin: Innovation in Digital Assets",
    content: `ArgoCoin (AGC) represents a new approach to digital asset management and blockchain technology integration.

Key Features:
• Advanced security features
• Scalable architecture
• Community governance
• Cross-chain compatibility

Recent Developments:
ArgoCoin is working on expanding its ecosystem and implementing new features for users.`
  },
  panoverse: {
    title: "Panoverse: Building the Digital Metaverse",
    content: `Panoverse (PANO) is a metaverse project focusing on creating immersive digital experiences and virtual worlds.

Key Features:
• Virtual world creation
• Digital asset ownership
• Social interaction platform
• Creator tools

Recent Developments:
Panoverse is developing new tools and features to enhance the metaverse experience.`
  },
  solana: {
    title: "Solana: High-Performance Blockchain",
    content: `Solana (SOL) is known for its high-speed, low-cost transactions, making it a popular platform for DeFi and NFT applications.

Key Features:
• Proof of History mechanism
• High transaction speed
• Low transaction costs
• Rich DeFi ecosystem

Recent Developments:
Solana continues to attract developers and projects with its high-performance blockchain infrastructure.`
  }
};

const CoinDetail = () => {
  const { coinId } = useParams();
  const coinInfo = coinDetails[coinId] || {
    title: `${coinId} Details`,
    content: 'Detailed information about this coin will be available soon.'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white shadow-sm rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {coinInfo.title}
        </h1>
        <div className="prose prose-lg">
          {coinInfo.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default CoinDetail;
