const QRCode = require("qrcode");
import mongoose from "mongoose";
import { IReservation, Reservation } from "../models/reservation.model";
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
  const reservationId = new mongoose.Types.ObjectId();

  const qrCodeData = `${process.env.FRONTEND_URL}/${reservationId}`;
  const qrCodeImage = await QRCode.toDataURL(qrCodeData);

  reservationObj._id = reservationId;
  reservationObj.qrCode = qrCodeImage;

  return Reservation.create(reservationObj);
};

export const getReservationById = async (
  _id: string,
): Promise<LeanReservation | null> => {
  return Reservation.findOne({
    _id,
    isArchived: { $ne: true },
  }).lean<LeanReservation>();
};
