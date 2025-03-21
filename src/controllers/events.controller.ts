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
    endTime: (endTime) ? new Date(endTime.trim()) : null,
    venue: { state, address, city },
    category,
    price,
    description,
    termsAndConditions,
    images: { banner: bannerUrl, gallery: imageUrls || [] },
    organizer: { name: organizerName, contact: organizerContact },
    totalSeats,
    availableSeats,
    isActive: isActive.trim() === "true",
    isPublic: isPublic.trim() === "true",
    language: language || null,
    ageRequirement: ageRequirement ? parseInt(ageRequirement): null,
  };

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


export const update  = async (req:any, res: any) => {
  const {eventId} = req.params;
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

    const event = await Event.findById(eventId);
    console.log("event", event);
    if (!event) {
      throw new ApiError(500, "Event could not be updated")
    }
  
    
  const eventObj: any = {
    title: title || event.title,
    startTime: (startTime) ? new Date(startTime.trim()) : event.startTime,
    endTime: (endTime) ? new Date(endTime.trim()) : event.endTime,
    venue: { state: state || event.venue.state, address: address || event.venue.address, city : city || event.venue.city },
    category: category || event.category,
    price: price || event.price,
    description: description || event.description,
    termsAndConditions : (termsAndConditions && termsAndConditions.length > 0) ? termsAndConditions  : event.termsAndConditions,
    images: { banner: bannerUrl || event.images.banner},
    organizer: { name: organizerName || event.organizer.name, contact: organizerContact || event.organizer.contact },
    totalSeats : totalSeats || event.totalSeats,
    availableSeats : availableSeats || event.availableSeats,
    isActive: isActive ? isActive.trim() === "true" : event.isActive,
    isPublic: isPublic ? isPublic.trim() === "true" : event.isPublic,
    language: language || event.language || null,
    ageRequirement: ageRequirement || event.ageRequirement || null
  };

  if (imageUrls && imageUrls.length > 0) {
    eventObj.images.gallery = imageUrls;
  }


  console.log("eventObj", eventObj);
  const { error } = eventJoiSchema.validate(eventObj, { abortEarly: false });
  console.log("Error in joi", error);
  if (error) {
    throw new ApiError(
      400,
      "Error in form data validation",
      error.details.map((err) => err.message),
    );
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventId, eventObj, {new: true});
  
  res.status(201).json(new ApiResponse(201, updatedEvent, "Event updated successfully"));

}


export const deleteEvent = async (req: any, res : any) => {
  const {id} = req.params;
  const event = await Event.findById(id);

  if (!event) {
    throw new ApiError(400, "No events found");
  }

  event.isActive = false;
  await event.save();

  res.status(200).json(new ApiResponse(200, event, "Event marked inactive successfully"));
}
export const shareSocial = async (req: any, res: any) => {
  console.log(req.query);
  const {url, image, siteName} = req.query;
  console.log("url", url, "image", image, "siteName", siteName);
  
  const event = {
    title: "My Event",
    description: "This is an amazing event!",  
};

  const metaTags = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta property="og:title" content="${event.title}" />
      <meta property="og:description" content="${event.description}" />
      <meta property="og:image" content=${image} />
      <meta property="og:url" content=${url} />
      <title>${event.title}</title>
    </head>
    <body>
    </body>
    </html>
`;
  res.send(metaTags);
} 