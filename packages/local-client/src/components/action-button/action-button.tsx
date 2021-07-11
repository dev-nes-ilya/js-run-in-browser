interface ActionButtonProps {
  btnClassName: string;
  iconClassName: string;
  handlerClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  btnClassName,
  iconClassName,
  handlerClick,
}) => {
  return (
    <button className={btnClassName} type="button" onClick={handlerClick}>
      <span className="icon">
        <i className={iconClassName} />
      </span>
    </button>
  );
};

export default ActionButton;
