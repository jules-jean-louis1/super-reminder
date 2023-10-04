-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 03 oct. 2023 à 11:29
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `superreminder`
--

-- --------------------------------------------------------

--
-- Structure de la table `list`
--

DROP TABLE IF EXISTS `list`;
CREATE TABLE IF NOT EXISTS `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `users_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `list`
--

INSERT INTO `list` (`id`, `name`, `users_id`) VALUES
(11, '1er Test Modif', 1),
(8, 'v20', 1),
(3, 'Test', 1),
(4, '3e task', 1),
(5, '4e liste', 1),
(12, '1er list', 6),
(13, '2e liste', 6);

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `users_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `name`, `users_id`, `created_at`) VALUES
(1, 'todo', 1, '2023-09-26 10:43:55'),
(2, 'Form', 1, '2023-09-26 15:01:21'),
(3, 'Test', 1, '2023-09-27 13:48:19'),
(4, 'reminder', 6, '2023-09-28 13:53:02');

-- --------------------------------------------------------

--
-- Structure de la table `tags_list`
--

DROP TABLE IF EXISTS `tags_list`;
CREATE TABLE IF NOT EXISTS `tags_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `tags_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `tags_list`
--

INSERT INTO `tags_list` (`id`, `task_id`, `tags_id`) VALUES
(1, 7, 1),
(2, 7, 3),
(3, 0, 1);

-- --------------------------------------------------------

--
-- Structure de la table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `status` varchar(255) NOT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `list_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `task`
--

INSERT INTO `task` (`id`, `name`, `description`, `status`, `start`, `end`, `priority`, `created_at`, `updated_at`, `users_id`, `list_id`) VALUES
(2, 'Course', 'liste de choses manquante', 'done', '2023-09-21 00:00:00', '2023-09-22 00:00:00', NULL, '2023-09-20 23:19:40', '2023-09-29 09:54:20', 1, 3),
(3, 'Finir todolist', 'Faire une description optionnel.', 'inprogress', NULL, NULL, 1, '2023-09-21 10:58:58', NULL, 1, NULL),
(4, 'Test reminder sans descro', NULL, 'done', NULL, NULL, NULL, '2023-09-21 11:21:25', NULL, 1, 5),
(5, 'ttes', NULL, 'todo', '2023-09-26 14:06:00', '2023-09-27 14:08:00', NULL, '2023-09-22 13:08:08', NULL, 1, NULL),
(6, 'V2.5', NULL, 'todo', NULL, NULL, NULL, '2023-09-25 15:53:09', NULL, 1, 5),
(7, 'Test Avec Tags', 'Version 1', 'inprogress', NULL, NULL, NULL, '2023-09-27 16:26:57', '2023-09-29 11:43:12', 1, NULL),
(8, 'add to todo tags', NULL, 'todo', NULL, NULL, NULL, '2023-09-27 16:33:41', NULL, 1, NULL),
(9, 'add to todo tags', NULL, 'todo', NULL, NULL, NULL, '2023-09-27 16:34:27', NULL, 1, NULL),
(10, 'toto', NULL, 'todo', NULL, NULL, NULL, '2023-09-27 16:41:49', '2023-09-29 11:48:43', 1, NULL),
(11, 'toto2', NULL, 'inprogress', NULL, NULL, NULL, '2023-09-27 16:48:40', '2023-09-29 11:24:35', 1, NULL),
(12, 'test', NULL, 'inprogress', NULL, NULL, NULL, '2023-09-28 12:25:33', '2023-10-03 12:30:50', 6, 13);

-- --------------------------------------------------------

--
-- Structure de la table `task_users`
--

DROP TABLE IF EXISTS `task_users`;
CREATE TABLE IF NOT EXISTS `task_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `task_users`
--

INSERT INTO `task_users` (`id`, `task_id`, `users_id`, `created_at`, `updated_at`) VALUES
(1, 2, 3, '2023-09-21 13:19:51', NULL),
(15, 12, 1, '2023-09-28 12:25:45', NULL),
(4, 2, 2, '2023-09-22 11:53:16', NULL),
(5, 2, 3, '2023-09-22 11:53:16', NULL),
(6, 2, 2, '2023-09-22 11:53:17', NULL),
(7, 2, 3, '2023-09-22 11:53:17', NULL),
(8, 2, 3, '2023-09-22 11:57:18', NULL),
(9, 2, 2, '2023-09-22 11:59:46', NULL),
(10, 2, 3, '2023-09-22 11:59:46', NULL),
(11, 2, 3, '2023-09-22 12:03:32', NULL),
(12, 2, 2, '2023-09-22 12:16:34', NULL),
(13, 2, 3, '2023-09-22 12:16:34', NULL),
(14, 2, 2, '2023-09-22 12:18:15', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `email` varchar(319) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `droits` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `login`, `email`, `firstname`, `lastname`, `droits`, `password`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'Vendor', 'jules@gmail.com', 'Jules', 'Jean', 'user', '$2y$10$M7GcMVa03512taQ2rh2.u.jIEptwznqBsoNrbI6vh8Tt5OTS9rix.', '27e36f-Vendor.png', '2023-09-18 16:04:43', '2023-09-27 11:03:12'),
(2, 'User1', 'user1@gmail.com', 'User', 'Une', 'user', '$2y$10$.pVz9MvuNuTyz9NKqm1V1eHC.ipBcuMt7HoxznLoRpOec46r6ZLq.', 'f4f4e4-User1.png', '2023-09-18 16:20:41', NULL),
(3, 'Papaye', 'Papaye@gmail.com', 'Pap', 'Aye', 'user', '$2y$10$hGRanoUWGbfOX6XW7MtSjeJ8fYYj1dXzzaSmTUWHJxmjelNVXrxYW', '4b6f8d-Papaye.png', '2023-09-18 18:32:42', NULL),
(4, 'Super', 'super@gmail.com', 'Super', 'Per', 'user', '$2y$10$O4hgf7e6GfjQ17BQWaSpkOlUUnxWrO5/DZdHF7hU83X5E2hVLOkYe', '9d499b-Super.png', '2023-09-28 11:45:50', NULL),
(5, 'Papaye4', 'jules2@gmail.com', 'Paul', 'Nope', 'user', '$2y$10$jyot0KQUR/zJOCNvdWZrGOStSZE.Y6JLuVMZi2JLvmh80j2aZX4uC', 'a86938-Papaye4.png', '2023-09-28 11:51:13', NULL),
(6, 'Mangue', 'paulpaulo@gmail.com', 'Phy', 'Doe', 'user', '$2y$10$gUifGfFzMHXqEtxdo2e7keVhoCLCMIri2b8k8FefYqDsl3FF8Uh4i', '92a447-Mangue.png', '2023-09-28 12:08:45', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
