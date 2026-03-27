import dbconnect from "@/lib/db";
import notes from "@/models/notes";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    await dbconnect();
    const note = await notes.findByIdAndDelete(id);

    if (!notes) {
      return NextResponse.json(
        {
          success: false,
          error: "Note not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: {} });
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
