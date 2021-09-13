-- AlterTable
ALTER TABLE "users" ADD COLUMN     "discordAccessToken" VARCHAR(255),
ADD COLUMN     "discordAccessTokenExpires" TIMESTAMPTZ(6);
