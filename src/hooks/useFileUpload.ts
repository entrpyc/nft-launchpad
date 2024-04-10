import { FILE_UPLOAD_API_ROUTE } from "@/constants/routes";
import { useState } from "react";

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);

  const upload = async (fileToUpload: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const res = await fetch(FILE_UPLOAD_API_ROUTE, {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();
      
      return resData;
    } catch (e) {
      console.log(e);

      return { error: e }
    } finally {
      setUploading(false);
    }

  };


  return {
    upload,
    uploading,
  };
};