import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useNotificationContext from "../hooks/useNotificationContext";
import { useLogin } from "../hooks/useLogin";

import { Link } from "react-router-dom";
import LoginInputs from "../types/LoginInputs";
axios.defaults.withCredentials = true;

function Login(): JSX.Element {
    axios.defaults.withCredentials = true;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginInputs>();
    const { login, isLoading } = useLogin();

    const onSubmit: SubmitHandler<LoginInputs> = (formData) => {
        console.log("Client-side formData", formData);
        login(formData).finally(() => {
            reset();
        });
    };

    return (
        <div className="mx-auto mt-4 w-[350px] border border-gray-200 px-6 py-6 shadow-sm">
            <h1 className="mb-6 text-2xl font-semibold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 flex flex-col">
                    <label className="rounded-sm text-sm text-gray-500" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="border border-gray-400 p-1"
                        id="email"
                        {...register("email", { required: true })}
                    />
                </div>
                {errors.email && <span>Email is required</span>}

                <div className="flex flex-col">
                    <label className="rounded-sm text-sm text-gray-500" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        className=" border border-gray-400 p-1"
                        id="password"
                        {...register("password", { required: true })}
                    />
                </div>
                {errors.password && <span>Password is required</span>}

                <button
                    className="mt-8 w-full rounded-sm bg-gray-800 py-2 text-center text-white"
                    type="submit"
                >
                    LOGIN
                </button>
            </form>
            <p className="mt-2 text-sm">
                New to WordMarket? <Link to="/signup">Join now</Link>
            </p>
        </div>
    );
}

export default Login;
