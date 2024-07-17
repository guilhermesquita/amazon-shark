import { UserIdentity } from "@supabase/supabase-js";

export type UserMetadata = {
    email: string;
    id: string;
    documents: undefined | UserIdentity[];

    user_metadata: {
        fullName: string;
    }
  };