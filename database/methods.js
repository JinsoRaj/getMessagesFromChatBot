import { chats, messages } from "./db.js";
import { bot } from "../bot.js";


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

    const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
    let path = "";
    const devEnv = Deno.env.get("DEV_ENV");
    if(devEnv == "prod"){
        path = file.getUrl();
    }else{
        path = await file.download("../downloads/images/");
    }
    // if not, add to db.
    await messages.insertOne({
        _id: `${ctx.message.chat.id}`+`${ctx.message.message_id}`,
        from: ctx.message.from,
        file_id: fileId,
        message: path,
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
export async function addVideo(ctx){
    // if not, add to db.
    // await messages.insertOne({
    //     _id: `${ctx.message.chat.id}`+`${ctx.message.message_id}`,
    //     from: ctx.message.from,
    //     file_id: fileId,
    //     message: cpath,
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
// .env = prod and dev ? store full path local url to mongo also. then ngrok will success?