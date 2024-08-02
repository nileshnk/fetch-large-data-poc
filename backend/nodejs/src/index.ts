import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { syncDb } from "./db";
import { Config } from "./config/env";
import { PlaylistTrack } from "./db/models/PlaylistTrack";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Chinook Database CRUD");
});

app.get("/get-all-tracks", async (req: Request, res: Response) => {
  const allTracks = await PlaylistTrack.findAll();
  res.json(allTracks);
});

app.get("/get-all-tracks-count", async (req: Request, res: Response) => {
  const allTracks = await PlaylistTrack.count();
  res.json(allTracks);
});

const PORT = Config.app.port;

app.listen(PORT, async () => {
  await syncDb();
  try {
    const oneTrack = await PlaylistTrack.findOne({ where: { playlistId: 1 } });
    console.log(oneTrack);
  } catch (error) {
    console.error("Error:", error);
  }
  console.log("NodeJS Server listening on port", PORT, "🚀");
});
