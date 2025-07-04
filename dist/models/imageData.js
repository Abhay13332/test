import * as mongoose from "mongoose";
const ImageSchema = new mongoose.Schema({
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ["Astar Poshak", "Satan Suit", "Cotton Suit", "Jod", "Odhni", "Printed", "Half Pure Poshak", "Zero Pure Poshak", "Pure Poshak"] },
    price: Number,
    images: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    colorNames: [{ type: String, required: true }],
    detailedDescription: { type: String },
    title: { type: String, required: true },
    originalPrices: { type: Number },
    ratings: Number,
    reviewCount: Number,
    specifications: { type: [{ key: String, value: String }], required: false },
    features: [String],
    inStock: { type: Boolean },
}, {
    timestamps: true,
    strict: true,
});
ImageSchema.statics.imageDataByTitle = function (title) {
    return this.findOne({ title: title });
};
ImageSchema.statics.imageDataById = function (id) {
    return this.findById(id);
};
ImageSchema.statics.getSuits = function () {
    return this.find({ $nin: ["Jod", "Odhni", "Printed"] });
};
ImageSchema.statics.priceUpdate = async function (id, price) {
    const document = await this.findOne({ id: id });
    if (!document.originalPrices) {
        await this.aggregate([{ $match: { id } }, { $set: { originalPrice: price } }, { $set: { price: price } }]);
    }
    else {
        await this.findOneAndUpdate({ id: id }, { $set: { price: price } });
    }
};
ImageSchema.statics.updateRatings = function (id, rating) {
    this.aggregate([
        { $match: { id } },
        { $set: { ratings: {
                    $divide: [
                        { $add: ["$ratings", rating] }, 2
                    ]
                }
            },
        }
    ]);
};
ImageSchema.statics.imageDatagetbyType = function (...args) {
    return this.find({ $in: [...args] });
};
export const Image = mongoose.model('Image', ImageSchema);
export default Image;
