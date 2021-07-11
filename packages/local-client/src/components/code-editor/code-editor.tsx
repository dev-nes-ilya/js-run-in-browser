import "./code-editor.css";
import "./syntax.css";
import { useRef } from "react";
import MonacoEditor, {
  EditorDidMount,
  EditorProps,
} from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import HighLighter from "monaco-jsx-highlighter";

declare global {
  interface Window {
    monaco: React.FC<EditorProps>;
  }
}

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

// eslint-disable-next-line import/prefer-default-export
export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editorRef = useRef<any>();
  const onDidMount: EditorDidMount = (getValue, monacoEditorInstance) => {
    editorRef.current = monacoEditorInstance;
    monacoEditorInstance.onDidChangeModelContent(() => {
      onChange(getValue());

      monacoEditorInstance.getModel()?.updateOptions({ tabSize: 2 });

      const highlighter = new HighLighter(
        window.monaco,
        codeShift,
        monacoEditorInstance
      );

      highlighter.highLightOnDidChangeModelContent(
        () => {}, // disable console logging of errors
        () => {}, // disable console logging of errors
        undefined, // disable console logging of errors
        () => {} // disable console logging of errors
      );
    });
  };

  const onFormatClick = () => {
    const unformattedCode = editorRef.current.getModel().getValue();
    const formattedCode = prettier
      .format(unformattedCode, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    editorRef.current.setValue(formattedCode);
  };

  return (
    <div className="code-editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
        type="button"
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onDidMount}
        value={initialValue}
        language="javascript"
        height="100%"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
