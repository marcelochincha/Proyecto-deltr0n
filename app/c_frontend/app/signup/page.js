"use client";
import Link from "next/link";
import { useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function SignupPage() {
  const [ruc, setRUC] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [razon_social, setRazonSocial] = useState("");
  const [telefono, setTelefono] = useState("");

  const rucHandler = (e) => {
    setRUC(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const razonSocialHandler = (e) => {
    setRazonSocial(e.target.value);
  };

  const telefonoHandler = (e) => {
    setTelefono(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // post to api/clientes
    const res = await fetch(
      "http://LB-PROY-442364612.us-east-1.elb.amazonaws.com:7145/clientes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ruc: ruc,
          email: email,
          razon_social: razon_social,
          contrasenha: password,
          telefono: telefono,
        }),
      }
    );
    // go to login page if success
    if (res.status === 200) {
      window.location.href = "/login";
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-black">
      <div className="w-3/5 p-5 bg-gray-800 rounded-xl">
        <div className="text-left font-bold">
          <span className="text-white">PCUnion</span>
        </div>
        <div className="py-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Sign up to Account
          </h2>
          <div className="border-2 w-10 border-l-white inline-block mb-2"></div>
          <div className="flex justify-center my-2">
            <a
              href="#"
              className="border-2 border-gray-200 rounded-full p-3 mx-1"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="#"
              className="border-2 border-gray-200 rounded-full p-3 mx-1"
            >
              <FaGoogle className="text-sm" />
            </a>
            <a
              href="#"
              className="border-2 border-gray-200 rounded-full p-3 mx-1"
            >
              <FaGithub className="text-sm" />
            </a>
          </div>{" "}
          {/*Social login section */}
          <p className="text-gray-400 my-3">or use your ruc</p>
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-64 p-2 flex items-center">
              <FaRegEnvelope className="text-gray-400 m-2 " />
              <input
                type="text"
                placeholder="RUC"
                name="ruc"
                onChange={rucHandler}
                className="bg-gray-100 outline-none text-sm 
                w-full text-gray-800"
              />
            </div>
            <div className="bg-gray-100 w-64 p-2 flex items-center mt-3">
              <MdLockOutline className="text-gray-400 m-2 " />
              <input
                type="password"
                placeholder="password"
                name="contrasenha"
                onChange={passwordHandler}
                className="bg-gray-100 outline-none text-sm 
                w-full text-gray-800"
              />
            </div>
            <div className="bg-gray-100 w-64 p-2 flex items-center mt-3">
              <input
                type="text"
                placeholder="Telefono"
                name="telefono"
                onChange={telefonoHandler}
                className="bg-gray-100 outline-none text-sm 
                w-full text-gray-800"
              />
            </div>
            <div className="bg-gray-100 w-64 p-2 flex items-center mt-3">
              <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={emailHandler}
                className="bg-gray-100 outline-none text-sm 
                w-full text-gray-800"
              />
            </div>
            <div className="bg-gray-100 w-64 p-2 flex items-center mt-3">
              <input
                type="text"
                placeholder="Razon Social"
                name="razon_social"
                onChange={razonSocialHandler}
                className="bg-gray-100 outline-none text-sm 
                w-full text-gray-800"
              />
            </div>
            <div className="flex justify-between w-64 mb-5 mt-3">
              <label className="flex items-center text-xs">
                <input type="checkbox" name="remember" className="mr-1" />{" "}
                Remember me
              </label>
              <a href="#" className="text-xs">
                Forgot password?
              </a>
            </div>
            <a
              href="#"
              className="border-2 text-white border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-gray-700 hover:text-white"
              onClick={submitHandler}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
      {/* Login section */}
    </div>
  );
}
