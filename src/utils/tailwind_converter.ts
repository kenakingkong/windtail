import AppTypes from "./types";
import Constants from "./constants";
import MeasurementUtils from "./measurement_utils";
import UnitConverter from "./unit_converter";

namespace TailwindConverter {
  /**
   *
   * SPACING METHODS
   *
   */

  const hasSpacingClassUnit = (value: number) => {
    return value <= 384 && value % 2 === 0;
  };

  const getSpacingClassUnit = (value: number) => {
    if (value === 0) return "0";
    if (value === 1) return "px";
    return (value / 4).toString();
  };

  const getSpacingClosestClassUnits = (value: number) => {
    if (value === 0) return 0;
    if (value >= 384) return 384;
    let n = value + 1 / 10;
    n = n - (n % 4);
    return n;
  };

  /**
   *
   * TYPOGRAPHY METHODS
   *
   */
  const hasTypographyClassUnit = (value: number) => {
    return [12, 14, 16, 18, 20, 24, 30, 48, 60, 96, 128].includes(value);
  };

  const getTypographyClassUnit = (value: number) => {
    switch (value) {
      case 12:
        return "xs";
      case 14:
        return "sm";
      case 16:
        return "base";
      case 18:
        return "xl";
      case 20:
        return "2xl";
      case 24:
        return "3xl";
      case 30:
        return "4xl";
      case 48:
        return "5xl";
      case 60:
        return "6xl";
      case 72:
        return "7xl";
      case 96:
        return "8xl";
      case 128:
        return "9xl";
      default:
        return "";
    }
  };

  const getTypographyClosestClassUnits = (value: number) => {
    if (value === 0) return 12;
    if (value >= 128) return 128;
    // tree searhc i guess??/
    return 0;
  };

  /**
   *
   * GENERIC METHODS
   *
   */

  const getTailwindClassUnit = (
    measurement: AppTypes.IMeasurement,
    cssProperty: AppTypes.ICssProperty
  ) => {
    const { value, unit } = measurement;
    const { category } = cssProperty;

    let finalValue = Math.abs(
      unit === Constants.UNITS.PX ? value : UnitConverter.convertREMtoPX(value)
    );

    switch (category) {
      case Constants.CATEGORIES.SPACING:
        return getSpacingClassUnit(finalValue);
      case Constants.CATEGORIES.TYPOGRAPHY:
        return getTypographyClassUnit(finalValue);
      default:
        return "";
    }
  };

  const generateClasses = (
    prefix: string,
    suffix: string,
    midfixes: string[]
  ) => {
    let first = `${prefix.replace(/-$/, "")}-${suffix}`;
    let rest = midfixes.map((midfix: string) => `${prefix}${midfix}-${suffix}`);
    return [first, ...rest];
  };

  /**
   *
   * EXPOSED METHODS
   *
   */

  export const getTailwindClasses = (
    measurement: AppTypes.IMeasurement,
    cssProperty: AppTypes.ICssProperty
  ) => {
    const prefix = `${measurement.value < 0 ? "-" : ""}${cssProperty.prefix}`;
    const suffix = getTailwindClassUnit(measurement, cssProperty);
    return generateClasses(prefix, suffix, cssProperty.propertyPrefixes);
  };

  export const getArbitraryTailwindClasses = (
    measurement: AppTypes.IMeasurement,
    cssProperty: AppTypes.ICssProperty
  ) => {
    const prefix = cssProperty.prefix;
    const suffix = `[${measurement.value}${measurement.unit}]`;
    return generateClasses(prefix, suffix, cssProperty.propertyPrefixes);
  };

  export const findClosestMeasurements = (
    measurement: AppTypes.IMeasurement,
    cssProperty: AppTypes.ICssProperty
  ) => {
    const { value, unit } = measurement;
    const { name, category } = cssProperty;

    switch (category) {
      case Constants.CATEGORIES.SPACING:
        if (unit === Constants.UNITS.PX) {
          return getSpacingClosestClassUnits(value);
        }

        if (unit === Constants.UNITS.REM) {
          let closestPX = getSpacingClosestClassUnits(
            UnitConverter.convertREMtoPX(value)
          );
          return !!closestPX
            ? UnitConverter.convertPXtoREM(closestPX)
            : closestPX;
        }
        return undefined;
      case Constants.CATEGORIES.TYPOGRAPHY:
        return getTypographyClosestClassUnits(value);
      default:
        return undefined;
    }
  };

  export const hasMatchingTailwindClass = (
    measurement: AppTypes.IMeasurement,
    cssProperty: AppTypes.ICssProperty
  ) => {
    const { value, unit } = measurement;
    const { name, category } = cssProperty;

    let finalValue =
      measurement.unit === Constants.UNITS.REM
        ? UnitConverter.convertREMtoPX(value)
        : value;

    switch (category) {
      case Constants.CATEGORIES.SPACING:
        return hasSpacingClassUnit(finalValue);
      case Constants.CATEGORIES.TYPOGRAPHY:
        return hasTypographyClassUnit(finalValue);
      default:
        return false;
    }
  };

  export const getMeasurement = (measurementValue: string) => {
    return MeasurementUtils.getValueAndUnit(
      measurementValue
    ) as AppTypes.IMeasurement;
  };

  export const getTailwindProperty = (propertyValue: string) => {
    return Constants.TAILWIND_CLASS_PROPERTIES[
      propertyValue as keyof typeof Constants.TAILWIND_CLASS_PROPERTIES
    ] as AppTypes.ICssProperty;
  };
}

export default TailwindConverter;
