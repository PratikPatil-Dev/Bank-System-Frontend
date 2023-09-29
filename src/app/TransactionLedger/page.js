"use client";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatIndianCurrency, formatTimeStamp } from "../utils/constants";

const ViewCustomers = () => {
  const [transactionData, setTransactionData] = useState([]); // Get all transactions from DB
  const [transactionList, setTransactionList] = useState([]);
  const [isSenderOpen, setIsSenderOpen] = useState(false);
  const [isRecieverOpen, setIsRecieverOpen] = useState(false);

  //* GET req to fetch all transactions from DB, Sort and storein state
  useEffect(() => {
    axios.get("http://localhost:3030/api/transactions").then((response) => {
      const sortedData = response.data.sort((a, b) => {
        const senderNameA = a.senderName.toLowerCase();
        const senderNameB = b.senderName.toLowerCase();

        if (senderNameA < senderNameB) {
          return -1;
        }
        if (senderNameA > senderNameB) {
          return 1;
        }
        return 0;
      });

      setTransactionData(sortedData);
      setTransactionList(sortedData); //* Copy to perform filtering actions
    });
  }, []);

  //* Filter Transactions based on Sender Name
  const filterBySender = (selectedSender) => {
    let filteredArr = [];
    transactionData?.map((transaction) => {
      if (
        transaction.senderName
          .toLowerCase()
          .includes(`${selectedSender.toLowerCase()}`)
      ) {
        filteredArr.push(transaction);
      }
    });
    setTransactionList([...filteredArr]);
    setIsSenderOpen(!isSenderOpen); // Control opening and closing of dropdown menu
  };

  //*Filter Transactions based on Reciver name
  const filterByReciever = (selectedReciever) => {
    let filteredArr = [];
    transactionData?.map((transaction) => {
      if (
        transaction.receiverName
          .toLowerCase()
          .includes(`${selectedReciever.toLowerCase()}`)
      ) {
        filteredArr.push(transaction);
      }
    });
    setTransactionList([...filteredArr]);
    setIsRecieverOpen(!isRecieverOpen); // control opening and closing of dropdown menu
  };

  //* functions to control dropdown menu
  const toggleSendersDropdown = () => {
    setIsSenderOpen(!isSenderOpen);
    setIsRecieverOpen(false);
  };
  const toggleRecieversDropdown = () => {
    setIsRecieverOpen(!isRecieverOpen);
    setIsSenderOpen(false);
  };

  return (
    <div className="flex flex-col justify-between page-container relative min-h-screen">
      <Navbar />
      <main className="pb-48 pt-20">
        <div className="bg-gray-700 shadow-lg rounded-xl items-start w-[90%] lg:w-[80%] justify-center py-4 px-8 mx-auto my-2 hover:shadow-2xl">
          <h1 className="text-center text-slate-300 font-semibold mb-4">
            Transaction Ledger
          </h1>
          <div className="flex justify-start flex-wrap gap-y-2	">
            <div className="border-blue-700 border-2 text-slate-100 text-sm rounded-xl px-4 py-1 mx-4 bg-blue-600 cursor-default">
              Filter
            </div>
            <div
              onClick={() => setTransactionList(transactionData)}
              className="border-blue-700 border-2 text-slate-300 text-sm rounded-xl px-4 py-1 mx-4 flex justify-center items-center hover:bg-blue-800 cursor-pointer transition-all"
            >
              <span className="px-2">All</span>
            </div>

            <div className="relative inline-block">
              <div
                className="border-blue-700 border-2 text-slate-300 text-sm rounded-xl px-4 py-1 mx-4 flex justify-center items-center hover:bg-blue-800 cursor-pointer transition-all"
                onClick={toggleSendersDropdown}
              >
                <span className="px-2">By Sender</span>
                <IoIosArrowDropdownCircle className="text-xl" />
              </div>
              {isSenderOpen && (
                <div className="absolute z-10 mt-1 ml-4 py-2 w-32 h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul>
                    {transactionData &&
                      [
                        ...new Set(
                          transactionData.map(
                            (transaction) => transaction.senderName
                          )
                        ),
                      ].map((senderName) => (
                        <li
                          key={senderName}
                          onClick={() => filterBySender(senderName)}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          {senderName}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative inline-block">
              <div
                className="border-blue-700 border-2 text-slate-300 text-sm rounded-xl px-4 py-1 mx-4 flex justify-center items-center hover:bg-blue-800 cursor-pointer transition-all"
                onClick={toggleRecieversDropdown}
              >
                <span className="px-2">By Reciever</span>
                <IoIosArrowDropdownCircle className="text-xl" />
              </div>
              {isRecieverOpen && (
                <div className="absolute z-10 mt-1 ml-4 py-2 w-32 h-60 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded bg-white border border-gray-300 rounded-lg shadow-lg">
                  <ul>
                    {transactionData &&
                      [
                        ...new Set(
                          transactionData.map(
                            (transaction) => transaction.senderName
                          )
                        ),
                      ].map((senderName) => (
                        <li
                          key={senderName}
                          onClick={() => filterByReciever(senderName)}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                          {senderName}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-1 rounded bg-gray-300 my-2">
            <div className="w-[100%] h-1 rounded bg-[#2563ebff]"></div>
          </div>

          <div className="overflow-x-auto rounded ">
            <table className="min-w-full table-auto ">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Remarks
                  </th>
                  <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionList.length > 0 ? (
                  transactionList?.map((transaction) => (
                    <tr key={transaction?.transactionId} className="bg-gray-300 hover:bg-white transition-colors">
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                        {transaction?.transactionId}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                        {transaction?.senderName}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                        {transaction?.receiverName}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                        {transaction?.amount &&
                          formatIndianCurrency(transaction?.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                        {transaction?.remarks ? transaction?.remarks : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                        {transaction?.timeStamp &&
                          formatTimeStamp(transaction?.timeStamp)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-gray-300 hover:bg-white transition-colors">
                    <td
                      colSpan="6"
                      className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm text-center"
                    >
                      No Transactions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewCustomers;
