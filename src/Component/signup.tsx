import React from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod schema for validation
const schema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
            "Password must include uppercase, lowercase, number, and special character"
        ),
    confirm: z.string()
}).refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
});

type FormFeilds = z.infer<typeof schema>;

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFeilds>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFeilds> = (data) => {
        console.log(data);
    };

    return (
        <>
            <h3>Signup Page</h3>
            <form className='signup' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("fullName")} type="text" placeholder='Full Name' />
                {errors.fullName && <div className='text-red-500'>{errors.fullName.message}</div>}

                <input {...register("email")} type="email" placeholder='Email' />
                {errors.email && <div className='text-red-500'>{errors.email.message}</div>}

                <input {...register("password")} type="password" placeholder='Password' />
                {errors.password && <div className='text-red-500'>{errors.password.message}</div>}

                <input {...register("confirm")} type="password" placeholder='Confirm Password' />
                {errors.confirm && <div className='text-red-500'>{errors.confirm.message}</div>}

                <button id="b1" type="submit">Sign up</button>
                <Link id="b2" to="/login">
                    <button type="button">Login</button>
                </Link>
            </form>
        </>
    );
}
export default Signup;