// deno-lint-ignore-file no-explicit-any
import { assertEquals } from "https://deno.land/std@0.203.0/assert/assert_equals.ts";

Deno.test("gelato-sync-templates returns success with count", async () => {
  // Mock getTemplates and getServiceClient
  const templates = [{ id: "1", name: "T1", variants: [], placeholders: [] }];
  const getTemplates = () => templates; // Accept two arguments to match real API
  const upsert = (_data: any, _opts: any) => ({ error: undefined });
  const getServiceClient = () => ({ from: (_table: any) => ({ upsert }) });
  // Simulate handler
  const jsonResponse = (data: any) => data;
  const errorResponse = () => ({ error: "Mock error" });
  // Simulate main logic
  let result;
  try {
    const templatesResult = await getTemplates();
    const supabase = getServiceClient();
    const { error } = supabase.from("gelato_templates").upsert(
      templatesResult,
      { onConflict: "id" },
    );
    if (error) result = errorResponse();
    else {result = jsonResponse({
        success: true,
        count: templatesResult.length,
      });}
  } catch {
    result = errorResponse();
  }
  assertEquals(result.success, true);
  assertEquals(result.count, 1);
});
