import multer, { StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: (
    _req: Request, // Prefixed with `_` to avoid the unused variable warning
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, "./public/temp");
  },
  filename: (
    _req: Request, // Prefixed with `_` to avoid the unused variable warning
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
