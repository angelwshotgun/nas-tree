PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_thumuc` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ten_thumuc` text NOT NULL,
	`thu_tu` integer NOT NULL,
	`duong_dan` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_thumuc`("id", "ten_thumuc", "thu_tu", "duong_dan", "created_at", "updated_at") SELECT "id", "ten_thumuc", "thu_tu", "duong_dan", "created_at", "updated_at" FROM `thumuc`;--> statement-breakpoint
DROP TABLE `thumuc`;--> statement-breakpoint
ALTER TABLE `__new_thumuc` RENAME TO `thumuc`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `baiviet` ADD `mo_ta` text NOT NULL;--> statement-breakpoint
ALTER TABLE `baiviet` ADD `duong_dan` text NOT NULL;