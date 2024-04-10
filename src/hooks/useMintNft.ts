import { useState } from "react";
import { PINATA_PIN_API_ROUTE } from "@/constants/routes";

export const useIpfs = () => {
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadImageToIpfs = async (fileToUpload: File) => {
    setUploading(true);

    try {
      const data = new FormData();
      data.set("file", fileToUpload);

      const res = await fetch(PINATA_PIN_API_ROUTE, {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      setCid(resData.hash);
    } catch (e) {
      console.log(e);
    }

    setUploading(false);
  };


  return {
    uploadImageToIpfs,
    uploading,
    resultSrc: cid ? `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}` : undefined
  };
};