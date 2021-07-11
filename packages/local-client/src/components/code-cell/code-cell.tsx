import "./code-cell.css";
import { useEffect } from "react";
import { Cell } from "../../common-types";
import { useCellsActions, useBundleActions } from "../../hooks/use-actions";
import useTypedSelector from "../../hooks/use-typed-selector";
import useCumulativeCode from "../../hooks/use-cumulative-code";

import { CodeEditor, Preview, Resizable } from "..";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
  const bundle = useTypedSelector((state) => state.bundle && state.bundle[id]);
  const { createBundle } = useBundleActions();
  const { updateCell } = useCellsActions();
  const cumulativeCode = useCumulativeCode(id);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return () => {};
    }
    const timer = setTimeout(() => {
      createBundle(id, cumulativeCode);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{ display: "flex", height: "calc(100% - 10px)" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={content}
            onChange={(value: string) => {
              updateCell(id, value);
            }}
          />
        </Resizable>
        <div className="code-cell-layer">
          {!bundle || bundle.loading ? (
            <div className="fade-in">
              <progress className="progress is-small is-primary">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
