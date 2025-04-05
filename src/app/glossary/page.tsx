import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: "MMA Glossary | Fighting Terms & Techniques Dictionary",
  description: "Complete glossary of Mixed Martial Arts terms, techniques, positions, and terminology explained for fans of UFC, Bellator, and combat sports.",
  keywords: ["MMA glossary", "MMA terms", "fighting techniques", "UFC terminology", "MMA dictionary", "submission moves", "striking techniques", "BJJ terms", "wrestling terms"],
  openGraph: {
    title: "MMA Glossary & Fighting Terms Dictionary",
    description: "Learn all the terminology and techniques used in Mixed Martial Arts with our comprehensive MMA glossary.",
    url: "https://www.mma.box/glossary",
    type: "website"
  },
  alternates: {
    canonical: "https://www.mma.box/glossary"
  }
};

// Define glossary terms grouped by categories
const glossaryTerms = [
  {
    category: "Striking",
    terms: [
      {
        term: "Jab",
        definition: "A quick, straight punch thrown with the lead hand, primarily used to measure distance, set up combinations, or keep opponents at bay."
      },
      {
        term: "Cross",
        definition: "A straight punch thrown with the rear hand that typically follows the jab in a combination."
      },
      {
        term: "Hook",
        definition: "A punch thrown in a semicircular motion with either hand, targeting the side of the opponent's head or body."
      },
      {
        term: "Uppercut",
        definition: "A vertical, rising punch aimed at the opponent's chin or solar plexus."
      },
      {
        term: "Roundhouse Kick",
        definition: "A kick executed with a circular motion, using the shin or instep to strike the target. Can be aimed at the legs, body, or head."
      },
      {
        term: "Front Kick",
        definition: "A straight kick delivered with the ball of the foot, aimed at pushing the opponent away or striking their body/head."
      },
      {
        term: "Superman Punch",
        definition: "A leaping punch where the fighter pushes off with one leg while simultaneously throwing a cross, giving the appearance of flying forward."
      },
      {
        term: "Elbow Strike",
        definition: "Various striking techniques using the point or edge of the elbow against an opponent."
      }
    ]
  },
  {
    category: "Grappling & Takedowns",
    terms: [
      {
        term: "Double Leg Takedown",
        definition: "A wrestling takedown where the fighter shoots in to grab both of the opponent's legs and drives forward to bring them to the ground."
      },
      {
        term: "Single Leg Takedown",
        definition: "A takedown where the fighter captures one of the opponent's legs and uses it to off-balance and bring them down."
      },
      {
        term: "Clinch",
        definition: "A standing grappling position where fighters are holding onto each other, typically controlling the head/neck area (collar tie) or body."
      },
      {
        term: "Suplex",
        definition: "A takedown where the opponent is lifted and thrown backwards, often in an arc. Various types exist, including German and belly-to-back."
      },
      {
        term: "Sprawl",
        definition: "A defensive technique against takedown attempts where a fighter quickly moves their legs backward while putting their weight on the opponent's upper body."
      },
      {
        term: "Trip",
        definition: "A takedown that uses the leg, foot, or hip to destabilize an opponent's balance and bring them to the ground."
      },
      {
        term: "Shoot",
        definition: "The action of quickly dropping levels and moving forward to initiate a wrestling takedown."
      }
    ]
  },
  {
    category: "Ground Positions",
    terms: [
      {
        term: "Mount",
        definition: "A dominant ground position where a fighter is on top with their knees on either side of the opponent's torso."
      },
      {
        term: "Guard",
        definition: "A ground position where the bottom fighter has their legs wrapped around the opponent's waist. Variations include closed, open, half, butterfly guard, etc."
      },
      {
        term: "Side Control",
        definition: "A dominant position where the top fighter lies perpendicular across the opponent's chest, controlling them without the opponent's legs as a barrier."
      },
      {
        term: "Back Mount",
        definition: "A dominant position where a fighter is behind their opponent with their hooks (feet) inserted inside the opponent's thighs for control."
      },
      {
        term: "North-South",
        definition: "A controlling position where the top fighter is positioned with their head over the bottom fighter's head, facing in the opposite direction."
      },
      {
        term: "Turtle Position",
        definition: "A defensive position where a fighter is on hands and knees with their head tucked, protecting their neck and midsection."
      }
    ]
  },
  {
    category: "Submissions",
    terms: [
      {
        term: "Rear Naked Choke (RNC)",
        definition: "A chokehold applied from behind the opponent, where the arm is wrapped around the neck and pressure is applied to the carotid arteries."
      },
      {
        term: "Guillotine Choke",
        definition: "A front chokehold where the arm wraps around the opponent's neck while pulling upward, cutting off blood flow or air."
      },
      {
        term: "Armbar",
        definition: "A joint lock that hyperextends the elbow joint by using the hips against the opponent's arm while controlling their wrist."
      },
      {
        term: "Triangle Choke",
        definition: "A submission where the legs form a triangle around the opponent's neck and one arm, cutting off blood flow to the brain."
      },
      {
        term: "Kimura",
        definition: "A shoulder lock achieved by controlling the opponent's arm behind their back and applying rotational pressure."
      },
      {
        term: "Americana",
        definition: "A shoulder lock similar to the Kimura but applied with the opponent's arm bent and rotated outward."
      },
      {
        term: "D&apos;Arce Choke",
        definition: "A type of front headlock choke that compresses the arteries of the neck by encircling the neck and one arm with both arms."
      },
      {
        term: "Heel Hook",
        definition: "A leg lock that twists the heel, causing severe rotation in the knee. One of the most dangerous submissions in MMA."
      }
    ]
  },
  {
    category: "General Terminology",
    terms: [
      {
        term: "Octagon",
        definition: "The eight-sided cage used in UFC and some other promotions where MMA fights take place."
      },
      {
        term: "Ground and Pound",
        definition: "A strategy where a fighter takes their opponent to the ground and strikes them repeatedly from a dominant position."
      },
      {
        term: "Tap Out",
        definition: "The physical act of submitting to a hold by tapping the opponent or mat to signal defeat and avoid injury."
      },
      {
        term: "Cage Control",
        definition: "A judging criterion referring to which fighter is dictating the location of the fight by effectively using the cage."
      },
      {
        term: "Southpaw",
        definition: "A fighter who adopts a stance with their right foot and hand forward, opposite to the orthodox stance."
      },
      {
        term: "Orthodox",
        definition: "The traditional fighting stance with left foot and hand forward for right-handed fighters."
      },
      {
        term: "Counter Striker",
        definition: "A fighter who prefers to wait for their opponent to attack, then capitalizes on openings with their own strikes."
      },
      {
        term: "Fight IQ",
        definition: "A fighter's tactical intelligence and ability to make smart decisions during a fight based on circumstances."
      }
    ]
  }
];

