// frontend/components/AppBar.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fn = localStorage.getItem("firstName") || "";
    const ln = localStorage.getItem("lastName") || "";
    const em = localStorage.getItem("email") || "";

    setFirstName(fn);
    setLastName(ln);
    setEmail(em);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    navigate("/signup");
  };

  const displayInitial =
    firstName?.[0]?.toUpperCase() || email?.[0]?.toUpperCase() || "U";

  const displayName =
    (firstName && lastName && `${firstName} ${lastName}`) ||
    firstName ||
    "User";

  return (
    <div className="shadow h-14 flex justify-between relative">
      <div className="flex flex-col justify-center h-full ml-4">
        PayTM App
      </div>

      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello
        </div>

        {/* Avatar */}
        <div
          className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="flex flex-col justify-center h-full text-xl">
            {displayInitial}
          </div>
        </div>
      </div>

      {/* Slide-down / dropdown panel */}
      {isOpen && (
        <div className="absolute right-4 top-14 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10">
          <div className="mb-3">
            <div className="font-semibold text-sm">{displayName}</div>
            <div className="text-xs text-slate-500 break-all">{email}</div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-sm font-medium bg-gray-800 text-white rounded-md py-2 hover:bg-gray-900"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
