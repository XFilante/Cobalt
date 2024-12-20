import { useMediaQuery } from '@mantine/hooks'
import { BREAKPOINTS } from '../const.js'

/**
 * Custom hook to handle media queries.
 * Returns an object with boolean values indicating whether the screen size matches the specified breakpoints.
 */
export const useMediaQuerys = () => {
  // Big Than
  const BigXS = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`, true)
  const BigSM = useMediaQuery(`(min-width: ${BREAKPOINTS.SM})`, true)
  const BigMD = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`, true)
  const BigLG = useMediaQuery(`(min-width: ${BREAKPOINTS.LG})`, true)
  const BigXL = useMediaQuery(`(min-width: ${BREAKPOINTS.XL})`, true)

  return {
    XS: BigXS,
    SM: BigSM,
    MD: BigMD,
    LG: BigLG,
    XL: BigXL,
  }
}
