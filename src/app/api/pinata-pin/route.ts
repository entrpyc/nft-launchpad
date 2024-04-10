import pinataSDK from '@pinata/sdk';
import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
// './public/nfts/1.jpg'

export async function POST(request: NextRequest) {
  const { path, name } = await request.json();

  try {
    const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);
    
    const stream = fs.createReadStream(path);

    const options = {
      pinataMetadata: { name }
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
