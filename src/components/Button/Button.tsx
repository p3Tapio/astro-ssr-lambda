import "./Button.scss";

const Button = ({ onClick, label }: { onClick: () => void; label: string }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
