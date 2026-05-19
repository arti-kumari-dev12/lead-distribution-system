import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { allocateLead } from "@/utils/allocateLead";
import { getIO } from "@/lib/socket";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      phone,
      city,
      service,
      description,
    } = body;

    const existingLead =
      await Lead.findOne({
        phone,
        service,
      });

    if (existingLead) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Duplicate lead for same service not allowed",
        },
        {
          status: 400,
        }
      );
    }

    const lead =
      await Lead.create({

        name,
        phone,
        city,
        service,
        description,

      });


    await allocateLead(
      lead._id,
      service
    );


    const io =
      getIO();

    if (io) {

      io.emit(
        "newLead"
      );

    }


    return NextResponse.json({

      success: true,

      message:
      "Lead Created Successfully",

      lead,

    });


  } catch (error: any) {

    return NextResponse.json({

      success: false,

      error:
      error.message,

    });

  }
}