"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// import { Company } from "./Company"
// Schema
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0,
        required: true
    },
});
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 0] = "Female";
})(Gender || (Gender = {}));
// Export this for strong typing
// export interface UserPopulatedDocument extends UserBaseDocument {
//     company: Company;
// }
// Virtuals
UserSchema.virtual("fullName").get(function () {
    return this.firstName + this.lastName;
});
// Methods
UserSchema.methods.getGender = function () {
    return this.gender > 0 ? "Male" : "Female";
};
// Static methods
// UserSchema.statics.findMyCompany = async function(
//     this: Model<UserDocument>,
//     id: string
// ) {
//     return this.findById(id).populate("company").exec()
// }
// Document middlewares
// UserSchema.pre<UserDocument>("save", function(next) {
//     if (this.isModified("password")) {
//         this.password = hashPassword(this.password)
//     }
// });
// Query middlewares
// UserSchema.post<Query<UserDocument, UserDocument>>("findOneAndUpdate", async function(doc) {
//     await updateCompanyReference(doc);
// });
// Default export
exports.default = (0, mongoose_1.model)("User", UserSchema);
