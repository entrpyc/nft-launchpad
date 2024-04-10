interface ButtonProps {
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  onClick,
  children,
}) => {
  return (
    <button className="button" type="button" disabled={disabled} onClick={onClick}>{children}</button>
  );
};

export default Button;
