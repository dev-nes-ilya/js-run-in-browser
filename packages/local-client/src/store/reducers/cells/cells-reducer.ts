/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import produce from "immer";
import { cellActions } from "../../action";
import { ActionTypes } from "../../action-types";
import { Cell } from "../../../common-types";
import { getRandomIdx } from "../../../utils";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = produce<
  (state: CellsState | undefined, action: cellActions.Action) => CellsState
>((state: CellsState = initialState, action: cellActions.Action) => {
  switch (action.type) {
    case ActionTypes.SAVE_CELLS_ERROR:
      state.error = action.payload;
      return state;

    case ActionTypes.FETCH_CELLS:
      state.loading = true;
      return state;

    case ActionTypes.FETCH_CELLS_COMPLETE:
      state.order = action.payload.map(({ id }) => id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellsState["data"]);

      return state;

    case ActionTypes.FETCH_CELLS_ERROR:
      state.loading = false;
      state.error = action.payload;
      return state;

    case ActionTypes.UPDATE_CELL:
      const { content } = action.payload;
      state.data[action.payload.id].content = content;
      return state;

    case ActionTypes.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;

    case ActionTypes.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;

    case ActionTypes.INSERT_CELL_AFTER:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: getRandomIdx(),
      };

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;

    default:
      return state;
  }
});

export default cellReducer;
