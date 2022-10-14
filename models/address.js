import mongoose from "mongoose";

const AddressSchema = mongoose.Schema({
  name: String,
  email: String,
  contact_no: String,
  address: String,
});

const Addressbook = mongoose.model("Addressbook", AddressSchema);

export default Addressbook;
