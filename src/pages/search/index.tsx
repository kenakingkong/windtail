import { useEffect, useState } from "react";
import Form from "./components/Form";
import Results from "./components/Results";
import AppTypes from "../../utils/types";
import TailwindConverter from "../../utils/tailwind_converter";

const Search = () => {
  const [measurement, setMeasurement] = useState<AppTypes.IMeasurement | null>(
    null
  );
  const [cssProperty, setCssProperty] = useState<AppTypes.ICssProperty | null>(
    null
  );
  const [results, setResults] = useState<{
    exact: string[];
    arbitrary: string[];
  }>({
    exact: [],
    arbitrary: [],
  });

  const [closeResults, setCloseResults] = useState<{
    measurement?: AppTypes.IMeasurement;
    results: string[];
  }>({ measurement: undefined, results: [] });

  useEffect(() => {
    if (!measurement || !cssProperty) return;

    const hasMatches = TailwindConverter.hasMatchingTailwindClass(
      measurement,
      cssProperty
    );

    if (hasMatches) {
      setResults({
        arbitrary: [],
        exact: TailwindConverter.getTailwindClasses(measurement, cssProperty),
      });
    } else {
      setResults({
        exact: [],
        arbitrary: TailwindConverter.getArbitraryTailwindClasses(
          measurement,
          cssProperty
        ),
      });

      const closestMeasurement = TailwindConverter.findClosestMeasurements(
        measurement,
        cssProperty
      );

      const newMeasurement = {
        value: closestMeasurement,
        unit: measurement.unit,
      } as AppTypes.IMeasurement;

      if (closestMeasurement) {
        setCloseResults({
          measurement: newMeasurement,
          results: TailwindConverter.getTailwindClasses(
            newMeasurement,
            cssProperty
          ),
        });
      }
    }
  }, [measurement, cssProperty]);

  const setQuery = (measurementValue: string, cssPropertyValue: string) => {
    setMeasurement(TailwindConverter.getMeasurement(measurementValue));
    setCssProperty(TailwindConverter.getTailwindProperty(cssPropertyValue));
  };

  const clearResults = () => {
    setMeasurement(null);
    setCssProperty(null);
    setResults({ exact: [], arbitrary: [] });
    setCloseResults({ measurement: undefined, results: [] });
  };

  const hasExactMatches = results.exact.length > 0;
  const hasArbitraryMatches = results.arbitrary.length > 0;
  const hasClosestMatches =
    closeResults.results && closeResults.results.length > 0;

  return (
    <>
      <section className="w-full">
        <Form onSuccess={setQuery} onChanges={clearResults} />
      </section>
      {measurement && (
        <section className="w-full space-y-2">
          <h2 className="text-dark-blue space-x-1 text-xl font-bold">
            {hasExactMatches &&
              `Exact matches ${measurement.value}${measurement.unit}`}
            {hasArbitraryMatches &&
              `No matches for ${measurement.value}${measurement.unit}`}
          </h2>
          <Results results={results.exact} />
          <Results results={results.arbitrary} />
        </section>
      )}
      {closeResults.measurement && hasClosestMatches && (
        <section className="w-full space-y-2">
          <h2 className="text-dark-blue space-x-1 text-xl font-bold">
            Here's the closest match: {closeResults.measurement.value}
            {closeResults.measurement.unit}
          </h2>
          <Results results={closeResults.results} />
        </section>
      )}
    </>
  );
};

export default Search;
