import { useForm, SubmitHandler } from "react-hook-form";
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
        <div className="mx-auto my-4 w-[350px] border border-gray-200 px-6 py-6 shadow-sm">
            <h1 className="mb-6 text-2xl font-semibold">Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 flex flex-col">
                    <label className="rounded-sm text-sm text-gray-500" htmlFor="first-name">
                        First Name
                    </label>
                    <input
                        className="border border-gray-400 p-1"
                        id="first-name"
                        {...register("firstName", { required: true })}
                    />
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="rounded-sm text-sm text-gray-500" htmlFor="last-name">
                        Last Name
                    </label>
                    <input
                        className="border border-gray-400 p-1"
                        id="last-name"
                        {...register("lastName", { required: true })}
                    />
                </div>
                {errors.email && <span>Email is required</span>}
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

                <div className="mb-3 flex flex-col">
                    <label className="rounded-sm text-sm text-gray-500" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        className="border border-gray-400 p-1"
                        id="password"
                        {...register("password", { required: true })}
                    />
                </div>
                {errors.password && <span>Password is required</span>}

                <button
                    className="mt-8 w-full rounded-sm bg-gray-800 py-2 text-center text-white"
                    type="submit"
                >
                    SIGN UP
                </button>
            </form>
        </div>
    );
}

export default Signup;
