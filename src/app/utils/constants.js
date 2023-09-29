export const BASE_API_URL = "http://localhost:3030";

export const formatIndianCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const formatTimeStamp = (timeStamp) => {
  let time = new Date(timeStamp);

  let formattedDate = time.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return formattedDate;
};
