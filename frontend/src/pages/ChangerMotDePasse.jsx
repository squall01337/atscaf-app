import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangerMotDePasse() {
  const utilisateur = JSON.parse(localStorage.getItem("atscafUser"));
  const [nouveau, setNouveau] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.preventDefault();

    if (!nouveau || !confirmation) {
      setErreur("Veuillez remplir les deux champs.");
      return;
    }

    if (nouveau !== confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/changer-mdp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: utilisateur.userId, nouveauMotDePasse: nouveau }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErreur(data.message || "Erreur.");
        return;
      }

      // ✅ Mise à jour réussie : on modifie localStorage
      localStorage.setItem("atscafUser", JSON.stringify({ ...utilisateur, doitChangerMdp: false }));
      navigate("/tableau-de-bord");
    } catch (err) {
      setErreur("Erreur réseau.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-center text-xl font-semibold mb-6">Changer votre mot de passe</h1>

        {erreur && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded text-sm mb-4 text-center">
            {erreur}
          </div>
        )}

        <form onSubmit={handleChange} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nouveau mot de passe</label>
            <input
              type="password"
              value={nouveau}
              onChange={(e) => setNouveau(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirmer</label>
            <input
              type="password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium shadow"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}