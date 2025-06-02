import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { identifiant, motDePasse } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM atscaf_users WHERE identifiant = $1',
      [identifiant]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Identifiant invalide.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(motDePasse, user.mot_de_passe);

    if (!match) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    res.json({
      message: 'Connexion réussie',
      userId: user.id,
      nom: user.nom_atscaf,
      doitChangerMdp: user.doit_changer_mdp
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

router.post('/changer-mdp', async (req, res) => {
  const { userId, nouveauMotDePasse } = req.body;

  if (!userId || !nouveauMotDePasse || nouveauMotDePasse.length < 6) {
    return res.status(400).json({ message: 'Requête invalide.' });
  }

  try {
    const hash = await bcrypt.hash(nouveauMotDePasse, 10);

    await pool.query(
      'UPDATE atscaf_users SET mot_de_passe = $1, doit_changer_mdp = FALSE WHERE id = $2',
      [hash, userId]
    );

    res.json({ message: 'Mot de passe mis à jour.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

export default router;