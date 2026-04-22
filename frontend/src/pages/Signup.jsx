// frontend/src/pages/Signup.jsx
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState(""); // this is email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // inside Signup component

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username,
          firstName,
          lastName,
          password,
        }
      );

      const token = response.data.token;
      if (!token) {
        alert("No token received from backend!");
        return;
      }

      // 🔹 Store details for Appbar
      localStorage.setItem("token", token);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("email", username);

      alert("Signup successful");
      navigate("/dashboard");
    } catch (e) {
      console.error("Signup error:", e);
      alert(
        e.response?.data?.message ||
          "Signup failed. Please check your inputs or try a different email."
      );
    }
  };


  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />

          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="123456"
            label={"Password"}
            type="password"
          />

          <div className="pt-4">
            <Button onClick={handleSignup} label={"Sign up"} />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
