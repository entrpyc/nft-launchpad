import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";
import path from "path";

interface FileManagerProps {
  allowedFileTypes: string[],
  maxFileSize: number,
  file: File,
  uploadDir: string,
}

function isValidFileType(file: File, allowedTypes: string[]) {
  return allowedTypes.includes(file.type);
}

function getFileExtension(file: File) {
  const parts = file.name.split(".");
  return parts[parts.length - 1].toLowerCase();
}

export default function FileManager({
  allowedFileTypes,
  maxFileSize,
  file,
  uploadDir
}: FileManagerProps) {
  const validate = () => {
    let isValid = true;
    const errors = [];

    if (!isValidFileType(file, allowedFileTypes)) {
      isValid = false;
      errors.push("Invalid file type.")
    }

    if (file.size > maxFileSize) {
      isValid = false;
      errors.push("File size exceeds maximum limit.")
    }

    return {
      isValid,
      errors
    }
  }

  const upload = async () => {
    const filename = `${uuid()}.${getFileExtension(file)}`;

    const buffer = Buffer.from(await (file as File).arrayBuffer());

    try {
      const uploadDirPath = path.join(process.cwd(), uploadDir);

      await fs.access(uploadDirPath, fs.constants.F_OK).catch(async (err) => {
        if (err.code === "ENOENT") {
          await fs.mkdir(uploadDirPath, { recursive: true, mode: 0o755 });
        } else {
          throw err;
        }
      });
  
      await fs.writeFile(path.join(process.cwd(), uploadDir, filename), buffer);
  
      return {
        fileLocation: uploadDir + filename,
        filename,
      }
    } catch (error) {
      console.error("Error occurred:", error);
      
      return {
        error: true
      };
    }
  }

  return {
    validate,
    upload
  }
}
