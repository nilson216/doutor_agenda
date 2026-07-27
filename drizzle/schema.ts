import { pgTable, check, uuid, text, timestamp, foreignKey, integer, time, unique, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const patientSex = pgEnum("patient_sex", ['male', 'female'])


export const clinics = pgTable("clinics", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	check("clinics_id_not_null", sql`NOT NULL id`),
	check("clinics_name_not_null", sql`NOT NULL name`),
	check("clinics_created_at_not_null", sql`NOT NULL created_at`),
]);

export const appointments = pgTable("appointments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	date: timestamp({ mode: 'string' }).notNull(),
	clinicId: uuid("clinic_id").notNull(),
	patientId: uuid("patient_id").notNull(),
	doctorId: uuid("doctor_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.clinicId],
			foreignColumns: [clinics.id],
			name: "appointments_clinic_id_clinics_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.patientId],
			foreignColumns: [patients.id],
			name: "appointments_patient_id_patients_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.doctorId],
			foreignColumns: [doctors.id],
			name: "appointments_doctor_id_doctors_id_fk"
		}).onDelete("cascade"),
	check("appointments_id_not_null", sql`NOT NULL id`),
	check("appointments_date_not_null", sql`NOT NULL date`),
	check("appointments_clinic_id_not_null", sql`NOT NULL clinic_id`),
	check("appointments_patient_id_not_null", sql`NOT NULL patient_id`),
	check("appointments_doctor_id_not_null", sql`NOT NULL doctor_id`),
	check("appointments_created_at_not_null", sql`NOT NULL created_at`),
]);

export const patients = pgTable("patients", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	clinicId: uuid("clinic_id").notNull(),
	name: text().notNull(),
	email: text().notNull(),
	phoneNumber: text("phone_number").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	sex: patientSex().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.clinicId],
			foreignColumns: [clinics.id],
			name: "patients_clinic_id_clinics_id_fk"
		}).onDelete("cascade"),
	check("patients_id_not_null", sql`NOT NULL id`),
	check("patients_clinic_id_not_null", sql`NOT NULL clinic_id`),
	check("patients_name_not_null", sql`NOT NULL name`),
	check("patients_email_not_null", sql`NOT NULL email`),
	check("patients_phone_number_not_null", sql`NOT NULL phone_number`),
	check("patients_created_at_not_null", sql`NOT NULL created_at`),
	check("patients_sex_not_null", sql`NOT NULL sex`),
]);

export const doctors = pgTable("doctors", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	clinicId: uuid("clinic_id").notNull(),
	name: text().notNull(),
	avatarImageUrl: text("avatar_image_url"),
	availableFromWeekDay: integer("available_from_week_day").notNull(),
	availableToWeekDay: integer("available_to_week_day").notNull(),
	availableFromTime: time("available_from_time").notNull(),
	availableToTime: time("available_to_time").notNull(),
	specialty: text().notNull(),
	appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.clinicId],
			foreignColumns: [clinics.id],
			name: "doctors_clinic_id_clinics_id_fk"
		}).onDelete("cascade"),
	check("doctors_id_not_null", sql`NOT NULL id`),
	check("doctors_clinic_id_not_null", sql`NOT NULL clinic_id`),
	check("doctors_name_not_null", sql`NOT NULL name`),
	check("doctors_available_from_week_day_not_null", sql`NOT NULL available_from_week_day`),
	check("doctors_available_to_week_day_not_null", sql`NOT NULL available_to_week_day`),
	check("doctors_available_from_time_not_null", sql`NOT NULL available_from_time`),
	check("doctors_available_to_time_not_null", sql`NOT NULL available_to_time`),
	check("doctors_specialty_not_null", sql`NOT NULL specialty`),
	check("doctors_appointment_price_in_cents_not_null", sql`NOT NULL appointment_price_in_cents`),
	check("doctors_created_at_not_null", sql`NOT NULL created_at`),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
	check("users_id_not_null", sql`NOT NULL id`),
	check("users_name_not_null", sql`NOT NULL name`),
	check("users_email_not_null", sql`NOT NULL email`),
	check("users_email_verified_not_null", sql`NOT NULL email_verified`),
	check("users_created_at_not_null", sql`NOT NULL created_at`),
	check("users_updated_at_not_null", sql`NOT NULL updated_at`),
]);

export const verifications = pgTable("verifications", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
}, (table) => [
	check("verifications_id_not_null", sql`NOT NULL id`),
	check("verifications_identifier_not_null", sql`NOT NULL identifier`),
	check("verifications_value_not_null", sql`NOT NULL value`),
	check("verifications_expires_at_not_null", sql`NOT NULL expires_at`),
]);

export const accounts = pgTable("accounts", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_user_id_users_id_fk"
		}).onDelete("cascade"),
	check("accounts_id_not_null", sql`NOT NULL id`),
	check("accounts_account_id_not_null", sql`NOT NULL account_id`),
	check("accounts_provider_id_not_null", sql`NOT NULL provider_id`),
	check("accounts_user_id_not_null", sql`NOT NULL user_id`),
	check("accounts_created_at_not_null", sql`NOT NULL created_at`),
	check("accounts_updated_at_not_null", sql`NOT NULL updated_at`),
]);

export const sessions = pgTable("sessions", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("sessions_token_unique").on(table.token),
	check("sessions_id_not_null", sql`NOT NULL id`),
	check("sessions_expires_at_not_null", sql`NOT NULL expires_at`),
	check("sessions_token_not_null", sql`NOT NULL token`),
	check("sessions_created_at_not_null", sql`NOT NULL created_at`),
	check("sessions_updated_at_not_null", sql`NOT NULL updated_at`),
	check("sessions_user_id_not_null", sql`NOT NULL user_id`),
]);

export const usersToClinics = pgTable("users_to_clinics", {
	userId: text("user_id").notNull(),
	clinicId: uuid("clinic_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "users_to_clinics_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.clinicId],
			foreignColumns: [clinics.id],
			name: "users_to_clinics_clinic_id_clinics_id_fk"
		}).onDelete("cascade"),
	check("users_to_clinics_clinic_id_not_null", sql`NOT NULL clinic_id`),
	check("users_to_clinics_created_at_not_null", sql`NOT NULL created_at`),
	check("users_to_clinics_user_id_not_null", sql`NOT NULL user_id`),
]);
