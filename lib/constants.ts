/**
 * Site-wide constants and configuration
 */

export const SITE_NAME = "Elliot Telford";
export const SITE_DESCRIPTION = "Building the future through code & physics. Space RTS games, interactive astrophysics simulations, and systems engineering.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elliottelford.com";

export const SOCIAL_LINKS = {
  github: "https://github.com/elliottelford",
  twitter: "https://twitter.com/elliottelford",
  linkedin: "https://linkedin.com/in/elliottelford",
  steam: "https://store.steampowered.com/app/your-game-id",
  email: "contact@elliottelford.com",
};

export const NAVIGATION_LINKS = [
  { name: "Home", href: "/" },
  { name: "Simulations", href: "/simulations" },
  { name: "Game", href: "/game" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const SIMULATION_CATEGORIES = [
  { value: "planetary-systems", label: "Planetary Systems", color: "accent" },
  { value: "black-holes", label: "Black Holes", color: "secondary" },
  { value: "stellar-dynamics", label: "Stellar Dynamics", color: "primary" },
] as const;

export const BLOG_CATEGORIES = [
  { value: "space", label: "Space", color: "accent" },
  { value: "gamedev", label: "Game Dev", color: "secondary" },
  { value: "health", label: "Health", color: "primary" },
  { value: "opinion", label: "Opinion", color: "foreground" },
] as const;

export const GAME_INFO = {
  title: "Explore the Universe 2175",
  tagline: "A Physics-Based Space RTS with Adaptive AI",
  releaseDate: "February 2nd, 2025",
  steamAppId: process.env.NEXT_PUBLIC_STEAM_APP_ID || "",
};

export const MAX_POSTS_PER_PAGE = 12;
export const MAX_PROJECTS_PER_PAGE = 9;
export const MAX_SIMULATIONS_PER_PAGE = 12;

export const FEATURED_SIMULATIONS_COUNT = 6;
export const RECENT_POSTS_COUNT = 3;
