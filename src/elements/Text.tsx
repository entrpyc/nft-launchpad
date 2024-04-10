interface TextProps {
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ className, children }) => {
  return (
    <p className={className}>{children}</p>
  );
};

export default Text;
