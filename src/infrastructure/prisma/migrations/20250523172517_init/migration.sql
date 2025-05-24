-- CreateTable
CREATE TABLE "User" (
    "id_user" UUID NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "password" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "zipCode" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "phone" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
