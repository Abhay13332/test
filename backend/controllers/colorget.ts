
import ColorNamer from "color-namer";
import cloudinary from "../util/cloudinary.ts";
// import getColors from 'get-image-colors';

import {Image } from "../models/imageData.ts"
import streamifier from "streamifier";
 const colornamer=(await import("color-namer")).default;
import getColors from "get-image-colors";
import type { Options } from "get-image-colors";
 import type { RouteHandlerMethod } from "fastify";
  type reqBody={
    "description":string,
    "type":"Astar Poshak"|"Satan Suit"| "Cotton Suit"|"Jod"|"Odhni"|"Printed"|"Half Pure Poshak"|"Zero Pure Poshak"|"Pure Poshak",
    "price":`${number}`,
   
    "title":string,
     "specs":string[]

}
const getcolor:((buff:Buffer,options:Options|string)=>Promise<[string,ColorNamer.Color]>)=async (buff:Buffer,options:Options|string)=>{
    const colors=await getColors(buff,options);
    const top=colors[0].hex();
    const name=colornamer(top).ntc[0];
return [top,name]
}

type changeparamtypefirst<T extends (...args:any[])=> any,K> =T extends ((a:infer U,...b:infer V) => infer W) ?((a:U & K,...b:V)=> W):never ;
export const fileprocess:changeparamtypefirst<RouteHandlerMethod,{body:reqBody }> =async(req)=>{
    // let files= req.files();
        console.log("st");
     const colors:string[]=[];
    const colorNames: ColorNamer.Color["name"][] =[];
    const promiseArr:Promise<unknown>[]=[];
    const imagenames:string[]=[];
    let ind=0;
    let data:reqBody ={specs:[],description:"",title:"",type:"Cotton Suit",price:"1000",};
    let itrtxt= req.parts();
    console.log("exc");
     type Omitn<T,keys extends keyof T>=Omit<T,keys>
    const check=function(part:string):part is keyof Omitn<reqBody,"specs"> {
        return part in data;
    }
    const valuecheck=function(value:unknown,key:keyof reqBody) :value is reqBody[typeof key] {
          return  typeof value=="string";
         

    }
      for await (const part of itrtxt){
          if(part.type!="file"){
                            console.log("gh")
                if(part.fieldname=="specs"){
                    
                 data.specs.push(part.value as string);
                }else{
                        if(part.fieldname!=undefined ){
                            const fln=part.fieldname ;
                            if(check(fln)){
                                if(valuecheck(part.value,fln)){
                                    //@ts-expect-error
                          data[fln]=part.value as (reqBody)[typeof fln];
                        }}
                        }
                }
          }else{
           
             let filebuffer=await part.toBuffer();
                  let color=await getcolor(filebuffer,part.mimetype);
                colors.push(color[0]);
                colorNames.push(color[1].name);
                const filename=`${Date.now()}/${ind++}.jpg`;

                promiseArr.push(uploadBufferToCloudinary(filebuffer,filename));
                imagenames.push(filename);
            
          }
       }
  
     
      
    
  // console.log("somethingstart"+JSON.stringify(filebuffer)+"hjk");
   
    await Promise.all(promiseArr);
    Image.create( ({
        type:data.type,
        description:data.description,
            inStock:true,
            price:data.price,
            images:imagenames,
                colors:colors,
                colorNames:colorNames,
                    title:data.title
                    ,reviewCount:0,
                    ratings:4,
                    features:data.specs
                    


    }))
         console.log("done");
    return {"upload":"success"};







}

function uploadBufferToCloudinary(buffer:Buffer, filename:string) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { public_id: filename, resource_type: "image",folder:"poshaks"  },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}

