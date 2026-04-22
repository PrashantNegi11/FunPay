// frontend/src/pages/SendMoney.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate,useSearchParams } from "react-router-dom";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name") || "";
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();

  const handleTransfer = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in. Please sign in again.");
        return;
      }

      const amountNum = Number(amount);

      if (!amountNum || amountNum <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: amountNum,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert("Transfer successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Transfer error:", error);
      alert(error.response?.data?.message || "Transfer failed");
    }
  };


  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="border rounded-lg bg-white shadow-lg w-[400px] p-6">
          
          <h1 className="text-center text-3xl font-bold mb-6">Send Money</h1>

          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-xl text-white font-bold">
                {name[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <h3 className="text-2xl font-semibold">{name || "User"}</h3>
          </div>

          
          <div className="space-y-2 mb-4">
            <label
              htmlFor="amount"
              className="text-sm font-medium leading-none"
            >
              Amount (in Rs)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount"
            />
          </div>

          
          <button
            onClick={handleTransfer}
            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-600"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
"pages/Signin"