import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchPublishedEventById } from '@/lib/eventServices';
import { formatEventDate } from '../../../utils/dateUtils';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import type { Metadata } from 'next';

// Define params type using id
type Props = {
    params: { id: string }
}

// Generate Metadata dynamically using id
export async function generateMetadata(
    { params }: Props,
  ): Promise<Metadata> {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
        return { title: 'Invalid Event ID' };
    }
    const event = await fetchPublishedEventById(id);
   
    if (!event) {
      return {
        title: 'Event Not Found'
      }
    }
   
    // Generate description safely, handling potentially null date/location
    let description = `Details for the ${event.league} event: ${event.event_name || event.main_card || 'Event'}`;
    if (event.date) {
        description += `, taking place on ${formatEventDate(event.date)}`;
    }
    if (event.location) {
        description += ` at ${event.location}`;
    }
    description += '.';

    return {
      title: `${event.event_name || event.main_card} | MMA Info`,
      description: description, // Use generated description
    }
}

// Event Detail Page Component using id
export default async function EventDetailPage({ params }: Props) {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
        notFound();
    }    const event = await fetchPublishedEventById(id);
    if (!event) {
        notFound();
    }
    // Use the fight_card field from the event object instead of fetching fights separately
    const fights = event.fight_card || [];

    // Correct breadcrumb structure based on error message
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Events', path: '/events' },
        { label: event.event_name || event.main_card || 'Event Details', path: `/events/${id}`, isCurrentPage: true },
    ];

    return (
        <div className="container mx-auto px-4 py-8 text-white">
            <BreadcrumbNav items={breadcrumbItems} />

            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-6">
                {event.image_url && (
                    <div className="relative w-full aspect-[21/9]"> 
                        <Image 
                            src={event.image_url} 
                            alt={event.event_name || 'Event Banner'} 
                            fill 
                            style={{ objectFit: 'cover', objectPosition: 'center top' }} 
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                        />
                    </div>
                )}
                <div className="p-6">
                    <p className="text-indigo-400 font-semibold mb-1">{event.league}</p>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.event_name || 'Event Details'}</h1>
                    <h2 className="text-2xl text-gray-300 mb-4">{event.main_card}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                            <p className="text-gray-400">Date:</p>
                            <p>{formatEventDate(event.date)}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Location:</p>
                            <p>{event.location || 'TBD'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">How to Watch:</p>
                            {event.how_to_watch_url ? (
                                <a href={event.how_to_watch_url} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 underline">
                                    {event.how_to_watch || 'Watch Here'}
                                </a>
                            ) : (
                                <p>{event.how_to_watch || 'Info not available'}</p>
                            )}
                        </div>
                        {event.ticket_link && event.ticket_link !== 'localhost:3' && event.ticket_link !== 'Not Available' && (
                            <div>
                                <p className="text-gray-400">Tickets:</p>
                                <a href={event.ticket_link} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 underline">
                                    Buy Tickets
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Fight Card Section */} 
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4 border-t border-gray-700 pt-4">Fight Card</h3>                        {fights.length > 0 ? (
                            <ul className="space-y-4">
                                {fights.sort((a, b) => {
                                    // Sort by card position first
                                    const positions = {
                                        'MAIN_EVENT': 1,
                                        'CO_MAIN': 2,
                                        'TITLE_FIGHT': 3,
                                        'MAIN_CARD': 4,
                                        'PRELIM': 5,
                                        'CANCELLED': 6,
                                        null: 99
                                    };
                                    
                                    const posA = positions[a.card_position as keyof typeof positions] || 
                                               (a.is_main_event ? 1 : a.is_co_main ? 2 : 99);
                                    const posB = positions[b.card_position as keyof typeof positions] || 
                                               (b.is_main_event ? 1 : b.is_co_main ? 2 : 99);
                                    
                                    // If same position, sort by bout order
                                    if (posA === posB) {
                                        return (a.bout_order ?? 99) - (b.bout_order ?? 99);
                                    }
                                    
                                    return posA - posB;
                                }).map((fight, index) => (
                                    <li key={index} className={`p-4 rounded-md shadow ${fight.card_position === 'CANCELLED' ? 'bg-gray-800/50 line-through' : 'bg-gray-700'}`}>
                                        <p className="font-bold text-lg">{fight.fighter1_name} vs. {fight.fighter2_name}</p>
                                        <p className="text-sm text-gray-400">
                                            {fight.weight_class} 
                                            {fight.is_title_fight || fight.card_position === 'TITLE_FIGHT' ? ' • Title Fight' : ''} 
                                            {fight.card_position ? ` • ${fight.card_position.replace('_', ' ')
                                                                 .replace('MAIN EVENT', 'Main Event')
                                                                 .replace('CO MAIN', 'Co-Main Event')
                                                                 .replace('MAIN CARD', 'Main Card')
                                                                 .replace('PRELIM', 'Prelim')
                                                                 .replace('TITLE_FIGHT', 'Title Fight')
                                                                 .replace('CANCELLED', 'CANCELLED')}` : 
                                             fight.is_main_event ? ' • Main Event' : 
                                             fight.is_co_main ? ' • Co-Main Event' : ''}
                                        </p>
                                        {/* Display result if available */}
                                        {fight.result && (
                                            <div className="mt-2 text-sm bg-gray-600 p-2 rounded">
                                                <p>
                                                    <span className="font-semibold">Result:</span> 
                                                    {fight.result.winner_name} def. {fight.result.loser_name} by {fight.result.method} in Round {fight.result.round} ({fight.result.time})
                                                </p>
                                            </div>
                                        )}
                                        {fight.notes && (
                                            <p className="text-sm text-gray-500 mt-1 italic">Notes: {fight.notes}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 italic">Fight card details not available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 