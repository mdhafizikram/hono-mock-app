import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { z } from "zod";
import * as fs from "fs";

const app = new Hono();

const paramsSchema = z.object({
  strm: z.string().max(4),
  courseId: z.string().min(1).max(10),
});

app.get("/", (c) => c.text("Hello Node.js!"));
app.get("/api/course/:strm/:courseId", (c) => {
  console.log(c.req.param());
  const { strm, courseId } = paramsSchema.parse(c.req.param());

  // Full response data for the mock API
  const responseData = JSON.parse(fs.readFileSync("content.json", "utf8"));
  return c.json(responseData);
});
app.onError((error, c) => {
  console.error("Internal Server Error:", error);
  return c.json({ error: "Internal Server Error" }, 500);
});

serve({
  fetch: app.fetch,
  port: 8686,
});
console.log("Running on port 8686");
