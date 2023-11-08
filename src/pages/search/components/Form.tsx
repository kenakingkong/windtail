import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import MeasurementUtils from "../../../utils/measurement_utils";
import Constants from "../../../utils/constants";

interface IFormProps {
  onSuccess: (measurement: string, cssProperty: string) => void;
  onChanges: () => void;
}

const Form: React.FC<IFormProps> = ({ onSuccess, onChanges }) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const properties = Object.keys(Constants.TAILWIND_CLASS_PROPERTIES);

  const getMoreErrors = useCallback((value?: string) => {
    if (!value || value.length === 0) {
      return "input measurement value and select css property!";
    }

    if (!MeasurementUtils.hasValidUnit(value)) {
      return "only accept px or rem";
    }

    if (!MeasurementUtils.hasValidNumber(value)) {
      return "enter a valid number?";
    }

    return null;
  }, []);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (
    e
  ) => {
    onChanges();
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      setError(undefined);

      let propertyValue = (event.target as HTMLFormElement).cssproperty.value;
      let meausurementValue = (
        event.target as HTMLFormElement
      ).measurement.value.replace(/^\s+|\s+$/gm, "");

      if (!meausurementValue || !propertyValue) {
        onChanges();
        return;
      }

      let newError = getMoreErrors(meausurementValue);
      if (newError) {
        setError(newError);
        onChanges();
        return;
      }

      onSuccess(meausurementValue, propertyValue);
    },
    [getMoreErrors, onSuccess, onChanges]
  );

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col md:flex-row items-center gap-2 md:gap-4"
      >
        <div className="w-full max-w-2xl bg-near-white rounded overflow-hidden grid grid-cols-[1fr_max-content_1fr] place-items-center">
          <fieldset>
            <label htmlFor="measurement" className="sr-only">
              measurement
            </label>
            <input
              id="measurement"
              type="text"
              placeholder="try 12px or 0.125rem"
              aria-required="true"
              autoComplete="off"
              className="pl-4 h-12 font-bold text-center bg-near-white text-dark-blue focus:outline-none focus:ring-none placeholder:text-dark-blue/50"
              onChange={onChange}
            />
          </fieldset>
          <p className="text-2xl text-dark-blue">→</p>
          <fieldset>
            <label htmlFor="cssproperty" className="sr-only">
              css property
            </label>
            <select
              id="cssproperty"
              aria-required="true"
              className="h-12 font-bold bg-near-white text-dark-blue focus:outline-none focus:ring-none"
            >
              {properties.map((property) => (
                <option key={property} value={property}>
                  {property.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </fieldset>
        </div>
        <button
          type="submit"
          className="rounded h-12 w-full md:w-max py-2 px-6 font-bold bg-dark-blue text-near-white tracking-wide hover:bg-blue-black focus:outline-blue-black focus:ring-blue-black"
        >
          search
        </button>
      </form>
      {!!error && (
        <div className="pt-4 text-blue-black text-center font-semibold">
          Error! {error}
        </div>
      )}
    </>
  );
};

export default Form;
