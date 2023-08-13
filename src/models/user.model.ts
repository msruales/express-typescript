import {model, Schema} from "mongoose"
import {User} from "../interfaces";
import {encrypt} from "../utils";

const UserSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },

},
    {
        toObject: {
            // transform: function (doc: Document, ret: Recor) {},
        },
        toJSON: {
            transform: function (_doc, ret) {
                delete ret.password;
            },
        },
    }

    )

UserSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await encrypt(this.get("password"));
        this.set("password", hashed);
    }
    done();
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...rest  } = this.toObject();
    rest.uid = _id;
    return rest;
}

export default model("User", UserSchema)