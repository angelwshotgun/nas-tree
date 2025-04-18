CREATE TABLE `baiviet` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tieu_de` text NOT NULL,
	`noi_dung` text NOT NULL,
	`anh` text,
	`vi_tri` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`thumuc_id` integer NOT NULL,
	FOREIGN KEY (`thumuc_id`) REFERENCES `thumuc`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `thumuc` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ten_thumuc` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `todos`;