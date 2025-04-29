CREATE TABLE `baiviet_ngonngu` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`baiviet_id` integer NOT NULL,
	`tieu_de` text NOT NULL,
	`mo_ta` text NOT NULL,
	`duong_dan` text NOT NULL,
	`noi_dung` text NOT NULL,
	`ngon_ngu` text NOT NULL,
	`locale` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`baiviet_id`) REFERENCES `baiviet`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `thumuc_ngonngu` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`thumuc_id` integer NOT NULL,
	`ten_thumuc` text NOT NULL,
	`ngon_ngu` text NOT NULL,
	`locale` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`thumuc_id`) REFERENCES `thumuc`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `baiviet` DROP COLUMN `tieu_de`;--> statement-breakpoint
ALTER TABLE `baiviet` DROP COLUMN `mo_ta`;--> statement-breakpoint
ALTER TABLE `baiviet` DROP COLUMN `duong_dan`;--> statement-breakpoint
ALTER TABLE `baiviet` DROP COLUMN `noi_dung`;--> statement-breakpoint
ALTER TABLE `thumuc` DROP COLUMN `ten_thumuc`;