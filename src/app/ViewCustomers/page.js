"use client";

import Navbar from "../Components/Navbar/Navbar";

import CustomerList from "./components/CustomerList";
import Footer from "../Components/Footer/Footer";

const ViewCustomers = () => {

  return (
    <div className="flex flex-col justify-between  page-container relative min-h-screen ">
      <Navbar />
      <main className="pb-48 pt-20">
        <CustomerList />
      </main>
      <Footer />
    </div>
  );
};

export default ViewCustomers;
