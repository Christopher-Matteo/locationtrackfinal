
-- profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- sharing_sessions
CREATE TABLE public.sharing_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  label TEXT NOT NULL,
  share_token TEXT NOT NULL UNIQUE DEFAULT replace(gen_random_uuid()::text, '-', ''),
  sharer_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sharing_sessions TO authenticated;
GRANT ALL ON public.sharing_sessions TO service_role;
ALTER TABLE public.sharing_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage own sessions" ON public.sharing_sessions FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

-- location_pings
CREATE TABLE public.location_pings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.sharing_sessions ON DELETE CASCADE,
  lat DOUBLE PRECISION NOT NULL,
  lon DOUBLE PRECISION NOT NULL,
  accuracy DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.location_pings TO authenticated;
GRANT ALL ON public.location_pings TO service_role;
ALTER TABLE public.location_pings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners view own session pings" ON public.location_pings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.sharing_sessions s WHERE s.id = location_pings.session_id AND s.owner_id = auth.uid())
);

CREATE INDEX idx_location_pings_session ON public.location_pings (session_id, created_at DESC);

-- auto profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- realtime
ALTER TABLE public.location_pings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.location_pings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sharing_sessions;
