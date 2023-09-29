"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isResponsiveDivOpen, setResponsiveDivOpen] = useState(false);

  let { push } = useRouter();
  const directTo = (path) => {
    push(path);
  };
  return (
    <nav class="bg-white dark:bg-gray-900  w-full border-b border-gray-200 dark:border-gray-600 fixed top-0 z-50">
      <div class="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            width={30}
            height={30}
            class="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            EZ-TransX
          </span>
        </a>
        <div class="flex md:order-2">
          <button
            type="button"
            onClick={() => directTo("/ViewCustomers")}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>
          <button
            onClick={() => {
              setResponsiveDivOpen(!isResponsiveDivOpen);
            }}
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white border-b-2 hover:border-blue-700 cursor-pointer"
                onClick={() => directTo("/")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => directTo("/ViewCustomers")}
                class="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white border-b-2 hover:border-blue-700 cursor-pointer"
              >
                View All Customers
              </a>
            </li>
            <li>
              <a
                onClick={() => directTo("/TransactionLedger")}
                class="block py-2 pl-3 pr-4 text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white  cursor-pointer border-b-2 hover:border-blue-700"
              >
                Transactions Ledger
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`responsive-div absolute z-50 top-15 bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600 h-auto transition-all duration-200	 ease-in delay-150 ${
          isResponsiveDivOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col text-black mb-10">
          <li>
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-gray-900 font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white border-b-2 border-gray-500 hover:border-blue-700 cursor-pointer"
              onClick={() => directTo("/")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => directTo("/ViewCustomers")}
              class="block py-2 pl-3 pr-4 text-gray-900 font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white border-b-2 border-gray-500 hover:border-blue-700 cursor-pointer"
            >
              View All Customers
            </a>
          </li>
          <li>
            <a
              onClick={() => directTo("/TransactionLedger")}
              class="block py-2 pl-3 pr-4 text-gray-900 font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white  cursor-pointer border-b-2 border-gray-500 hover:border-blue-700"
            >
              Transactions Ledger
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
