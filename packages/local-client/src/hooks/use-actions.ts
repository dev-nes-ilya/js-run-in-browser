import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { cellsActionCreators, bundleActionCreators } from "../store";

type HandlerClickActionButtons = {
  up: (id: string) => void;
  down: (id: string) => void;
  delete: (id: string) => void;
};

export const useCellsActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(cellsActionCreators, dispatch);
  }, [dispatch]);
};

export const useBundleActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(bundleActionCreators, dispatch);
  }, [dispatch]);
};

export const useHandlerButtons = () => {
  const { moveCell, deleteCell } = useCellsActions();

  const handlers: HandlerClickActionButtons = {
    up(cellId) {
      moveCell(cellId, "up");
    },
    down(cellId) {
      moveCell(cellId, "down");
    },
    delete(cellId) {
      deleteCell(cellId);
    },
  };

  return handlers;
};
