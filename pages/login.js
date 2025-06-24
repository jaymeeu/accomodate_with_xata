import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleLogin = async (data) => {
        setLoading(true);
        setShowError(false);
        try {
            const res = await axios.post("/api/loginUser", data);
            if (res.data.message === "authorized") {
                localStorage.setItem("user_info", JSON.stringify({
                    user_id: res.data.user.user_id,
                    name: res.data.user.name,
                    email: res.data.user.email,
                }));
                router.push("dashboard");
            } else {
                setShowError(true);
            }
        } catch (err) {
            console.error(err);
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form id="stlogin" className={styles.form_cont} onSubmit={handleSubmit(handleLogin)}>
                <div className={styles.input_cont}>
                    <h2 className={styles.tittle}>Welcome Back</h2>
                </div>

                {showError && <span className={styles.error_msg}>Incorrect username or password</span>}

                <div className={styles.input_cont}>
                    <label className={styles.input_label} htmlFor="email">Email</label>
                    <input
                        {...register("email", { required: true })}
                        className={styles.input_text}
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className={styles.input_cont}>
                    <label className={styles.input_label} htmlFor="password">Password</label>
                    <input
                        {...register("password", { required: true })}
                        className={styles.input_text}
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>

                <div className={styles.input_cont}>
                    <button
                        type="submit"
                        className={styles.buttone}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner"></span>
                        ) : "Login"}
                    </button>
                </div>

                <div className={styles.sign_cont}>
                    <span>Don't have an account?</span>
                    <Link className={styles.linkss} href="/signup">Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
