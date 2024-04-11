import { PINATA_PIN_API_ROUTE } from "@/constants/routes";
import { useState } from "react";

export const useIpfs = () => {
  const [cid, setCid] = useState();
  const [uploading, setUploading] = useState(false);

  const pinFileToIPFS = async (path: string) => {
    setUploading(true);
    setCid(undefined);

    try {

      const res = await fetch(PINATA_PIN_API_ROUTE, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      const resData = await res.json();

      console.log(resData)

      setCid(resData.hash);

      return `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${resData.hash}`;
    } catch (e) {
      console.log(e);
      return false;
    }

    setUploading(false);
  };


  return {
    pinFileToIPFS,
    uploading,
    resultSrc: cid ? `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}` : ''
  };
};