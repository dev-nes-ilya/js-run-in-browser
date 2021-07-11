/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import produce from "immer";
import { bundleActions } from "../../action";
import { ActionTypes } from "../../action-types";

interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}

const initialState: BundleState = {};

const cellReducer = produce(
  (state: BundleState = initialState, action: bundleActions.BundleAction) => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;

      case ActionTypes.BUNDLE_COMPLETE:
        const { bundle } = action.payload;
        state[action.payload.cellId] = {
          loading: false,
          code: bundle.code,
          err: bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);

export default cellReducer;
