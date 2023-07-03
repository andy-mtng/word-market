import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useNotificationContext from "../hooks/useNotificationContext";
import { useSignup } from "../hooks/useSignup";

interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

function Signup(): JSX.Element {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Inputs>();
    const { signup, isLoading } = useSignup();

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        signup(formData).finally(() => {
            reset();
        });
    };

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        className="border border-gray-400 "
                        id="first-name"
                        {...register("firstName", { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        className="border border-gray-400 "
                        id="last-name"
                        {...register("lastName", { required: true })}
                    />
                </div>
                {errors.email && <span>Email is required</span>}
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
                        className="border border-gray-400"
                        id="password"
                        {...register("password", { required: true })}
                    />
                </div>
                {errors.password && <span>Password is required</span>}

                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}

export default Signup;
