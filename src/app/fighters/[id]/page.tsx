import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Mock data for fighter profiles
const fighterData = {
  1: {
    id: 1,
    name: 'Alex "The Destroyer" Johnson',
    record: '24-2-0',
    division: 'Lightweight',
    age: 29,
    height: '5\'10"',
    weight: '155 lbs',
    reach: '72"',
    stance: 'Orthodox',
    team: 'Elite MMA Academy',
    country: 'United States',
    bio: 'Alex Johnson has been dominating the lightweight division with his explosive striking and excellent takedown defense. Known for his devastating knockouts, "The Destroyer" is currently on a 6-fight win streak and closing in on a title shot.',
    imageUrl: '/next.svg', // placeholder
    ranking: 3,
    wins: {
      knockouts: 18,
      submissions: 4,
      decisions: 2
    },
    losses: {
      knockouts: 1,
      submissions: 0,
      decisions: 1
    },
    homepage: 'https://www.alexjohnsonmma.com'
  },
  2: {
    id: 2,
    name: 'Sarah "Knockout Queen" Williams',
    record: '18-0-0',
    division: 'Women\'s Bantamweight',
    age: 27,
    height: '5\'8"',
    weight: '135 lbs',
    reach: '69"',
    stance: 'Southpaw',
    team: 'Apex Fight Club',
    country: 'Canada',
    bio: 'The undefeated Sarah Williams has taken the women\'s bantamweight division by storm. With 15 of her 18 victories coming by way of knockout, the "Knockout Queen" has earned her nickname through devastating striking performances. Currently the champion, she\'s looking to continue her historic run of dominance.',
    imageUrl: '/next.svg', // placeholder
    ranking: 1,
    wins: {
      knockouts: 15,
      submissions: 1,
      decisions: 2
    },
    losses: {
      knockouts: 0,
      submissions: 0,
      decisions: 0
    },
    homepage: 'https://www.sarahwilliamsmma.com'
  },
  3: {
    id: 3,
    name: 'Mike "Iron Fist" Rodriguez',
    record: '22-3-1',
    division: 'Middleweight',
    age: 31,
    height: '6\'2"',
    weight: '185 lbs',
    reach: '78"',
    stance: 'Orthodox',
    team: 'Warriors Training Center',
    country: 'Brazil',
    bio: 'A veteran of the sport, Mike Rodriguez combines technical brilliance with raw power. His journey from the regional circuit to becoming one of the most respected fighters in the middleweight division is a testament to his dedication and resilience. Known for his iron chin and powerful hands, he continues to be a fan favorite.',
    imageUrl: '/next.svg', // placeholder
    ranking: 5,
    wins: {
      knockouts: 14,
      submissions: 5,
      decisions: 3
    },
    losses: {
      knockouts: 1,
      submissions: 2,
      decisions: 0
    },
    homepage: 'https://www.mikerodriguezmma.com'
  }
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const fighterId = Number(params.id);
  const fighter = fighterData[fighterId as keyof typeof fighterData];
  
  if (!fighter) {
    return {
      title: 'Fighter Not Found',
    };
  }
  
  return {
    title: `${fighter.name} - ${fighter.record} | ${fighter.division} MMA Fighter Profile`,
    description: `${fighter.name} MMA stats, fight record, and biography. Current ${fighter.division} fighter with a record of ${fighter.record}. Learn about ${fighter.name.split(' ')[0]}'s fighting style, career highlights, and upcoming bouts.`,
    keywords: [fighter.name, fighter.division, 'MMA fighter', 'fighter profile', 'fight record', fighter.team, fighter.country],
    openGraph: {
      title: `${fighter.name} | ${fighter.division} Fighter Profile`,
      description: fighter.bio,
      url: `https://www.mma.box/fighters/${fighterId}`,
      type: 'profile',
      images: [
        {
          url: fighter.imageUrl,
          width: 1200,
          height: 630,
          alt: fighter.name,
        },
      ],
    },
  };
}

export default function FighterProfilePage({ params }: { params: { id: string } }) {
  const fighterId = Number(params.id);
  
  // Check if fighter exists in our data
  if (!fighterData[fighterId as keyof typeof fighterData]) {
    notFound();
  }
  
  const fighter = fighterData[fighterId as keyof typeof fighterData];
  
  // Schema.org structured data for the fighter
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': fighter.name,
    'description': fighter.bio,
    'nationality': fighter.country,
    'height': fighter.height,
    'weight': fighter.weight,
    'url': `https://www.mma.box/fighters/${fighterId}`,
    'image': fighter.imageUrl,
    'sameAs': fighter.homepage,
    'memberOf': {
      '@type': 'SportsTeam',
      'name': fighter.team
    },
    'jobTitle': 'MMA Fighter',
    'sport': 'Mixed Martial Arts'
  };
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Add structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <div className="container mx-auto px-6 py-16">
        <div className="mb-8 md:flex items-start gap-8">
          {/* Fighter Image */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="w-48 h-48 mx-auto md:mx-0 bg-gray-800 rounded-full mb-4 flex items-center justify-center border-2 border-red-900/20">
              <span className="text-gray-500">[Fighter Image]</span>
            </div>
            {fighter.ranking && (
              <div className="text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-red-600/20 text-red-500 rounded-full text-sm font-semibold">
                  Ranking: #{fighter.ranking} in {fighter.division}
                </span>
              </div>
            )}
          </div>
          
          {/* Fighter Info */}
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-2">{fighter.name}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
              <span className="text-red-500 font-semibold">{fighter.division}</span>
              <span className="inline-block px-3 py-1 bg-black border border-gray-800/50 rounded-full text-sm text-gray-300">
                {fighter.record}
              </span>
            </div>
            
            <p className="text-gray-300 mb-6">{fighter.bio}</p>
            
            {/* Fighter Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Age', value: fighter.age },
                { label: 'Height', value: fighter.height },
                { label: 'Weight', value: fighter.weight },
                { label: 'Reach', value: fighter.reach },
                { label: 'Stance', value: fighter.stance },
                { label: 'Country', value: fighter.country },
                { label: 'Team', value: fighter.team },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-900/50 p-3 rounded">
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
            
            {/* Wins/Losses Breakdown */}
            <div className="bg-gray-900/30 p-4 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">Win/Loss Breakdown</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-green-500 font-medium mb-2">Wins: {fighter.wins.knockouts + fighter.wins.submissions + fighter.wins.decisions}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>KO/TKO:</span> 
                      <span className="font-medium">{fighter.wins.knockouts}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Submission:</span> 
                      <span className="font-medium">{fighter.wins.submissions}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Decision:</span> 
                      <span className="font-medium">{fighter.wins.decisions}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-red-500 font-medium mb-2">Losses: {fighter.losses.knockouts + fighter.losses.submissions + fighter.losses.decisions}</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>KO/TKO:</span> 
                      <span className="font-medium">{fighter.losses.knockouts}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Submission:</span> 
                      <span className="font-medium">{fighter.losses.submissions}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Decision:</span> 
                      <span className="font-medium">{fighter.losses.decisions}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href="/fighters"
            className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            All Fighters
          </Link>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
} 