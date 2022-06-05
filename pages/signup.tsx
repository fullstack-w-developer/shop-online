import Link from "next/link";
import React, {
  useEffect,
  useState,
  useContext,
} from "react";
import { signUpApi } from "../utils/API";
import { validForm } from "../utils/Valid";
import PulseLoader from "react-spinners/PulseLoader";
import { globalContext } from "../store/GlobalState";
import { useRouter } from "next/router";
import Head from "next/head";

interface typeFormData {
  email: string;
  name: string;
  password: string;
  cf_password: string;
}
const SignUp = () => {
  const { state } = useContext(globalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState<typeFormData>({
    cf_password: "",
    email: "",
    name: "",
    password: "",
  });
  const { user } = state;
  const { cf_password, email, name, password } = formData;
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

    const valid = validForm({
      cf_password,
      email,
      name,
      password,
    });
    if (valid) return setError(valid);
    setIsLoading(true);
    setError("");
    signUpApi(formData)
      .then((res) => {
        setIsLoading(false);
        setSuccessMsg("signup successful, please logn now");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.err);
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
        <title>Signup | Mahdi-Shariflo</title>
      </Head>
      <div className=" form mt-10  w-[500px] h-fit">
        <form
          onSubmit={SubmitForm}
          className="w-[90%] mx-auto flex flex-col justify-around "
        >
          <h1 className="text-center font-bold text-[#1e272e] text-lg py-3">
            Create Account
          </h1>
          <div className="">
            <div className="">
              <label>Email</label>
              <input
                value={email}
                name="email"
                onChange={onChange}
                type="email"
                onKeyDown={onKeyDown}
              />
            </div>
            <div className="pt-5">
              <label>Name</label>
              <input
                value={name}
                name="name"
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
            </div>
            <div className="pt-5">
              <label>Password</label>
              <input
                value={password}
                name="password"
                onChange={onChange}
                onKeyDown={onKeyDown}
                type="password"
              />
            </div>
            <div className="pt-5">
              <label>Confirm Password</label>
              <input
                value={cf_password}
                name="cf_password"
                onChange={onChange}
                onKeyDown={onKeyDown}
                type="password"
              />
            </div>
          </div>

          <p className="text-xs text-red-600 text-center py-5">
            {error}
          </p>

          {successMsg && (
            <p className="text-xs text-green-600 text-center py-5">
              {successMsg}
            </p>
          )}
          <div className="flex flex-col justify-center">
            <button className="bg-[#0096f5] active:bg-[#0390e8] w-full py-2 rounded-lg font-medium  text-white">
              {isLoading ? (
                <PulseLoader size={10} color="#fff" />
              ) : (
                "SIGN UP"
              )}
            </button>
          </div>
        </form>
        <div className="flex  items-center justify-center font-medium gap-2 text-sm py-6">
          <p>Do you have account?</p>
          <Link href="/login">
            <a className="text-[#0096f5] ">login now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
