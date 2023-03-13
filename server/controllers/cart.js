import { db } from "../db.js";

export const addNocenje = (req, res) => {
  const q = "SELECT MAX(ID_RACUN) AS max_racun FROM racun";
  db.query(q, null, (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json("Nesta nije u redu sa MAX sql naredbom");
    }
    const values = [];
    const id_rac = data[0].max_racun;
    const q1 =
      "INSERT INTO `nocenja` (`ID_NOCENJA`, `ID_RACUN`, `ID_SOBA`,`DATUM_DOLASKA`,`DATUM_ODLASKA`) VALUES ?";
    req.body.forEach((element) => {
      values.push([
        null,
        id_rac,
        element.ID_SOBA,
        element.DATUM_DOLASKA,
        element.DATUM_ODLASKA,
      ]);
    });
    db.query(q1, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(" Uspjesan unos");
    });
  });
};
export const addSport = (req, res) => {
  const q = "SELECT MAX(ID_RACUN) AS max_racun FROM racun";
  db.query(q, null, (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json("Nesta nije u redu sa MAX sql naredbom");
    }
    const values = [];
    const valuesID = [];
    const id_rac = data[0].max_racun;
    const q1 =
      "INSERT INTO `racun_sport` (`ID_RACUN_SPORT`, `ID_RACUN`, `ID_SPORT`) VALUES ?";
    const q2 =
      "UPDATE sportske_aktivnosti SET KAPACITET_SPORT=KAPACITET_SPORT-1 WHERE ID_SPORT=?";
    req.body.forEach((element) => {
      values.push([null, id_rac, element.ID_SPORT]);
      db.query(q2, [element.ID_SPORT], (err, data) => {
        if (err) return res.json(err);
      });
    });

    db.query(q1, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(" Uspjesan unos");
    });
  });
};
export const addSpa = (req, res) => {
  const q = "SELECT MAX(ID_RACUN) AS max_racun FROM racun";
  db.query(q, null, (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json("Nesta nije u redu sa MAX sql naredbom");
    }
    const values = [];
    const id_rac = data[0].max_racun;
    const q1 =
      "INSERT INTO `racun_spa` (`ID_RACUN_SPA`, `ID_RACUN`, `ID_SPA`) VALUES ?";
    req.body.forEach((element) => {
      values.push([null, id_rac, element.ID_SPA]);
    });
    db.query(q1, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(" Uspjesan unos");
    });
  });
};
export const addRacun = (req, res) => {
  const q =
    "INSERT INTO `racun` (`ID_RACUN`, `ID_KOR`, `DATUM_IZD_RACUN`, `CIJENA_RACUN`) VALUES (?)";
  const values = [null, req.body.id_kor, req.body.datum, req.body.cijena_rac];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(" Uspjesan unos");
  });
};
