-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 11 2023 г., 08:14
-- Версия сервера: 10.1.44-MariaDB
-- Версия PHP: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `multi`
--

-- --------------------------------------------------------

--
-- Структура таблицы `planner_avatar_object`
--

CREATE TABLE `planner_avatar_object` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `catalog_id` bigint(20) UNSIGNED NOT NULL,
  `style_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_es` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_fr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_ja` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_ar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_de` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_hi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_ms` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_pt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_he` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption_zh` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rotation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_idx` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_glb` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_preview1` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/default-preview.jpg',
  `url_preview2` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/default-preview.webp',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `planner_avatar_object`
--

INSERT INTO `planner_avatar_object` (`id`, `catalog_id`, `style_id`, `brand_id`, `caption`, `caption_en`, `caption_es`, `caption_fr`, `caption_ja`, `caption_ar`, `caption_de`, `caption_hi`, `caption_ms`, `caption_pt`, `caption_he`, `caption_zh`, `article`, `location`, `rotation`, `url_idx`, `url_glb`, `url_preview1`, `url_preview2`, `created`, `updated`) VALUES
(1, 1000033, 1, 1, '1234', '', '', '', '', '', '', '', '', '', '', '', '1234', '{\"x\": 0, \"y\": 0, \"z\": 0}', '{\"x\":\"0\",\"y\":\"1.5882496193148399\",\"z\":\"0\"}', 'MIkqD4GMN0uafwuF', '/avatar/cube.glb', '/default-preview.jpg', '/default-preview.webp', '2022-10-17 14:53:47', '2023-01-11 05:13:21'),
(2, 1000033, 1, 1, '111', '', '', '', '', '', '', '', '', '', '', '', '111', '{\"x\": 100, \"y\": 0, \"z\": 0}', '{\"x\":\"0\",\"y\":\"0.5061454830783556\",\"z\":\"0\"}', 'KxBQ4NyntsHREv6j', '/avatar/cube4.glb', '/default-preview.jpg', '/default-preview.webp', '2022-10-17 14:53:56', '2023-01-11 05:13:05');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `planner_avatar_object`
--
ALTER TABLE `planner_avatar_object`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url_idx` (`url_idx`),
  ADD KEY `catalog_id` (`catalog_id`),
  ADD KEY `style_id` (`style_id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `planner_avatar_object`
--
ALTER TABLE `planner_avatar_object`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
