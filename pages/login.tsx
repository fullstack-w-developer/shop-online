import Link from "next/link";
import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { loginApi } from "../utils/API";
import PulseLoader from "react-spinners/PulseLoader";
import { globalContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import Head from "next/head";

interface typeFormData {
  email: string;

  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { state, dispatch } = useContext(globalContext);
  const [formData, setFormData] = useState<typeFormData>({
    email: "",
    password: "",
  });
  const { user } = state;
  const { email, password } = formData;
  const router = useRouter();

  const onKeyDown = () => {
    setError("");
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const SubmitForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!email) return setError("please enter your email");
    if (!password)
      return setError("please enter your password");
    setIsLoading(true);
    setError("");
    loginApi(formData)
      .then(async (res: any) => {
        setIsLoading(false);
        // @ts-ignore
        localStorage.setItem("firstLogin", true);
        Cookie.set(
          "refreshtoken",
          res.data.user.refresh_token,
          {
            path: "api/accessToken",
            expires: 7,
          }
        );
        dispatch({
          type: "USER_INFO",
          payload: res.data.user,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        // setError(error.response.data.err);
      });
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="flex  justify-center items-center">
        <Head>
        <title>Login | Mahdi-Shariflo</title>
      </Head>
      <div className=" form mt-20  w-[500px] h-fit">
        <form
          onSubmit={SubmitForm}
          className="w-[90%] mx-auto flex flex-col justify-around "
        >
          <h1 className="text-center font-bold text-[#1e272e] text-lg py-3">
            Login To Your Account
          </h1>
          <div className="">
            <div className="">
              <label>Email</label>
              <input
                value={email}
                type="email"
                name="email"
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
            </div>
            <div className="pt-5">
              <label>Password</label>
              <input
                value={password}
                type="password"
                name="password"
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
            </div>
          </div>
          <p className="text-xs text-red-600 text-center py-5">
            {error}
          </p>
          <div className="flex justify-center">
            <button className="bg-[#0096f5] active:bg-[#0390e8] w-full py-2 rounded-lg font-medium  text-white">
              {isLoading ? (
                <PulseLoader size={10} color="#fff" />
              ) : (
                "LOGIN"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center font-medium gap-2 text-sm py-6">
          <p>Not a member?</p>
          <Link href="/signup">
            <a className="text-[#0096f5] ">Signup now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
