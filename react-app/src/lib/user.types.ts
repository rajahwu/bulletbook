import { User as UserType } from '@supabase/supabase-js';

export interface Profile {
  email?: string | null;
  id?: string;
  username: string | null;
  avatar?: string | File | null;
}

export type User = UserType;