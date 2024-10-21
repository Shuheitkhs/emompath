/** ボタンを5種類、カラーを3種類で使い分け
 *  extra-small +-ボタン
 *  small 画面の30%
 *  medium 画面の45%
 *  large 画面の90%
 *  normal 適宜必要な際
 *  カラーは肯定的な意味の
 *  primary ピンク
 *  secondary ブルー
 *  中止・戻る意味の
 *  danger
 */

export type ButtonProps = {
  size?: "extra-small" | "small" | "medium" | "large" | "normal" | "full";
  color?: "primary" | "secondary" | "danger";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  disabled?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  size = "normal",
  color = "primary",
  onClick,
  children,
}) => {
  let sizeClass = "";
  switch (size) {
    case "extra-small":
      sizeClass =
        "py-2 px-2 text-xl text-text_dark font-bold w-[10%]  hover:scale-105 transition-transform duration-100 active:scale-95"; // +-ボタンのみに使用
      break;
    case "small":
      sizeClass =
        "py-2 px-4 text-xl font-bold w-[30%]  hover:scale-105 transition-transform duration-100 active:scale-95"; // 横幅30%
      break;
    case "medium":
      sizeClass =
        "py-2 px-4 text-2xl font-bold w-[45%]  hover:scale-105 transition-transform duration-100 active:scale-95"; // 横幅45%
      break;
    case "large":
      sizeClass =
        "py-3 px-6 text-2xl font-bold w-[90%]  hover:scale-110 transition-transform duration-100 active:scale-95"; // 横幅90%
      break;
    case "full":
      sizeClass =
        "py-3 px-6 text-2xl font-bold w-[110%] h-[100%]  hover:scale-105 transition-transform duration-100 active:scale-95";
    default:
      sizeClass =
        "py-2 px-4 text-xl font-bold w-auto  hover:scale-105 transition-transform duration-100 active:scale-95"; // normalボタン用
  }

  // primaryは進行形アクション・secondaryは追加系アクション・dangerは削除・戻る系アクション
  let colorClass = "";
  switch (color) {
    case "secondary":
      colorClass = "bg-secondary text-text"; //ネオンブルー
      break;
    case "danger":
      colorClass = "bg-danger text-text"; //ネオングレー
      break;
    default:
      colorClass = "bg-primary text-text"; //ネオンピンク
  }

  return (
    <button
      className={`text-center rounded ${sizeClass} ${colorClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
