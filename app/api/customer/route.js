import Customer from "@/models/Customer";

export async function GET() {
    const customers = await Customer.find();
    return new Response(JSON.stringify(customers), {
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(request) {
    const body = await request.json();
    console.log(body);
    const customer = new Customer(body);
    await customer.save();
    return new Response(JSON.stringify(customer), {
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
    if (!customer) {
        return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(customer), {
        headers: { "Content-Type": "application/json" },
    });
}

export async function PATCH(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const customer = await Customer.findByIdAndUpdate(_id, updateData, { new: true });
    if (!customer) {
        return new Response("Customer not found", { status: 404 });
    }
    return new Response(JSON.stringify(customer), {
        headers: { "Content-Type": "application/json" },
    });
}
