import {
  createTheme,
  defaultVariantColorsResolver,
  VariantColorsResolver,
} from '@mantine/core';
import { FONTS } from './font';
import { blue, gray } from './colors';

export const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === 'filled') {
    return {
      ...defaultResolvedColors,
      background: 'var(--mantine-color-gray-7)',
      hover: 'var(--mantine-color-gray-6)',
    };
  }

  if (input.variant === 'subtle' && input.color === 'white') {
    return {
      ...defaultResolvedColors,
      hover: 'var(--mantine-color-gray-7)',
    };
  }

  return defaultResolvedColors;
};

export const MantineTheme = createTheme({
  variantColorResolver,
  fontFamily: FONTS.IBM_PLEX_SANS,
  fontFamilyMonospace: FONTS.IBM_PLEX_MONO,

  headings: {
    fontFamily: FONTS.IBM_PLEX_SANS,
    fontWeight: '600',
    textWrap: 'balance',
    sizes: {
      h1: {
        fontSize: '3.375rem',
        lineHeight: '4rem',
        fontWeight: '300',
      },
      h2: {
        fontSize: '2.625rem',
        lineHeight: '3.125rem',
        fontWeight: '300',
      },
      h3: {
        fontSize: '2rem',
        lineHeight: '2.5rem',
        fontWeight: '300',
      },
      h4: {
        fontSize: '1.75rem',
        lineHeight: '2.25rem',
        fontWeight: '400',
      },
      h5: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        fontWeight: '400',
      },
      h6: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        fontWeight: '600',
      },
    },
  },

  // focusRing: 'always',
  // focusClassName: 'IBM-focus-ring',

  colors: {
    blue,
    gray,
  },

  defaultRadius: 0,
  autoContrast: true,
  primaryColor: 'blue',
  primaryShade: 5,

  respectReducedMotion: true,

  // components: {
  //   Button: {
  //     defaultProps: {
  //       fw: '400',
  //       justify: 'space-between',
  //       size: 'md',
  //       mih: 50,
  //     },
  //     styles: {
  //       label: {
  //         minWidth: 100,
  //       },
  //     },
  //   },
  //   ActionIcon: {
  //     defaultProps: {
  //       variant: 'subtle',
  //       color: 'white',
  //     },
  //   },
  //   Divider: {
  //     defaultProps: {
  //       color: 'gray.6',
  //     },
  //   },
  // },
});
