import cloudinary from "../util/cloudinary.js";
// import getColors from 'get-image-colors';
import { Image } from "../models/imageData.js";
import streamifier from "streamifier";
const colornamer = (await import("color-namer")).default;
import getColors from "get-image-colors";
const getcolor = async (buff, options) => {
    const colors = await getColors(buff, options);
    const top = colors[0].hex();
    const name = colornamer(top).ntc[0];
    return [top, name];
};
export const fileprocess = async (req) => {
    // let files= req.files();
    console.log("st");
    const colors = [];
    const colorNames = [];
    const promiseArr = [];
    const imagenames = [];
    let ind = 0;
    let data = { specs: [] };
    let itrtxt = req.parts();
    console.log("exc");
    for await (const part of itrtxt) {
        if (part.type != "file") {
            console.log("gh");
            if (part.fieldname == "specs") {
                data.specs.push(part.value);
            }
            else {
                data[part.fieldname] = part.value;
            }
        }
        else {
            let filebuffer = await part.toBuffer();
            let color = await getcolor(filebuffer, part.mimetype);
            colors.push(color[0]);
            colorNames.push(color[1].name);
            const filename = `${Date.now()}/${ind++}.jpg`;
            promiseArr.push(uploadBufferToCloudinary(filebuffer, filename));
            imagenames.push(filename);
        }
    }
    // console.log("somethingstart"+JSON.stringify(filebuffer)+"hjk");
    await Promise.all(promiseArr);
    Image.create(({
        type: data.type,
        description: data.description,
        inStock: true,
        price: data.price,
        images: imagenames,
        colors: colors,
        colorNames: colorNames,
        title: data.title,
        reviewCount: 0,
        ratings: 4,
        features: data.specs
    }));
    console.log("done");
    return { "upload": "success" };
};
function uploadBufferToCloudinary(buffer, filename) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ public_id: filename, resource_type: "image", folder: "poshaks" }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}
