import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Users from '../components/Users'
import Balance from '../components/Balance'

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch("http://localhost:2000/api/v1/user/balance", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ fixed spelling
          }
        });
        const data = await response.json();
        setBalance(data.balance || 0); // agar backend se balance milta hai
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };
    fetchBalance();
  }, [token]);

  return (
    <div>
      <Appbar applogo={"Paytm"} user={{ name: "Alex" }} />
      <div className="p-4">
        <Balance amount={balance} />
      </div>
      <Users />
    </div>
  )
}
