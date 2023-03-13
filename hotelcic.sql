-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2023 at 09:06 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(200) NOT NULL,
  `IME_KOR` varchar(20) NOT NULL,
  `PREZIME_KOR` varchar(30) NOT NULL,
  `TITULA_KOR` varchar(10) DEFAULT NULL,
  `DATUM_KOR` date NOT NULL,
  `EMAIL_KOR` varchar(30) NOT NULL,
  `JEL_ADMIN` tinyint(4) NOT NULL,
  `ID_KOR` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`USERNAME`, `PASSWORD`, `IME_KOR`, `PREZIME_KOR`, `TITULA_KOR`, `DATUM_KOR`, `EMAIL_KOR`, `JEL_ADMIN`, `ID_KOR`) VALUES
('admin', '$2b$10$hfPJ7Jn0m.lEOgYixesf0ehZqfsOce4uScVu6kQOTk2lC3iQOBrK.', 'Željko', 'Trifunović', '', '1996-12-01', 'zeljkotrifunovic9@gmail.com', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nocenja`
--

CREATE TABLE `nocenja` (
  `ID_NOCENJA` int(11) NOT NULL,
  `ID_RACUN` int(11) DEFAULT NULL,
  `ID_SOBA` int(11) DEFAULT NULL,
  `DATUM_DOLASKA` date NOT NULL,
  `DATUM_ODLASKA` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `racun`
--

CREATE TABLE `racun` (
  `ID_RACUN` int(11) NOT NULL,
  `ID_KOR` int(11) DEFAULT NULL,
  `DATUM_IZD_RACUN` datetime NOT NULL,
  `CIJENA_RACUN` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `racun_spa`
--

CREATE TABLE `racun_spa` (
  `ID_RACUN_SPA` int(11) NOT NULL,
  `ID_RACUN` int(11) DEFAULT NULL,
  `ID_SPA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `racun_sport`
--

CREATE TABLE `racun_sport` (
  `ID_RACUN_SPORT` int(11) NOT NULL,
  `ID_RACUN` int(11) DEFAULT NULL,
  `ID_SPORT` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `soba`
--

CREATE TABLE `soba` (
  `ID_SOBA` int(11) NOT NULL,
  `JEL_APARTMAN` tinyint(1) NOT NULL,
  `KAPACITET_SOBA` int(11) NOT NULL,
  `CIJENA_KM_SOBA` decimal(6,2) NOT NULL,
  `CIJENA_E_SOBA` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `soba`
--

INSERT INTO `soba` (`ID_SOBA`, `JEL_APARTMAN`, `KAPACITET_SOBA`, `CIJENA_KM_SOBA`, `CIJENA_E_SOBA`) VALUES
(1, 0, 2, '24.00', '12.00'),
(2, 1, 2, '48.00', '24.00');

-- --------------------------------------------------------

--
-- Table structure for table `spa_aktivnosti`
--

CREATE TABLE `spa_aktivnosti` (
  `ID_SPA` int(11) NOT NULL,
  `NAZIV_SPA` varchar(30) NOT NULL,
  `OPIS_SPA` varchar(200) DEFAULT NULL,
  `CIJENA_SPA` decimal(5,2) NOT NULL,
  `DATUM_POCETKA_SPA` date NOT NULL,
  `DATUM_ZAVRSETKA_SPA` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sportske_aktivnosti`
--

CREATE TABLE `sportske_aktivnosti` (
  `ID_SPORT` int(11) NOT NULL,
  `VRSTA_SPORT` varchar(30) NOT NULL,
  `KAPACITET_SPORT` int(11) NOT NULL,
  `CIJENA_SPORT` decimal(5,2) NOT NULL,
  `OPIS` varchar(200) DEFAULT NULL,
  `DATUM_POCETKA_SPORT` date NOT NULL,
  `DATUM_ZAVRSETKA_SPORT` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`ID_KOR`);

--
-- Indexes for table `nocenja`
--
ALTER TABLE `nocenja`
  ADD PRIMARY KEY (`ID_NOCENJA`),
  ADD KEY `FK_NOCENJA_RELATIONS_RACUN` (`ID_RACUN`),
  ADD KEY `FK_NOCENJA_RELATIONS_SOBA` (`ID_SOBA`);

--
-- Indexes for table `racun`
--
ALTER TABLE `racun`
  ADD PRIMARY KEY (`ID_RACUN`),
  ADD KEY `FK_RACUN_RELATIONS_KORISNIK` (`ID_KOR`);

--
-- Indexes for table `racun_spa`
--
ALTER TABLE `racun_spa`
  ADD PRIMARY KEY (`ID_RACUN_SPA`),
  ADD KEY `FK_RACUN_SP_RELATIONS_RACUN` (`ID_RACUN`),
  ADD KEY `FK_RACUN_SP_RELATIONS_SPA_AKTI` (`ID_SPA`);

--
-- Indexes for table `racun_sport`
--
ALTER TABLE `racun_sport`
  ADD PRIMARY KEY (`ID_RACUN_SPORT`),
  ADD KEY `FK_RACUN_SP_RELATIONS_RACUN1` (`ID_RACUN`),
  ADD KEY `FK_RACUN_SP_RELATIONS_SPORTSKE` (`ID_SPORT`);

--
-- Indexes for table `soba`
--
ALTER TABLE `soba`
  ADD PRIMARY KEY (`ID_SOBA`);

--
-- Indexes for table `spa_aktivnosti`
--
ALTER TABLE `spa_aktivnosti`
  ADD PRIMARY KEY (`ID_SPA`);

--
-- Indexes for table `sportske_aktivnosti`
--
ALTER TABLE `sportske_aktivnosti`
  ADD PRIMARY KEY (`ID_SPORT`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `ID_KOR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `nocenja`
--
ALTER TABLE `nocenja`
  MODIFY `ID_NOCENJA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `racun`
--
ALTER TABLE `racun`
  MODIFY `ID_RACUN` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `racun_spa`
--
ALTER TABLE `racun_spa`
  MODIFY `ID_RACUN_SPA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `racun_sport`
--
ALTER TABLE `racun_sport`
  MODIFY `ID_RACUN_SPORT` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `soba`
--
ALTER TABLE `soba`
  MODIFY `ID_SOBA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `spa_aktivnosti`
--
ALTER TABLE `spa_aktivnosti`
  MODIFY `ID_SPA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sportske_aktivnosti`
--
ALTER TABLE `sportske_aktivnosti`
  MODIFY `ID_SPORT` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nocenja`
--
ALTER TABLE `nocenja`
  ADD CONSTRAINT `FK_NOCENJA_RELATIONS_RACUN` FOREIGN KEY (`ID_RACUN`) REFERENCES `racun` (`ID_RACUN`),
  ADD CONSTRAINT `FK_NOCENJA_RELATIONS_SOBA` FOREIGN KEY (`ID_SOBA`) REFERENCES `soba` (`ID_SOBA`);

--
-- Constraints for table `racun`
--
ALTER TABLE `racun`
  ADD CONSTRAINT `FK_RACUN_RELATIONS_KORISNIK` FOREIGN KEY (`ID_KOR`) REFERENCES `korisnik` (`ID_KOR`);

--
-- Constraints for table `racun_spa`
--
ALTER TABLE `racun_spa`
  ADD CONSTRAINT `FK_RACUN_SP_RELATIONS_RACUN` FOREIGN KEY (`ID_RACUN`) REFERENCES `racun` (`ID_RACUN`),
  ADD CONSTRAINT `FK_RACUN_SP_RELATIONS_SPA_AKTI` FOREIGN KEY (`ID_SPA`) REFERENCES `spa_aktivnosti` (`ID_SPA`);

--
-- Constraints for table `racun_sport`
--
ALTER TABLE `racun_sport`
  ADD CONSTRAINT `FK_RACUN_SP_RELATIONS_RACUN1` FOREIGN KEY (`ID_RACUN`) REFERENCES `racun` (`ID_RACUN`),
  ADD CONSTRAINT `FK_RACUN_SP_RELATIONS_SPORTSKE` FOREIGN KEY (`ID_SPORT`) REFERENCES `sportske_aktivnosti` (`ID_SPORT`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
