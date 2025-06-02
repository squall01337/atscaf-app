import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← si tu utilises React Router

export default function Login() {
  const [identifiant, setIdentifiant] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");

  const navigate = useNavigate(); // ← pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifiant || !motDePasse) {
      setErreur("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiant, motDePasse }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErreur(data.message || "Erreur inconnue.");
        return;
      }

      // ✅ Connexion réussie
      localStorage.setItem("atscafUser", JSON.stringify(data));

      if (data.doitChangerMdp) {
        navigate("/changer-mot-de-passe");
      } else {
        navigate("/tableau-de-bord");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setErreur("Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Connexion ATSCAF
        </h1>

        {erreur && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded text-sm mb-4 text-center">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Identifiant</label>
            <input
              type="text"
              value={identifiant}
              onChange={(e) => setIdentifiant(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="atscaf0100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="ATSCAF0100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium shadow transition duration-150"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}