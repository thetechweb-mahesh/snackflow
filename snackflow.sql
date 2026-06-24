-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2026 at 09:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `snackflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `shop_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Burger', 1, '2026-06-04 07:26:50', '2026-06-04 07:26:50'),
(2, 1, 'Pizza', 1, '2026-06-04 07:27:29', '2026-06-04 07:27:29'),
(3, 1, 'Drinks', 1, '2026-06-04 07:27:38', '2026-06-04 07:27:38'),
(4, 1, 'Coffee', 1, '2026-06-04 07:27:46', '2026-06-04 08:22:26');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `shop_id`, `name`, `phone`, `email`, `address`, `created_at`, `updated_at`) VALUES
(1, 1, 'Mahesh kr29 updated', '9540260734', 'maheshkr29@example.com', 'H no 517, Gali no 3 mukundpur part 2, H no 517, Gali no 3 mukundpur part 2', '2026-06-06 08:11:30', '2026-06-06 08:11:41'),
(2, 1, 'Mukesh', '9540260734', 'thetechweb1992@gmail.com', 'H no 517, Gali no 3 mukundpur part 2', '2026-06-06 22:12:08', '2026-06-06 22:12:08');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) UNSIGNED NOT NULL,
  `expense_category_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `expense_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `shop_id`, `expense_category_id`, `amount`, `notes`, `expense_date`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 810.00, 'Note Gas  800', '2026-06-06', '2026-06-06 07:01:57', '2026-06-06 07:13:36');

-- --------------------------------------------------------

--
-- Table structure for table `expense_categories`
--

CREATE TABLE `expense_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expense_categories`
--

