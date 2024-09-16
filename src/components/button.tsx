// ボタンを4種類、カラーを3種類で使い分け
// small +-ボタン
// medium 親要素45%
// large　親要素90%
// デフォルト値はauthフォルダ内で使うもの
type ButtonProps = {
  size?: "small" | "medium" | "large" | "auth";
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  size = "auth",
  color = "primary",
  onClick,
  children,
}) => {
  let sizeClass = "";
  switch (size) {
    case "small":
      sizeClass = "py-2 px-2 text-md w-auto"; // +-ボタンのみに使用
      break;
    case "medium":
      sizeClass = "py-2 px-4 text-md w-[45%]"; // 横幅45%
      break;
    case "large":
      sizeClass = "py-3 px-6 text-lg w-[90%]"; // 横幅90%
      break;
    case "auth":
      sizeClass = "py-2 px-4 text-md w-auto"; //auth系に使用
      break;
    default:
      sizeClass = "py-2 px-4 text-md w-auto";
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
    <button className={`rounded ${sizeClass} ${colorClass}`} onClick={onClick}>
      {children}
    </button>
  );
};
