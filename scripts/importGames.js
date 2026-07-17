import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Game from "../models/Game.js";

mongoose.connect(process.env.MONGO_URI);

const games = [];

fs.createReadStream("./games.csv")
  .pipe(csv())
  .on("data", (row) => {
    games.push({
      provider: "InOut",
      providerGameId: row["Game ID"],
      gameName: row["Game"],
      category: row["Category"],
      enabled: true,
      mobile: row["Available devices"]?.includes("mobile"),
      demo: false,
      popularity: 0,
      image: "",
    });
  })
  .on("end", async () => {
    for (const game of games) {
      await Game.updateOne(
        { providerGameId: game.providerGameId },
        game,
        { upsert: true }
      );
    }

    console.log(`✅ Imported ${games.length} games`);

    process.exit();
  });