INSERT INTO `expense_categories` (`id`, `shop_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Gas', 1, '2026-06-06 06:48:36', '2026-06-06 06:48:36'),
(2, 1, 'Milk', 1, '2026-06-06 06:48:51', '2026-06-06 06:48:51'),
(3, 1, 'Cheese', 1, '2026-06-06 06:49:01', '2026-06-06 06:49:01'),
(4, 1, 'Vegetables', 1, '2026-06-06 06:49:12', '2026-06-06 06:49:12'),
(5, 1, 'Oil', 1, '2026-06-06 06:49:22', '2026-06-06 06:49:22');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `shop_id`, `category_id`, `name`, `price`, `cost_price`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Veg Burger', 80.00, 120.00, NULL, 1, '2026-06-04 07:40:12', '2026-06-04 07:40:12'),
(2, 1, 1, 'Cheese Burger', 120.00, 160.00, NULL, 1, '2026-06-04 07:40:55', '2026-06-04 07:40:55'),
(3, 1, 1, 'Margherita', 199.00, 250.00, NULL, 1, '2026-06-04 07:41:18', '2026-06-04 07:57:21');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000001_create_cache_table', 1),
(2, '0001_01_01_000002_create_jobs_table', 1),
(3, '2026_06_03_000000_create_shops_table', 1),
(4, '2026_06_03_000001_create_users_table', 1),
(5, '2026_06_03_054111_create_personal_access_tokens_table', 1),
(6, '2026_06_04_123022_create_categories_table', 2),
(7, '2026_06_04_125918_create_items_table', 3),
(8, '2026_06_04_135310_create_orders_table', 4),
(9, '2026_06_04_135312_create_order_items_table', 4),
(10, '2026_06_06_112943_create_expense_categories_table', 5),
(11, '2026_06_06_122025_create_expenses_table', 6),
(12, '2026_06_06_131942_create_customers_table', 7),
(13, '2026_06_06_132148_add_customer_id_to_orders_table', 8),
(14, '2026_06_17_104638_add_status_to_orders_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `payment_method` enum('cash','upi') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'completed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `shop_id`, `customer_id`, `invoice_no`, `total`, `payment_method`, `created_at`, `updated_at`, `status`) VALUES
(1, 1, 2, 'INV-1781015101', 120.00, 'cash', '2026-06-09 08:55:01', '2026-06-19 07:19:06', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `qty` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `item_id`, `qty`, `price`, `subtotal`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, 199.00, 199.00, '2026-06-09 08:44:28', '2026-06-09 08:44:28'),
(2, 2, 2, 1, 120.00, 120.00, '2026-06-09 08:48:10', '2026-06-09 08:48:10'),
(3, 3, 2, 1, 120.00, 120.00, '2026-06-09 08:51:51', '2026-06-09 08:51:51'),
(4, 1, 2, 1, 120.00, 120.00, '2026-06-09 08:55:01', '2026-06-09 08:55:01');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'snackflow', 'df4fd27cd476cf8909a89a857378e436c4be0b0a90db59ad65f94f49c458ebb7', '[\"*\"]', NULL, NULL, '2026-06-03 02:11:01', '2026-06-03 02:11:01'),
(2, 'App\\Models\\User', 1, 'snackflow', '05b504159535905d651a2a979054069386c0cb3edb2020441c9192cf7814ea2d', '[\"*\"]', NULL, NULL, '2026-06-03 02:11:53', '2026-06-03 02:11:53'),
(3, 'App\\Models\\User', 1, 'snackflow', '3cc497a9b8b7717f48f56206110860d2d41aaf7b52ea7b1b2cd2dda6bce4cadb', '[\"*\"]', '2026-06-04 08:40:09', NULL, '2026-06-04 06:55:37', '2026-06-04 08:40:09'),
(4, 'App\\Models\\User', 1, 'snackflow', 'e05e056f011e2df86dc661cf10aaf55978475789f50a0e57a621b7695fc50567', '[\"*\"]', '2026-06-05 07:47:07', NULL, '2026-06-05 07:17:58', '2026-06-05 07:47:07'),
(5, 'App\\Models\\User', 1, 'snackflow', 'c4258d78698b2b0f3b8fc669457cfbf608514d5bf66727a6f4246ee7344da8c2', '[\"*\"]', NULL, NULL, '2026-06-05 07:18:01', '2026-06-05 07:18:01'),
(6, 'App\\Models\\User', 1, 'snackflow', '424e24bba541a09b9c52c87909ccdb4ffe4167fa7c129cad11c2b66308209c42', '[\"*\"]', '2026-06-05 08:16:44', NULL, '2026-06-05 07:52:28', '2026-06-05 08:16:44'),
(7, 'App\\Models\\User', 1, 'snackflow', 'a282de0800b76bae6a125fe732ba55db544a4f03a46a1b68b47051126b725ff9', '[\"*\"]', '2026-06-05 08:45:35', NULL, '2026-06-05 08:25:42', '2026-06-05 08:45:35'),
(8, 'App\\Models\\User', 1, 'snackflow', '1b6b7fb208ccffbf6befcb97fcb580cbb65e78f64def316a5fc114a7a1eeb111', '[\"*\"]', NULL, NULL, '2026-06-05 09:14:58', '2026-06-05 09:14:58'),
(9, 'App\\Models\\User', 1, 'snackflow', 'aac3f00f013deef09b9d2d9812fecb20c034a06e7051a555b7019806e920e5d7', '[\"*\"]', NULL, NULL, '2026-06-05 09:15:15', '2026-06-05 09:15:15'),
(10, 'App\\Models\\User', 1, 'snackflow', 'e693d63d4a96f20dcc73a62beb83f41fe9921a4cb65908320749305222fd5c17', '[\"*\"]', NULL, NULL, '2026-06-06 00:00:03', '2026-06-06 00:00:03'),
(11, 'App\\Models\\User', 1, 'snackflow', '193dd4285e63a740b03fe5d29b2f4ada53e75f7fb80020c9257135185c60412d', '[\"*\"]', NULL, NULL, '2026-06-06 00:00:08', '2026-06-06 00:00:08'),
(12, 'App\\Models\\User', 1, 'snackflow', '00137f37c44f6d8aa5389a6fa39611afc38e573fed4d5e1b7578102d0b0eb60e', '[\"*\"]', '2026-06-06 00:22:30', NULL, '2026-06-06 00:04:25', '2026-06-06 00:22:30'),
(13, 'App\\Models\\User', 1, 'snackflow', '87b4b4a1701a58d219232ac2e73ddf6a378cb7c6978289072ee65afbbfa17111', '[\"*\"]', '2026-06-06 05:18:50', NULL, '2026-06-06 05:18:44', '2026-06-06 05:18:50'),
(14, 'App\\Models\\User', 1, 'snackflow', '7ce8230f083c96a671850ae35300d1ca38722a0b7dd142d922fd4c5ff58726b3', '[\"*\"]', '2026-06-06 08:40:31', NULL, '2026-06-06 05:19:20', '2026-06-06 08:40:31'),
(15, 'App\\Models\\User', 1, 'snackflow', '9c1e385f4118c70a11696a3840a2da6edb7c375f4b1c1b44fbf9ebb894fb28fb', '[\"*\"]', '2026-06-06 15:06:51', NULL, '2026-06-06 13:05:54', '2026-06-06 15:06:51'),
(16, 'App\\Models\\User', 1, 'snackflow', 'b258046d68ed8c9d8f66677d6a3cbf817404e3ed07ad823d61a96664d43315ee', '[\"*\"]', '2026-06-06 23:10:20', NULL, '2026-06-06 22:04:59', '2026-06-06 23:10:20'),
(17, 'App\\Models\\User', 1, 'snackflow', '90e0d109a5b56b0766be0f98600d4c674780d68b1b838360a34c77d4e122479a', '[\"*\"]', '2026-06-07 01:26:38', NULL, '2026-06-06 22:13:39', '2026-06-07 01:26:38'),
(18, 'App\\Models\\User', 1, 'snackflow', 'dfcba765b12bb1a3600d02cb11d384c5b17eecdf19f723ce29b4022add343c67', '[\"*\"]', '2026-06-07 03:46:28', NULL, '2026-06-07 02:27:35', '2026-06-07 03:46:28'),
(19, 'App\\Models\\User', 1, 'snackflow', '6447f9bbe5dbced27e2a2d60b9631283fdb36928965f211390ee240ce285d005', '[\"*\"]', '2026-06-07 06:03:41', NULL, '2026-06-07 05:05:32', '2026-06-07 06:03:41'),
(20, 'App\\Models\\User', 1, 'snackflow', '190b730e84cb048d7a2cd8f3bcff3b5990e1559a9f4f1650378fb0cf1530b51a', '[\"*\"]', NULL, NULL, '2026-06-07 13:48:25', '2026-06-07 13:48:25'),
(21, 'App\\Models\\User', 1, 'snackflow', '662c2107ac375f2043825552c6734087f1b5e1394e7f3371ba42bbee000bbb9f', '[\"*\"]', '2026-06-07 14:20:21', NULL, '2026-06-07 13:48:38', '2026-06-07 14:20:21'),
(22, 'App\\Models\\User', 1, 'snackflow', '3abae49fb3f6fa633732c84cda8cfbe93be511065b3b042c257b18d0cc34bf1b', '[\"*\"]', '2026-06-07 23:33:00', NULL, '2026-06-07 23:32:31', '2026-06-07 23:33:00'),
(23, 'App\\Models\\User', 1, 'snackflow', 'c140c7427614ddfb6ffa3fb2263d6677bdfc83885e61ee05f17557b4579b4d34', '[\"*\"]', '2026-06-08 07:17:30', NULL, '2026-06-08 05:09:27', '2026-06-08 07:17:30'),
(24, 'App\\Models\\User', 3, 'snackflow', 'ca918c03f7ec6e9d651ddbd5d85efd7988775e73f17c142b8f29a6ca8332f5bd', '[\"*\"]', '2026-06-08 07:29:04', NULL, '2026-06-08 07:18:41', '2026-06-08 07:29:04'),
(25, 'App\\Models\\User', 1, 'snackflow', '2806fc16e37e61f4689a9d75760c109c883e2e31792088f0a4e87e56baeeb86a', '[\"*\"]', '2026-06-08 07:58:01', NULL, '2026-06-08 07:19:34', '2026-06-08 07:58:01'),
(26, 'App\\Models\\User', 3, 'snackflow', 'ccad4b5841a6d4cf5c86b69187720088f0a798506ed15b372f104332543ad2c4', '[\"*\"]', '2026-06-08 07:57:50', NULL, '2026-06-08 07:35:01', '2026-06-08 07:57:50'),
(27, 'App\\Models\\User', 1, 'snackflow', '58ca2aeea5460421e8fe8049899ec9bc8d09b7711c16c620f86dec4e98814082', '[\"*\"]', '2026-06-09 09:04:36', NULL, '2026-06-09 07:20:10', '2026-06-09 09:04:36'),
(28, 'App\\Models\\User', 3, 'snackflow', '1c517dab3c420e589ba60a4ffbcf9dd1d3d5d4087a1e776c78cf06003fb530c5', '[\"*\"]', '2026-06-09 08:55:47', NULL, '2026-06-09 07:20:15', '2026-06-09 08:55:47'),
(29, 'App\\Models\\User', 3, 'snackflow', 'cd80424816fd1bcd673508a51ad9f4f8691fb9d8a6b0f309d6a32ae6dc8afad5', '[\"*\"]', NULL, NULL, '2026-06-09 07:20:16', '2026-06-09 07:20:16'),
(30, 'App\\Models\\User', 1, 'snackflow', 'f144e73b90f83facb1bad7cd42f33a077bd92c337b7cc6f8463553d1c7a4b1b6', '[\"*\"]', '2026-06-10 04:58:19', NULL, '2026-06-10 04:57:25', '2026-06-10 04:58:19'),
(31, 'App\\Models\\User', 1, 'snackflow', 'f0e3378b3183cba73850adbb6fd4bc95aeca4c63a2ef5fd2089328b6980398b5', '[\"*\"]', '2026-06-17 05:32:49', NULL, '2026-06-17 04:51:11', '2026-06-17 05:32:49'),
(32, 'App\\Models\\User', 1, 'snackflow', 'bcbd12efbdfaf89d43c18585a7c957ffe98080ea7353cd12bdfdf935a5686f57', '[\"*\"]', '2026-06-18 01:33:41', NULL, '2026-06-18 01:25:43', '2026-06-18 01:33:41'),
(33, 'App\\Models\\User', 1, 'snackflow', '3837d7f6325f49bb298000066302f14a543ab15b63c9bc85a0e4c74ed037e445', '[\"*\"]', '2026-06-18 07:54:27', NULL, '2026-06-18 06:07:40', '2026-06-18 07:54:27'),
(34, 'App\\Models\\User', 1, 'snackflow', '0bfafdbe4bfb8bab2619921a4208cb34167dc1bbbabecbeb0b61b05290b36451', '[\"*\"]', '2026-06-19 08:02:00', NULL, '2026-06-19 07:00:03', '2026-06-19 08:02:00'),
(35, 'App\\Models\\User', 3, 'snackflow', '266cf8a028570b4b38aea6eaf394e2d4e01afcd27c66370473a5d5e53149483e', '[\"*\"]', '2026-06-19 07:32:24', NULL, '2026-06-19 07:00:29', '2026-06-19 07:32:24'),
(36, 'App\\Models\\User', 1, 'snackflow', '9a13d07279e0c742d8a7948584ab7b39ef471c775258746c5762b8b21932d70b', '[\"*\"]', '2026-06-23 09:02:13', NULL, '2026-06-23 08:47:14', '2026-06-23 09:02:13'),
(37, 'App\\Models\\User', 1, 'snackflow', 'dafad8682b8d6f943142fc334e44acd9b087df389f8f0c155c276dbda4230741', '[\"*\"]', '2026-06-24 02:19:12', NULL, '2026-06-24 01:59:57', '2026-06-24 02:19:12');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shops`
--

CREATE TABLE `shops` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shops`
--

INSERT INTO `shops` (`id`, `name`, `slug`, `phone`, `email`, `address`, `logo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Burger Point', 'burger-point', '987665432', 'thetechweb1992@gmail.com', 'S/7/16\nNathupur, Sector 24', NULL, 1, '2026-06-03 02:11:00', '2026-06-07 14:20:16');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `shop_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('super_admin','owner','staff') NOT NULL DEFAULT 'staff',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `shop_id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 1, 'Mahesh', 'mahesh@gmail.com', NULL, '$2y$12$fw5Hu/wvgXRHc37LvwB5EO2St07ajd.pp4aOs8xp36sZh8YRcOkEm', 'owner', NULL, '2026-06-03 02:11:01', '2026-06-03 02:11:01'),
(3, 1, 'Rahul', 'rahul@gmail.com', NULL, '$2y$12$JhQuqkHZ2taK7ueHBbbg/OJzMrwOgQcEfKF0Zj8ffY0chTmCpipHC', 'staff', NULL, '2026-06-08 06:23:03', '2026-06-08 06:31:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_shop_id_foreign` (`shop_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_shop_id_foreign` (`shop_id`),
  ADD KEY `expenses_expense_category_id_foreign` (`expense_category_id`);

--
-- Indexes for table `expense_categories`
--
ALTER TABLE `expense_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expense_categories_shop_id_foreign` (`shop_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shops`
--
ALTER TABLE `shops`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `shops_slug_unique` (`slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_shop_id_foreign` (`shop_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `expense_categories`
--
ALTER TABLE `expense_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `shops`
--
ALTER TABLE `shops`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_expense_category_id_foreign` FOREIGN KEY (`expense_category_id`) REFERENCES `expense_categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `expenses_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `expense_categories`
--
ALTER TABLE `expense_categories`
  ADD CONSTRAINT `expense_categories_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
