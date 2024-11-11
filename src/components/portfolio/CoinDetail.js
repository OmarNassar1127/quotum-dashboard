import React from 'react';
import { useParams } from 'react-router-dom';

const coinDetails = {
  bitcoin: {
    title: "Bitcoin: The Pioneer of Cryptocurrency",
    symbol: "BTC",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    content: {
      overview: "Bitcoin, created by the pseudonymous Satoshi Nakamoto in 2009, represents the world's first decentralized cryptocurrency. It introduced blockchain technology and has become the gold standard of digital assets.",
      keyFeatures: [
        "Decentralized peer-to-peer network",
        "Limited supply of 21 million coins",
        "Proof-of-Work consensus mechanism",
        "Highly secure and transparent transactions"
      ],
      technicalDetails: {
        "Consensus": "Proof of Work",
        "Block Time": "10 minutes",
        "Max Supply": "21 million",
        "Halving Cycle": "Every 210,000 blocks"
      },
      recentDevelopments: "Bitcoin continues to gain institutional adoption and serves as a store of value in modern portfolios. Its influence on the financial world grows as more companies and countries embrace cryptocurrency technology."
    }
  },
  ethereum: {
    title: "Ethereum: The World Computer",
    symbol: "ETH",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    content: {
      overview: "Ethereum, launched in 2015 by Vitalik Buterin, is a decentralized platform that enables smart contracts and decentralized applications (dApps). It has revolutionized blockchain technology beyond simple transactions.",
      keyFeatures: [
        "Smart contract functionality",
        "ERC-20 token standard",
        "Proof-of-Stake consensus (post-merge)",
        "Vibrant DeFi ecosystem"
      ],
      technicalDetails: {
        "Consensus": "Proof of Stake",
        "Block Time": "12 seconds",
        "Staking Minimum": "32 ETH",
        "Language": "Solidity"
      },
      recentDevelopments: "The successful transition to Proof-of-Stake has significantly reduced Ethereum's energy consumption while maintaining network security and decentralization."
    }
  },
  tether: {
    title: "Tether: The Leading Stablecoin",
    symbol: "USDT",
    image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    content: {
      overview: "Tether (USDT) is a stablecoin pegged to the US Dollar, providing a bridge between traditional fiat currencies and cryptocurrencies. It plays a crucial role in crypto trading and value transfer.",
      keyFeatures: [
        "1:1 USD peg",
        "High liquidity",
        "Wide exchange support",
        "Regular attestations"
      ],
      technicalDetails: {
        "Type": "Stablecoin",
        "Backing": "USD & Equivalents",
        "Platform": "Multiple Chains",
        "Governance": "Centralized"
      },
      recentDevelopments: "Tether continues to maintain its position as the most widely used stablecoin, despite increased competition and regulatory scrutiny."
    }
  },
  'realio-network': {
    title: "Realio Network: Tokenizing Real-World Assets",
    symbol: "RIO",
    image: "https://assets.coingecko.com/coins/images/12206/standard/Rio.png?1696512042",
    content: {
      overview: "Realio Network (RIO) is a digital asset issuance and investment platform focused on real estate and other real-world assets. It bridges traditional finance with blockchain technology.",
      keyFeatures: [
        "Asset tokenization platform",
        "Compliance-focused approach",
        "Cross-chain functionality",
        "Real estate focus"
      ],
      technicalDetails: {
        "Platform": "Multi-chain",
        "Token Type": "Security Token",
        "Focus": "Real Estate",
        "Compliance": "SEC Regulated"
      },
      recentDevelopments: "Realio Network is expanding its ecosystem and partnerships to bring more real-world assets onto the blockchain."
    }
  },
  gamercoin: {
    title: "GamerCoin: Gaming Meets Blockchain",
    symbol: "GHX",
    image: "https://assets.coingecko.com/coins/images/14714/standard/ghx_icon.png?1696514385",
    content: {
      overview: "GamerCoin (GHX) is a cryptocurrency designed for the gaming industry, enabling new possibilities for in-game economies and player rewards.",
      keyFeatures: [
        "Gaming-focused token",
        "Cross-game compatibility",
        "Player reward system",
        "NFT integration"
      ],
      technicalDetails: {
        "Platform": "Ethereum",
        "Token Type": "ERC-20",
        "Use Case": "Gaming",
        "Integration": "Game SDKs"
      },
      recentDevelopments: "GamerCoin continues to expand its partnerships with game developers and platforms to increase adoption."
    }
  },
  argocoin: {
    title: "ArgoCoin: Innovation in Digital Assets",
    symbol: "AGC",
    image: "https://assets.coingecko.com/coins/images/34256/standard/Argocoin.jpg?1729941668",
    content: {
      overview: "ArgoCoin (AGC) represents a new approach to digital asset management and blockchain technology integration.",
      keyFeatures: [
        "Advanced security features",
        "Scalable architecture",
        "Community governance",
        "Cross-chain compatibility"
      ],
      technicalDetails: {
        "Platform": "Multi-chain",
        "Consensus": "DPoS",
        "Governance": "DAO",
        "Security": "Multi-sig"
      },
      recentDevelopments: "ArgoCoin is working on expanding its ecosystem and implementing new features for users."
    }
  },
  panoverse: {
    title: "Panoverse: Building the Digital Metaverse",
    symbol: "PANO",
    image: "https://assets.coingecko.com/coins/images/32812/standard/1000366603.jpg?1719371841",
    content: {
      overview: "Panoverse (PANO) is a metaverse project focusing on creating immersive digital experiences and virtual worlds.",
      keyFeatures: [
        "Virtual world creation",
        "Digital asset ownership",
        "Social interaction platform",
        "Creator tools"
      ],
      technicalDetails: {
        "Platform": "Custom Chain",
        "Graphics": "Unity 3D",
        "Assets": "NFTs",
        "Interaction": "Real-time"
      },
      recentDevelopments: "Panoverse is developing new tools and features to enhance the metaverse experience."
    }
  },
  solana: {
    title: "Solana: High-Performance Blockchain",
    symbol: "SOL",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    content: {
      overview: "Solana (SOL) is known for its high-speed, low-cost transactions, making it a popular platform for DeFi and NFT applications.",
      keyFeatures: [
        "Proof of History mechanism",
        "High transaction speed",
        "Low transaction costs",
        "Rich DeFi ecosystem"
      ],
      technicalDetails: {
        "Consensus": "PoH & PoS",
        "TPS": "65,000+",
        "Block Time": "400ms",
        "Validators": "1,000+"
      },
      recentDevelopments: "Solana continues to attract developers and projects with its high-performance blockchain infrastructure."
    }
  }
};

const CoinDetail = () => {
  const { coinId } = useParams();
  const coinInfo = coinDetails[coinId] || {
    title: `${coinId} Details`,
    symbol: '',
    image: '',
    content: {
      overview: 'Detailed information about this coin will be available soon.',
      keyFeatures: [],
      technicalDetails: {},
      recentDevelopments: ''
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white shadow-sm rounded-lg p-8">
        <header className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <img
              src={coinInfo.image}
              alt={coinInfo.title}
              className="w-24 h-24 rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            {coinInfo.title}
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            {coinInfo.symbol}
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {coinInfo.content.overview}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-3">
              {coinInfo.content.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(coinInfo.content.technicalDetails).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900">{key}</h3>
                  <p className="text-gray-600">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Developments</h2>
            <p className="text-gray-700 leading-relaxed">
              {coinInfo.content.recentDevelopments}
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default CoinDetail;
