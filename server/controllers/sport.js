import { db } from "../db.js";
export const getSport = (req, res) => {
  const q = "SELECT * FROM sportske_aktivnosti";
  db.query(q, null, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const addSport = (req, res) => {
  const q =
    "INSERT INTO `sportske_aktivnosti` (`ID_SPORT`, `VRSTA_SPORT`, `KAPACITET_SPORT`, `CIJENA_SPORT`, `OPIS`, `DATUM_POCETKA_SPORT`, `DATUM_ZAVRSETKA_SPORT`) VALUES (?)";
  const values = [
    null,
    req.body.vrsta_sport,
    req.body.kapacitet_sport,
    req.body.cijena_sport,
    req.body.opis_sport,
    req.body.datum_pocetka,
    req.body.datum_zavrsetka,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(" Uspjesan unos");
  });
};
export const updateSport = (req, res) => {};
