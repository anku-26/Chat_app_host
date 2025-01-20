import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebSocketProvider } from "./utility/WebSocketContext";
import { LandingPage } from "./pages/landingpage";
import { Chatting } from "./pages/Chatting";

export const App = () => {
  return (
    <WebSocketProvider>
      
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<Chatting />} />
        </Routes>
      </Router>
     
    </WebSocketProvider>
  );
};

export default App;
