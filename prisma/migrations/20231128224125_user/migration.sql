-- CreateTable
CREATE TABLE "userModel" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "location" STRING NOT NULL,
    "accepted" BOOL NOT NULL DEFAULT false,
    "requests" JSONB NOT NULL,
    "likes" JSONB NOT NULL,
    "friends" JSONB NOT NULL,
    "avatar" STRING NOT NULL,

    CONSTRAINT "userModel_pkey" PRIMARY KEY ("id")
);
