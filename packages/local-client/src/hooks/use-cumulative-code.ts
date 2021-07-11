import useTypedSelector from "./use-typed-selector";
import {
  showFnImplementation,
  showFnImplementationNoop,
} from "../code-template";

// use for gather code from upper cell scope
const useCumulativeCode = (id: string): string => {
  const { order, data } = useTypedSelector((state) => state.cells);
  const idx = order.findIndex((index) => id === index);
  const slicedOrder = order.slice(0, idx + 1);
  const cumulativeContent = slicedOrder.reduce(
    (acc: string[], cellId: string) => {
      const { content: cellContent, type } = data[cellId];

      if (type === "code") {
        if (id === cellId) {
          return [...acc, showFnImplementation, cellContent];
        }
        return [...acc, showFnImplementationNoop, cellContent];
      }

      return acc;
    },
    []
  );
  return cumulativeContent.join("\n");
};

export default useCumulativeCode;
