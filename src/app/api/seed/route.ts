import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Provider from "@/models/Provider";
import AllocationState from "@/models/AllocationState";

export async function GET() {
  try {
    await connectDB();

    await Provider.deleteMany({});
    await AllocationState.deleteMany({});

    await Provider.insertMany([
      {
        name: "Provider 1",
        services: ["Service 1", "Service 3"],
      },

      {
        name: "Provider 2",
        services: ["Service 1", "Service 3"],
      },

      {
        name: "Provider 3",
        services: ["Service 1", "Service 3"],
      },

      {
        name: "Provider 4",
        services: ["Service 1", "Service 3"],
      },

      {
        name: "Provider 5",
        services: ["Service 2", "Service 3"],
      },

      {
        name: "Provider 6",
        services: ["Service 2", "Service 3"],
      },

      {
        name: "Provider 7",
        services: ["Service 2", "Service 3"],
      },

      {
        name: "Provider 8",
        services: ["Service 2", "Service 3"],
      },
    ]);

    await AllocationState.insertMany([
      {
        service: "Service 1",
        currentIndex: 0,
      },

      {
        service: "Service 2",
        currentIndex: 0,
      },

      {
        service: "Service 3",
        currentIndex: 0,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Seed Data Inserted",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}