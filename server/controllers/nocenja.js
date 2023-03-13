import { db } from "../db.js";

export const getNocenja = (req, res) => {
  const q = "SELECT MAX(ID_SOBA) AS max_soba FROM soba";
  db.query(q, null, (err, data) => {
    if (err) return res.send(err);
    if (data.length === 0) {
      return res.status(404).json("Nesta nije u redu sa MAX sql naredbom");
    }
    var id_soba = data[0].max_soba;

    const datumDolaskaIzabran = new Date(req.params.dolazak);
    const datumOdlaskaIzabran = new Date(req.params.odlazak);
    datumDolaskaIzabran.setHours(0, 0, 0, 0);
    datumOdlaskaIzabran.setHours(0, 0, 0, 0);
    const IDs = [];

    while (id_soba > 0) {
      const q1 =
        "SELECT ID_SOBA,DATUM_DOLASKA,DATUM_ODLASKA FROM nocenja WHERE ID_SOBA=?";
      var id = id_soba;

      db.query(q1, [id], (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) {
          IDs.push(data[0].ID_SOBA);
        }
        var flag = 0;
        data.forEach((element) => {
          var datumDolaskaBaza = new Date(element.DATUM_DOLASKA);
          var datumOdlaskaBaza = new Date(element.DATUM_ODLASKA);
          datumDolaskaBaza.setHours(0, 0, 0, 0);
          datumOdlaskaBaza.setHours(0, 0, 0, 0);
          if (
            datumDolaskaBaza <= datumOdlaskaIzabran &&
            datumOdlaskaBaza >= datumDolaskaIzabran
          ) {
            flag = 1;
          }
        });
        if (flag === 0) {
          IDs.push(data[0].ID_SOBA);
        }
        if (data[0].ID_SOBA === 1) {
          const q2 = "SELECT * FROM soba WHERE ID_SOBA in (?) ORDER BY ID_SOBA";
          db.query(q2, [IDs], (err, data) => {
            if (err) return res.send(err);
            return res.status(200).json(data);
          });
        }
      });

      id_soba = id_soba - 1;
    }
  });
};
export const getNocenjaAdmin = (req, res) => {
  const q = "SELECT * FROM soba";
  db.query(q, null, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
