import { Paths } from '../types/object_path.js'

export const getDescendantProps = <OBJECT extends Record<string, any>, KEY extends Paths<OBJECT>>(
  object: OBJECT,
  key: KEY
) => key.reduce((acc, _key) => acc[_key], object)

export const getDescendantPropsSingle = <
  OBJECT extends Record<string, any>,
  KEY extends Paths<OBJECT>,
>(
  object: OBJECT,
  key: KEY
): boolean | number | string | null | undefined => {
  const data = getDescendantProps(object, key)

  switch (typeof data) {
    case 'boolean':
    case 'string':
    case 'undefined':
    case 'number': {
      return data
    }

    default: {
      return null
    }
  }
}
