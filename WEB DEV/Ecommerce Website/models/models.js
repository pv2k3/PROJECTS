const mongoose = require("mongoose");
const cryto = require("node:crypto");

const nonTechInfo = {
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}

const pcs = {
    ...nonTechInfo,
    specification: {
        processor: {
            type: String
        },
        ram: {
            type: String
        },
        storage: {
            type: String
        },
        battery: {
            type: String
        },
        graphicCard: {
            type: String
        }
    }
}


const laptopSchema = new mongoose.Schema(pcs)

const desktopSchema = new mongoose.Schema(pcs)

const accessorySchema = new mongoose.Schema({
    ...nonTechInfo,
    description: {
        type: String,
        required: true
    }
})

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    itemsInCart: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        itemType: {
            type: String
        },
        qty: {
            type: Number
        }
    }],
    role : {
        type: String, 
        required: true
    },
    itemsBought: [{
        itemType: {
            type: String
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        qty: {
            type: Number
        }
    }],
    
}, { timestamps: true });

userSchema.pre("save", function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = cryto.randomBytes(16).toString();
    const hashedPassword = cryto.createHmac("sha256", salt).update(this.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

const User = mongoose.model("user", userSchema);
const Laptop = mongoose.model("laptop", laptopSchema);
const Desktop = mongoose.model("desktop", desktopSchema);
const Accessory = mongoose.model("accessories", accessorySchema);


module.exports = {
    User,
    Laptop,
    Desktop,
    Accessory
};