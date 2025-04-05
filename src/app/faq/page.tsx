import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: "MMA FAQs | Common Questions About Mixed Martial Arts",
  description: "Get answers to the most common questions about MMA rules, fighters, promotions, weight classes, fighting techniques, and watching events.",
  keywords: ["MMA FAQ", "MMA questions", "mixed martial arts rules", "UFC rules", "how to watch MMA", "MMA weight classes", "MMA techniques"],
  openGraph: {
    title: "MMA Frequently Asked Questions",
    description: "Everything you need to know about Mixed Martial Arts (MMA) and UFC.",
    url: "https://www.mma.box/faq",
    type: "website"
  },
  alternates: {
    canonical: "https://www.mma.box/faq"
  }
};

// Define FAQ sections with questions and answers
const faqSections = [
  {
    title: "MMA Basics",
    items: [
      {
        question: "What is MMA?",
        answer: "Mixed Martial Arts (MMA) is a full-contact combat sport that combines techniques from various martial arts disciplines including boxing, wrestling, Brazilian jiu-jitsu, muay thai, kickboxing, karate, judo, and other styles. It allows both striking and grappling while standing or on the ground."
      },
      {
        question: "How is MMA different from UFC?",
        answer: "MMA is the sport itself, while the UFC (Ultimate Fighting Championship) is the largest MMA promotion company in the world. It's similar to how the NFL is a football league, not the sport itself. Other MMA organizations include Bellator, ONE Championship, PFL, and more."
      },
      {
        question: "What are the basic rules of MMA?",
        answer: "MMA rules prohibit eye gouging, groin strikes, small joint manipulation, strikes to the back of the head, kicks/knees to a downed opponent's head (in some rulesets), and other dangerous techniques. Fights are typically 3 rounds of 5 minutes each, with championship bouts lasting 5 rounds. Fights can end by knockout, technical knockout, submission, or judges' decision."
      }
    ]
  },
  {
    title: "MMA Events & Watching",
    items: [
      {
        question: "How can I watch UFC fights?",
        answer: "UFC events are typically available through pay-per-view (PPV) on ESPN+ in the United States. UFC Fight Night events are often broadcast on ESPN or ESPN+. International broadcasting rights vary by country. Some preliminary fights are shown on ESPN, UFC Fight Pass, or streamed free on various platforms."
      },
      {
        question: "How often are MMA events held?",
        answer: "The UFC typically holds events almost every weekend, with major PPV events occurring approximately once a month. Other promotions like Bellator, ONE Championship, and PFL also hold regular events throughout the year, making MMA a year-round sport."
      },
      {
        question: "What's the difference between a main card and prelims?",
        answer: "MMA events are usually divided into preliminary fights ('prelims') and main card fights. Prelims feature lesser-known fighters or prospects, while the main card features more established fighters, contenders, and champions. The final fight of the main card is called the 'main event' and typically features champions or top contenders."
      }
    ]
  },
  {
    title: "Weight Classes & Rankings",
    items: [
      {
        question: "What are the weight classes in MMA?",
        answer: "Men's divisions typically include: Flyweight (125 lb/56.7 kg), Bantamweight (135 lb/61.2 kg), Featherweight (145 lb/65.8 kg), Lightweight (155 lb/70.3 kg), Welterweight (170 lb/77.1 kg), Middleweight (185 lb/83.9 kg), Light Heavyweight (205 lb/93.0 kg), and Heavyweight (265 lb/120.2 kg). Women's divisions generally include: Strawweight (115 lb/52.2 kg), Flyweight (125 lb/56.7 kg), Bantamweight (135 lb/61.2 kg), and Featherweight (145 lb/65.8 kg)."
      },
      {
        question: "How are MMA fighters ranked?",
        answer: "Rankings in MMA are typically determined by a panel of journalists or by the promotion itself. Factors considered include recent wins and losses, quality of opposition, and performance. The UFC has its own ranking system where fighters vote on peer rankings, while independent MMA media outlets often publish their own pound-for-pound and divisional rankings."
      },
      {
        question: "What is pound-for-pound ranking in MMA?",
        answer: "The pound-for-pound (P4P) ranking attempts to determine who is the best fighter regardless of weight class. It&apos;s a theoretical ranking that asks: &apos;If all fighters were the same size, who would be the best?&apos; This allows comparing the skills and accomplishments of fighters across different weight divisions."
      }
    ]
  },
  {
    title: "MMA Training & Techniques",
    items: [
      {
        question: "What martial arts are most effective for MMA?",
        answer: "The most effective martial arts for MMA typically include wrestling for takedowns and control, Brazilian Jiu-Jitsu for ground fighting and submissions, Muay Thai or kickboxing for striking, and boxing for hand techniques. However, modern MMA fighters train in a mix of styles specifically adapted for MMA competition rather than traditional martial arts systems."
      },
      {
        question: "How long does it take to become a professional MMA fighter?",
        answer: "The journey to becoming a professional MMA fighter varies greatly by individual. Typically, fighters spend several years training before competing as amateurs, then build an amateur record before turning professional. The entire process often takes at least 3-5 years, with many fighters having backgrounds in collegiate wrestling, traditional martial arts, or other combat sports before transitioning to MMA."
      },
      {
        question: "What is the difference between a knockout and a technical knockout?",
        answer: "A knockout (KO) occurs when a fighter becomes unconscious from a strike, while a technical knockout (TKO) happens when the referee stops the fight because a fighter cannot intelligently defend themselves but remains conscious. TKOs also include stoppages due to injuries, a fighter&apos;s corner throwing in the towel, or a doctor determining a fighter cannot safely continue."
      }
    ]
  }
];

export default function FAQPage() {
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'FAQ', path: '/faq', isCurrentPage: true }
  ];

  // Flatten all FAQ items for structured data
  const allFaqItems = faqSections.flatMap(section => section.items);

  // Schema.org structured data for FAQ page
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': allFaqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Add structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      <div className="container mx-auto px-6 py-10">
        {/* Breadcrumb navigation */}
        <BreadcrumbNav items={breadcrumbItems} />
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">MMA Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300">
            Get answers to the most common questions about Mixed Martial Arts rules, events, fighters, and more.
          </p>
        </header>
        
        <section className="space-y-12">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-800 pb-10 last:border-0">
              <h2 className="text-2xl font-bold mb-6 text-red-500">{section.title}</h2>
              
              <div className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-black/60 rounded-lg border border-gray-800 overflow-hidden">
                    <h3 className="p-5 font-bold text-lg flex justify-between items-center cursor-pointer hover:bg-gray-900 transition-colors">
                      {item.question}
                    </h3>
                    <div className="px-5 pb-5 text-gray-300">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            Have a question that's not answered here? Feel free to reach out to us!
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