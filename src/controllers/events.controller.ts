// import { Request, Response } from "express";
import Event from "../models/event.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadFileToServer } from "../utils/uploadFileToServer";
import { eventJoiSchema } from "../utils/joi/event.joi";

// interface AuthenticatedRequest extends Request {
//   user?: {
//     accountType: string;
//     otpVerified: boolean;
//   };
//   files?: {
//     banner?: Express.Multer.File[];
//     gallery?: Express.Multer.File[];
//   };
// }

export const getAll = async (req: any, res: any) => {
  const {category, city, startTime, endTime, searchQuery} = req.query;
  const queryObj:any = {};
  if (searchQuery) {
    queryObj.title = { $regex: new RegExp(searchQuery, "i") }
  }
  if (category) {
    queryObj.category = { $regex: new RegExp(category, "i") }
  }
  if (city) {
    queryObj["venue.city"] = { $regex: new RegExp(city, "i") };
  }
  if (startTime && endTime) {
    queryObj.startTime = { $gte: new Date(startTime) };
    queryObj.endTime = { $lte: new Date(endTime) };
  }else if (startTime) {
      queryObj.startTime = { $gte: new Date(startTime) };
  } else if (endTime) {
    queryObj.endTime = { $lte: new Date(endTime) };
  }

  console.log("queryObj", queryObj)
  const events = await Event.find(queryObj);

  // if (events && events.length === 0) {
  //   throw new ApiError(500, "Events not found with provided criteria")
  // }

  res.status(200).json(new ApiResponse(201, events, "Events fetched sucessfully"));
}


export const getOne = async (req: any, res: any) => {

  const {id} = req.params;
  const event = await Event.findById(id);

  // console.log(event);
  if (!event) {
    throw new ApiError(400, "No events found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, event, "Events fetched successfully"));
};


export const create = async (req: any, res: any) => {
  const {
    title,
    startTime,
    endTime,
    state,
    address,
    city,
    category,
    price,
    description,
    termsAndConditions,
    organizerName,
    organizerContact,
    totalSeats,
    availableSeats,
    isActive,
    language,
    ageRequirement,
    isPublic,
  } = req.body;

  const { banner, gallery } = req.files || {};

  // Handle banner upload
  let bannerUrl = "";
  if (banner && banner[0]) {
    bannerUrl = await uploadFileToServer(
      banner[0].originalname,
      banner[0].path,
    );
  }
  console.log("gallery", gallery);
  // Handle gallery images upload
  const imageUrls: string[] = gallery
    ? await Promise.all(
        gallery.map(async (image: any) => 
          uploadFileToServer(image.filename, image.path),
        ),
      )
    : [];
  
  const eventObj: any = {
    title,
    startTime: new Date(startTime.trim()),
    endTime: (endTime) && new Date(endTime.trim()),
    venue: { state, address, city },
    category,
    price,
    description,
    termsAndConditions,
    images: { banner: bannerUrl, gallery: imageUrls },
    organizer: { name: organizerName, contact: organizerContact },
    totalSeats,
    availableSeats,
    isActive: isActive.trim() === "true",
    isPublic: isPublic.trim() === "true",
    language,
    ageRequirement: ageRequirement && parseInt(ageRequirement),
  };

  const finalObj:any = {};
  Object.keys(eventObj).map((item: any) => eventObj[item] ? (finalObj[item] = eventObj[item]) : null)

  console.log(finalObj);
  const { error } = eventJoiSchema.validate(finalObj, { abortEarly: false });
  console.log("Error in joi", error);
  if (error) {
    throw new ApiError(
      400,
      "Error in form data validation",
      error.details.map((err) => err.message),
    );
  }

  // Create the event in the database
  const event = await Event.create(finalObj);
  if (!event) {
    throw new ApiError(500, "Event could not be created")
  }


  res
    .status(201)
    .json(new ApiResponse(201, finalObj, "Event created successfully"));
};
