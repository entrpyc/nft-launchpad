import pinataSDK from '@pinata/sdk';
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import { v4 as uuid } from "uuid";


export async function POST(request: NextRequest) {
  const { path } = await request.json();

  try {
    const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
    
    const stream = fs.createReadStream(path);

    const options = {
      pinataMetadata: { name: `app-pin-${uuid()}` }
    }
    
    const res = await pinata.pinFileToIPFS(stream, options);
    
    return NextResponse.json({ 
      hash: String(res.IpfsHash)
    }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
