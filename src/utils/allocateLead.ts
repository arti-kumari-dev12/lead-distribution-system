import Provider from "@/models/Provider";
import Assignment from "@/models/Assignment";
import AllocationState from "@/models/AllocationState";

const pools: any = {
  "Service 1": [
    "Provider 2",
    "Provider 3",
    "Provider 4",
  ],

  "Service 2": [
    "Provider 6",
    "Provider 7",
    "Provider 8",
  ],

  "Service 3": [
    "Provider 2",
    "Provider 3",
    "Provider 5",
    "Provider 6",
    "Provider 7",
    "Provider 8",
  ],
};


const mandatoryProviders: any = {

  "Service 1":
  ["Provider 1"],

  "Service 2":
  ["Provider 5"],

  "Service 3":
  ["Provider 1","Provider 4"]

};



export async function allocateLead(

leadId:string,

service:string

){

const assignedProviders:any[]=[];


const mandatory=

mandatoryProviders[
service
] || [];


for(

const providerName

of mandatory

){

const provider=

await Provider.findOne({

name:
providerName

});


if(

provider &&

provider.usedQuota <
provider.monthlyQuota

){

const updated=

await Provider.findOneAndUpdate(

{

_id:
provider._id,

usedQuota:{

$lt:
provider.monthlyQuota

}

},

{

$inc:{

usedQuota:1

}

},

{

new:true

}

);


if(updated){

assignedProviders.push(
updated
);


await Assignment.create({

leadId,

providerId:
updated._id

});

}


}


}



const remainingSlots=

3 -
assignedProviders.length;


if(
remainingSlots<=0
){

return;

}



const state=

await AllocationState.findOne({

service

});



const pool=

pools[
service
] || [];


let currentIndex=

state.currentIndex;


let added=0;



while(

added <
remainingSlots

){

const providerName=

pool[
currentIndex %
pool.length
];


currentIndex++;



const provider=

await Provider.findOne({

name:
providerName

});


if(
!provider
)
continue;



const alreadyAssigned=

assignedProviders.find(

(p)=>

p.name ===
provider.name

);


if(
alreadyAssigned
)
continue;



const updated=

await Provider.findOneAndUpdate(

{

_id:
provider._id,

usedQuota:{

$lt:
provider.monthlyQuota

}

},

{

$inc:{

usedQuota:1

}

},

{

new:true

}

);


if(
!updated
)
continue;



assignedProviders.push(
updated
);



await Assignment.create({

leadId,

providerId:
updated._id

});


added++;

}



state.currentIndex=

currentIndex;


await state.save();


}