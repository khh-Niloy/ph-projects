import { Button } from "@/components/ui/button";
import React from "react";

const Login = () => {
  return (
    <div>
      Login
      <form>
        <label htmlFor="">Email</label>
        <input className="border" type="text" />
        <br />
        <label htmlFor="">Password</label>
        <input className="border" type="password" /> <br />
        <Button variant="outline" size="sm" className=" cursor-pointer">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
