import RoutesViews from "./routes/RoutesViews";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <RoutesViews />
      </Router>
    </>
  );
}

export default App;
