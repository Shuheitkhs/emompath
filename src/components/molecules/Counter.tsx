/** ready,sets, reps などを変更するカウンター
 */
import Button from "@/components/atoms/Button";

interface CounterProps {
  title: string;
  number: number;
  plus1: () => void;
  minus1: () => void;
}

const Counter: React.FC<CounterProps> = ({ title, number, plus1, minus1 }) => {
  return (
    <div className="w-full px-[5%] py-3">
      <div className="flex justify-between">
        <Button
          size="extra-small"
          color="secondary"
          onClick={minus1}
          className="text-2xl"
        >
          -
        </Button>
        <p className="text-2xl font-bold">
          {`${title}`} <span className="text-3xl">{`${number}`}</span>
        </p>
        <Button
          size="extra-small"
          color="secondary"
          onClick={plus1}
          className="text-2xl"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;
