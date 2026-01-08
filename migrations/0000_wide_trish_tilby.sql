CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"short_description" text NOT NULL,
	"problem_statement" text NOT NULL,
	"methodology" text NOT NULL,
	"outcome" text NOT NULL,
	"tech_stack" text[] NOT NULL,
	"github_url" varchar(512),
	"demo_url" varchar(512),
	"image_url" varchar(512),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"category" varchar(50) NOT NULL,
	"proficiency" serial NOT NULL
);
