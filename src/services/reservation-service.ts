import { IReservation, Reservation } from "../models/reservation-model";
import { LeanReservation } from "types/reservation-types";

export const getAllReservations = async (): Promise<
  Array<Pick<IReservation, "name" | "mobileNumber">>
> => {
  return Reservation.find({ isArchived: { $ne: true } })
    .select("name mobileNumber")
    .sort({ createdAt: -1 })
    .lean();
};

export const createReservationTickets = async (reservationObj: any) => {
  const response = await Reservation.create(reservationObj);
  console.log("the response is", response);
  return response;
};

export const getReservationById = async (_id: string): Promise<LeanReservation | null> => {
  return Reservation.findOne({ _id, isArchived: { $ne: true } })
    .lean<LeanReservation>();
};

