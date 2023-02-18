const Chat = require('../modules/chatModule');

const postMessage= async (req, res) => {
  const {sender, receiver, message} = req.body
    try {
      let newMessage = new Chat ({
        sender,
        receiver,
        message
      })
      await newMessage.save();
      res.status(200).send(newMessage);
      } 
     catch (error) {
      res.status(500).json(error);
    }
  };

  
  module.exports = {
    postMessage,
    // getMessages 
  };
  