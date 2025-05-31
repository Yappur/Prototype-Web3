import ErrorToast from "./components/ErrorToast";
import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <RoutesViews />
        <ErrorToast />
      </Router>
    </>
  );
}

export default App;
