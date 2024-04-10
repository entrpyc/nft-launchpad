import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

import connect from '../../../../lib/db-connect';
import User from "../../../../lib/models/UserModel";
import OurNFT from "../../../../lib/models/OurNFTModel";
import { createUser } from "../../../../lib/controllers/userController";

export async function GET(request: NextRequest) {
  try {
    await connect();


    // const ourNFT = OurNFT.create({
    //   src: '6.jpg',
    //   alt: 'NFT 6',
    //   price: '0.00000000000001'
    // })

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'sorry'}, { status: 200 });
  }
}
