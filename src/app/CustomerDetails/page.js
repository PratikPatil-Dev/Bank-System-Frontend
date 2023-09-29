"use client";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import Cards from "./Components/Cards";
import axios from "axios";

const CustomerDetails = () => {
  const [customerData, setCustomerData] = useState(null);

  const getCustomerData = async () => {
    //* Get the customer ID from URL parameters
    const getCustomerId = () => {
      const searchQuery = window.location.search;
      const params = new URLSearchParams(searchQuery);
      return params.get("id");
    };

    const customerId = getCustomerId();

    if (customerId) {
      try {
        //* Fetch customer data based on the ID
        const response = await fetch(
          `http://localhost:3030/api/customerDatas/${customerId}`
        );

        if (response.ok) {
          //* Parse and set the customer data
          const data = await response.json();
          setCustomerData(data);
        } else {
          console.error("Failed to fetch customer data");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }
  };

  //* calling the main function on inital render
  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className=" page-container relative min-h-screen">
      <Navbar />
      <main className="pb-48 pt-20">
        {/* Pass the customerData to the Cards component */}
        <Cards customerData={customerData} />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDetails;
