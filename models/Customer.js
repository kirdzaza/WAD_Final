import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Birth: {
        type: Date,
        required: true
    },
    Member: {
        type: Number,
        required: true
    },
    Interest: {
        type: String,
        required: true
    }
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
