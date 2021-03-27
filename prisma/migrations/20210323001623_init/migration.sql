-- CreateTable
CREATE TABLE "Session" (
    "sid" VARCHAR(36) NOT NULL,
    "expires" TIMESTAMPTZ(6),
    "data" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(255),
    "type" VARCHAR(255),
    "url" VARCHAR(255),
    "urlCaption" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(255),
    "description" TEXT,
    "title" VARCHAR(255),
    "order" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "lessonId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "docUrl" VARCHAR(255),
    "githubUrl" VARCHAR(255),
    "videoUrl" VARCHAR(255),
    "order" INTEGER,
    "title" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "chatUrl" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stars" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "studentId" INTEGER,
    "mentorId" INTEGER,
    "comment" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" SERIAL NOT NULL,
    "mrUrl" VARCHAR(255),
    "diff" TEXT,
    "comment" TEXT,
    "status" VARCHAR(255),
    "viewCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "userId" INTEGER,
    "reviewerId" INTEGER,
    "challengeId" INTEGER,
    "lessonId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLessons" (
    "isPassed" VARCHAR(255),
    "isTeaching" VARCHAR(255),
    "isEnrolled" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("lessonId","userId")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "username" VARCHAR(255),
    "password" VARCHAR(255),
    "email" VARCHAR(255),
    "gsId" INTEGER,
    "isOnline" BOOLEAN,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "isAdmin" VARCHAR(255) DEFAULT false,
    "forgotToken" VARCHAR(255),
    "cliToken" VARCHAR(255),
    "emailVerificationToken" VARCHAR(255),
    "tokenExpiration" TIMESTAMPTZ(6),

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challenges" ADD FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stars" ADD FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stars" ADD FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLessons" ADD FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLessons" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
