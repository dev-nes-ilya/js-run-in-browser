import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { CellList } from "./components";

const App: React.FC = () => (
  <Provider store={store}>
    <CellList />
  </Provider>
);

render(<App />, document.querySelector("#root"));
