type InputProps = {
  size?: "medium" | "large";
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const Input: React.FC<InputProps> = ({
  size = "medium",
  placeholder = "",
  onChange,
  value,
}) => {
  // サイズに応じたクラスを設定
  let sizeClass = "";
  switch (size) {
    case "medium":
      sizeClass = "py-2 px-4 text-md text-text_dark w-[45%]"; // medium: 横幅45%
      break;
    case "large":
      sizeClass = "py-3 px-6 text-lg text-text_dark w-[80%]"; // large: 横幅80%
      break;
    default:
      sizeClass = "py-2 px-4 text-md w-[45%]"; // デフォルトは medium
  }

  return (
    <input
      className={`rounded ${sizeClass} transition duration-150 ease-in-out`}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
