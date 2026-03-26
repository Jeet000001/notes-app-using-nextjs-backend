import dbconnect from "@/lib/db";
import Notes from "@/models/notes";
import { NextResponse } from "next/server";

export const GET = async (params) => {
  try {
    await dbconnect();
    const notes = await Notes.find({}).sort({
      createdAt: -1,
    });
    // find({}) = No filter get all teh Data & .sort({ createdAt: -1 }) = short the notes base on create time ans descending order (newest first)

    return NextResponse.json(
      {
        success: true,
        data: notes,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
};

// Post End point
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
