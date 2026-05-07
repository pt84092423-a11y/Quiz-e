import { Router, type IRouter } from "express";
import { db, leaderboardTable } from "@workspace/db";
import { GetLeaderboardQueryParams, SubmitScoreBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/leaderboard", async (req, res) => {
  const query = GetLeaderboardQueryParams.safeParse(req.query);
  const limit = query.success ? (query.data.limit ?? 20) : 20;

  const entries = await db
    .select()
    .from(leaderboardTable)
    .orderBy(desc(leaderboardTable.score))
    .limit(limit);

  res.json(entries);
});

router.post("/leaderboard", async (req, res) => {
  const parsed = SubmitScoreBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { playerName, score, correct, total } = parsed.data;

  const [entry] = await db
    .insert(leaderboardTable)
    .values({ playerName, score, correct, total })
    .returning();

  res.status(201).json(entry);
});

export default router;
