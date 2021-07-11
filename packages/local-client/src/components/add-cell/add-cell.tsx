import "./add-cell.css";
import { useCellsActions } from "../../hooks/use-actions";
import data from "./data";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useCellsActions();

  const preparedButtons = data.buttons.map(({ cellType }) => (
    <button
      key={cellType}
      className="button is-primary is-rounded is-small"
      type="button"
      onClick={() => insertCellAfter(previousCellId, cellType)}
    >
      <span className="icon is-small">
        <i className="fas fa-plus" />
      </span>
      <span>Add {cellType}</span>
    </button>
  ));

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">{preparedButtons}</div>
      <div className="divider" />
    </div>
  );
};

export default AddCell;
