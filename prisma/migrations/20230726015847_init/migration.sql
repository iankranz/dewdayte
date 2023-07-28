-- CreateTable
CREATE TABLE "Space" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    CONSTRAINT "Task_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
