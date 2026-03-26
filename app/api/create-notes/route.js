import dbconnect from "@/lib/db";
import Notes from "@/models/notes";
import { NextResponse } from "next/server";

export const POST = async (params) => {
  try {
    await dbconnect();
    const body = await request.json();
    const note = await Notes.create(body);

    return NextResponse.json(
      {
        success: true,
        data: note,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
};
