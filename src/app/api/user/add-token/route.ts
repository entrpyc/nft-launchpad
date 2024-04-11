import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

import connect from '../../../../../lib/db-connect';
import { addFruityToken } from "../../../../../lib/controllers/userController";

export async function POST(request: NextRequest) {
  const req = await request.json()

  try {
    await connect();

    const result = await addFruityToken(req);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'sorry' }, { status: 200 });
  }
}
