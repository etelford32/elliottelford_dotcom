import { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, RELATED_SITES } from '@/lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
  noindex?: boolean;
}

/**
 * Generate comprehensive metadata for SEO optimization
 * Includes Open Graph, Twitter Cards, and canonical URLs
 */
export function generateSEOMetadata({
  title,
  description = SITE_DESCRIPTION,
  image = `${SITE_URL}/og-image.png`,
  url = SITE_URL,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = [],
  author = SITE_NAME,
  noindex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  return {
    title: fullTitle,
    description,
    authors: [{ name: author }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',

    // Keywords for better discoverability
    keywords: [
      'Elliot Telford',
      'space simulations',
      'astrophysics',
      'game development',
      'RTS game',
      'Explore the Universe 2175',
      'computational astrophysics',
      'Three.js',
      'WebGL',
      'orbital mechanics',
      'black hole simulations',
      ...tags,
    ],

    // Open Graph
    openGraph: {
      type,
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: 'en_US',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@elliottelford',
      site: '@elliottelford',
    },

    // Canonical and alternate links
    alternates: {
      canonical: canonicalUrl,
    },

    // Additional metadata
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
    },
  };
}

/**
 * Type for structured data options
 */
type StructuredDataOptions = Record<string, unknown>;

/**
 * Generate JSON-LD structured data for rich search results
 */
export function generateStructuredData(type: 'person' | 'website' | 'article' | 'game', data?: StructuredDataOptions) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  };

  switch (type) {
    case 'person':
      return {
        ...baseStructuredData,
        '@type': 'Person',
        name: 'Elliot Telford',
        url: SITE_URL,
        jobTitle: 'Game Developer & Computational Astrophysicist',
        description: SITE_DESCRIPTION,
        sameAs: [
          'https://github.com/elliottelford',
          'https://twitter.com/elliottelford',
          'https://linkedin.com/in/elliottelford',
        ],
        knowsAbout: [
          'Computational Astrophysics',
          'Game Development',
          'Space Simulations',
          'Orbital Mechanics',
          'Real-time Strategy Games',
          'WebGL',
          'Three.js',
          'Rust Programming',
        ],
      };

    case 'website':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        author: {
          '@type': 'Person',
          name: 'Elliot Telford',
        },
        publisher: {
          '@type': 'Person',
          name: 'Elliot Telford',
        },
      };

    case 'article':
      return {
        ...baseStructuredData,
        '@type': 'Article',
        headline: data?.title || '',
        description: data?.description || '',
        image: data?.image || `${SITE_URL}/og-image.png`,
        datePublished: data?.publishedTime || new Date().toISOString(),
        dateModified: data?.modifiedTime || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: data?.author || 'Elliot Telford',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Person',
          name: 'Elliot Telford',
        },
      };

    case 'game':
      return {
        ...baseStructuredData,
        '@type': 'VideoGame',
        name: 'Explore the Universe 2175',
        url: RELATED_SITES.game.url,
        description: 'A physics-based space RTS with adaptive AI, realistic orbital mechanics, and dynamic faction conflicts',
        genre: ['Real-Time Strategy', 'Simulation', 'Space'],
        gamePlatform: 'PC',
        author: {
          '@type': 'Person',
          name: 'Elliot Telford',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Person',
          name: 'Elliot Telford',
        },
        applicationCategory: 'Game',
        operatingSystem: 'Windows, macOS, Linux',
      };

    default:
      return baseStructuredData;
  }
}

/**
 * Component to inject structured data into the page
 */
export function StructuredData({ type, data }: { type: 'person' | 'website' | 'article' | 'game'; data?: StructuredDataOptions }) {
  const structuredData = generateStructuredData(type, data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
