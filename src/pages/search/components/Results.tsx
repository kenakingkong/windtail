import ResultButton from "./ResultButton";

export interface IResultProps {
  results: string[];
}

const Results: React.FC<IResultProps> = ({ results }) => {
  return results.length === 0 ? (
    <></>
  ) : (
    <ul className="flex flex-wrap items-center gap-2 ">
      {results.map((result) => (
        <li key={`result-${result}`}>
          <ResultButton value={result}>{result}</ResultButton>
        </li>
      ))}
    </ul>
  );
};

export default Results;
