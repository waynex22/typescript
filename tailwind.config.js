// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      gridTemplateColumns: {
        '6': 'repeat(6, minmax(0, 1fr))', // Define your grid columns
      },
    },
  },
  // ...
}
