import { chats, messages } from "./db.js";
import { bot } from "../bot.js";

import { hydrateFiles } from "https://deno.land/x/grammy_files@v1.0.4/mod.ts";

bot.api.config.use(hydrateFiles(bot.token));
//get all chats from db - Future..
// export async function getChats(){
//     const allChatsArray = await chats.find({ _id: { $ne: null } }).toArray();
//     return allChatsArray;
// }

// Need to add chat when bot added to group.
export async function addChat(userId, chatName){
    // check if same User already exists.
    const chat = await chats.findOne({ _id: userId });
    if (chat) return false;

    // if not, add to db.
    await chats.insertOne({
        _id: userId,
        name: chatName
    }).then(() =>{
        return true;
    }).catch((err) =>{
        console.log(`Unable to add chat in DB: ${err}`);
        return false;
    });
}

// remove from db when left/kick
export async function removeChat(chatId){
    // check if same User already exists.
    const item = await chats.findOne({ _id: chatId });
    if (!item) return false;
  
    // if yes, rem frm db.
    await chats.deleteOne({
      _id: chatId
    }).catch((err) =>{
        console.log(`Unable to remove chat frm DB: ${err}`);
    })

}

// add test and details to db
export async function addText(ctx){
    // if not, add to db.
    await messages.insertOne({
        _id: `${ctx.message.chat.id}`+`${ctx.message.message_id}`,
        from: ctx.message.from,
        message: ctx.message.text,
        is_reply: ctx.message.reply_to_message ? true : false,
        reply_to_message: ctx.message.reply_to_message? ctx.message.reply_to_message : null,
        date: new Date(ctx.message.date * 1000)
    }).then(() =>{
        return true;
    }).catch((err) =>{
        console.log(`Unable to add msg in DB: ${err}`);
        return false;
    });
}

export async function addPic(ctx){
    const file = await ctx.getFile()
    console.log(file.file_path);
    // Download the file to a temporary location.
    const path = await file.download();
    // Print the file path.
    console.log("File saved at ", path);
    // const devEnv = Deno.env.get("DEV_ENV");
    // if(devEnv == "production")
    // if not, add to db.
    // await messages.insertOne({
    //     _id: `${ctx.message.chat.id}`+`${ctx.message.message_id}`,
    //     from: ctx.message.from,
    //     message: ctx.message.photo[photo.length],
    //     is_reply: ctx.message.reply_to_message ? true : false,
    //     reply_to_message: ctx.message.reply_to_message? ctx.message.reply_to_message : null,
    //     date: new Date(ctx.message.date * 1000)
    // }).then(() =>{
    //     return true;
    // }).catch((err) =>{
    //     console.log(`Unable to add msg in DB: ${err}`);
    //     return false;
    // });
}
export async function addVideo(ctx){
    // if not, add to db.
    await messages.insertOne({
        _id: `${ctx.message.chat.id}`+`${ctx.message.message_id}`,
        from: ctx.message.from,
        message: ctx.message.video,
        is_reply: ctx.message.reply_to_message ? true : false,
        reply_to_message: ctx.message.reply_to_message? ctx.message.reply_to_message : null,
        date: new Date(ctx.message.date * 1000)
    }).then(() =>{
        return true;
    }).catch((err) =>{
        console.log(`Unable to add msg in DB: ${err}`);
        return false;
    });
}
// .env = prod and dev ? store full path local url to mongo also. then ngrok will success?