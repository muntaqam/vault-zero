import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileForm } from "@/pages/Register"; // assuming you're still using that name
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<ProfileForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* You can add more routes here later */}
      </Routes>
    </Router>
  );
}

export default App;
