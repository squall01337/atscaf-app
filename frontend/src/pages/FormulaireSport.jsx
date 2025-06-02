// 🔁 Version complète avec tableau + upload + boutons de soumission
import { useState, useRef, useEffect } from "react";

const colonnes = [
  "H", "F", "Sports Loisir", "Bien-être Prof.", "Bien-être Salle", "Chpt CORPO",
  "+ de 15 licences", "- de 15 licences", "CNIF Avant 1/4", "CNIF 1/4", "CNIF 1/2 et finale",
  "Trophée 5", "Trophée 6 à 10", "Trophée >10", "Organisateur", "Participant",
  "Manif except.", "Equipes suppl.", "Compét (maxi 3)", "Activ nouv.", "Ecole sportive", "Activ.virtuelles"
];

const initColonnes = () =>
  Object.fromEntries(
    colonnes.map(c => [c, ["H", "F", "Equipes suppl.", "Compét (maxi 3)"].includes(c) ? 0 : false])
  );
  

const disciplinesRestrictions = {
  "Football": { cnif: true, trophees: false },
  "Soccer5": { cnif: false, trophees: true },
  "Rugby": { cnif: true, trophees: false },
  "Handball": { cnif: true, trophees: false },
  "Volley ball masculin": { cnif: true, trophees: false },
  "Volley ball féminin": { cnif: true, trophees: false },
  "Basket ball masculin": { cnif: true, trophees: false },
  "Basket ball féminin": { cnif: true, trophees: false },
  "Squash": { cnif: false, trophees: true },
  "Bowling": { cnif: false, trophees: true },
  "Pelote Basque": { cnif: false, trophees: false },
  "Equitation": { cnif: false, trophees: false },
  "Parachute-Parapente": { cnif: false, trophees: false },
  "Golf": { cnif: true, trophees: true },
  "Tir": { cnif: true, trophees: false },
  "Tennis Masculin": { cnif: true, trophees: false },
  "Tennis Féminin": { cnif: true, trophees: false },
  "Tennis Table": { cnif: true, trophees: false },
  "Judo": { cnif: false, trophees: false },
  "Karaté": { cnif: false, trophees: false },
  "Ski": { cnif: false, trophees: true },
  "Escalade": { cnif: false, trophees: false },
  "VTT": { cnif: false, trophees: true },
  "Cyclisme": { cnif: false, trophees: true },
  "Triathlon": { cnif: false, trophees: true },
  "Pétanque Masculine": { cnif: false, trophees: true },
  "Pétanque Féminine": { cnif: false, trophees: true },
  "Badminton": { cnif: true, trophees: true },
  "1-  Voile": { cnif: false, trophees: false },
  "2- Natation": { cnif: false, trophees: false },
  "3- Plongée": { cnif: false, trophees: false },
  "4- Canoé / kayak": { cnif: false, trophees: false },
  "1- Course à pied": { cnif: false, trophees: true }
};

const lignesApresCourseAPied = [
  "Karting", "Billard", "Musculation", "Tir à l'arc", "", "Escrime", "Paddle", "Roller", "Raquettes", "Echecs", "Autres"
];

