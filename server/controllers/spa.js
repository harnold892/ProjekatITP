import { db } from "../db.js";
export const getSpa = (req, res) => {
  const q = "SELECT * FROM spa_aktivnosti";
  db.query(q, null, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

export const addSpa = (req, res) => {
  const q =
    "INSERT INTO `spa_aktivnosti` (`ID_SPA`, `NAZIV_SPA`, `OPIS_SPA`, `CIJENA_SPA`, `DATUM_POCETKA_SPA`, `DATUM_ZAVRSETKA_SPA`) VALUES (?)";
  const values = [
    null,
    req.body.naziv_spa,
    req.body.opis_spa,
    req.body.cijena_spa,
    req.body.datum_pocetka,
    req.body.datum_zavrsetka,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(" Uspjesan unos");
  });
};
export const updateSpa = (req, res) => {};
