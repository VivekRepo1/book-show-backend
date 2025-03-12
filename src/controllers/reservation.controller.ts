import { Request, Response } from "express";
import {
  createReservationTickets,
  getAllReservations,
  getReservationById,
} from "../services/reservation-service";

export const getAll = async (_req: Request, res: Response) => {
  const reservations = await getAllReservations();
  return res.send({
    success: true,
    data: reservations,
  });
};

export const create = async (req: Request, res: Response) => {
  const response = await createReservationTickets(req.body);
  if (!response) {
    return res.send({
      success: true,
      reservations: [],
    });
  }
  return res.send({
    success: true,
    data: response,
  });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reservation = await getReservationById(id);
  return res.send({
    success: true,
    data: reservation,
  });
};
