import UserModel from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
