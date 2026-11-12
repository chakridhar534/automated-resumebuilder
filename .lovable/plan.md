# Resume Builder 2026 upgrade

## Scope
Build the requested landing-page polish and interactive Resume Studio while preserving no-sign-up use and browser-local autosave. The current brief ends during PDF-export requirements, so implement the fully specified features through ATS-safe PDF export; do not invent unspecified bonus actions.

## Plan
1. Refresh the landing page with the requested value proposition, trust strip, role-switching before/after examples, feature grid, and four-step workflow.
2. Replace the simple builder with a split Resume Studio: guided profile editor, work/projects/education/skills, target-job input, PDF/TXT import, sample/reset controls, local autosave, template/ATS/highlight/fit controls, keyword gaps, and live resume preview.
3. Extend resume data and tailoring results; update the server function for validated structured output and the anti-hallucination rules, including explicit metric placeholders. Keep AI requests on the Lovable AI Gateway SDK and validate all inputs.
4. Add print-safe ATS PDF output, app metadata, and focused rule tests; verify the app preview, import/editor/tailoring/export interactions, tests, and current diagnostics.

## Technical details
- Keep the existing React/Vite + Tailwind + shadcn patterns and Lovable Cloud edge-function boundary.
- Persist editable data and view preferences in localStorage; never persist uploaded PDF bytes.
- Current instructions explicitly request contact fields, superseding the earlier request to omit personal information.
- Use ATS-safe single-column templates and semantic theme tokens; print only the resume preview.
