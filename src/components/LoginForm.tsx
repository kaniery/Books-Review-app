import React, { useState } from "react";

//他のコンポーネントに値を渡すために設定？
interface LoginProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginProps> = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email != "" && password != "") {
      setIsSubmitted(true);
      setEmail("");
      setPassword("");
    } else {
      setIsSubmitted(false);
      console.log("false"); // デバッグ用
    }
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
        <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
          <p className="text-2xl text-black font-bold text-center mb-5">
            ログイン
          </p>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/4">
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-6">
                メールアドレス
              </label>
            </div>
            <div className="md:w-2/3">
              <input
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
              <label className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-6">
                パスワード
              </label>
            </div>
            <div className="md:w-2/3">
              <input
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
                  ログインが完了いたしました。
                </p>
              </div>
            ) : (
              <div>
                <p
                  className="text-red-500 text-lg text-bold"
                  id="error-message"
                >
                  メールアドレスとパスワードは必須です
                </p>
                <button
                  type="submit"
                  className="py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white"
                >
                  ログイン
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
