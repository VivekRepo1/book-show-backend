import { Request, Response } from "express";
// import mongoose from "mongoose";

import Event from "../models/event.model";
// import TicketCategory from "../models/ticket-category"
import { ticketCategoryCreateSchema, ticketCategoryUpdateSchema } from "../utils/joi/ticketCategory.joi";
import { ApiError } from "../utils/ApiError";
import TicketCategory from "../models/ticketCategory.model";
import { ApiResponse } from "../utils/ApiResponse";

export const create = async (req: Request, res: Response) => {
    const { eventId, category, price, totalSeats, availableSeats, isActive = false, disclaimer } = req.body;
    console.log("isActive", isActive);
    const ticketObj = {category, price, totalSeats, availableSeats, isActive, disclaimer, eventId};
    const {error} = ticketCategoryCreateSchema.validate(ticketObj, {abortEarly: false});
    console.log("isActive", isActive);

    console.log("Error in joi", error);
    if (error) {
      throw new ApiError(
        400,
        "Error in form data validation",
        error.details.map((err) => err.message),
      );
    }
    const event = await Event.findById(eventId);
    if (!event) {
    throw new ApiError(404, "Event not found");
    }


    const ticketCategory = await TicketCategory.create(ticketObj);
    // const category = await TicketCategory.create()

  
  res.status(201).json(new ApiResponse(200, ticketCategory, "ticket category created successfully"));
}   


export const update = async (req: Request, res: Response) => {
  const {categoryId} = req.params;
  const {
    category, price, totalSeats, availableSeats, isActive, disclaimer
  } = req.body;

  const joiObject = {
    category,
    price,
    totalSeats,
    availableSeats,
    isActive,
    disclaimer,
    categoryId
  }

  const {error} = ticketCategoryUpdateSchema.validate(joiObject, {abortEarly: true})
  console.log("Error in joi", error);
  if (error) {
    throw new ApiError(
      400,
      "Error in form data validation",
      error.details.map((err) => err.message),
    );
  }

  const ticketType  = await TicketCategory.findById(categoryId);
  if (!ticketType) {
    throw new ApiError(400, "ticket category not found");
  }
    
  const newTicketObject = {
    category: category || ticketType.category,
    price: price || ticketType.price,
    totalSeats: totalSeats || ticketType.totalSeats,
    availableSeats: availableSeats || ticketType.availableSeats,
    isActive: isActive || ticketType.isActive,
    disclaimer: disclaimer || ticketType.disclaimer
  }
  const updatedTicket = await TicketCategory.findByIdAndUpdate(categoryId, newTicketObject, {runValidators: true, new: true})
  
  res.status(201).json(new ApiResponse(201, updatedTicket, "Event updated successfully"));

}

export const getAll = async (req: Request, res: Response) => {
  const {eventId} = req.params;
  console.log(eventId);
  const ticketCategories = await TicketCategory.find({eventId});
  console.log(ticketCategories);
  if (ticketCategories && ticketCategories.length === 0) {
    throw new ApiError(400, "no ticket categories exist for the event provided");
  }  

  res.status(200).json(new ApiResponse(201, ticketCategories, "ticketcategories fetched successfully"));
}


export const getOne = async (req: Request, res: Response) => {
  const {categoryId} = req.params;
  console.log(categoryId);
  const ticketCategory = await TicketCategory.findById(categoryId);
  if (!ticketCategory) {
    throw new ApiError(400, "no ticket category exist for the event provided");
  }  

  res.status(200).json(new ApiResponse(201, ticketCategory, "ticketcategory fetched successfully"));

}