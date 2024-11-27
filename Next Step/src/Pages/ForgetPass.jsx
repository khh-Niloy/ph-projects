import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { auth } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ForgetPass = () => {
  const { user, loginPageEmail, setloginPageEmail, resetPass, toastShow } =
    useContext(AuthContext);

  function handleReset(e) {
    e.preventDefault();
    const email = loginPageEmail;

    resetPass(email)
      .then((res) => {
        toastShow("success", "check email");
        window.open("https://mail.google.com/");
      })
      .catch((error) => {
        toastShow("error", `Failed to create account: ${error.message}`);
      });
  }

  return (
    <>
      <Helmet>
        <title>Forget Pass | NextStep</title>
      </Helmet>

      <div className="w-[80%] flex items-center justify-center pt-5 pb-16 mx-auto flex-col">
        <h1 className="text-3xl font-semibold mt-10">Reset your password</h1>
        <p className="mt-1.5 text-black/60 text-center text-xs">
          Enter with your <span className="text-black">registered email</span>{" "}
          on the login page; <br /> otherwise, the reset password email field
          will stay empty.
        </p>
        <form className="flex flex-col" onSubmit={handleReset}>
          <input
            type="email"
            name="email"
            value={loginPageEmail}
            readOnly
            className="border border-black/15 p-3 text-black rounded-lg  mt-10 focus:outline-[black]/10"
          />
          <button className="bg-[#1888F5] text-white py-2 rounded-full shadow-xl mt-5">
            reset password
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPass;
