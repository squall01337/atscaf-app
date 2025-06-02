import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TableauDeBord() {
  const navigate = useNavigate();
  const utilisateur = JSON.parse(localStorage.getItem("atscafUser"));

  useEffect(() => {
    if (!utilisateur) navigate("/login");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("atscafUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">
          ATSCAF Subventions — <span className="font-normal">{utilisateur.nom}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 text-sm px-4 py-1 rounded border border-white hover:bg-blue-100"
        >
          Déconnexion
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Tableau de bord - {utilisateur.nom}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloc Sport */}
          <div className="bg-blue-100 border-l-4 border-blue-500 p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Subvention Sport 2025</h3>
            <p className="text-sm mb-1">Statut : <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded text-xs">Brouillon</span></p>
            <p className="text-sm text-gray-600 mb-4">Dernière modification : 01/04/2025 10:15</p>
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700" onClick={() => navigate("/formulaire-sport")}>
              Continuer la saisie
            </button>
          </div>

          {/* Bloc Culture */}
          <div className="bg-green-100 border-l-4 border-green-600 p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-green-700 mb-2">Subvention Culture 2025</h3>
            <p className="text-sm mb-1">Statut : <span className="inline-block bg-green-600 text-white px-2 py-0.5 rounded text-xs">Soumis</span></p>
            <p className="text-sm text-gray-600 mb-4">Dernière modification : 31/03/2025 14:30</p>
            <button className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700" onClick={() => navigate("/formulaire-culture")}>
              Voir le détail
            </button>
          </div>
        </div>

        <div className="bg-cyan-100 p-6 rounded shadow border border-cyan-200">
          <h4 className="text-lg font-semibold text-cyan-800 mb-3">Instructions</h4>
          <ul className="list-decimal list-inside text-sm space-y-1">
            <li>Remplir le formulaire de subvention Sport</li>
            <li>Remplir le formulaire de subvention Culture</li>
            <li>Téléverser les pièces justificatives demandées pour chaque activité</li>
            <li>Soumettre vos formulaires une fois complétés</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3">
            Les points sont calculés automatiquement en fonction des activités que vous déclarez.<br />
            <span className="font-semibold text-red-600">Attention :</span> Une fois soumis, les formulaires ne peuvent plus être modifiés.
          </p>
        </div>
      </main>
    </div>
  );
}
