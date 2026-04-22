// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user is not logged in");
      return;
    }

    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });
  }, []); // runs when Dashboard mounts

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={Number(balance).toFixed(2)} />

        <Users />
      </div>
    </div>
  );
};
