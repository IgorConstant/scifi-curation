-- CreateTable
CREATE TABLE "Work" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subgenre" TEXT,
    "year" INTEGER,
    "creator" TEXT,
    "synopsis" TEXT,
    "rating" REAL
);

-- CreateTable
CREATE TABLE "RelatedWork" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relationType" TEXT NOT NULL,
    "fromWorkId" INTEGER NOT NULL,
    "toWorkId" INTEGER NOT NULL,
    CONSTRAINT "RelatedWork_fromWorkId_fkey" FOREIGN KEY ("fromWorkId") REFERENCES "Work" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RelatedWork_toWorkId_fkey" FOREIGN KEY ("toWorkId") REFERENCES "Work" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
