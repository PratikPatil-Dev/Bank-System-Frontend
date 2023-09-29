import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import "./CustomerList.css";
import { useRouter } from "next/navigation";
import { formatIndianCurrency } from "@/app/utils/constants";

function CustomerList() {
  const [allCustomers, setAllCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // */ Page Router
  let { push } = useRouter();
  const directTo = (path) => {
    push(path);
  };

  //* Fetching Data of All users from DB

  useEffect(() => {
    fetch("http://localhost:3030/api/customerDatas")
      .then((response) => response.json())
      .then((data) => {
        setAllCustomers(data);
        setTimeout(() => setIsLoading(false), 1000);
      });
  }, []);

  //* Sorting users alphabetically

  useEffect(() => {
    allCustomers.sort((a, b) => a.Id - b.Id);
  }, [allCustomers]);

  return (
    <section className="flex flex-col justify-center items-center md:w-3/5 shadow-2xl mx-auto my-4 p-4 bg-white">
      {isLoading ? (
        <MoonLoader color="#36d7b7" speedMultiplier={2} />
      ) : (
        allCustomers?.map((customer) => (
          <div
            key={customer.Id}
            onClick={() => directTo(`/CustomerDetails?id=${customer._id}`)}
            className="customer-card flex shadow-lg justify-between w-full md:p-3 p-2 hover:bg-gray-100 hover:border-gray-300 cursor-pointer my-2 text-sm md:text-base"
          >
            <div className="w-1/5 flex items-center justify-center">
              <h1 className="id-field md:border-r-4 border-r-2 w-1/3 h-4/5 flex items-center border-gray-400">
                {customer.Id}
              </h1>
            </div>
            <div className="w-3/5">
              <div>
                <h1 className="name font-semibold">{customer.Name}</h1>
                <p className="city text-slate-500 ">{customer.City}</p>
              </div>
            </div>
            <div className="w-2/6 flex items-center">
              <h1 className="balance ">
                Balance: {formatIndianCurrency(customer.Current_Balance)}
              </h1>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default CustomerList;
