
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."create_profile_for_new_user"() RETURNS trigger
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  INSERT INTO public.profile(id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;$$;

ALTER FUNCTION "public"."create_profile_for_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."bullet_techs" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "bullet_id" uuid,
    "tech_id" uuid
);

ALTER TABLE "public"."bullet_techs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" uuid NOT NULL,
    "username" text,
    "email" text,
    "avatar" text
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."project_bullets" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "project_id" uuid,
    "action_verb" text NOT NULL,
    "content" text NOT NULL,
    "feature" text NOT NULL,
    "benefit" text NOT NULL,
    "challenge" text,
    "solution" text,
    "result" text,
    "learned" text,
    "next" text
);

ALTER TABLE "public"."project_bullets" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."project_images" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "project_id" uuid,
    "url" text,
    "user_id" uuid NOT NULL
);

ALTER TABLE "public"."project_images" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."project_urls" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "project_id" uuid,
    "live" text,
    "github" text
);

ALTER TABLE "public"."project_urls" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."projects" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "user_id" uuid,
    "name" text,
    "description" text
);

ALTER TABLE "public"."projects" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tech_references" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "technology_id" uuid,
    "title" text,
    "url" text
);

ALTER TABLE "public"."tech_references" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."technologies" (
    "id" uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    "name" text,
    "icon" text,
    "description" text,
    "category" text
);

ALTER TABLE "public"."technologies" OWNER TO "postgres";

ALTER TABLE ONLY "public"."bullet_techs"
    ADD CONSTRAINT "bullet_techs_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_bullets"
    ADD CONSTRAINT "projcet_bullets_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_images"
    ADD CONSTRAINT "project_images_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."project_urls"
    ADD CONSTRAINT "project_urls_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."tech_references"
    ADD CONSTRAINT "tech_references_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."technologies"
    ADD CONSTRAINT "technologies_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."bullet_techs"
    ADD CONSTRAINT "bullet_techs_bullet_id_fkey" FOREIGN KEY (bullet_id) REFERENCES public.project_bullets(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."bullet_techs"
    ADD CONSTRAINT "bullet_techs_tech_id_fkey" FOREIGN KEY (tech_id) REFERENCES public.technologies(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id);

ALTER TABLE ONLY "public"."project_bullets"
    ADD CONSTRAINT "project_bullets_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id);

ALTER TABLE ONLY "public"."project_images"
    ADD CONSTRAINT "project_images_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."project_images"
    ADD CONSTRAINT "project_images_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id);

ALTER TABLE ONLY "public"."project_urls"
    ADD CONSTRAINT "project_urls_project_id_fkey" FOREIGN KEY (project_id) REFERENCES public.projects(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."projects"
    ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id);

ALTER TABLE ONLY "public"."tech_references"
    ADD CONSTRAINT "tech_references_technology_id_fkey" FOREIGN KEY (technology_id) REFERENCES public.technologies(id);

CREATE POLICY "Enable delete for users based on user_id" ON "public"."project_images" FOR DELETE TO authenticated USING ((auth.uid() = user_id));

CREATE POLICY "Enable delete for users based on user_id" ON "public"."projects" FOR DELETE TO authenticated USING ((auth.uid() = user_id));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."project_images" FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable insert for users based on user_id" ON "public"."projects" FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."project_images" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."projects" FOR SELECT USING (true);

ALTER TABLE "public"."project_images" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."projects" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."create_profile_for_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."create_profile_for_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_profile_for_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."bullet_techs" TO "anon";
GRANT ALL ON TABLE "public"."bullet_techs" TO "authenticated";
GRANT ALL ON TABLE "public"."bullet_techs" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."project_bullets" TO "anon";
GRANT ALL ON TABLE "public"."project_bullets" TO "authenticated";
GRANT ALL ON TABLE "public"."project_bullets" TO "service_role";

GRANT ALL ON TABLE "public"."project_images" TO "anon";
GRANT ALL ON TABLE "public"."project_images" TO "authenticated";
GRANT ALL ON TABLE "public"."project_images" TO "service_role";

GRANT ALL ON TABLE "public"."project_urls" TO "anon";
GRANT ALL ON TABLE "public"."project_urls" TO "authenticated";
GRANT ALL ON TABLE "public"."project_urls" TO "service_role";

GRANT ALL ON TABLE "public"."projects" TO "anon";
GRANT ALL ON TABLE "public"."projects" TO "authenticated";
GRANT ALL ON TABLE "public"."projects" TO "service_role";

GRANT ALL ON TABLE "public"."tech_references" TO "anon";
GRANT ALL ON TABLE "public"."tech_references" TO "authenticated";
GRANT ALL ON TABLE "public"."tech_references" TO "service_role";

GRANT ALL ON TABLE "public"."technologies" TO "anon";
GRANT ALL ON TABLE "public"."technologies" TO "authenticated";
GRANT ALL ON TABLE "public"."technologies" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
