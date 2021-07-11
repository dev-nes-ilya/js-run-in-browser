import "./cell-list.css";
import { Fragment, useEffect } from "react";
import useTypedSelector from "../../hooks/use-typed-selector";
import { CellListItem, AddCell } from "..";
import { useCellsActions } from "../../hooks/use-actions";

const CellList: React.FC = () => {
  const list = useTypedSelector(({ cells: { data, order } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells } = useCellsActions();

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ProducedCellList = list.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell previousCellId={null} />
      {ProducedCellList}
    </div>
  );
};

export default CellList;
