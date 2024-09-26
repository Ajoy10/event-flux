const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const TailwindConfig = require('../../libs/ui/tailwind.config');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...TailwindConfig, // tailwind.config from ui library
  content: [
    ...TailwindConfig.content, // tailwind.config from ui library
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
