import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

const IBM_PLEX_SANS = IBM_Plex_Sans({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: "swap"
});
const IBM_PLEX_MONO = IBM_Plex_Mono({
  weight: '100',
  subsets: ['latin'],
});

export const FONTS = {
  IBM_PLEX_SANS: IBM_PLEX_SANS.style.fontFamily,
  IBM_PLEX_MONO: IBM_PLEX_MONO.style.fontFamily,
};
