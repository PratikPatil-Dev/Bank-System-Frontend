"use client";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Cards from "./Components/Cards";

const TransferMoney = () => {
  const [customersData, setCustomersData] = useState(null); // All usrer objects
  const [currentCustomer, setCurrentCustomer] = useState(null); // current selected user
  let [customerId, setCustomerId] = useState(null); // userId from params

  const getCustomerData = async () => {
    //* function to get users id from params
    const getCustomerName = () => {
      let searchQuery = window.location.search;
      let URLParams = new URLSearchParams(searchQuery);
      return URLParams.get("id");
    };

    const customerId = getCustomerName();
    customerId ? setCustomerId(customerId) : "";

    //* API call to get all users data
    try {
      const response = await fetch(`http://localhost:3030/api/customerDatas`);

      if (response.ok) {
        const data = await response.json();
        setCustomersData(data);
      } else {
        // Handle server errors or other issues
        console.error("Failed to fetch customer data");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }

    //* API call to get selected senders data
    try {
      const response = await fetch(
        `http://localhost:3030/api/customerDatas/${customerId}`
      );

      if (response.ok) {
        const data = await response.json();
        setCurrentCustomer(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //* Call main function on initial render
  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div className="page-container relative min-h-screen">
      <Navbar />
      <main className="pb-48 pt-20">
        <Cards
          customersData={customersData} //* Passing necessary info to cards
          customerId={customerId}
          currentCustomer={currentCustomer}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TransferMoney;
