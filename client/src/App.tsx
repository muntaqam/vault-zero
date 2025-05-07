import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileForm } from "@/pages/Register"; // assuming you're still using that name
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<ProfileForm />} />
        <Route path="/dashboard" element={<Dashboard />} />


        {/* You can add more routes here later */}
      </Routes>
    </Router>
  );
}

export default App;
