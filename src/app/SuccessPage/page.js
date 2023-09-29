"use client";

import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { formatIndianCurrency, formatTimeStamp } from "../utils/constants";

const SuccessPage = () => {
  const [txnId, setTxnId] = useState(null); // set transaction Id from params
  const [transaction, setTransaction] = useState(null); // fetch specific transaction by its ID

  //* Get TXN Id from params
  useEffect(() => {
    const query = window.location.search;
    const URLParams = new URLSearchParams(query);
    const transactionId = URLParams.get("transactionId");
    setTxnId(transactionId);
  }, []);

  //* Fetch Transaction details using txn id and store it in state variable
  useEffect(() => {
    const transactionData = axios
      .get(`http://localhost:3030/api/transactions/${txnId}`)
      .then((Response) => {
        setTransaction(Response.data);
      });
  }, [txnId, transaction]);

  return (
    <>
      <div className="page-container relative min-h-screen">
        <Navbar />
        <main className="pb-48 pt-20">
          <div className="bg-gray-700 shadow-lg rounded-xl items-start w-[90%] lg:w-[80%] justify-center py-4 px-8 mx-auto my-2 hover:shadow-2xl">
            <h1 className="text-center text-slate-300 font-semibold">
              Transaction Details
            </h1>
            <div className="w-full h-1 rounded bg-gray-300 my-1">
              <div className="w-[100%] h-1 rounded bg-[#2563ebff]"></div>
            </div>
            <div className="w-full rounded-lg md:my-10 my-2 border border-slate-500 shadow-xl md:p-8 md:flex justify-between">
              <section className="md:w-1/3 w-full flex justify-center items-center">
                <div className="md:w-full w-1/3">
                  <Image
                    src="/tick.png"
                    width={200}
                    height={200}
                    className="m-auto"
                    priority={true}
                  />
                </div>
              </section>
              <section className="border border-slate-500 md:p-8 p-4 md:w-2/3 w-full">
                <table className="w-full h-auto border-separate md:border-spacing-3 border-spacing-2">
                  <tbody>
                    <tr>
                      <td className="text-sm font-medium text-slate-200">
                        <span className="">From:</span>
                      </td>
                      <td className="text-sm font-medium text-[#36d7b7]">
                        {transaction?.senderName}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-slate-200">
                        <span className="">To:</span>
                      </td>
                      <td className="text-sm font-medium text-[#36d7b7]">
                        {transaction?.receiverName}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-slate-200">
                        <span className="]">Amount Transferred:</span>
                      </td>
                      <td className="text-sm font-medium text-[#36d7b7]">
                        {formatIndianCurrency(transaction?.amount) ||
                          transaction?.amount}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-slate-200">
                        <span>Transaction Id:</span>
                      </td>
                      <td className="text-sm font-medium text-[#36d7b7]">
                        {transaction?.transactionId}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-sm font-medium text-slate-200">
                        <span>Time:</span>
                      </td>
                      <td className="text-sm font-medium text-[#36d7b7]">
                        {formatTimeStamp(transaction?.timeStamp)}
                      </td>
                    </tr>
                    {transaction?.remarks && (
                      <tr>
                        <td className="text-sm font-medium text-slate-200">
                          <span>Remarks:</span>
                        </td>
                        <td className="text-sm font-medium text-[#36d7b7]">
                          {transaction?.remarks}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SuccessPage;
