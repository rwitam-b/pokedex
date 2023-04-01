import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Components/Landing";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
