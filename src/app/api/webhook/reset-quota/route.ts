import connectDB from "@/lib/mongodb";

import Provider from "@/models/Provider";

import WebhookEvent from "@/models/WebhookEvent";


export async function POST(
req: Request
){

try{

await connectDB();


const body =
await req.json();


const eventId =
body.eventId;



const existing =

await WebhookEvent.findOne({

eventId

});


if(
existing
){

return Response.json({

success:true,

message:

"Duplicate webhook ignored"

});

}



await WebhookEvent.create({

eventId

});




await Provider.updateMany(

{},

{

$set:{

usedQuota:0

}

}

);



return Response.json({

success:true,

message:

"Quota reset"

});


}catch(error:any){


return Response.json({

success:false,

error:

error.message

});


}


}