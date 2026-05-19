import connectDB from "@/lib/mongodb";
import Provider from "@/models/Provider";
import Assignment from "@/models/Assignment";

export async function GET() {

  await connectDB();

  const providers =
  await Provider.find();

  const data =
  await Promise.all(

    providers.map(async(provider)=>{

      const assignments =
      await Assignment.find({

        providerId:
        provider._id

      }).populate("leadId");

      return {

        _id:
        provider._id,

        name:
        provider.name,

        remainingQuota:
        provider.monthlyQuota -
        provider.usedQuota,

        assignedCount:
        assignments.length,

        leads:
        assignments.map(
          (a:any)=>
          a.leadId
        )

      };

    })

  );

  return Response.json({

    providers:data

  });

}