import Navbar from "./components/Navbar//Navbar.jsx"
import Main from "./components/Main/Main.jsx"
import Footer from "./components/Footer/Footer.jsx"
import About from "./components/About/About.jsx";
import Transaction from "./components/Transaction/Transaction.jsx";
import History from "./components/History/History.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleTransfer from "./components/SingleTransfer/SingleTransfer.jsx";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/home" element={<Main/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/transaction" element={<Transaction/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/SingleTransfer/:id" element={<SingleTransfer/>}/>
      </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
