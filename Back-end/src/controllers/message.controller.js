import Message from "../models/message.model.string.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getUsersForSidebar = async (req, res) => {
  try {
    const currentlyLoggedInUser = req.user._id;
    console.log(req.user);
    const users = await User.find({
      _id: { $ne: currentlyLoggedInUser },
    }).select("-password");

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in getting users for sidebar", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChat } = req.params;
  try {
    const senderId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChat },
        { senderId: userToChat, receiverId: senderId },
      ],
    });

    if (!messages) {
      return res.status(404).json({ message: "No messages found" });
    }

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  let urlImage;
  try {
    if (image) {
      const { secure_url } = await cloudinary.uploader.upload(image);
      urlImage = secure_url;
    }
    const newMessage = new Message({
      senderId: req.user._id,
      receiverId: req.params.id,
      text,
      image: urlImage,
    });

    console.log("here is the message that you sent", newMessage);
    await newMessage.save();
    return res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};