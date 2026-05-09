# JB Hi-Fi Retro Website - Modern Recreation

A modern HTML/CSS/JavaScript recreation of the iconic JB Hi-Fi website from 1998-1999, maintaining the original retro aesthetic while using contemporary web standards.

## Project Overview

This project recreates the JB Hi-Fi website from 1998-1999 with:
- **Modern HTML5** structure (no framesets)
- **CSS3** styling with retro aesthetic (black background, yellow/white text)
- **Vanilla JavaScript** for interactivity
- **Responsive design** that works on modern devices
- **Historical accuracy** in layout and visual design

## Original Design Reference

The original 1998-1999 JB Hi-Fi website featured:
- Black background with yellow (#FFFF33) and white text
- Left sidebar navigation (170px wide)
- Main content area (560px in original)
- Frameset-based layout
- Image-based navigation buttons
- 800x600 screen resolution targeting

## Project Structure

```
MainProject/
├── index.html              # Main homepage
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet with retro aesthetic
│   ├── js/
│   │   └── main.js         # Navigation and interactive features
│   └── images/
│       └── jb-logo.svg     # JB Hi-Fi logo
└── pages/                  # Department pages (expandable)
```

## Features

### Navigation
- **Sidebar Navigation**: Vertical menu with 9 main sections
  - Hi-Fi (Side 1 & 2)
  - Car Audio
  - Computers
  - Gaming
  - Mobile Phones
  - Televisions
  - Stores
  - Contact

### Content Sections
- **Welcome**: Main landing page with company information
- **Charts**: Music charts section
- **Album of the Week**: Featured album
- **News**: Latest updates
- **Departments**: Individual product category sections
- **Stores**: Complete store location listing with phone numbers
- **Contact**: Customer service information

### Visual Features
- Retro aesthetic with modern CSS
- Yellow accent color (#FFFF33) on black background
- Smooth transitions and hover effects
- Responsive design for mobile devices
- Custom scrollbar styling

## Store Locations

The website currently lists 11 JB Hi-Fi stores across Victoria and New South Wales:

**Victoria:**
- East Keilor (Founded 1975)
- Brighton
- Keilor
- Knox
- Preston
- Dandenong
- Heidelberg

**New South Wales:**
- Parramatta
- Sydney CBD
- Penrith
- Newcastle

## Technical Details

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- No framework dependencies (vanilla JavaScript)

### CSS Features Used
- Flexbox layout
- CSS Grid for store listings
- CSS animations
- Media queries for responsiveness
- Custom scrollbar styling

### JavaScript Features
- Event delegation
- Dynamic content rendering
- Smooth section transitions
- Keyboard support (ESC key returns to welcome)

## How to Use

1. **Open in Browser**: Simply open `index.html` in a modern web browser
2. **Navigate**: Click sidebar buttons to switch between sections
3. **Use Tabs**: Click top tabs (Charts, Album, News) to switch tab content
4. **Responsive**: Resize browser to see mobile responsive design

## Original Website Credits

- **Original Design**: Finbar O'Hanlon
- **Company**: JB Hi-Fi Pty Ltd
- **Founded**: 1975
- **Location**: East Keilor, Victoria, Australia
- **First Web Appearance**: Circa 1998

## Recreation Notes

This is a faithful recreation of the 1998-1999 website with:
- Modern semantic HTML
- Clean, maintainable CSS
- Progressive enhancement
- Accessibility considerations
- Mobile-first responsive design

The original website contained many iframes linking to supplier sites. This modern version provides placeholders for such content that can be populated with current product listings from the "Current site" folder.

## File Sizes

- `index.html`: ~4.5 KB
- `style.css`: ~6.5 KB
- `main.js`: ~2.5 KB
- `jb-logo.svg`: <1 KB

**Total**: ~13.5 KB (lightweight, fast-loading retro aesthetic)

---

*Last Updated: 2026*  
*Original Site Last Updated: 13/12/1999*
