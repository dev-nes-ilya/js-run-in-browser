/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./text-editor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from "../../common-types";
import { useCellsActions } from "../../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell: { content, id } }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEditingMode, setEditingMode] = useState(false);
  const [value, setValue] = useState("# Header");

  const { updateCell } = useCellsActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }
      setEditingMode(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (isEditingMode) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={content} onChange={(v) => updateCell(id, v || "")} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="text-editor card" onClick={() => setEditingMode(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
