import { useState, useCallback } from "react";
import { supabase } from "@/services/supabaseClient";
import { PostgrestError } from "@supabase/supabase-js";

// =====================================================================
// useSupabase
// =====================================================================
// A lightweight hook that wraps any Supabase query in loading/error state,
// so you don't need to repeat boilerplate in every screen.
//
// Usage:
//   const { data, error, isLoading, execute } = useSupabase<Detection[]>();
//
//   useEffect(() => {
//     execute(() =>
//       supabase.from("detections").select("*").eq("patient_id", id)
//     );
//   }, [id]);

interface UseSupabaseReturn<T> {
  data: T | null;
  error: PostgrestError | Error | null;
  isLoading: boolean;
  execute: (queryFn: () => PromiseLike<{ data: T | null; error: PostgrestError | null }>) => Promise<void>;
  reset: () => void;
}

export function useSupabase<T = unknown>(): UseSupabaseReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<PostgrestError | Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (queryFn: () => PromiseLike<{ data: T | null; error: PostgrestError | null }>) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data: result, error: queryError } = await queryFn();
        if (queryError) {
          setError(queryError);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, error, isLoading, execute, reset };
}

// =====================================================================
// Convenience re-export so hooks and the raw client can be imported
// from the same place.
// =====================================================================
export { supabase };
