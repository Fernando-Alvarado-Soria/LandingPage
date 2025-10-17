# Copilot Instructions - Portfolio Landing Page

## Project Overview
This is a **Spanish-language personal portfolio** website for Fernando Alvarado, a Full Stack developer. It's a single-page application built with vanilla HTML, CSS, and JavaScript focused on showcasing skills and projects.

## Architecture & Structure
- **Single-page design**: All content sections (inicio, sobre-mi, habilidades, proyectos, contacto) are in `index.html`
- **Static assets organization**: `css/styles.css`, `js/main.js`, `img/` directory
- **No build process**: Direct file serving - modify files directly without compilation
- **Mobile-first responsive**: Uses CSS Grid and Flexbox with breakpoints at 768px

## CSS Architecture & Design System
- **CSS Custom Properties** defined in `:root` for consistent theming:
  ```css
  --color-primary: #2563eb;
  --spacing-md: 2rem;
  --font-main: -apple-system, BlinkMacSystemFont, 'Segoe UI'...
  ```
- **BEM-style naming**: `.nav__logo`, `.hero__content`, `.skill-card__icon`
- **Component-based styling**: Each section has isolated styles (`.hero`, `.skills`, `.projects`)
- **Fixed header** with scroll-based box-shadow changes
- **Hero background**: Overlay pattern with `::before` pseudo-element for background image

## Key Interactive Features
1. **Smooth scroll navigation**: All anchor links use `scrollIntoView` behavior
2. **Scroll-triggered header styling**: Dynamic box-shadow based on scroll position
3. **Intersection Observer animations**: Cards fade in when entering viewport using `fadeInUp` animation
4. **Hover effects**: Transform and box-shadow transitions on skill cards and project cards

## Content Patterns
- **Skills organized by category**: Frontend, Backend, Herramientas (Tools) with icon-based cards
- **Skill card structure**: Icon image + title + description
- **Spanish content throughout**: All text, alt attributes, and navigation in Spanish
- **Brand identity**: "Alva nexus" logo with custom logo image

## File Dependencies
- **Hero background**: Requires `img/hero-bg.jpeg` for the hero section overlay
- **Logo**: `img/Logo.png` in navigation header
- **Skill icons**: Expected in `img/skills/` directory (html5.png, css3.png, etc.)
- **External links**: Contact section links to email, GitHub, LinkedIn (currently placeholder URLs)

## Development Workflow
- **No build tools**: Edit files directly - changes are immediately visible
- **Live server recommended**: Use VS Code Live Server or similar for development
- **Image optimization**: Ensure skill icons are 60x60px for consistent display
- **Spanish language**: Maintain Spanish content and ensure proper `lang="es"` attribute

## Responsive Behavior
- **Navigation**: Stacks vertically on mobile (`flex-direction: column`)
- **Hero text**: Font sizes reduce on mobile (3rem → 2rem for title)
- **Grid layouts**: Use `auto-fit` with `minmax()` for responsive columns
- **Breakpoint**: Single major breakpoint at `max-width: 768px`

## When Adding New Content
- **New sections**: Add to `index.html` with corresponding navigation link and CSS styling
- **New skills**: Add to appropriate category with icon in `img/skills/` and update grid
- **New projects**: Add to `.projects` grid with `.project-card` structure
- **Animations**: New cards should be added to the Intersection Observer in `main.js`