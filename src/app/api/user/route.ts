import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

import connect from '../../../../lib/db-connect';
import { createUser, findUser } from "../../../../lib/controllers/userController";

export async function POST(request: NextRequest) {
  const req = await request.json()

  try {
    let result;
    await connect();

    const user = await findUser(req);

    if(!user) result = await createUser(req);
    else result = user;
    
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'sorry' }, { status: 200 });
  }
}
