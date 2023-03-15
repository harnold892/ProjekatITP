import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = (req, res) => {
  const q = "SELECT * FROM korisnik WHERE USERNAME=?";
  db.query(q, req.body.username, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.status(409).json("Korisnik postoji");
    console.log();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO `korisnik` (`ID_KOR`, `USERNAME`, `PASSWORD`, `IME_KOR`, `PREZIME_KOR`, `TITULA_KOR`, `DATUM_KOR`, `EMAIL_KOR`, `JEL_ADMIN`) VALUES (?)";
    const values = [
      null,
      req.body.username,
      hash,
      req.body.ime,
      req.body.prezime,
      req.body.titula,
      req.body.datum,
      req.body.email,
      0,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(" Uspjesan unos");
    });
  });
};
export const registracija_admin = (req, res) => {
  const q = "SELECT * FROM prijave_admina WHERE USERNAME=?";
  db.query(q, req.body.username, (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) return res.status(409).json("Korisnik postoji");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO `prijave_admina` (`USERNAME`, `PASSWORD`, `IME_KOR`, `PREZIME_KOR`, `TITULA_KOR`, `DATUM_KOR`, `EMAIL_KOR`) VALUES (?)";
    const values = [
      req.body.username,
      hash,
      req.body.ime,
      req.body.prezime,
      req.body.titula,
      req.body.datum,
      req.body.email,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Uspjesan unos");
    });
  });
};
export const login = (req, res) => {
  const q = "SELECT * FROM korisnik WHERE USERNAME=?";
  db.query(q, req.body.username, (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) {
      return res.status(404).json("Ne postoji takav korisnik");
    }
    const isPassCor = bcrypt.compareSync(req.body.password, data[0].PASSWORD);
    if (!isPassCor) return res.status(404).json("Pogresno unijeta sifra");
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { PASSWORD, ...other } = data[0];
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};
export const getAdmin = (req, res) => {
  const q = "SELECT * FROM prijave_admina";
  db.query(q, null, (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const deleteAdmin = (req, res) => {
  const q = "DELETE FROM prijave_admina WHERE USERNAME=?";
  db.query(q, [req.params.username], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};
export const addAdmin = (req, res) => {
  const q =
    "INSERT INTO `korisnik` (`ID_KOR`, `USERNAME`, `PASSWORD`, `IME_KOR`, `PREZIME_KOR`, `TITULA_KOR`, `DATUM_KOR`, `EMAIL_KOR`, `JEL_ADMIN`) VALUES (?)";
  const values = [
    null,
    req.body.USERNAME,
    req.body.PASSWORD,
    req.body.IME_KOR,
    req.body.PREZIME_KOR,
    req.body.TITULA_KOR,
    req.body.DATUM_KOR,
    req.body.EMAIL_KOR,
    1,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json("Uspjesan unos");
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("Korisnik je izlogovan.");
};
