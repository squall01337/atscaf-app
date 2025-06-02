import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TableauDeBord from "./pages/TableauDeBord";
import ChangerMotDePasse from "./pages/ChangerMotDePasse";
import FormulaireSport from "./pages/FormulaireSport";

function App() {
  const utilisateur = JSON.parse(localStorage.getItem("atscafUser"));

  return (
    <Router>
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route
    path="/tableau-de-bord"
    element={utilisateur ? <TableauDeBord /> : <Navigate to="/login" />}
  />
  <Route
    path="/changer-mot-de-passe"
    element={utilisateur ? <ChangerMotDePasse /> : <Navigate to="/login" />}
  />
  <Route
    path="/formulaire-sport"
    element={utilisateur ? <FormulaireSport /> : <Navigate to="/login" />}
  />
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
    </Router>
  );
}

export default App;