import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        { username: email, password }
      );

      const token = response.data.token;
      if (!token) {
        alert("No token received!");
        return;
      }

      // Save token + email
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);

      // 🔥 Fetch user details
      const userDetails = await axios.get(
        "http://localhost:3000/api/v1/user/bulk?filter=" + email,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (userDetails.data.user && userDetails.data.user.length > 0) {
        const user = userDetails.data.user[0];
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);
      }

      alert("Sign in successful");
      navigate("/dashboard");
    } catch (e) {
      alert(e.response?.data?.message || "Signin failed");
    }
  };



  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            placeholder="Enter Email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputBox
            placeholder="Your Password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleSignin} />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

"pages/Signup"