const lignesInitiales = [
  { nom: "Manifestation Nationale", colonnes: Object.fromEntries(colonnes.map(c => [c, c === "Organisateur" ? 0 : null])) },
  { nom: "Coupe Régionale", colonnes: Object.fromEntries(colonnes.map(c => [c, ["Organisateur", "Participant"].includes(c) ? false : null])) },

  // Disciplines classiques
  { nom: "Football", colonnes: initColonnes() },
  { nom: "Soccer5", colonnes: initColonnes() },
  { nom: "Rugby", colonnes: initColonnes() },
  { nom: "Handball", colonnes: initColonnes() },
  { nom: "Volley Ball Masculin", colonnes: initColonnes() },
  { nom: "Volley Ball Féminin", colonnes: initColonnes() },
  { nom: "Basket Ball Masculin", colonnes: initColonnes() },
  { nom: "Basket Ball Féminin", colonnes: initColonnes() },
  { nom: "Squash", colonnes: initColonnes() },
  { nom: "Bowling", colonnes: initColonnes() },
  { nom: "Pelote Basque", colonnes: initColonnes() },
  { nom: "Equitation", colonnes: initColonnes() },
  { nom: "Parachute-Parapente", colonnes: initColonnes() },
  { nom: "Golf", colonnes: initColonnes() },
  { nom: "Tir", colonnes: initColonnes() },
  { nom: "Tennis Masculin", colonnes: initColonnes() },
  { nom: "Tennis Féminin", colonnes: initColonnes() },
  { nom: "Tennis Table", colonnes: initColonnes() },
  { nom: "Judo", colonnes: initColonnes() },
  { nom: "Karaté", colonnes: initColonnes() },
  { nom: "Ski", colonnes: initColonnes() },
  { nom: "Escalade", colonnes: initColonnes() },
  { nom: "VTT", colonnes: initColonnes() },
  { nom: "Cyclisme", colonnes: initColonnes() },
  { nom: "Triathlon", colonnes: initColonnes() },
  { nom: "Pétanque Masculine", colonnes: initColonnes() },
  { nom: "Pétanque Féminine", colonnes: initColonnes() },
  { nom: "Badminton", colonnes: initColonnes() },

  // Catégories
  { nom: "Sports Nautiques", colonnes: Object.fromEntries(colonnes.map(c => [c, null])), categorie: true },
  { nom: "1-  Voile", colonnes: initColonnes() },
  { nom: "2- Natation", colonnes: initColonnes() },
  { nom: "3- Plongée", colonnes: initColonnes() },
  { nom: "4- Canoé / kayak", colonnes: initColonnes() },

  { nom: "Athlétisme", colonnes: Object.fromEntries(colonnes.map(c => [c, null])), categorie: true },
  { nom: "1- Course à pied", colonnes: initColonnes() },

  { nom: "Karting", colonnes: initColonnes() },
  { nom: "Billard", colonnes: initColonnes() },
  { nom: "Musculation", colonnes: initColonnes() },
  { nom: "Tir à l'arc", colonnes: initColonnes() },

  // Bien-être (catégories + lignes éditables)
  { nom: "Bien être", colonnes: Object.fromEntries(colonnes.map(c => [c, null])), categorie: true },
  { nom: "NATURE", colonnes: Object.fromEntries(colonnes.map(c => [c, null])), categorie: true },
  { nom: "", colonnes: initColonnes(), editable: true },
  { nom: "", colonnes: initColonnes(), editable: true },

  { nom: "AQUATIQUE", colonnes: Object.fromEntries(colonnes.map(c => [c, null])), categorie: true },
  { nom: "", colonnes: initColonnes(), editable: true },
  { nom: "", colonnes: initColonnes(), editable: true },

  { nom: "GYMNIQUE", colonnes: Object.fromEntries(colonnes.map(c => [c, null])), categorie: true },
  { nom: "", colonnes: initColonnes(), editable: true },
  { nom: "", colonnes: initColonnes(), editable: true },
  { nom: "", colonnes: initColonnes(), editable: true },
  { nom: "", colonnes: initColonnes(), editable: true },
  { nom: "", colonnes: initColonnes(), editable: true },

  { nom: "Autres activités", colonnes: Object.fromEntries(colonnes.map(c => [c, null])), categorie: true },
  { nom: "Escrime", colonnes: initColonnes() },
  { nom: "Paddle", colonnes: initColonnes() },
  { nom: "Roller", colonnes: initColonnes() },
  { nom: "Raquettes", colonnes: initColonnes() },
  { nom: "Echecs", colonnes: initColonnes() },
  { nom: "Autres", colonnes: initColonnes() }
];

