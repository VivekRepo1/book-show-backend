import fs from "fs";
import axios from "axios";
import FormData from "form-data";

async function uploadFileToServer(
  fileName: string,
  filePath: string,
): Promise<string> {
  try {
    console.log("Uploading:", fileName);
    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append("file", fileStream, fileName);

    // Upload to Image Server
    const response = await axios.post<{ data: { fileUrl: string } }>(
      process.env.UPLOAD_URL || "",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPLOAD_REFRESH_TOKEN}`,
        },
      },
    );

    // Cleanup temp file after successful upload
    fs.unlinkSync(filePath);

    return response.data.data.fileUrl; // Return uploaded URL
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

export { uploadFileToServer };
