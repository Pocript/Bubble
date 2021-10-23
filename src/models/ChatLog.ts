import BoxDB from 'bxd';

const db = new BoxDB('Bubble', 1);

const Chat = db.create('chatlog', {
  _id: {
    type: BoxDB.Types.NUMBER,
    key: true,
  },
  sender: BoxDB.Types.STRING,
  room: {
      type:BoxDB.Types.NUMBER,
      index: true
  },
  text: BoxDB.Types.STRING,
  type: BoxDB.Types.NUMBER
});

export {db}
export {Chat}