export default function FormulaireSport() {
  const [data, setData] = useState(lignesInitiales);
  const [fichiers, setFichiers] = useState([]);
  const [fichierTemp, setFichierTemp] = useState(null);
  const [descriptionTemp, setDescriptionTemp] = useState("");
  const [etatFormulaire, setEtatFormulaire] = useState("brouillon");
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef();

  const toggleCheckbox = (i, col) => {
    const copy = [...data];
    copy[i].colonnes[col] = !copy[i].colonnes[col];
    setData(copy);
  };

  const updateNumber = (i, col, value) => {
    const copy = [...data];
    copy[i].colonnes[col] = value;
    setData(copy);
  };

  const [lignesActives, setLignesActives] = useState([]);

  const isDisabled = (row, col, i) => {
    if (row.categorie) return true;
    if (!lignesActives.includes(i)) return true;
    if (row.nom === "Manifestation Nationale") return col !== "Organisateur";
    if (row.nom === "Coupe Régionale") return !["Organisateur", "Participant"].includes(col);
    if (["Organisateur", "Participant"].includes(col)) return true;
    if (["Bien-être Prof.", "Bien-être Salle"].includes(col) && !row.editable) return true;

    const isCNIF = ["CNIF Avant 1/4", "CNIF 1/4", "CNIF 1/2 et finale"].includes(col);
    const isTrophee = ["Trophée 5", "Trophée 6 à 10", "Trophée >10"].includes(col);

    if (row.nom in disciplinesRestrictions) {
      if (isCNIF && !disciplinesRestrictions[row.nom].cnif) return true;
      if (isTrophee && !disciplinesRestrictions[row.nom].trophees) return true;
    } else if (lignesApresCourseAPied.includes(row.nom) || row.editable) {
      if (isCNIF || isTrophee) return true;
    }

    return false;
  };

const calculerPoints = (row, i) => {
  // Vérification ligne active
  if (!lignesActives.includes(i)) return 0;

  let points = 0;

  // 1. Calcul des points spéciaux selon le type
  points += calculerPointsSpeciaux(row);

  // 2. Calcul des points de championnat CORPO
  points += calculerPointsCorpo(row);

  // 3. Calcul des points standards
  points += calculerPointsStandards(row);

  return points;
};

// Fonctions auxiliaires pour une meilleure lisibilité

const calculerPointsSpeciaux = (row) => {
  const { nom, colonnes } = row;
  
  if (nom === "Manifestation Nationale") {
    return Math.min(colonnes["Organisateur"] || 0, 3) * 15;
  }
  
  if (nom === "Coupe Régionale") {
    let pts = 0;
    if (colonnes["Organisateur"]) pts += 15;
    if (colonnes["Participant"]) pts += 2;
    return pts;
  }
  
  return 0;
};

const calculerPointsCorpo = (row) => {
  if (!row.colonnes["Chpt CORPO"]) return 0;

  const valeursCorpo = {
    "Football": 9, "Soccer5": 8, "Rugby": 9, "Handball": 8,
    "Volley Ball Masculin": 8, "Volley Ball Féminin": 8,
    "Basket Ball Masculin": 8, "Basket Ball Féminin": 8,
    "Squash": 7, "Bowling": 7, "Pelote Basque": 7, "Equitation": 7,
    "Parachute-Parapente": 7, "Golf": 7, "Tir": 7, "Tennis Masculin": 7,
    "Tennis Féminin": 7, "Tennis Table": 6, "Judo": 6, "Karaté": 6,
    "Ski": 6, "Escalade": 0, "VTT": 6, "Cyclisme": 6, "Triathlon": 6,
    "Pétanque Masculine": 5, "Pétanque Féminine": 5, "Badminton": 6,
    "1-  Voile": 6, "2- Natation": 6, "3- Plongée": 6, "4- Canoé / kayak": 6,
    "1- Course à pied": 5, "Karting": 0, "Billard": 5, "Musculation": 0,
    "Tir à l'arc": 5, "Escrime": 5, "Paddle": 0, "Roller": 0,
    "Raquettes": 0, "Echecs": 0, "Autres": 0
  };

  const nom = row.nom.trim();
  
  // Ligne vide éditable (bien-être)
  if (nom === "" && row.editable) return 6;
  
  // Discipline connue
  if (valeursCorpo[nom] !== undefined) return valeursCorpo[nom];
  
  // Ligne bien-être éditable
  if (row.editable) return 6;
  
  return 0;
};

const calculerPointsStandards = (row) => {
  const { colonnes } = row;
  let pts = 0;

  // Points de participation
  if (colonnes["Sports Loisir"]) pts += 1;
  if (colonnes["+ de 15 licences"]) pts += 5;
  if (colonnes["- de 15 licences"]) pts += 2;

  // Points CNIF
  if (colonnes["CNIF Avant 1/4"]) pts += 1;
  if (colonnes["CNIF 1/4"]) pts += 3;
  if (colonnes["CNIF 1/2 et finale"]) pts += 5;

  // Points Trophée
  if (colonnes["Trophée 5"]) pts += 1;
  if (colonnes["Trophée 6 à 10"]) pts += 3;
  if (colonnes["Trophée >10"]) pts += 5;

  // Manifestation exceptionnelle
  if (colonnes["Manif except."]) pts += 10;

  // Équipes et compétitions (max 3 chacune)
  const equipesSupp = Math.min(parseInt(colonnes["Equipes suppl."]) || 0, 3);
  const competitions = Math.min(parseInt(colonnes["Compét (maxi 3)"]) || 0, 3);
  pts += equipesSupp + competitions;

  // Bonus activités
  if (colonnes["Activ nouv."]) pts += 3;
  if (colonnes["Ecole sportive"]) pts += 3;
  if (colonnes["Activ.virtuelles"]) pts += 1;

  return pts;
};

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFichierTemp(file);
      setShowModal(true);
    }
  };

  const ajouterFichier = () => {
    const now = new Date();
    setFichiers(prev => [
      ...prev,
      {
        nom: fichierTemp.name,
        taille: fichierTemp.size,
        date: now.toLocaleString(),
        description: descriptionTemp
      }
    ]);
    setFichierTemp(null);
    setDescriptionTemp("");
    setShowModal(false);
  };

  const supprimerFichier = (index) => {
    setFichiers(prev => prev.filter((_, i) => i !== index));
  };

  const handleSoumission = (statut) => {
    setEtatFormulaire(statut);
    alert(
      statut === "soumis"
        ? "Formulaire envoyé définitivement. Vous ne pourrez plus le modifier."
        : "Brouillon sauvegardé. Vous pourrez revenir dessus plus tard."
    );
  };

  useEffect(() => {
  const style = document.createElement('style');
  style.innerHTML = `
    .hover-col td[data-col]:hover,
    .hover-col th[data-col]:hover,
    .hover-col td[data-col].hovered,
    .hover-col th[data-col].hovered {
      background-color: #fef9c3;
    }
  `;
  document.head.appendChild(style);
  return () => style.remove();
}, []); 

  return (
    <div className="p-6 max-w-[1850px] mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Formulaire Subvention Sport</h1>

      {/* ✅ Tableau de subvention */}
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] bg-white border border-gray-300 rounded shadow-md">
        <table className="hover-col w-full text-sm text-gray-800 border-separate border-spacing-0">
          <thead className="sticky top-0 z-20 bg-white text-[13px] text-center border border-gray-400 shadow-md">
  <tr>
    <th rowSpan={2} className="border border-gray-400 w-[160px]">Discipline</th>
    <th colSpan={2} className="border border-gray-400">Sportifs</th>
    <th rowSpan={2} className="border border-gray-400">Sports Loisir</th>
    <th colSpan={2} className="border border-gray-400">Bien-être</th>
    <th rowSpan={2} className="border border-gray-400">Chpt CORPO</th>
    <th rowSpan={2} className="border border-gray-400">+15 licences</th>
    <th rowSpan={2} className="border border-gray-400">-15 licences</th>
    <th colSpan={3} className="border border-gray-400">CNIF</th>
    <th colSpan={3} className="border border-gray-400">Trophées</th>
    <th rowSpan={2} className="border border-gray-400">Organisateur</th>
    <th rowSpan={2} className="border border-gray-400">Participant</th>
    <th rowSpan={2} className="border border-gray-400">Manif except.</th>
    <th rowSpan={2} className="border border-gray-400">Équipes sup. (maxi 3)</th>
    <th rowSpan={2} className="border border-gray-400">Compét (maxi 3)</th>
    <th rowSpan={2} className="border border-gray-400">Activ nouv.</th>
    <th rowSpan={2} className="border border-gray-400">Ecole sportive</th>
    <th rowSpan={2} className="border border-gray-400">Activ.virtuelles</th>
    <th rowSpan={2} className="border border-gray-400">Total</th>
  </tr>
  <tr>
    <th className="border border-gray-400">H</th>
    <th className="border border-gray-400">F</th>
    <th className="border border-gray-400">Prof.</th>
    <th className="border border-gray-400">Salle</th>
    <th className="border border-gray-400">Avant 1/4</th>
    <th className="border border-gray-400">1/4</th>
    <th className="border border-gray-400">1/2 et finale</th>
    <th className="border border-gray-400">5</th>
    <th className="border border-gray-400">6 à 10</th>
    <th className="border border-gray-400">&gt;10</th>
  </tr>
