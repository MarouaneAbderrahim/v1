import { promesseConnexion } from "./connexion.js";
import { hash } from "bcrypt";

export const addUtilisateur = async (
  prenom,
  nom,
  courriel_utilisateur,
  motDePasse
) => {
  let connexion = await promesseConnexion;

  let motDePasseHash = await hash(motDePasse, 10);

  await connexion.run(
    `INSERT INTO utilisateur (id_type_utilisateur,courriel, mot_passe, prenom, nom) 
        VALUES (1, ?, ? , ?, ?)`,
    [courriel_utilisateur, motDePasseHash, prenom, nom]
  );
};

export const getUtilisateurByNom = async (courriel_utilisateur) => {
  let connexion = await promesseConnexion;

  let utilisateur = await connexion.get(
    `SELECT id_type_utilisateur , id_utilisateur, courriel, mot_passe, prenom , nom
        FROM utilisateur
        WHERE courriel = ?`,
    [courriel_utilisateur]
  );

  return utilisateur;
};

export async function getUtilisateurById(id_utilisateur) {
  let db = await promesseConnexion;
  let utilisateur = await db.all("SELECT * FROM utilisateur");
  return utilisateur;
}
