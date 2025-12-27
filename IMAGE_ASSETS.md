# Image Assets Guide

## Required Images for SEO & Visual Appeal

This document outlines the images you should create and add to optimize the site for SEO, social sharing, and user experience.

---

## Priority 1: Essential SEO Images

### 1. Open Graph Image
**Path:** `/public/og-image.png`
**Size:** 1200x630px
**Purpose:** Displayed when site is shared on social media (Twitter, Facebook, LinkedIn)

**Content Suggestions:**
- Your name/branding
- Tagline: "Building the Future Through Code & Physics"
- Space/physics themed background (stars, orbital paths)
- Professional but visually striking

**Tools:**
- Canva (easiest)
- Figma
- Adobe Photoshop/Illustrator

**SEO Impact:** ⭐⭐⭐⭐⭐ (Massively improves social media click-through rate)

---

### 2. Favicon Set
**Path:** `/public/favicon.ico`
**Size:** 32x32px (favicon.ico), also provide 16x16, 48x48, 64x64
**Purpose:** Browser tab icon, bookmarks

**Content Suggestions:**
- Initials "ET"
- Simple space icon (planet, star, rocket)
- Abstract geometric shape in brand colors

**Additional Formats Needed:**
```
/public/favicon.ico (32x32)
/public/favicon-16x16.png
/public/favicon-32x32.png
/public/apple-touch-icon.png (180x180)
/public/android-chrome-192x192.png
/public/android-chrome-512x512.png
```

**SEO Impact:** ⭐⭐⭐ (Professional appearance, brand recognition)

---

## Priority 2: Home Page Images

### 3. Personal Photo / Avatar
**Path:** `/public/images/elliot-profile.jpg`
**Size:** 800x800px (square)
**Purpose:** About section, author bio, social profiles

**Content:**
- Professional but approachable photo
- Consider space/coding themed background or plain
- High resolution, well-lit

**SEO Impact:** ⭐⭐⭐⭐ (Personal branding, E-E-A-T SEO factor)

---

### 4. Featured Work Screenshots

#### Saturn Rings Simulation
**Path:** `/public/images/simulations/saturn-rings.jpg`
**Size:** 1600x900px (16:9 aspect ratio)
**Purpose:** Featured work card on homepage

**Content:**
- Screenshot of Saturn rings simulation
- High quality, visually striking
- Show UI/interactive elements

#### Game Screenshot
**Path:** `/public/images/game/exploretheuniverse2175-screenshot.jpg`
**Size:** 1600x900px (16:9 aspect ratio)
**Purpose:** Featured work card, cross-site promo

**Content:**
- Best-looking gameplay screenshot
- Action/interesting moment
- Show UI, ships, planets

#### Black Hole Simulations (TON 618, Kerr)
**Paths:**
- `/public/images/simulations/ton-618-blackhole.jpg`
- `/public/images/simulations/kerr-blackhole.jpg`
**Size:** 1600x900px each

**SEO Impact:** ⭐⭐⭐⭐ (Visual engagement, reduced bounce rate)

---

### 5. Game Promo Banner Image
**Path:** `/public/images/game/eu2175-promo-banner.jpg`
**Size:** 1920x1080px
**Purpose:** Cross-site promotional section

**Content:**
- Composite image showcasing game
- Multiple elements: ships, space, UI
- Eye-catching, makes people want to click
- Include game logo if you have one

**SEO Impact:** ⭐⭐⭐⭐ (Conversion rate for game site traffic)

---

## Priority 3: Blog & Content Images

### 6. Blog Post Header Images
**Path:** `/public/images/blog/[post-slug].jpg`
**Size:** 1600x900px
**Purpose:** Blog post headers, social sharing

**Content:**
- Relevant to blog topic
- Can be screenshots, diagrams, or themed graphics
- Add text overlay with post title for social media versions

**Examples:**
- `/public/images/blog/orbital-mechanics-in-games.jpg`
- `/public/images/blog/black-hole-photon-spheres.jpg`
- `/public/images/blog/adaptive-ai-system.jpg`

**SEO Impact:** ⭐⭐⭐⭐ (Blog post engagement, social shares)

---

### 7. Project Thumbnails
**Path:** `/public/images/projects/[project-slug]-thumb.jpg`
**Size:** 800x600px
**Purpose:** Project grid on projects page

**Content:**
- Representative screenshot or mockup
- Professional, polished
- Consistent style across all projects

**SEO Impact:** ⭐⭐⭐ (Portfolio presentation quality)

---

## Priority 4: Background & Decorative

### 8. Hero Background (Optional)
**Path:** `/public/images/hero-bg.jpg`
**Size:** 2560x1440px
**Purpose:** Static background if Three.js fails or for static version

