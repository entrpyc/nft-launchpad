"use client";

import { useFileUpload } from "@/hooks/useFileUpload";
import { useIpfs } from "@/hooks/useIpfs";
import Image from "next/image";
import { useRef } from "react";

export default function Pinata() {
  const { upload, uploading } = useFileUpload();

  const inputFile = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.files?.length) return;

    const result = await upload(e.target.files[0]);
    console.log(result)
  };

  function onUploadClick() {
    if(uploading || !inputFile) return;

    inputFile.current?.click()
  }

  return (
    <main className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
      <input type="file" id="file" ref={inputFile} onChange={handleChange} />
      <button disabled={uploading} onClick={onUploadClick}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {/* {resultSrc && (
        <Image
          src={resultSrc}
          alt="Image from IPFS"
          width={100}
          height={100}
        />
      )} */}
    </main>
  );
}
