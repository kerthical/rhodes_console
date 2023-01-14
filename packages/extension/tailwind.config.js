module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      width: {
        screen: '100dvw',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: false,
  },
};
