import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

/** Variable Archivo with the width axis (62–125): headlines stretch from condensed to expanded. */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${hanken.variable} ${jetbrains.variable}`;
