"use client";

export default function TestTools() {

const generateLeads =
async()=>{

for(
let i=0;
i<10;
i++
){

await fetch(

"/api/create-lead",

{

method:
"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

name:
"Test"+i,

phone:
String(
Date.now()+i
),

city:
"Ranchi",

service:
"Service 1",

description:
"bulk"

})

}

);

}


alert(
"10 leads generated"
);

};



const resetQuota =
async()=>{

const res =

await fetch(

"/api/webhook/reset-quota",

{

method:
"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

eventId:
"event-1"

})

}

);


const data =
await res.json();


alert(

data.message

);


};




return(

<div className="p-10">

<h1 className="text-4xl mb-10">

Test Tools

</h1>



<button

onClick={
generateLeads
}

className="bg-blue-500 text-white px-6 py-3 rounded mr-4"

>

Generate 10 Leads

</button>





<button

onClick={
resetQuota
}

className="bg-red-500 text-white px-6 py-3 rounded"

>

Reset Quota

</button>



</div>

)


}