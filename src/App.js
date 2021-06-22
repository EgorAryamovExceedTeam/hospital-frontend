import "./App.scss";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Registration from "./Hospital/Registration";

function App() {
  return (
    <div className="App">
      <Registration />
    </div>
  );
}

export default App;
