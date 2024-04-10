import { PINATA_PIN_API_ROUTE } from "@/constants/routes";
import { useState } from "react";

export const useIpfs = () => {
  const [cid, setCid] = useState();
  const [uploading, setUploading] = useState(false);

  const pinFileToIPFS = async (fileToUpload: File) => {
    setUploading(true);
    setCid(undefined);

    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const res = await fetch(PINATA_PIN_API_ROUTE, {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();
      console.log(resData)
      setCid(resData.hash);
    } catch (e) {
      console.log(e);
    }

    setUploading(false);
  };


  return {
    pinFileToIPFS,
    uploading,
    resultSrc: cid && `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`
  };
};