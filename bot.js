import { Bot } from "./deps.js";
import { addMessage } from "./database/methods.js";
//Production
export const bot = new Bot(Deno.env.get("BOT_TOKEN"));
//Local
//export const bot = new Bot("");

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Bot alive.."));


// Handle other messages.
bot.chatType(["group", "supergroup"]).on("message:text", async (ctx) => {

    //cal db write
    await addMessage(ctx);
    // await ctx.reply("stored to db",{
    //     reply_to_message_id: ctx.message.message_id
    // })
});

//Local
//bot.start();