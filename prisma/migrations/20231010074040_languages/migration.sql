-- AlterTable
ALTER TABLE `Snippet` ADD COLUMN `languageId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `htmlClass` VARCHAR(191) NOT NULL DEFAULT 'language-none',
    `logo` VARCHAR(191) NULL,

    UNIQUE INDEX `Language_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
