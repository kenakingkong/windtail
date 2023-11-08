namespace UnitConverter {
  // https://pixelsconverter.com/

  const DEFAULT_BASE = 16;
  // In em unit, the base is the value of its parent element's font-size.

  export const convertREMtoPX = (
    value: number,
    base: number = DEFAULT_BASE
  ) => {
    // px = rem * base = px
    return value * base;
  };

  export const convertPXtoREM = (
    value: number,
    base: number = DEFAULT_BASE
  ) => {
    // rem = px / base
    return value / base;
  };

  export const convertEMtoPX = (value: number, base: number = DEFAULT_BASE) => {
    // px = em * base
    return value * base;
  };

  export const convertPXtoEM = (value: number, base: number = DEFAULT_BASE) => {
    // em = px / base
    return value / base;
  };
}

export default UnitConverter;