</thead>
          <tbody
  onMouseOver={(e) => {
    const col = e.target.getAttribute("data-col");
    if (col !== null) {
      document.querySelectorAll(`[data-col="${col}"]`).forEach((el) =>
        el.classList.add("hovered")
      );
    }
  }}
  onMouseOut={(e) => {
    const col = e.target.getAttribute("data-col");
    if (col !== null) {
      document.querySelectorAll(`[data-col="${col}"]`).forEach((el) =>
        el.classList.remove("hovered")
      );
    }
  }}
>
  {data.map((row, i) => {
    const isActive = lignesActives.includes(i);
    const ligneClasses = row.categorie
      ? "bg-gray-300 text-gray-700"
      : isActive
      ? "bg-green-100"
      : "even:bg-white odd:bg-gray-50";

    return (
      <tr key={i} className={ligneClasses}>
        <td
          onClick={() => {
            if (!row.categorie) {
              setLignesActives((prev) =>
                prev.includes(i)
                  ? prev.filter((x) => x !== i)
                  : [...prev, i]
              );
            }
          }}
          className={`cursor-pointer font-medium sticky left-0 z-10 border ${
            row.categorie ? "bg-gray-300" : isActive ? "bg-green-100" : "bg-white hover:bg-gray-100"
          }`}
        >
          {row.categorie ? (
            <strong>{row.nom}</strong>
          ) : row.editable ? (
            <input
              type="text"
              value={row.nom}
              onChange={(e) => {
                const copy = [...data];
                copy[i].nom = e.target.value;
                setData(copy);
              }}
              className="w-full px-2 py-1 border text-sm"
              placeholder="Nom de la discipline"
            />
          ) : (
            row.nom
          )}
        </td>

        {colonnes.map((col, j) => (
          <td
            key={j}
            data-col={j}
            className={`border text-center ${isDisabled(row, col, i) ? "bg-gray-200" : ""}`}
          >
            {!isDisabled(row, col, i) ? (
              typeof row.colonnes[col] === "number" ? (
                <input
                  type="number"
                  min={0}
                  max={
                    (row.nom === "Manifestation Nationale" && col === "Organisateur") ||
                    ["Equipes suppl.", "Compét (maxi 3)"].includes(col)
                      ? 3
                      : undefined
                  }
                  value={row.colonnes[col]}
                  onChange={(e) =>
                    updateNumber(i, col, parseInt(e.target.value) || 0)
                  }
                  className="w-14 text-xs border px-1 text-right"
                />
              ) : (
                <input
                  type="checkbox"
                  checked={row.colonnes[col] || false}
                  onChange={() => toggleCheckbox(i, col)}
                />
              )
            ) : null}
          </td>
        ))}

        <td className="border text-center font-bold text-gray-800">
          {!row.categorie ? calculerPoints(row, i) : ""}
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>

      {/* ✅ Fichiers justificatifs */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Pièces justificatives</h2>
        <p className="text-sm text-gray-600 mb-4">Téléversez vos fichiers (licences, factures…)</p>

        <div
          className="border-2 border-dashed border-gray-300 p-6 text-center rounded-xl cursor-pointer hover:border-gray-500"
          onClick={() => fileInputRef.current.click()}
        >
          <p className="text-gray-600">Cliquez ou glissez-déposez vos fichiers ici</p>
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
        </div>

        {fichiers.length > 0 && (
          <table className="mt-6 w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th>Nom</th><th>Taille</th><th>Date</th><th>Description</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fichiers.map((f, i) => (
                <tr key={i} className="even:bg-white odd:bg-gray-50">
                  <td>{f.nom}</td>
                  <td>{(f.taille / 1024).toFixed(1)} Ko</td>
                  <td>{f.date}</td>
                  <td>{f.description}</td>
                  <td className="text-center">
                    <button onClick={() => supprimerFichier(i)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Modal description */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Description du fichier</h3>
            <textarea
              value={descriptionTemp}
              onChange={(e) => setDescriptionTemp(e.target.value)}
              placeholder="Décrivez ce fichier..."
              className="w-full border rounded px-3 py-2 min-h-[100px]"
            />
            <div className="flex justify-end mt-4 gap-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-200 px-4 py-2 rounded">Annuler</button>
              <button onClick={ajouterFichier} className="bg-blue-600 text-white px-4 py-2 rounded">Téléverser</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Boutons de soumission */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          Statut actuel :
          <span className={`ml-2 font-semibold ${etatFormulaire === "soumis" ? "text-green-700" : "text-yellow-700"}`}>
            {etatFormulaire === "soumis" ? "Envoyé définitivement" : "Brouillon"}
          </span>
        </p>
        <div className="flex gap-4">
          <button onClick={() => handleSoumission("brouillon")} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Enregistrer en brouillon
          </button>
          <button onClick={() => handleSoumission("soumis")} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Envoyer définitivement
          </button>
        </div>
      </div>
    </div>
  );
}