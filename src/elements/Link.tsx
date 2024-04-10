import NextLink from "next/link";

interface LinkProps {
  className?: string;
  children?: React.ReactNode;
  href: string
}

const Link: React.FC<LinkProps> = ({
  className,
  children,
  href,
}) => {
  return (
    <div className="contents link">
      <NextLink href={href} className={className}>{children}</NextLink>
    </div>
  );
};

export default Link;
