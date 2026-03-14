DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'completion_status') THEN
        CREATE TYPE "public"."completion_status" AS ENUM('pending', 'locked', 'released', 'reversed');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ledger_type') THEN
        CREATE TYPE "public"."ledger_type" AS ENUM('offer_pending', 'offer_hold', 'offer_release', 'offer_reversal', 'withdraw_request', 'withdraw_approve', 'withdraw_deny_refund', 'admin_adjust', 'referral_bonus');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notify_type') THEN
        CREATE TYPE "public"."notify_type" AS ENUM('offer_credit', 'offer_chargeback', 'withdraw_status', 'admin_alert', 'system');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'postback_status') THEN
        CREATE TYPE "public"."postback_status" AS ENUM('approved', 'denied', 'chargeback', 'pending');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'risk_tier') THEN
        CREATE TYPE "public"."risk_tier" AS ENUM('low', 'medium', 'high', 'banned');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
        CREATE TYPE "public"."role" AS ENUM('user', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'token_type') THEN
        CREATE TYPE "public"."token_type" AS ENUM('refresh', 'verification-email', 'reset-password', 'forgot-password', 'withdrawal');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE "public"."user_status" AS ENUM('active', 'banned');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'withdraw_method') THEN
        CREATE TYPE "public"."withdraw_method" AS ENUM('crypto_ltc', 'crypto_sol', 'crypto_eth', 'paypal', 'visa_virtual', 'ach', 'gc_roblox', 'gc_steam');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'withdraw_status') THEN
        CREATE TYPE "public"."withdraw_status" AS ENUM('pending', 'approved', 'paid', 'denied_refunded');
    END IF;
END $$;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_action_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"target_user_id" uuid,
	"action" varchar(100) NOT NULL,
	"reason" varchar(500),
	"metadata" jsonb,
	"ip" varchar(45),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blacklist_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"hash_token" varchar NOT NULL,
	"expired_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(100) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"email_verified_at" timestamp,
	"referral_code" varchar(20),
	"referred_by" uuid,
	"available_balance" numeric(16, 4) DEFAULT '0' NOT NULL,
	"pending_balance" numeric(16, 4) DEFAULT '0' NOT NULL,
	"locked_balance" numeric(16, 4) DEFAULT '0' NOT NULL,
	"lifetime_earned" numeric(16, 4) DEFAULT '0' NOT NULL,
	"lifetime_withdrawn" numeric(16, 4) DEFAULT '0' NOT NULL,
	"risk_tier" "risk_tier" DEFAULT 'low' NOT NULL,
	"fraud_score" integer DEFAULT 0 NOT NULL,
	"chargeback_score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_referral_code_unique" UNIQUE("referral_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ledger" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "ledger_type" NOT NULL,
	"delta_available" numeric(16, 4) DEFAULT '0' NOT NULL,
	"delta_pending" numeric(16, 4) DEFAULT '0' NOT NULL,
	"delta_locked" numeric(16, 4) DEFAULT '0' NOT NULL,
	"idempotency_key" varchar(255) NOT NULL,
	"reference_id" uuid,
	"description" varchar(500) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ledger_idempotency_key_unique" UNIQUE("idempotency_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offer_click_sessions" (
	"click_id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"provider" varchar(100) NOT NULL,
	"offer_id" varchar(255) NOT NULL,
	"ip" varchar(45),
	"user_agent" varchar(500),
	"device_fingerprint" varchar(255),
	"country" varchar(2),
	"is_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offer_completions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"click_id" varchar,
	"provider" varchar(100) NOT NULL,
	"offer_id" varchar(255) NOT NULL,
	"transaction_id" varchar(255) NOT NULL,
	"payout" numeric(16, 4) NOT NULL,
	"status" "completion_status" NOT NULL,
	"unlock_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "postback_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" varchar(100) NOT NULL,
	"transaction_id" varchar(255) NOT NULL,
	"raw_payload" jsonb NOT NULL,
	"headers" jsonb NOT NULL,
	"parsed_status" "postback_status",
	"worker_status" varchar(50) NOT NULL,
	"worker_reason" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "withdrawals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"amount" numeric(16, 4) NOT NULL,
	"fee" numeric(16, 4) NOT NULL,
	"net_amount" numeric(16, 4) NOT NULL,
	"method" "withdraw_method" NOT NULL,
	"payout_address" varchar(500) NOT NULL,
	"status" "withdraw_status" DEFAULT 'pending' NOT NULL,
	"snapshot_fraud_score" integer DEFAULT 0,
	"snapshot_chargeback_score" integer DEFAULT 0,
	"snapshot_ip" varchar(45),
	"admin_id" uuid,
	"admin_note" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"type" "notify_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" varchar(1000) NOT NULL,
	"meta" jsonb,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"hash_token" varchar NOT NULL,
	"type" "token_type" DEFAULT 'refresh',
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tokens_hash_token_unique" UNIQUE("hash_token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "login_session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"ip" varchar NOT NULL,
	"country" varchar NOT NULL,
	"city" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'admin_action_logs_admin_id_users_id_fk') THEN
        ALTER TABLE "admin_action_logs" ADD CONSTRAINT "admin_action_logs_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'admin_action_logs_target_user_id_users_id_fk') THEN
        ALTER TABLE "admin_action_logs" ADD CONSTRAINT "admin_action_logs_target_user_id_users_id_fk" FOREIGN KEY ("target_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'blacklist_token_user_id_users_id_fk') THEN
        ALTER TABLE "blacklist_token" ADD CONSTRAINT "blacklist_token_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_referred_by_users_id_fk') THEN
        ALTER TABLE "users" ADD CONSTRAINT "users_referred_by_users_id_fk" FOREIGN KEY ("referred_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ledger_user_id_users_id_fk') THEN
        ALTER TABLE "ledger" ADD CONSTRAINT "ledger_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'offer_click_sessions_user_id_users_id_fk') THEN
        ALTER TABLE "offer_click_sessions" ADD CONSTRAINT "offer_click_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'offer_completions_user_id_users_id_fk') THEN
        ALTER TABLE "offer_completions" ADD CONSTRAINT "offer_completions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'offer_completions_click_id_offer_click_sessions_click_id_fk') THEN
        ALTER TABLE "offer_completions" ADD CONSTRAINT "offer_completions_click_id_offer_click_sessions_click_id_fk" FOREIGN KEY ("click_id") REFERENCES "public"."offer_click_sessions"("click_id") ON DELETE no action ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'withdrawals_user_id_users_id_fk') THEN
        ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'withdrawals_admin_id_users_id_fk') THEN
        ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'notifications_user_id_users_id_fk') THEN
        ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tokens_user_id_users_id_fk') THEN
        ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'login_session_user_id_users_id_fk') THEN
        ALTER TABLE "login_session" ADD CONSTRAINT "login_session_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
END $$;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ledger_user_id_idx" ON "ledger" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "click_session_user_id_idx" ON "offer_click_sessions" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "completion_provider_transaction_idx" ON "offer_completions" USING btree ("provider","transaction_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "completion_status_unlock_idx" ON "offer_completions" USING btree ("status","unlock_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "postback_provider_transaction_idx" ON "postback_logs" USING btree ("provider","transaction_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "withdrawal_status_created_idx" ON "withdrawals" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "withdrawal_user_id_created_idx" ON "withdrawals" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notification_user_created_idx" ON "notifications" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notification_user_read_idx" ON "notifications" USING btree ("user_id","read_at");