import Image from "next/image";

const Cards = () => {
  return (
    <section className="w-4/5 mx-auto my-8 p-4 bg-white shadow-xl">
      <h1 className="font-semibold text-2xl">Features</h1>
      {/* Cards */}
      <div className="md:flex flex-wrap justify-between">
        <div className="shadow-lg flex md:w-2/5 md:px-4 py-4 ">
          <div className="border-r-2 w-fit flex justify-center items-center">
            <Image
              src="/transfer1.jpeg"
              alt="Transfer money"
              width={120}
              height={120}
            />
          </div>
          <div className="p-2">
            {" "}
            <h1 className="font-semibold">Transfer Money Easily</h1>{" "}
            <p className="text-sm text-slate-500">
              Transfer money between all the customers seamlessly with just a
              few clicks.
            </p>
          </div>
        </div>
        <div className="shadow-lg flex md:w-2/5 md:px-4 py-4">
          <div className="border-r-2 w-fit flex justify-center items-center">
            <Image
              src="/find.jpg"
              alt="Transfer money"
              width={120}
              height={120}
            />
          </div>
          <div className="p-2">
            {" "}
            <h1 className="font-semibold">View Records In Ledger</h1>{" "}
            <p className="text-sm text-slate-500">
              Get a detailed overview of all the transactions happen on the
              ledger.
            </p>
          </div>
        </div>
        <div className="shadow-lg flex md:w-2/5 md:px-4 py-4">
          <div className="border-r-2 w-fit flex justify-center items-center">
            <Image
              src="/users.jpg"
              alt="Transfer money"
              width={100}
              height={120}
              className="pr-2"
            />
          </div>
          <div className="p-2">
            {" "}
            <h1 className="font-semibold">Get Detailed look at Users</h1>{" "}
            <p className="text-sm text-slate-500">
              Get detailed insights about individual customer to get more
              control as a admin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
