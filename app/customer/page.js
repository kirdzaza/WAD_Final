"use client"; // This line marks the component as a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Note: use next/navigation for Next.js 13 and above

const CustomerManagement = () => {
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ Name: "", Birth: "", Member: "", Interest: "" });
    const [editCustomer, setEditCustomer] = useState(null);

    // Fetch customers
    const fetchCustomers = async () => {
        const response = await fetch("http://localhost:3000/api/customer");
        const data = await response.json();
        setCustomers(data);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Add new customer
    const addCustomer = async () => {
        const response = await fetch("http://localhost:3000/api/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCustomer),
        });

        if (response.ok) {
            setNewCustomer({ Name: "", Birth: "", Member: "", Interest: "" });
            fetchCustomers(); // Refresh the list
        } else {
            console.error("Failed to add customer");
        }
    };

    // Update existing customer
    const updateCustomer = async () => {
        const response = await fetch("http://localhost:3000/api/customer", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editCustomer),
        });

        if (response.ok) {
            setEditCustomer(null); // Reset the edit form
            fetchCustomers(); // Refresh the list
        } else {
            console.error("Failed to update customer");
        }
    };

    // Delete customer
    const deleteCustomer = async (id) => {
        const response = await fetch(`http://localhost:3000/api/customer/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            fetchCustomers(); // Refresh the list
        } else {
            console.error("Failed to delete customer");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Add New Customer</h2>
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newCustomer.Name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, Name: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="date"
                        placeholder="Birth"
                        value={newCustomer.Birth}
                        onChange={(e) => setNewCustomer({ ...newCustomer, Birth: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Member"
                        value={newCustomer.Member}
                        onChange={(e) => setNewCustomer({ ...newCustomer, Member: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Interest"
                        value={newCustomer.Interest}
                        onChange={(e) => setNewCustomer({ ...newCustomer, Interest: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={addCustomer}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Add Customer
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">Customer List</h2>
            <ul className="bg-white shadow rounded">
                {customers.map(customer => (
                    <li key={customer._id} className="flex justify-between items-center p-4 border-b">
                        <div onClick={() => router.push(`/customer/${customer._id}`)} className="cursor-pointer">
                            <h3 className="font-medium">{customer.Name}</h3>
                            <p>{customer.Interest}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => setEditCustomer(customer)}
                                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteCustomer(customer._id)}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editCustomer && (
                <div className="mt-6 bg-gray-100 p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2">Edit Customer</h2>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            value={editCustomer.Name}
                            onChange={(e) => setEditCustomer({ ...editCustomer, Name: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <input
                            type="date"
                            value={editCustomer.Birth}
                            onChange={(e) => setEditCustomer({ ...editCustomer, Birth: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            value={editCustomer.Member}
                            onChange={(e) => setEditCustomer({ ...editCustomer, Member: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            value={editCustomer.Interest}
                            onChange={(e) => setEditCustomer({ ...editCustomer, Interest: e.target.value })}
                            className="border p-2 rounded"
                        />
                        <button
                            onClick={updateCustomer}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                        >
                            Update Customer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerManagement;
