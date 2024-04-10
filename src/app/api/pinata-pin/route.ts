import { PINATA_UPLOAD_EDNPOINT } from "@/constants/routes";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const JWT = process.env.PINATA_JWT;
    const formData = new FormData();
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'nft',
    });

    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })

    formData.append('pinataOptions', pinataOptions);

    const res = await axios.post(PINATA_UPLOAD_EDNPOINT, formData, {
      headers: {
        'Authorization': `Bearer ${JWT}`
      }
    });

    return NextResponse.json({ 
      hash: res.data.IpfsHash
    }, { status: 200 });

  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}
