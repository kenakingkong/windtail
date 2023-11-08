namespace Types {
  export interface IMeasurement {
    value: number;
    unit: "px" | "rem";
  }

  export interface ICssProperty {
    name: string;
    category: string;
    prefix: string;
    propertyPrefixes: string[];
  }
}

export default Types;
