import React from 'react';
import Link from 'next/link';

// Types
interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component with schema.org structured data
 */
export default function BreadcrumbNav({ items }: BreadcrumbsProps) {
  // Schema.org structured data for breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://www.mma.box${item.path}`,
        'name': item.label
      }
    }))
  };

  return (
    <nav className="mb-6" aria-label="Breadcrumb">
      {/* Structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      {/* Visible breadcrumb navigation */}
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-400">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            
            {item.isCurrentPage ? (
              <span className="text-gray-200" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.path}
                className="hover:text-red-500 transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 