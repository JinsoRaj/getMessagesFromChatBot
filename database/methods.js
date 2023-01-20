import { chats, messages } from "./db.js";

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
export async function addMessage(ctx){
    // if not, add to db.
    await messages.insertOne({
        _id: ctx.message.message_id,
        from: ctx.message.from,
        text: ctx.message.text
    }).then(() =>{
        return true;
    }).catch((err) =>{
        console.log(`Unable to add msg in DB: ${err}`);
        return false;
    });
}