export default function GlossaryPage() {
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Glossary', path: '/glossary', isCurrentPage: true }
  ];

  // Flatten all glossary terms for structured data
  const allTerms = glossaryTerms.flatMap(category => category.terms);

  // Generate alphabet list for quick navigation
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  // Filter terms for each letter
  const termsByLetter = alphabet.map(letter => {
    const terms = allTerms.filter(item => 
      item.term.toUpperCase().startsWith(letter)
    );
    return { letter, terms };
  }).filter(item => item.terms.length > 0);

  // Schema.org structured data for glossary
  const glossarySchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    'name': 'MMA Glossary',
    'description': 'Comprehensive glossary of Mixed Martial Arts terms and techniques',
    'definedTerm': allTerms.map(item => ({
      '@type': 'DefinedTerm',
      'name': item.term,
      'description': item.definition
    }))
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Add structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(glossarySchema)
        }}
      />
      
      <div className="container mx-auto px-6 py-10">
        {/* Breadcrumb navigation */}
        <BreadcrumbNav items={breadcrumbItems} />
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">MMA Glossary & Terminology</h1>
          <p className="text-xl text-gray-300">
            Learn the language of Mixed Martial Arts with our comprehensive dictionary of terms, techniques, and positions.
          </p>
        </header>
        
        {/* Alphabet navigation */}
        <div className="mb-10 overflow-x-auto">
          <div className="flex space-x-2 min-w-max py-2">
            {alphabet.map(letter => {
              const hasTerms = termsByLetter.some(item => item.letter === letter);
              return (
                <a 
                  key={letter} 
                  href={hasTerms ? `#letter-${letter}` : undefined}
                  className={`px-3 py-2 rounded-md ${
                    hasTerms 
                      ? 'text-white bg-red-600 hover:bg-red-700 cursor-pointer' 
                      : 'text-gray-500 bg-gray-800 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </a>
              );
            })}
          </div>
        </div>

        {/* Display by category */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-red-500">Browse by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {glossaryTerms.map((category, idx) => (
              <div key={idx} className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800 py-3 px-4">
                  <h3 className="font-bold text-lg">{category.category}</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {category.terms.map((term, termIdx) => (
                      <li key={termIdx}>
                        <a 
                          href={`#term-${term.term.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-red-400 hover:underline"
                        >
                          {term.term}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Alphabetical listing */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-red-500">Alphabetical Listing</h2>
          
          {termsByLetter.map(({ letter, terms }) => (
            <div key={letter} id={`letter-${letter}`} className="mb-10">
              <h3 className="text-xl font-bold border-b border-gray-800 pb-2 mb-4 flex items-center">
                <span className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  {letter}
                </span>
                <span>Terms Starting with {letter}</span>
              </h3>
              
              <dl className="space-y-6">
                {terms.map((term, idx) => (
                  <div 
                    key={idx} 
                    id={`term-${term.term.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-800"
                  >
                    <dt className="text-lg font-bold text-red-400 mb-2">{term.term}</dt>
                    <dd className="text-gray-300">{term.definition}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </section>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Missing a term? Let us know and we'll add it to our glossary!
          </p>
          <Link 
            href="/contact"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
} 