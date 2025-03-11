import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  noOfParticipants: { type: Number, required: true },
});

const EventModel = mongoose.model("event_list", eventSchema);
export default EventModel;
