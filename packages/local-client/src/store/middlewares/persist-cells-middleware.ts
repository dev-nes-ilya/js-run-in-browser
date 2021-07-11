/* eslint-disable import/prefer-default-export */
import { Dispatch } from "redux";
import { RootStore } from "../reducers/index";
import { saveCells } from "../action-creators/cells/cells";
import { cellActions } from "../action";
import { ActionTypes } from "../action-types";

export const persistCellsMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<cellActions.Action>;
  getState: () => RootStore;
}) => {
  let timer: any;
  return (next: (action: cellActions.Action) => void) => {
    return (action: cellActions.Action) => {
      next(action);

      const observableActions = [
        ActionTypes.MOVE_CELL,
        ActionTypes.UPDATE_CELL,
        ActionTypes.DELETE_CELL,
        ActionTypes.INSERT_CELL_AFTER,
      ];

      if (observableActions.includes(action.type)) {
        clearInterval(timer);
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 2000);
      }
    };
  };
};
