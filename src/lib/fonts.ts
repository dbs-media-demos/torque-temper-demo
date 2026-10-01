import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

/** Variable Archivo with the width axis (62–125): headlines stretch from condensed to expanded. */
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const fontVariables = `${archivo.variable} ${hanken.variable} ${jetbrains.variable}`;
