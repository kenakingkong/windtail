import AppTypes from "./types";

namespace MeasurementUtils {
  const ALLOWED_UNITS = ["px", "rem"];
  const ALLOWED_UNITS_REGEX = /px|rem/gi;
  const NUMBERS_REGEX = new RegExp(/^-?[0-9]\d*(\.\d+)?$/);

  export const hasValidUnit = (value: string) => {
    return (
      ALLOWED_UNITS.map((unit) => value.toLowerCase().endsWith(unit)).filter(
        (x) => x
      ).length > 0
    );
  };

  export const hasValidNumber = (value: string) => {
    return NUMBERS_REGEX.test(value.replace(ALLOWED_UNITS_REGEX, ""));
  };

  export const getValueAndUnit = (str: string) => {
    let value = str.replace(ALLOWED_UNITS_REGEX, "");
    let unit = str.replace(value, "").toLowerCase();
    return {
      value: Number(value),
      unit: unit,
    } as AppTypes.IMeasurement;
  };
}

export default MeasurementUtils;
