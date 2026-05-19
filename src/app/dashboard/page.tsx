"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {

const [providers,setProviders]=
useState([]);

const [loading,setLoading]=
useState(true);


const loadDashboard=()=>{

fetch("/api/dashboard")

.then(res=>res.json())

.then(data=>{

setProviders(
data.providers
);

setLoading(false);

});

};


useEffect(()=>{

loadDashboard();

const interval=

setInterval(()=>{

loadDashboard();

},3000);


return()=>clearInterval(
interval
);

},[]);



if(loading){

return(

<div className="min-h-screen flex items-center justify-center">

Loading...

</div>

)

}



return(

<div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">


<nav className="bg-white shadow p-5 flex justify-between">

<h1 className="text-2xl font-bold">

Lead Distribution System

</h1>


<div>

Dashboard

</div>

</nav>




<div className="p-10">


<h1 className="text-5xl font-bold text-center mb-10">

Provider Dashboard

</h1>



<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


{

providers.map(

(provider:any)=>(

<div

key={provider._id}

className="bg-white rounded-3xl shadow-xl p-6"

>


<h2 className="text-2xl font-bold">

{provider.name}

</h2>



<p>

Remaining:

<b>

{provider.remainingQuota}

</b>

</p>



<p>

Assigned:

<b>

{provider.assignedCount}

</b>

</p>



{

provider.leads?.map(

(lead:any,index:number)=>(

<div

key={index}

className="border rounded p-2 mt-2"

>

<p>

{lead?.name}

</p>


<p>

{lead?.service}

</p>


</div>

)

)

}



</div>

)

)


}


</div>


</div>


</div>

)


}