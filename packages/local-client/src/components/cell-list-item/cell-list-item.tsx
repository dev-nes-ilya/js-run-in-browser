import "./cell-list-item.css";
import { Cell } from "../../common-types";
import { CodeCell, TextEditor, ActionBar } from "..";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let children: JSX.Element;

  if (cell.type === "code") {
    children = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    children = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }
  return <div className="cell-list-item">{children}</div>;
};

export default CellListItem;
