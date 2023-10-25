-- CreateTable
CREATE TABLE "userModel" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "requests" JSONB NOT NULL,
    "likes" JSONB NOT NULL,
    "friends" JSONB NOT NULL,

    CONSTRAINT "userModel_pkey" PRIMARY KEY ("id")
);
