import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; // Se till att detta är rätt sökväg till din apolloClient-fil
import { UserProvider } from "./context/UserContext"; 
import Employer from "./pages/Employer";
import Employee from "./pages/EmployeeDashboard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AddEmployerPage from "./pages/AddEmployerPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/add-employer" element={<AddEmployerPage />} /> 
            <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
          </Routes>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;





// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { UserProvider } from "./context/UserContext"; 
// import Employer from "./pages/Employer";
// import Employee from "./pages/EmployeeDashboard";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import AddEmployerPage from "./pages/AddEmployerPage";


// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/employer" element={<Employer />} />
//           <Route path="/employee" element={<Employee />} />
//           <Route path="/add-employer" element={<AddEmployerPage />} /> 
//           <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;