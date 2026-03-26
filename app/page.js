import dbconnect from "@/lib/db";
import React from "react";

const page = async () => {
  await dbconnect();
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-4xl font-extrabold font-serif py-5">Noes App</h1>
    </div>
  );
};

export default page;
