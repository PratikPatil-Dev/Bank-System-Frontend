import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = () => {
  let { push } = useRouter();
  const directTo = (path) => {
    push(path);
  };
  return (
    <section className="md:flex  justify-between w-4/5 shadow-lg mx-auto p-4 bg-white">
      <div className="flex flex-col justify-center text-center md:text-left">
        <h1 className="text-black text-3xl md:w-3/5 font-semibold ">
          Transfer Money{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Faster,
          </span>{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Better
          </span>{" "}
          and
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            {" "}
            Secured
          </span>
        </h1>
        <p className="banner-text md:w-3/4 text-gray-500">
          Manage your customers accounts with the help of user-friendly
          graphical interface.
        </p>
        <button
          type="button"
          onClick={() => directTo("/ViewCustomers")}
          class="w-40 my-2 mx-auto md:mx-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 text-center md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Manage Accounts
        </button>
      </div>
      <div>
        <Image
          src="/transfer.jpeg"
          alt="Money transfer image"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Banner;
