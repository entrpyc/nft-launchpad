import pinataSDK from '@pinata/sdk';
import { PINATA_UPLOAD_EDNPOINT } from "@/constants/routes";
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";


export async function POST(request: NextRequest) {
  try {

    const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
    
    const stream = fs.createReadStream('./public/nfts/1.jpg');

    const options = {
      pinataMetadata: {
        name: 'test image'
      }
    }
    
    const res = await pinata.pinFileToIPFS(stream, options);
    
    return NextResponse.json({ 
      hash: String(res.IpfsHash)
    }, { status: 200 });

  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e },
      { status: 500 }
    );
  }
}
