import "./action-bar.css";
import { useHandlerButtons } from "../../hooks/use-actions";
import btnData from "./data";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const handlers = useHandlerButtons();

  const preparedButtons = btnData.buttons.map(
    ({ iconClassName, handleType }) => (
      <button
        key={handleType}
        className={btnData.btnClassName}
        type="button"
        onClick={() => handlers[handleType](id)}
      >
        <span className="icon">
          <i className={iconClassName} />
        </span>
      </button>
    )
  );

  return <div className="action-bar">{preparedButtons}</div>;
};

export default ActionBar;
