CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "roles" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "user_roles" (
  "user_id" uuid,
  "role_id" int
);

CREATE TABLE "internships" (
  "id" int PRIMARY KEY,
  "intern_id" uuid,
  "supervisor_id" uuid,
  "dosen_id" uuid,
  "start_date" date,
  "end_date" date,
  "status" varchar
);

CREATE TABLE "daily_logs" (
  "id" int PRIMARY KEY,
  "internship_id" int,
  "date" date,
  "check_in_time" time,
  "check_out_time" time,
  "activity" text,
  "status" varchar,
  "approved_by" uuid,
  "approved_at" timestamp,
  "supervisor_comment" text
);

CREATE TABLE "tasks" (
  "id" int PRIMARY KEY,
  "internship_id" int,
  "title" varchar,
  "description" text,
  "status" varchar,
  "due_date" date,
  "created_at" timestamp
);

CREATE TABLE "bugs" (
  "id" int PRIMARY KEY,
  "daily_log_id" int,
  "title" varchar,
  "description" text,
  "status" varchar,
  "reported_at" timestamp
);

CREATE TABLE "meetings" (
  "id" int PRIMARY KEY,
  "internship_id" int,
  "meeting_date" date,
  "topic" varchar,
  "notes" text
);

CREATE TABLE "feedbacks" (
  "id" int PRIMARY KEY,
  "internship_id" int,
  "period_start" date,
  "period_end" date,
  "score" int,
  "comment" text
);

CREATE TABLE "activity_logs" (
  "id" int PRIMARY KEY,
  "user_id" uuid,
  "action" varchar,
  "description" text,
  "created_at" timestamp
);

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "internships" ADD FOREIGN KEY ("intern_id") REFERENCES "users" ("id");

ALTER TABLE "internships" ADD FOREIGN KEY ("supervisor_id") REFERENCES "users" ("id");

ALTER TABLE "internships" ADD FOREIGN KEY ("dosen_id") REFERENCES "users" ("id");

ALTER TABLE "daily_logs" ADD FOREIGN KEY ("internship_id") REFERENCES "internships" ("id");

ALTER TABLE "daily_logs" ADD FOREIGN KEY ("approved_by") REFERENCES "users" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("internship_id") REFERENCES "internships" ("id");

ALTER TABLE "bugs" ADD FOREIGN KEY ("daily_log_id") REFERENCES "daily_logs" ("id");

ALTER TABLE "meetings" ADD FOREIGN KEY ("internship_id") REFERENCES "internships" ("id");

ALTER TABLE "feedbacks" ADD FOREIGN KEY ("internship_id") REFERENCES "internships" ("id");

ALTER TABLE "activity_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
