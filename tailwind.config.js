module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--c-primary-color)',
        secondary: 'var(--c-secondary-color)',
        background: 'rgba(var(--c-background-color))',
        'background-oppose': 'var(--c-background-oppose-color)',
        'background-revert': 'rgba(var(--c-background-revert-color))',
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'game-green': '#198754',
        'game-yellow': '#ffc107',
        'game-red': '#dc3545'
      },
      spacing: {
        '1/8': '12.5%',
        '1/10': '10%',
        '1/20': '5%',
        '105%': '105%',
        gutter: '1.5rem',
        'mobile-gutter': '1rem'
      },
      letterSpacing: {
        tighter: '-.04em'
      },
      lineHeight: {
        tight: 1.2
      },
      fontSize: {
        none: '0',
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem'
      },
      fontFamily: {
        logo: ['Druk Wide Web', 'Archer SSm']
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)'
      },
      height: {
        'header-less': 'calc(100vh - var(--h-header))',
        'footer-less': 'calc(100vh - var(--h-footer))'
      },
      keyframes: {
        idling: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 }
        }
      },
      animation: {
        idling: 'idling 1.5s steps(1, start) infinite'
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        select: '10px 7px'
      },
      backgroundPosition: {
        select: 'center right 20px'
      },
      backgroundImage: {
        select: `url("data:image/svg+xml,%3Csvg fill='%313638' viewBox='0 0 10 7' id='play-outline' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M.278 1.746c-.37-.397-.37-1.028 0-1.425.387-.415 1.028-.415 1.415 0l3.302 3.542L8.306.31c.388-.415 1.03-.415 1.416 0 .188.202.278.461.278.713 0 .252-.09.511-.278.713L5.767 5.979l-.003.004c-.01.015-.03.04-.056.07-.387.414-1.029.415-1.416 0L.278 1.745z'%3E%3C/path%3E%3C/svg%3E")`
      },
      borderWidth: {
        arrow: '0 4px 4px 0'
      }
    }
  },
  plugins: []
};
