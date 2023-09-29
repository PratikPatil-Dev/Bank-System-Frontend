import { formatIndianCurrency } from "@/app/utils/constants";
import { useRouter } from "next/navigation";

const Cards = (props) => {
  // Page Router
  let { push } = useRouter();
  const directTo = (path) => {
    push(path);
  };

  //* Destructure props
  const { customerData } = props;

  return (
    <div className="w-11/12 m-auto md:flex md:my-8">
      {/* Card 1  */}
      <div class="flex flex-col max-w-7xl w-full md:w-[50%] h-full">
        <div class="flex flex-col lg:flex-row ">
          <div class="bg-gray-700 shadow-lg rounded-xl text-sm md:text-base items-start h-auto md:w-[90%]  justify-center py-4 md:px-8 px-3 md:mx-4 my-2 hover:shadow-2xl">
            <h1 className="text-center text-slate-300 font-semibold ">
              Customer Details
            </h1>
            <div class="w-full h-1 rounded bg-gray-300 my-2">
              <div class="w-[100%] h-1 rounded bg-[#2563ebff]"></div>
            </div>
            <div class="flex items-center justify-center w-full rounded-lg md:my-10 md:py-4 px-1 md:px-4 py-2 border border-slate-500 shadow-xl">
              <table className="w-full m-auto">
                <tbody>
                  <tr>
                    <td className="text-sm font-medium text-slate-200 mt-2">
                      Name :
                    </td>
                    <td className="text-sm font-medium text-[#36d7b7]">
                      {customerData?.Name}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-slate-200">
                      Age :
                    </td>
                    <td className="text-sm font-medium text-[#36d7b7]">
                      {customerData?.Age}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-slate-200">
                      City :
                    </td>
                    <td className="text-sm font-medium text-[#36d7b7]">
                      {customerData?.City}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-slate-200">
                      A/C Number :
                    </td>
                    <td className="text-sm font-medium text-[#36d7b7]">
                      {customerData?.Account_Number}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm font-medium text-slate-200">
                      Email Id :
                    </td>
                    <td className="text-sm font-medium text-[#36d7b7]">
                      {customerData?.Email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Card 2  */}
      <div className="flex flex-col max-w-7xl w-full md:w-3/6">
        <div class="flex flex-col max-w-7xl w-full ">
          <div class="flex flex-col lg:flex-row w-full">
            <div class="bg-gray-700 shadow-lg rounded-xl flex items-start h-auto w-full md:w-4/5 justify-center py-4 md:px-8 px-4 md:mx-4 m-auto my-2">
              <div class="flex items-center justify-start w-full">
                <div class="flex-col w-[85%]">
                  <div class="text-sm font-medium text-[#36d7b7] my-2">
                    Total Balance
                  </div>
                  <div class="class flex items-center">
                    <div class="text-3xl font-bold text-gray-200">
                      {formatIndianCurrency(customerData?.Current_Balance)}
                    </div>
                  </div>
                  <div class="w-full h-1 rounded bg-gray-300 my-1">
                    <div class="w-[100%] h-1 rounded bg-green-500"></div>
                  </div>
                  <div class="text-xs font-medium text-gray-400 ">
                    Status: Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Card 3  */}
        <div class="bg-gray-700 shadow-lg rounded-xl  items-start h-auto w-full md:w-4/5 justify-center py-4 md:px-8 px-4 md:mx-4 m-auto my-2 hover:shadow-2xl">
          <h1 className="text-center text-slate-300 font-semibold ">
            Transfer Money Between Accounts
          </h1>
          <div class="w-full h-1 rounded bg-gray-300 my-1">
            <div class="w-[100%] h-1 rounded bg-[#2563ebff]"></div>
          </div>
          <div className="flex justify-center">
            <button
              href="#"
              onClick={() => directTo(`/TransferMoney?id=${customerData._id}`)}
              class="flex bg-[#2563ebcc] rounded-lg font-medium  text-slate-100 hover:text-slate-400 hover:bg-[#2563ebff]  justify-center px-6 py-1 my-4"
            >
              <div className="font-semibold">TRANSFER NOW</div>
            </button>
          </div>
          <div class="text-xs font-medium text-gray-400">
            Click to transfer money from this account to other accounts.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
