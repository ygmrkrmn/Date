import "./App.css";
import Date2 from "./Date2";
import { Selectt } from "./Selectt";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* unutma */}
          <Route index element={<Date2 />} />
          <Route path="/bul" element={<Selectt />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
