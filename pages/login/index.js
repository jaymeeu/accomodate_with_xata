import React, { useState } from 'react'
import styles from "./styles.module.css"
import Link from "next/link"
import {useRouter} from 'next/router'
import axios from 'axios'
import { useForm } from "react-hook-form";

const index = () => {
    const router = useRouter();

    const { register, handleSubmit} = useForm();

    const [loading, setloading] = useState(false)
    const [showError, setshowError] = useState(false)

    const handleLogin = async (data) =>{
        setloading(true)
        setshowError(false)
       await axios.post('/api/loginUser', data)
        .then((res)=>{
            if(res.data.message === "authorized"){
                localStorage.setItem("user_info", 
                    JSON.stringify({
                        "user_id" : res.data.user.user_id,
                        "name" : res.data.user.name,
                        "email" : res.data.user.email,
                    })
                );
                router.push('dashboard')
            }
            else{
                setshowError(true)
            }
            // console.log(res,"rseponse")
        })
        .catch(err=>console.log(err))
        .finally(()=> setloading(false))
    }

    return (
        <div className={styles.container}>
            <form id="stlogin" className={styles.form_cont} onSubmit={handleSubmit(handleLogin)}>
                
                <div className={styles.input_cont}>
                    <h2 className={styles.tittle}>Login</h2>
                </div>
                {
                    showError &&  <span style={{color: 'red', fontSize:'13px', margin:'10px 0'}}>Incorrect username or password</span>
                }
                <div className={styles.input_cont}>
                    <label className={styles.input_label} htmlFor="email">Email</label>
                    <input {...register('email')} className={styles.input_text} type="email" name="email"  placeholder='Email'/>
                </div>
                <div className={styles.input_cont}>
                    <label className={styles.input_label} htmlFor="email">Password</label>
                    <input {...register('password')} className={styles.input_text} type="password" name="password"  placeholder='Password'/>
                </div>
                <div className={styles.input_cont}>
                    <input disabled={loading} className={styles.buttone} type="submit" name="submit" value={loading ? "Loading...." : "Login"} />
                </div>
                <div className={styles.sign_cont}>
                    <span>Don't have an account?</span>
                    <Link className={styles.linkss} href="/signup"><span> Sign up </span>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default index

