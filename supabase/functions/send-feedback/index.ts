import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type SendFeedbackRequestDto = {
  title?: string;
  description?: string;
  platform?: string;
  user_id?: string;
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  const headers = {
    ...corsHeaders,
    "Content-Type": "application/json",
  };

  let payload: SendFeedbackRequestDto;
  try {
    payload = await req.json();
  } catch (_err) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400, headers },
    );
  }

  const { title, description, platform, user_id } = payload;

  if (!title || !description || !platform || !user_id) {
    return new Response(
      JSON.stringify({
        error: "Missing required fields: title, description, platform, user_id",
      }),
      { status: 400, headers },
    );
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return new Response(
      JSON.stringify({
        error: "Supabase environment configuration is missing",
      }),
      { status: 500, headers },
    );
  }

  const { error } = await supabase.from("feedback").insert({
    title,
    description,
    platform,
    user_id,
  });

  if (error) {
    return new Response(
      JSON.stringify({ error: "Failed to save feedback", details: error.message }),
      { status: 500, headers },
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers },
  );
});
