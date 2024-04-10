interface TextProps {
  className?: string;
  children: React.ReactNode;
  tag?: React.ElementType<any>
}

const Text: React.FC<TextProps> = ({
  className,
  children,
  tag: Tag = 'p'
}) => {
  return (
    <div className="conetnts text">
      <Tag className={className}>{children}</Tag>
    </div>
  );
};

export default Text;
