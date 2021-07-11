import { Dispatch } from "redux";
import { ActionTypes } from "../../action-types";
import { bundleActions } from "../../action";
import bundler from "../../../bundler";

// eslint-disable-next-line import/prefer-default-export
export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<bundleActions.BundleAction>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundler(input);

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
