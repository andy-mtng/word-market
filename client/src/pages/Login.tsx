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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="border border-gray-400 "
                        id="email"
                        {...register("email", { required: true })}
                    />
                </div>
                {errors.email && <span>Email is required</span>}

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className=" border border-gray-400"
                        id="password"
                        {...register("password", { required: true })}
                    />
                </div>
                {errors.password && <span>Password is required</span>}

                <button type="submit">Login</button>
            </form>
            <p>
                New to WordMarket? <Link to="/signup">Join now</Link>
            </p>
        </div>
    );
}

export default Login;
