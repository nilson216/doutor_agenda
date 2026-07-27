-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."patient_sex" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE "clinics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "clinics_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "clinics_name_not_null" CHECK (NOT NULL name),
	CONSTRAINT "clinics_created_at_not_null" CHECK (NOT NULL created_at)
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"clinic_id" uuid NOT NULL,
	"patient_id" uuid NOT NULL,
	"doctor_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "appointments_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "appointments_date_not_null" CHECK (NOT NULL date),
	CONSTRAINT "appointments_clinic_id_not_null" CHECK (NOT NULL clinic_id),
	CONSTRAINT "appointments_patient_id_not_null" CHECK (NOT NULL patient_id),
	CONSTRAINT "appointments_doctor_id_not_null" CHECK (NOT NULL doctor_id),
	CONSTRAINT "appointments_created_at_not_null" CHECK (NOT NULL created_at)
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clinic_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone_number" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"sex" "patient_sex" NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "patients_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "patients_clinic_id_not_null" CHECK (NOT NULL clinic_id),
	CONSTRAINT "patients_name_not_null" CHECK (NOT NULL name),
	CONSTRAINT "patients_email_not_null" CHECK (NOT NULL email),
	CONSTRAINT "patients_phone_number_not_null" CHECK (NOT NULL phone_number),
	CONSTRAINT "patients_created_at_not_null" CHECK (NOT NULL created_at),
	CONSTRAINT "patients_sex_not_null" CHECK (NOT NULL sex)
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clinic_id" uuid NOT NULL,
	"name" text NOT NULL,
	"avatar_image_url" text,
	"available_from_week_day" integer NOT NULL,
	"available_to_week_day" integer NOT NULL,
	"available_from_time" time NOT NULL,
	"available_to_time" time NOT NULL,
	"specialty" text NOT NULL,
	"appointment_price_in_cents" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "doctors_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "doctors_clinic_id_not_null" CHECK (NOT NULL clinic_id),
	CONSTRAINT "doctors_name_not_null" CHECK (NOT NULL name),
	CONSTRAINT "doctors_available_from_week_day_not_null" CHECK (NOT NULL available_from_week_day),
	CONSTRAINT "doctors_available_to_week_day_not_null" CHECK (NOT NULL available_to_week_day),
	CONSTRAINT "doctors_available_from_time_not_null" CHECK (NOT NULL available_from_time),
	CONSTRAINT "doctors_available_to_time_not_null" CHECK (NOT NULL available_to_time),
	CONSTRAINT "doctors_specialty_not_null" CHECK (NOT NULL specialty),
	CONSTRAINT "doctors_appointment_price_in_cents_not_null" CHECK (NOT NULL appointment_price_in_cents),
	CONSTRAINT "doctors_created_at_not_null" CHECK (NOT NULL created_at)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "users_name_not_null" CHECK (NOT NULL name),
	CONSTRAINT "users_email_not_null" CHECK (NOT NULL email),
	CONSTRAINT "users_email_verified_not_null" CHECK (NOT NULL email_verified),
	CONSTRAINT "users_created_at_not_null" CHECK (NOT NULL created_at),
	CONSTRAINT "users_updated_at_not_null" CHECK (NOT NULL updated_at)
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "verifications_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "verifications_identifier_not_null" CHECK (NOT NULL identifier),
	CONSTRAINT "verifications_value_not_null" CHECK (NOT NULL value),
	CONSTRAINT "verifications_expires_at_not_null" CHECK (NOT NULL expires_at)
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "accounts_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "accounts_account_id_not_null" CHECK (NOT NULL account_id),
	CONSTRAINT "accounts_provider_id_not_null" CHECK (NOT NULL provider_id),
	CONSTRAINT "accounts_user_id_not_null" CHECK (NOT NULL user_id),
	CONSTRAINT "accounts_created_at_not_null" CHECK (NOT NULL created_at),
	CONSTRAINT "accounts_updated_at_not_null" CHECK (NOT NULL updated_at)
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token"),
	CONSTRAINT "sessions_id_not_null" CHECK (NOT NULL id),
	CONSTRAINT "sessions_expires_at_not_null" CHECK (NOT NULL expires_at),
	CONSTRAINT "sessions_token_not_null" CHECK (NOT NULL token),
	CONSTRAINT "sessions_created_at_not_null" CHECK (NOT NULL created_at),
	CONSTRAINT "sessions_updated_at_not_null" CHECK (NOT NULL updated_at),
	CONSTRAINT "sessions_user_id_not_null" CHECK (NOT NULL user_id)
);
--> statement-breakpoint
CREATE TABLE "users_to_clinics" (
	"user_id" text NOT NULL,
	"clinic_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_to_clinics_clinic_id_not_null" CHECK (NOT NULL clinic_id),
	CONSTRAINT "users_to_clinics_created_at_not_null" CHECK (NOT NULL created_at),
	CONSTRAINT "users_to_clinics_user_id_not_null" CHECK (NOT NULL user_id)
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_doctors_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_clinics" ADD CONSTRAINT "users_to_clinics_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_clinics" ADD CONSTRAINT "users_to_clinics_clinic_id_clinics_id_fk" FOREIGN KEY ("clinic_id") REFERENCES "public"."clinics"("id") ON DELETE cascade ON UPDATE no action;
*/