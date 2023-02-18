const Chat = require('../modules/chatModule');

const postMessage= async (req, res) => {
  const {sender, receiver,room, message} = req.body;
    try {
      let newMessage = new Chat ({
        sender,
        receiver,
        room,
        message
      })
      await newMessage.save();
      res.status(200).send(newMessage);
      } 
     catch (error) {
      res.status(500).json(error);
    }
  };

  const getMessages = async (req, res) => {
    try {
      let messages = await Chat.find({})
      .populate("sender")
      .populate("receiver");
      res.send(messages)
    } catch (error) {
      res.status(500).json(error);
    }
  }

  
  module.exports = {
    postMessage,
    getMessages 
  };
  