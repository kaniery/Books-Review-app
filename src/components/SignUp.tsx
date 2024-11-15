import React, { FC, useState } from "react";
import axios from "axios";
import requests from "../utils/Requests";

const SignUp: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username != "" && email != "" && password != "") {
      setIsSubmitted(true);

      axios
        .post(requests.InsertUserData, {
          name: username,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });

      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      setIsSubmitted(false);
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="mt-40 mx-20">
      <div className="flex justify-center mt-35 mx-10 mb-10">
        <form role="form" className="w-full max-w-2xl" onSubmit={handleSubmit}>
          <p className="text-2xl text-black font-bold text-center mb-5">
            Sign up
          </p>

          <input type="file" id="file" accept="image/*" />

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/4">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-6"
                htmlFor="username"
              >
                ユーザーネーム
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="username"
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                value={username}
                onChange={handleUsernameChange}
              ></input>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/4">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-6"
                htmlFor="email"
              >
                メールアドレス
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="email"
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="user@example.com"
              ></input>
            </div>
          </div>

          <div className="md:flex md:items-center mb-9">
            <div className="md:w-1/4">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-6"
                htmlFor="password"
              >
                パスワード
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                id="password"
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              ></input>
            </div>
          </div>
          <div className="flex justify-center">
            {isSubmitted ? (
              <div>
                <p className="text-green-500 text-lg text-bold">
                  ユーザーが作成されました
                </p>
              </div>
            ) : (
              <div>
                <p
                  className="text-red-500 text-lg text-bold"
                  id="error-message"
                >
                  必須項目を入力してください
                </p>
                <button
                  type="submit"
                  className="py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
