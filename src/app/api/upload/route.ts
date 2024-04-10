import FileManager from "@/utils/file-manager";
import { NextResponse, NextRequest } from "next/server";

const ALLOWED_FILE_TYPES: string[] = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const UPLOAD_FOLDER = "public/uploads/";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No files received." }, { status: 400 });

  const fileManager = FileManager({
    file,
    maxFileSize: MAX_FILE_SIZE,
    allowedFileTypes: ALLOWED_FILE_TYPES,
    uploadDir: UPLOAD_FOLDER
  });

  const { isValid, errors } = fileManager.validate();

  if(!isValid) return NextResponse.json({ errors }, { status: 400 });

  const { error, filename, fileLocation } = await fileManager.upload();

  if(error) return NextResponse.json({ message: "Failed to upload file.", status: 500 });
  return NextResponse.json({ fileLocation, filename, status: 201 });

}