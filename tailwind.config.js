const production = !process.env.ROLLUP_WATCH

module.exports = {
  // content: ['./src/**/*.{html,js,svelte,ts}'],
  mode: 'jit',
  purge: {
    content: ['./src/**/*.svelte'],
    enabled: true, // disable purge in dev
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '0 0 4px 0px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
