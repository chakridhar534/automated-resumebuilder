import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { experience, education, skills, jobDescription } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert resume writer and career coach. Your job is to tailor a resume to match a specific job description.

Given the user's experience, education, skills, and a target job description, you must:
1. Write a compelling Professional Summary (2-3 sentences) tailored to the role.
2. Rewrite each experience bullet point to highlight relevant keywords from the JD.
3. Suggest additional skills that align with the JD.

Return your response using the provided tool.`;

    const userPrompt = `Here is my resume information:

**Experience:**
${experience}

**Education:**
${education}

**Skills:**
${skills}

**Target Job Description:**
${jobDescription}

Please tailor my resume for this role.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "tailor_resume",
                description:
                  "Return a tailored resume with professional summary, optimized bullet points, and suggested skills.",
                parameters: {
                  type: "object",
                  properties: {
                    professionalSummary: {
                      type: "string",
                      description:
                        "A 2-3 sentence professional summary tailored to the target role.",
                    },
                    optimizedBulletPoints: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "An array of optimized experience bullet points with relevant keywords.",
                    },
                    suggestedSkills: {
                      type: "array",
                      items: { type: "string" },
                      description:
                        "Skills from the JD that the user should highlight.",
                    },
                  },
                  required: [
                    "professionalSummary",
                    "optimizedBulletPoints",
                    "suggestedSkills",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "tailor_resume" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI processing failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      return new Response(
        JSON.stringify({ error: "AI did not return structured data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("tailor-resume error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
