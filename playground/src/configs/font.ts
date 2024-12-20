import localFont from "next/font/local";

const GeistSans = localFont({
  src: "../pages/fonts/GeistVF.woff",
});

const GeistMono = localFont({
  src: "../pages/fonts/GeistMonoVF.woff",
});

export const FONTS = {
  GEIST: GeistSans.style.fontFamily,
  GEIST_MONO: GeistMono.style.fontFamily,
};
