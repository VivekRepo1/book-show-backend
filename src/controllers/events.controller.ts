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

export const getAll = async (_req: any, res: any) => {

  const events = await Event.find();
  if (!events.length) {
    throw new ApiError(400, "No events found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
};
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

  // console.log("bannerUrl", bannerUrl);
  // console.log("bannerUrl", typeof bannerUrl);

  // Handle gallery images upload
  const imageUrls: string[] = gallery
    ? await Promise.all(
        gallery.map(async (image: any) =>
          uploadFileToServer(image.originalname, image.path),
        ),
      )
    : [];

  // console.log("Uploaded Images:", imageUrls);

  const eventObj = {
    title,
    startTime: new Date(startTime.trim()),
    endTime: new Date(endTime.trim()),
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
    language,
    ageRequirement: parseInt(ageRequirement),
  };

  console.log(eventObj);
  const { error } = eventJoiSchema.validate(eventObj, { abortEarly: false });
  console.log("Error in joi", error);
  if (error) {
    throw new ApiError(
      400,
      "Error in form data validation",
      error.details.map((err) => err.message),
    );
  }

  // Create the event in the database
  const event = await Event.create(eventObj);
  if (!event) {
    throw new ApiError(500, "Event could not be created")
  }


  res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
};
