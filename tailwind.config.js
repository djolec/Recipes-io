/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-serif-display': ['DM Serif Display', 'serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'hero-img': "url('/src/img/hero-banner-large.jpg')",
        'mobile-hero': "url('/src/img/hero-banner-small.jpg')",
        'tab-card-img': "url('/src/img/image-placeholder.svg')"
    },
    gridTemplateColumns: {
        
      'card': 'repeat(auto-fill, minmax(150px, 1fr))',
      'cardBig': 'repeat(auto-fill, minmax(220px, 1fr))',
      'border': 'repeat(auto-fill, minmax(90px, 1fr))',
      'borderBig': 'repeat(auto-fill, minmax(130px, 1fr))',
      'cuisineCard': 'repeat(12, minmax(150px, 1fr))',
      'cuisineCardBig': 'repeat(12, minmax(220px, 1fr))',
    },
    backgroundSize: {
      '35%': '35%',
    },
    transitionProperty: {
      'height': 'height'
    }
  },
  plugins: [],
}
}
