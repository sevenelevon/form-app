import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Form from "./page/Form";
import { Banner } from "./page/Banner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/end" element={<Banner />} />
      </Routes>
    </Router>
  );
}

export default App;
