CREATE TABLE `alerts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256) NOT NULL,
	`expr` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
