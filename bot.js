import { Bot } from "./deps.js";
import { addText, addPic, addVideo } from "./database/methods.js";
//Production
export const bot = new Bot(Deno.env.get("BOT_TOKEN"));

import { hydrateFiles } from "https://deno.land/x/grammy_files@v1.0.4/mod.ts";

bot.api.config.use(hydrateFiles(bot.token));
//Local
//export const bot = new Bot("");

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Bot alive.."));


// Handle other messages.
bot.chatType(["group", "supergroup"]).on("message:text", async (ctx) => {

    //cal db write
    await addText(ctx);
    // await ctx.reply("stored to db",{
    //     reply_to_message_id: ctx.message.message_id
    // })
});

bot.chatType(["group","supergroup"]).on("message:photo", async (ctx)=>{
    await addPic(ctx);
})

bot.chatType(["group","supergroup"]).on("message:video", async (ctx)=>{
    await addVideo(ctx);
})

//Local
//bot.start();