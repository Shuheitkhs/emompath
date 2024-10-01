/** インプットの上部に入れるラベル */

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = "" }) => {
  return <label className={`text-xl mb-1 ${className}`}>{children}</label>;
};

export default Label;
