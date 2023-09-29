import { useEffect, useState } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BiSolidEditAlt } from "react-icons/bi";
import { formatIndianCurrency, BASE_API_URL } from "@/app/utils/constants";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Modal from "@/app/Modal/Modal";

const Cards = (props) => {
  let { customersData, currentCustomer } = props;
  let [customerNames, setCustomerNames] = useState([]); // All user names for dropdown list
  let [selectedCustomer, setSelectedCustomer] = useState(null); // selected senders name
  let [transferToCustomer, setTransferToCustomer] = useState(null); //set sender's name from inputBox
  let [currentBalance, setCurrentBalance] = useState(0); // set senders balance to check valid transfer
  let [transferAmount, setTransferAmount] = useState(0); // set amount to be transffered from inputBox
  let [errorMsg, setErrorMsg] = useState(""); // Dynamic error to user on inssufcient balance
  let [receiverCustomer, setRecieverCustomer] = useState(null); // set reciever's data
  let [senderCustomer, setSenderCustomer] = useState(currentCustomer); // set sender's data
  let [transactionObj, setTransactionObj] = useState({}); // Object to be passed in PATCH rew to ledger
  let [remarks, setRemarks] = useState(null); // set entered remarks from inputBox
  let [isTransferDone, setIsTransferDone] = useState(false); // Indicates transfer is successful
  let [isModal, setIsModal] = useState(false);

  let { push } = useRouter();

  const directTo = (path) => {
    push(path);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsModal(false); // close the Modal after 2 secs of updating balance
    }, 2000);
  }, [isTransferDone]);

  useEffect(() => {
    //* storing just names of users from all users data
    if (customersData) {
      let name = customersData
        ?.sort((a, b) => a.Id - b.Id)
        .map((customer) => customer.Name);
      setCustomerNames([...name]);
    }

    //* storing name of current user's name and current users balance
    setSelectedCustomer(currentCustomer?.Name);
    setCurrentBalance(currentCustomer?.Current_Balance);
  }, [customersData, currentCustomer]);

  //* Get senders and recievers Name
  useEffect(() => {
    let sender = customersData?.find((customer) => {
      return customer.Name === selectedCustomer;
    });

    if (sender) {
      setSenderCustomer(sender); //* store sender's data obj
    }
    let receiver = customersData?.find((customer) => {
      return customer.Name === transferToCustomer;
    });

    if (receiver) {
      setRecieverCustomer(receiver); //* store reciever user's data obj
    }
  }, [transferToCustomer, selectedCustomer]);

  //* Show error to user when entered amount is more than sender's balance
  useEffect(() => {
    if (transferAmount > currentBalance) {
      setErrorMsg(
        `Amount exceeds current balance. (${formatIndianCurrency(
          currentBalance
        )})`
      );
    } else {
      setErrorMsg(null);
    }
  }, [transferAmount, currentBalance]);

  //* Calculate and store sender's balance
  const updateSendersBalance = () => {
    let currentBalance = Number(currentCustomer?.Current_Balance);
    let updatedBalance = currentBalance - transferAmount;
    return updatedBalance;
  };

  //* Calculate and store receiver's Balance
  const updateRecieversBalance = () => {
    let currentBalance = Number(receiverCustomer?.Current_Balance);
    let updatedBalance = currentBalance + transferAmount;
    return updatedBalance;
  };

  useEffect(() => {
    updateSendersBalance();
    updateRecieversBalance();
  }, [transferAmount]);

  //* Create object with updated balance for PATCH req
  let sendersObject = {
    Current_Balance: updateSendersBalance(),
  };
  let recieversObject = {
    Current_Balance: updateRecieversBalance(),
  };

  //* PATCH req to update senders Balance in DB
  const updateSendersDocument = async () => {
    const response = await axios
      .patch(
        `${BASE_API_URL}/api/customerDatas/${senderCustomer?._id}`,
        sendersObject
      )
      .catch((error) => {
        console.log(error);
      });
  };

  //* PATCH req to update recievers Balance in DB
  const updateRecieversDocument = async () => {
    const response = await axios
      .patch(
        `${BASE_API_URL}/api/customerDatas/${receiverCustomer?._id}`,
        recieversObject
      )
      .catch((error) => {
        console.log(error);
      });

    if (response.status == 200 && response.data) {
      setIsTransferDone(true); //* Indicate transfer is complete when balance is updated
    }
  };

  //* function to generate random transactionId for each transaction
  const generateTransactionId = () => {
    const prefix = "TXN";
    const randomNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(8, "0");
    const transactionId = `${prefix}${randomNumber}`;
    return transactionId;
  };

  //* Create a object to be passed for PATCH req for TXN ledger
  useEffect(() => {
    setTransactionObj({
      sender: senderCustomer?._id,
      receiver: receiverCustomer?._id,
      senderName: senderCustomer?.Name,
      receiverName: receiverCustomer?.Name,
      amount: transferAmount,
      transactionId: generateTransactionId(),
      remarks: remarks,
    });
  }, [senderCustomer, receiverCustomer, transferAmount, remarks]);

  //* Post req to add new transaction to ledger DB collection
  const createTransaction = async () => {
    try {
      const transaction = await axios.post(
        `${BASE_API_URL}/api/transactions`,
        transactionObj
      );
    } catch (error) {
      console.log("Transaction Not Recorded");
    }
  };

  //* Update Sender and Receiver Balance after Transfer Amount has been deducted from both the accounts
  const executeCRUD = async () => {
    await updateSendersDocument();
    await updateRecieversDocument();
    return true;
  };

  //* Execute CRUD operations on click of submit button in form
  const validateAndExecuteCRUD = async () => {
    try {
      if (transferAmount <= 0) {
        // check for empty or invalid fields before allowing TXN
        toast.error("Transfer Amount cannot be zero");
      } else if (receiverCustomer == null) {
        toast.error("Please select a recipient to transfer money.");
      } else {
        setIsModal(true); //* Open Modal if No error is present and execute TXN
        await executeCRUD();
        setIsTransferDone(true);
        await createTransaction();
        directTo(`/SuccessPage?transactionId=${transactionObj.transactionId}`);
      }
    } catch (error) {
      console.log(error, "transaction failed");
    }
  };

  return (
    <>
      <div>
        <div>
          <Toaster />
        </div>
        <div className="bg-gray-700 shadow-lg rounded-xl items-start w-[90%] lg:w-[80%] justify-center py-4 px-8 mx-auto my-2 hover:shadow-2xl">
          <h1 className="text-center text-slate-300 font-semibold">
            Transfer Money
          </h1>
          <div className="w-full h-1 rounded bg-gray-300 my-1">
            <div className="w-[100%] h-1 rounded bg-[#2563ebff]"></div>
          </div>
          <div className="w-full rounded-lg md:my-10 my-4 border border-slate-500 shadow-xl md:p-8 p-2 ">
            <div className="md:flex items-center justify-center w-full">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="md:w-4/5 w-full ">
                  <div className="my-2">
                    <h1 className="text-slate-100 text-center">
                      Transfer From*
                    </h1>
                    <div className="relative md:w-3/5 w-4/5 m-auto">
                      <select
                        name="selectFrom"
                        value={selectedCustomer}
                        onChange={(e) => {
                          setSelectedCustomer(e.target.value);
                        }}
                        className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring focus:border-blue-400"
                      >
                        {customerNames.length > 1
                          ? customerNames.map((name) => (
                              <option key={name} value={name}>
                                {name}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none bg-slate-300 rounded-lg">
                        <IoIosArrowDropdownCircle className="text-gray-500 text-xl " />
                      </div>
                    </div>
                  </div>
                  <div>
                    <BsArrowDownUp className="text-gray-300 text-xl mx-auto " />
                  </div>
                  <div className="my-2">
                    <h1 className="text-slate-100 text-center">Transfer To*</h1>
                    <div className="relative md:w-3/5 w-4/5 m-auto">
                      <select
                        name="selectTo"
                        value={transferToCustomer || ""}
                        onChange={(e) => {
                          setTransferToCustomer(e.target.value);
                        }}
                        className="block w-full mt-2 border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring focus:border-blue-400"
                      >
                        <option value="" disabled>
                          Select a recipient
                        </option>
                        {customerNames.length > 1
                          ? customerNames.map((name) => (
                              <option
                                disabled={
                                  name === selectedCustomer ? true : false
                                }
                                key={name}
                                value={name}
                              >
                                {name}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none bg-slate-300 rounded-lg">
                        <IoIosArrowDropdownCircle className="text-gray-500 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="md:w-4/5 w-full">
                  <div className="w-full my-2">
                    <h1 className="text-slate-100 text-center">Amount*</h1>
                    <div className="relative md:w-3/5 w-4/5 m-auto">
                      <input
                        type="text"
                        value={transferAmount}
                        onChange={(e) => {
                          setTransferAmount(Number(e.target.value));
                        }}
                        className={`block w-full mt-2 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring  focus:border-blue-400 ${
                          transferAmount > currentBalance ? "ring-red-500" : ""
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none bg-slate-300 rounded-lg">
                        <LiaRupeeSignSolid className="text-gray-700 text-xl" />
                      </div>
                    </div>
                    <div className="relative w-3/5 m-auto">
                      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                    </div>
                  </div>
                  <div className="w-full my-2">
                    <h1 className="text-slate-100 text-center">Remarks</h1>
                    <div className="relative md:w-3/5 w-4/5 m-auto">
                      <input
                        type="text"
                        onChange={(e) => {
                          setRemarks(`${e.target.value}`);
                        }}
                        className="block w-full mt-2 mx-auto border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring focus:border-blue-400"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none bg-slate-300 rounded-lg">
                        <BiSolidEditAlt className="text-gray-500 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-8">
              <button
                type="button"
                onClick={() => {
                  validateAndExecuteCRUD();
                }}
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center mr-3 md:mr-0 "
              >
                Confirm
              </button>
            </div>
            <p className="text-sm text-slate-400">
              * marked fields are mandatory.
            </p>
          </div>
        </div>
      </div>
      {isModal ? <Modal /> : ""}
    </>
  );
};

export default Cards;
