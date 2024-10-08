import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { UserProvider } from "./context/UserContext"; 
import Employer from "./pages/Employer";
import Employee from "./pages/EmployeeDashboard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AddEmployeePage from "./pages/AddEmployeePage";

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/add-employee" element={<AddEmployeePage />} /> 
            <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          </Routes>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;