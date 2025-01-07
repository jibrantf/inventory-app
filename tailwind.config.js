/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        custom: "#ECF1F4",
        customtext: "#206761",
        customhv: "#DDEEF2",
        custom1: "#1A687E", // sidebar navbar
        custom2: "#307487", // sidebar navbar
        custom3: "#172E5A",
        custom4: "#416DFF",
        custom5: "#E2F397",
        custom6: "#076195",
        custom7: "#287F71",
        custom8: "#FFCA58",
        custom9: "#F4F9FD",
        custom10: "#05372C",
        custom11: "#F0F7F6",
        custom12: "#05725A",
        custom13: "#031581",
        custom14: "#19259D",
        custom15: "#EFF4FA",
        custom16: "#015659",
        custom17: "#3E83A4",
        custom18: "#376A54",
        custom19: "#54B79A",
        custom20: "#2F698B",
        custom21: "#409DA1",
        custom22: "#F3F4F6",
        custom23: "#0C6377",
        custom24: "#0B60B0",
        custom25: "#394867",

        //Kotak Summary Device
        custom26: "#33528A",
        custom27: "#33A9A0",

        custom28: "#33A9A0",
        custom29: "#C4E81D",

        custom30: "#C4E81D",
        custom31: "#8AB62E",
      },
      filter: {
        "custom-icon":
          "brightness(0) saturate(100%) invert(40%) sepia(100%) hue-rotate(200deg) saturate(600%) brightness(80%)",
        },
        margin: {
          '-68': '-17rem', // Menambahkan margin custom
          '-70': '-17.5rem', // Margin lebih besar jika -68 tidak cukup
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
