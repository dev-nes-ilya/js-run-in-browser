import { Dispatch } from "redux";
import axios from "axios";
import { RootStore } from "../../reducers/index";
import { Action } from "../../action/cells/cells";
import { ActionTypes } from "../../action-types";
import { Cell, CellType, Direction } from "../../../common-types";
import { cellActions } from "../../action";

export const updateCell = (
  id: string,
  content: string
): cellActions.UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): cellActions.DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (
  id: string,
  direction: Direction
): cellActions.MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): cellActions.InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<cellActions.Action>) => {
    dispatch({
      type: ActionTypes.FETCH_CELLS,
    });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({
        type: ActionTypes.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (
    dispatch: Dispatch<cellActions.Action>,
    getState: () => RootStore
  ) => {
    const {
      cells: { order, data },
    } = getState();

    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (error) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};