**Content:**
- Space/stars theme
- High resolution
- Not too busy (text needs to be readable over it)
- Compressed for web (use WebP format)

**Note:** Currently using Three.js animated background, but good to have fallback

**SEO Impact:** ⭐⭐ (Fallback, performance)

---

## Image Optimization Best Practices

### File Formats
- **JPEG:** Photos, screenshots, complex images (compressed)
- **PNG:** Graphics with transparency, logos, icons
- **WebP:** Modern format, better compression (provide with JPEG fallback)
- **SVG:** Icons, logos, simple graphics (scalable)

### Compression
All images should be compressed before upload:

**Tools:**
- TinyPNG / TinyJPG (online, easy)
- Squoosh (Google, more control)
- ImageOptim (Mac app)
- Sharp (Node.js, for automation)

**Target:**
- Max file size: 200KB for full-width images
- Max file size: 100KB for thumbnails
- Quality: 80-85% for JPEGs

### Naming Convention
Use descriptive, SEO-friendly filenames:

✅ Good:
- `saturn-rings-simulation-webgl.jpg`
- `explore-universe-2175-gameplay-screenshot.jpg`
- `black-hole-photon-sphere-visualization.jpg`

❌ Bad:
- `IMG_1234.jpg`
- `screenshot.png`
- `image-1.jpg`

### Alt Text
Always add descriptive alt text in your code:

```tsx
<img
  src="/images/simulations/saturn-rings.jpg"
  alt="Interactive Saturn rings simulation showing particle physics and gravitational interactions"
/>
```

**Alt Text Guidelines:**
- Describe what's in the image
- Include relevant keywords naturally
- Keep it under 125 characters
- Don't start with "Image of..." or "Picture of..."

---

## Implementation Checklist

Create images folder structure:
```
public/
├── og-image.png (1200x630)
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── images/
    ├── elliot-profile.jpg (800x800)
    ├── hero-bg.jpg (2560x1440) [optional]
    ├── simulations/
    │   ├── saturn-rings.jpg (1600x900)
    │   ├── ton-618-blackhole.jpg (1600x900)
    │   ├── kerr-blackhole.jpg (1600x900)
    │   └── [other-simulations].jpg
    ├── game/
    │   ├── exploretheuniverse2175-screenshot.jpg (1600x900)
    │   ├── eu2175-promo-banner.jpg (1920x1080)
    │   └── [other-game-images].jpg
    ├── blog/
    │   └── [post-slug].jpg (1600x900)
    └── projects/
        └── [project-slug]-thumb.jpg (800x600)
```

---

## Quick Start: Minimum Viable Images

If you're short on time, start with these 5 images:

1. **og-image.png** (1200x630) - For social media
2. **favicon.ico** (32x32) - Browser tab icon
3. **elliot-profile.jpg** (800x800) - Your photo
4. **eu2175-game-screenshot.jpg** (1600x900) - Game promo
5. **saturn-rings-placeholder.jpg** (1600x900) - One simulation example

These 5 images will cover:
- Social media sharing (Open Graph)
- Professional appearance (favicon, profile)
- Visual engagement (game screenshot, simulation)

Then gradually add the rest as you create content.

---

## Image Creation Resources

### Free Stock Images (for inspiration/backgrounds)
- Unsplash (unsplash.com) - High quality, free
- Pexels (pexels.com) - Good selection
- NASA Image Gallery (images.nasa.gov) - Space images, public domain

### Design Tools
- **Canva** (canva.com) - Easiest, templates available
- **Figma** (figma.com) - Professional, free tier
- **Photopea** (photopea.com) - Free Photoshop alternative, browser-based

### Screenshot Tools
- **Cleanshot X** (Mac) - Professional screenshots with annotations
- **Greenshot** (Windows) - Free, feature-rich
- **ShareX** (Windows) - Open source, powerful
- **Firefox/Chrome DevTools** - For responsive screenshots

### Icon/Favicon Generators
- Favicon.io (favicon.io) - Generate from text or image
- RealFaviconGenerator (realfavicongenerator.net) - All sizes/formats

---

## Next Steps

1. ✅ Read this guide
2. ⬜ Create priority 1 images (OG image, favicon)
3. ⬜ Add your profile photo
4. ⬜ Take screenshots of game/simulations
5. ⬜ Compress all images
6. ⬜ Upload to appropriate folders
7. ⬜ Update code to reference images
8. ⬜ Test social media preview (Twitter Card Validator, Facebook Debugger)
9. ⬜ Monitor image loading performance (Google PageSpeed Insights)

---

**Remember:** Good images aren't just decorative - they're essential for SEO, social media engagement, and conversion rates. Invest time in creating quality visuals!
