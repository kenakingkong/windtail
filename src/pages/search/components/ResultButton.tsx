import {
  HtmlHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import CopySVG from "../../../svgs/copy";
import CheckSVG from "../../../svgs/check";

interface IResultButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  value: string;
}
const ResultButton: React.FC<IResultButtonProps> = (props) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (isCopied) {
      // doo stuff
    } else {
      // doo other stuff
    }
    let timeout = setTimeout(() => {
      if (!isMounted) return;
      setIsCopied(false);
    }, 2500);

    return () => {
      isMounted = false;
      window.clearTimeout(timeout);
    };
  }, [isCopied]);

  const copyToClipboard: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!navigator.clipboard) return;
    event.preventDefault();
    navigator.clipboard.writeText(event.currentTarget.value).then(() => {
      setIsCopied(true);
    });
  };

  return (
    <button
      onClick={copyToClipboard}
      className="rounded bg-white/20 border-2 border-dark-blue hover:border-blue-black text-dark-blue hover:text-blue-black py-1 px-4 font-bold flex gap-2 items-center justify-center"
    >
      {props.children}{" "}
      {isCopied ? (
        <CheckSVG className="h-3 w-auto -mt-1 overflow-visible" />
      ) : (
        <CopySVG className="h-3.5 w-auto -mt-1.5 overflow-visible" />
      )}
    </button>
  );
};

export default ResultButton;
