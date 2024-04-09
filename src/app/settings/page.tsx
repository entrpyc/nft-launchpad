"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function Settings() {
  const [file, setFile] = useState<File | null>();
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);

  const inputFile = useRef<HTMLInputElement>(null);

  const uploadFile = async (fileToUpload: File) => {
    console.log(process.env.NEXT_PUBLIC_GATEWAY_URL)
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      setCid(resData.hash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.files) return;

    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
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
      {cid && (
        <Image
          src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
          alt="Image from IPFS"
        />
      )}
    </main>
  );
}
