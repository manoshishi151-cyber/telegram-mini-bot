const express = require("express");
const { Telegraf } = require("telegraf");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== BOT =====
const bot = new Telegraf(process.env.BOT_TOKEN);

// ===== SUPABASE =====
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ===== /START COMMAND =====
bot.start(async (ctx) => {
  const user = ctx.from;

  await supabase.from("users").upsert([
    {
      telegram_id: user.id,
      username: user.username,
      balance: 0,
      done: 0,
      approved: 0,
      rejected: 0,
    },
  ]);

  ctx.reply(`✨ Welcome ${user.first_name} ✨

🧠 "সফলতা তাদেরই মিলে যারা কখনো থামে না"

🔥 MicroWork account created!
👉 Open Mini App to start earning`);
});

// ===== WEB SERVER =====
app.get("/", (req, res) => {
  res.send("🔥 MicroWork Bot Running Successfully");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// ===== START BOT =====
bot.launch();
