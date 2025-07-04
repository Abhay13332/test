import { z } from "zod";
const multerschema = z.object({
    type: z.enum([
        "Astar Poshak",
        "Satan Suit",
        "Cotton Suit",
        "Jod",
        "Odhni",
        "Printed",
        "Half Pure Poshak",
        "Zero Pure Poshak",
        "Pure Poshak"
    ]),
    description: z.string(),
    price: z.string().transform((price) => {
        const pr = Number(price);
        if (isNaN(pr)) {
            throw new Error(`${pr} is not a valid price`);
        }
        return pr;
    }),
    imageCount: z.string().transform((num) => {
        const numn = Number(num);
        if (isNaN(numn)) {
            throw new Error(`${num} is not a valid imagecount`);
        }
        return numn;
    })
});
