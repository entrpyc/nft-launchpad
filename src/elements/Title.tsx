interface TitleProps {
  className?: string;
  children: React.ReactNode;
  tag?: React.ElementType<any>
}

const Title: React.FC<TitleProps> = ({
  className,
  children,
  tag: Tag = 'h2'
}) => {
  return (
    <div className="contents title">
      <Tag className={className}>{children}</Tag>
    </div>
  );
};

export default Title;
