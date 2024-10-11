// app/customer/[id]/page.js
import React from 'react';

const CustomerDetail = async ({ params }) => {
    const { id } = params; // Extract the ID from the route parameters

    // Fetch customer data from the API using the query parameter format
    const res = await fetch(`http://localhost:3000/api/customer/?id=${id}`, {
        next: { revalidate: 10 }, // Optional: Cache the data for 10 seconds
    });

    // Check if the response is okay
    if (!res.ok) {
        let errorMessage = "Error fetching customer details.";
        try {
            const errorData = await res.json(); // Try to parse the error response as JSON
            errorMessage = errorData.message || errorMessage; // Use the error message if available
        } catch (err) {
            console.error("Failed to parse error response:", err); // Log parsing error
        }
        console.error("Error fetching customer details:", errorMessage);
        return <div>{errorMessage} Status: {res.status}</div>; // Display error message
    }

    const customer = await res.json();

    // Attempt to format the birth date
    let birthDate;
    if (customer.Birth) {
        birthDate = new Date(customer.Birth);
        if (isNaN(birthDate)) {
            birthDate = "Invalid date format"; // Handle invalid date formats
        } else {
            birthDate = birthDate.toLocaleDateString(); // Format date
        }
    } else {
        birthDate = "Date not provided"; // Handle missing date
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{customer.Name}</h1>
            <p><strong>Birth:</strong> {birthDate}</p>
            <p><strong>Member ID:</strong> {customer.Member || "Not provided"}</p>
            <p><strong>Interest:</strong> {customer.Interest || "Not provided"}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default CustomerDetail;
