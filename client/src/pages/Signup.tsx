import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface Inputs {
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

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        console.log("Client-side formData", formData);
        axios
            .post("http://localhost:5000/auth/signup", formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                reset();
            });
    };

    return (
        <div>
            <h1>Sign up</h1>
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
