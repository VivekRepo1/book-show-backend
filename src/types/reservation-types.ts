import { IReservation } from "models/reservation.model";
import { Types } from "mongoose";

export type LeanReservation = Omit<IReservation, "_id"> & {
  _id: Types.ObjectId;
};
