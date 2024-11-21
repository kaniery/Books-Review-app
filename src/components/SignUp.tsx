import React, { FC, useState } from "react";
import axios from "axios";
import requests from "../utils/Requests";
import defaultimage from "../images/NO_IMAGE.jpeg";
import Compressor from "compressorjs";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";

type FormValues = {
  userName: string;
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, any> = {};

  if (!values.userName) {
    errors.userName = {
      type: "required",
      message: "ユーザーネームは必須です",
    };
  }

  if (!values.email) {
    errors.email = {
      type: "required",
      message: "メールアドレスは必須です",
    };
  }

  if (!values.password) {
    errors.password = {
      type: "required",
      message: "パスワードは必須です",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [compressedImageFile, setCompressedImageFile] = useState<Blob | null>(
    null
  );

  const [compressedImageUrl, setCompressedImageUrl] = useState(defaultimage);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");

  const onSubmit = async (data: FormValues) => {
    setIsSubmitted(true);
    setErrorMessage("");

    try {
      // ユーザーデータをPOSTしてトークンを取得
      const userResponse = await axios.post(requests.InsertUserData, {
        name: data.userName,
        email: data.email,
        password: data.password,
      });
      setToken(userResponse.data.token); // トークンをstateに保存

      // 圧縮画像が存在する場合はアップロード
      if (compressedImageFile) {
        const formData = new FormData();
        formData.append("icon", compressedImageFile);

        await axios.post(requests.InsertIcon, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // 取得したトークンを利用
          },
        });
        console.log("画像アップロード成功");
      }
    } catch (error) {
      console.error("エラー:", error);
      setErrorMessage("登録中にエラーが発生しました。");
      setIsSubmitted(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];

    // 画像を圧縮してURLに変換
    new Compressor(fileObject, {
      quality: 0.6,
      maxWidth: 800,
      maxHeight: 800,
      mimeType: "image/jpeg",
      success(result) {
        setCompressedImageFile(result);
        const compressedImageUrl = URL.createObjectURL(result as Blob);
        setCompressedImageUrl(compressedImageUrl);
      },
      error(err) {
        console.error("画像圧縮エラー:", err.message);
      },
    });
  };

  return (
    <div className="mt-40 mx-20">
      <div className="flex justify-center mt-35 mx-10 mb-10">
        <form
          role="form"
          className="w-full max-w-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-2xl text-black font-bold text-center mb-5">
            Sign up
          </p>

          <div className="flex justify-center items-center mt-8 mb-6">
            <img src={compressedImageUrl} className="h-32 w-32 rounded-full" />
            <input
              type="file"
              accept="image/*"
              onChange={onFileInputChange}
              className="pl-4"
            />
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/4">
              <label
                className="block text-black font-bold md:text-right mb-1 md:mb-0 pr-6"
                htmlFor="userName"
              >
                ユーザーネーム
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                {...register("userName")}
                id="userName"
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
              {errors.userName && (
                <p className="text-red-500 text-lg font-bold">
                  {errors.userName.message}
                </p>
              )}
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
                {...register("email")}
                id="email"
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="email"
                placeholder="user@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-lg font-bold">
                  {errors.email.message}
                </p>
              )}
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
                {...register("password")}
                id="password"
                className="bg-gray-200 appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
              />
              {errors.password && (
                <p className="text-red-500 text-lg font-bold">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="font-bold text-center mb-5">
            {isSubmitted && !errorMessage ? (
              <div>
                <p className="text-green-500 text-lg font-bold">
                  ユーザーが作成されました
                </p>
                <Link
                  to="/login"
                  className="text-blue-500 text-lg font-bold no-underline hover:underline"
                >
                  Loginページに移動する
                </Link>
              </div>
            ) : (
              <p className="text-red-500 text-lg font-bold">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="py-3 lg:py-3 px-14 lg:px-14 text-white font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
