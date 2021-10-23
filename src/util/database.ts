import {Chat,db} from '../models/ChatLog'

export class ChatLog{
    add(room:number,type:number,msg:string){
        const date = new Date();
        db.open()
      .then(() => {
        Chat.add({ _id: +date,
                       room:room, 
                       sender: 'sender', 
                       text: msg, 
                       type:type });
      })
    }
    async getLog(room:number){
     await db.open()
     let result = await Chat.find({index: 'room', value: room}).get()
     return result
    }
}
