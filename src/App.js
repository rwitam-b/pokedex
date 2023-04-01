import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import { AnimatePresence } from "framer-motion";
import './App.css';

function App() {
  return (
    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
