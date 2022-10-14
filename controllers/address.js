import mongoose from "mongoose";
import Addressbook from "../models/address.js";

export const getAllContacts = async (req, res) => {
  try {
    const data = await Addressbook.find({});
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.json({ error });
  }
};

export const createContact = async (req, res) => {
  const contact = req.body;
  const createNewContact = new Addressbook(contact);
  try {
    await createNewContact.save();
    res.status(200).json(createNewContact);
  } catch (error) {
    res.json(error);
  }
};

export const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const contact = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(404).send("This is not a valid ID");
    const updatedContact = await Addressbook.findByIdAndUpdate(_id, contact, {
      new: true,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async (req, res) => {
  const { id: _id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      res.status(400).send("This is not a valid ID");
    await Addressbook.findByIdAndRemove(_id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const searchByContact = async (req, res) => {
  let { searchQuery } = req.query;
  console.log(searchQuery);
  // console.log(email);
  searchQuery = new RegExp(searchQuery, "i");
  try {
    const contacts = await Addressbook.find({
      $or: [{ name: searchQuery }, { email: searchQuery }],
    });
    res.json(contacts);
  } catch (error) {
    console.log(error);
  }
};
