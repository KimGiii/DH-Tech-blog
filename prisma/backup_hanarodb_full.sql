-- MySQL dump 10.13  Distrib 9.3.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: hanarodb
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('4edc4dff-b7be-4ac2-8a25-90e56eb5ad3e','0c1e6e808a79e24dfe6ddd9dda69368e16904d281496961dbb8cf7699c3b7be0','2025-06-02 13:11:36.429','20250602015146_',NULL,NULL,'2025-06-02 13:11:36.387',1),('7c4a0ce8-50fd-4f11-b88e-ed51f1ddbc46','29db4787cabccd143c6bed3a5ab5c619686ae614d57cca65635077d23e504be5','2025-06-03 11:44:50.178','20250603114449_add_like_dislike_counts',NULL,NULL,'2025-06-03 11:44:50.140',1),('8257fefa-10b4-40dc-a392-bde30d96970a','97137bf02dcf4b84f3b124991c4affc6eb0b38cb76af9e091972e6d8676319c2','2025-06-02 13:11:36.502','20250602021319_',NULL,NULL,'2025-06-02 13:11:36.430',1),('d2c71be3-09b6-48c4-8671-4a00ca6f1fd3','8af4746cf3b4fe2383971758509f39d6e548fd28d9df20e5d97bca268944c3fd','2025-06-02 13:11:42.936','20250602131142_',NULL,NULL,'2025-06-02 13:11:42.867',1),('e8e284b8-b609-480d-8e18-1c9e84c98163','c40967ae8bc462468e2612c673fdde9b4f8da6354d2ff995c5ee6f288a2c9b6e','2025-06-02 14:22:30.659','20250602142230_make_password_nullable',NULL,NULL,'2025-06-02 14:22:30.631',1),('f42a80c1-0cc2-42eb-8c38-1249f28b5fce','c8810a2678759259b7f1a180c635fc410e56c954c3ad43e5311b16f892fac13c','2025-06-02 13:11:36.387','20250531155623_init',NULL,NULL,'2025-06-02 13:11:36.344',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` int DEFAULT NULL,
  `token_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  KEY `Account_userId_fkey` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
INSERT INTO `Account` VALUES ('cmbf6l42b00020dn8exa78qa5','cmbf6l42300000dn8sipaxgxg','oauth','github','97424608',NULL,'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',NULL,'bearer','read:user,user:email',NULL,NULL);
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('JAVASCRIPT','TYPESCRIPT','REACT','ETC') COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `dislikeCount` int NOT NULL DEFAULT '0',
  `likeCount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Post_authorId_fkey` (`authorId`),
  CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES (1,'cmbf8270r00000d3usk5elusx','자바스크립트','자바스크립트(영어: JavaScript)는 객체 기반의 스크립트 프로그래밍 언어이다. 이 언어는 웹 브라우저 내에서 주로 사용되며, 다른 응용 프로그램의 내장 객체에도 접근할 수 있는 기능을 가지고 있다. 또한 Node.js와 같은 런타임 환경과 같이 서버 프로그래밍에도 사용되고 있다.','JAVASCRIPT','2025-06-02 15:24:11.703','2025-06-02 15:24:11.703',0,0),(3,'cmbf8270r00000d3usk5elusx','typescript','xkalksdjflaksjlaskdjflaskjdf','TYPESCRIPT','2025-06-02 15:43:31.873','2025-06-02 15:42:54.899',0,0),(8,'cmbf8270r00000d3usk5elusx','타입스크립트란?','타입스크립트(TypeScript)는 자바스크립트의 슈퍼셋인 오픈소스 프로그래밍 언어이다. 마이크로소프트에서 개발, 유지하고 있으며 엄격한 문법을 지원한다. C#의 리드 아키텍트이자 델파이, 터보 파스칼의 창시자인 아네르스 하일스베르(Anders Hejlsberg)가 개발에 참여한다.','TYPESCRIPT','2025-06-03 11:04:35.723','2025-06-03 11:04:35.723',0,0),(9,'cmbf8270r00000d3usk5elusx','리액트란?','리액트(React, React.js 또는 ReactJS)는 자바스크립트 라이브러리의 하나로서[2] 사용자 인터페이스를 만들기 위해 사용된다. 페이스북과 개별 개발자 및 기업공동체에 의해 유지보수된다.','REACT','2025-06-03 11:05:23.706','2025-06-03 11:05:23.706',0,0),(10,'cmbf8270r00000d3usk5elusx','자바란?','자바(영어: Java)는 썬 마이크로시스템즈의 제임스 고슬링(James Gosling)과 다른 연구원들이 개발한 객체 지향적 프로그래밍 언어이다. 1991년 그린 프로젝트(Green Project)라는 이름으로 시작해 1995년에 발표했다. ','ETC','2025-06-03 11:33:50.170','2025-06-03 11:33:50.170',0,0),(11,'cmbf8270r00000d3usk5elusx','왜 타입스크립트를 사용해야 할까?','코드 가이드 및 자동 완성(개발 생산성 향상)\n개발을 할 때 가장 많이 사용되는 Visual Studio Code의 툴 내부가 타입스크립트로 작성되어 있어 코드 가이드 및 자동 완성 기능을 활용하여 생산성을 향상 시킬 수 있다.','TYPESCRIPT','2025-06-03 11:34:56.883','2025-06-03 11:34:56.883',0,0),(12,'cmbf8270r00000d3usk5elusx','파일 확장자는 어떤걸 사용하지?','.js(JavaScript), .jsx(JavaScript XML), .tsx(TypeScript JSX) 어느걸 써야할까?\n\nTypeScript+JSX. TypeScript로 작성된 React 컴포넌트에 사용되는 확장자이므로 TypeScript의 타입 체크 기능과 JSX의 컴포넌트 정의 기능을 모두 사용할 수 있으니까요.','REACT','2025-06-03 11:35:52.295','2025-06-03 11:35:52.295',0,0),(13,'cmbf8270r00000d3usk5elusx','네이밍 컨벤션','컴포넌트 이름\nPascalCase를 사용합니다. (첫 글자를 대문자로 시작)\n파일 이름\n컴포넌트의 파일 이름도 해당 컴포넌트의 이름과 일치하도록 PascalCase를 사용합니다.\n\n프로퍼티와 상태 변수\ncamelCase를 사용합니다.','REACT','2025-06-03 11:36:35.947','2025-06-03 11:36:43.562',0,0),(14,'cmbf8270r00000d3usk5elusx','테스트 코드란?','애플리케이션의 특정 기능을 테스트하는 코드이다.\n예를 들어, 특정 함수의 테스트를 하려면, 그 함수에 대한 입력값과 기대되는 출력을 정의하고, 실제 출력과 비교하는 식으로 작성된다.\n테스트 코드는 일반적으로 코드와 함께 저장되어 계속해서 수정되고 실행된다.','ETC','2025-06-03 11:37:25.340','2025-06-03 11:37:25.340',0,0),(15,'cmbf8270r00000d3usk5elusx','프로토타입 기반 언어','자바스크립트 개발을 하면 빠질 수 없는 것이 프로토타입인데요.\n프로토타입이 거의 자바스크립트 그 자체이기때문에 이해하는 것이 어렵고 개념도 복잡합니다.\n​\n자바스크립트에 클래스는 없지만 함수(function)와 new를 통해 클래스를 비스무리하게 흉내낼 수 있습니다.','JAVASCRIPT','2025-06-03 11:38:20.149','2025-06-03 11:38:20.149',0,0);
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stopwords_ko`
--

DROP TABLE IF EXISTS `stopwords_ko`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stopwords_ko` (
  `value` varchar(50) NOT NULL,
  PRIMARY KEY (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='한글 커스텀 불용어 리스트';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stopwords_ko`
--

LOCK TABLES `stopwords_ko` WRITE;
/*!40000 ALTER TABLE `stopwords_ko` DISABLE KEYS */;
INSERT INTO `stopwords_ko` VALUES ('것'),('그'),('그리고'),('등'),('또는'),('또한'),('뿐만'),('수'),('않다'),('없다'),('에게'),('에서'),('이'),('이것'),('있다'),('저'),('저것'),('하다'),('하지만');
/*!40000 ALTER TABLE `stopwords_ko` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('ADMIN','USER') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('cmbf4m0bw00050dk3vsiaftuw','qwer@nomail.com',NULL,NULL,NULL,'2025-06-02 13:29:13.773','$2b$10$NKRlTManhLwB4hMEpk5KreBWQDg1BeLz3pg5KxIzoydHKSEjNu/uC','USER'),('cmbf4obmc00060dk3nijop24h','asdf@nomail.com',NULL,NULL,'asdf','2025-06-02 13:31:01.717','$2b$10$f2Av9xxgIuyH5rYkyayv5uLOdrU6cYM22cyKizRcQ8eQArkSORzBq','USER'),('cmbf5idxu00000dkq2li2nnxd','qwer@qwer',NULL,NULL,'qwer','2025-06-02 13:54:24.402','$2b$10$34xX1uoreHCezUWz.ovLzOn5OAERRB/LCFdN3XIFbQ/Lzn7oDzg3W','USER'),('cmbf6l42300000dn8sipaxgxg','gibo9809@gmail.com',NULL,'https://avatars.githubusercontent.com/u/97424608?v=4','Gibo Kim','2025-06-02 14:24:31.179',NULL,'USER'),('cmbf8270r00000d3usk5elusx','admin@nomail.com',NULL,NULL,'admin','2025-06-02 15:05:47.788','$2b$10$pRKv6PYqyk.oHWGuQXRfWuGabieisqYpRw/HWN6DFLUGik4jGS/ie','USER'),('cmbfz87gp00000dpt3de2udqg','qwer@asdf',NULL,NULL,'qwer','2025-06-03 03:46:17.930','$2b$10$UMJzSKAKJYXm7ZTgbvmE9ug2U2WHOAZJ8cgUx2r3Kk3ITGKrCbYbC','USER');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationToken`
--

DROP TABLE IF EXISTS `VerificationToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerificationToken` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationToken`
--

LOCK TABLES `VerificationToken` WRITE;
/*!40000 ALTER TABLE `VerificationToken` DISABLE KEYS */;
/*!40000 ALTER TABLE `VerificationToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hanarodb'
--

--
-- Dumping routines for database 'hanarodb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-03 22:14:26
