import { db } from "../db.js";
export const getSport = (req, res) => {
  const q =
    "SELECT USERNAME,IME_KOR,PREZIME_KOR,DATUM_IZD_RACUN FROM korisnik JOIN racun ON korisnik.ID_KOR=racun.ID_KOR JOIN racun_sport ON racun.ID_RACUN=racun_sport.ID_RACUN WHERE racun_sport.ID_SPORT=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const getSpa = (req, res) => {
  const q =
    "SELECT USERNAME,IME_KOR,PREZIME_KOR,DATUM_IZD_RACUN FROM korisnik JOIN racun ON korisnik.ID_KOR=racun.ID_KOR JOIN racun_spa ON racun.ID_RACUN=racun_spa.ID_RACUN WHERE racun_spa.ID_SPA=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const getNocenja = (req, res) => {
  const q =
    "SELECT USERNAME,IME_KOR,PREZIME_KOR,DATUM_IZD_RACUN,DATUM_DOLASKA,DATUM_ODLASKA FROM korisnik JOIN racun ON korisnik.ID_KOR=racun.ID_KOR JOIN nocenja ON racun.ID_RACUN=nocenja.ID_RACUN WHERE nocenja.ID_SOBA=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
