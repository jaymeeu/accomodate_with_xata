import React, { useState } from 'react'
import styles from "./styles.module.css"
import Link from "next/link"
import axios from 'axios'
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';

const index = () => {

    const router = useRouter();

    const [showUserExit, setshowUserExit] = useState(false)

    const [adding, setadding] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const registerUser = async (data) =>{
        setshowUserExit(false)
        setadding(true)
        await axios.post('/api/registerUser', data)
        .then((response)=>{
            if(response.data.message === "user already exist"){
                setshowUserExit(true)
            }
            else{
                localStorage.setItem("user_info", 
                JSON.stringify({
                    "user_id" : response.data.id,
                    "name" : response.data.fullname,
                    "email" : response.data.email,
                }));
            router.push('dashboard')
            }
            // console.log(response)
        })
        .catch((err)=>{console.log(err,"erreyye")})
        .finally(()=>setadding(false))
    }
    return (
        <div className={styles.container}>
            <form id="stlogin" className={styles.form_cont} onSubmit={handleSubmit(registerUser)}>
                <div className={styles.input_cont}>
                    <h2 className={styles.tittle}>Register</h2>
                </div>
                {
                    showUserExit && <span style={{color: 'red', fontSize:'13px', margin:'10px 0'}}>Email already exist</span>
                }
                <div className={styles.input_cont}>
                    <label className={styles.input_label} htmlFor="email">Fullname</label>
                    <input 
                        {...register("fullname")} 
                        className={styles.input_text} 
                        type="text"  
                        placeholder='Fullname'
                        required
                        // rules={{
                        //     required: 'Name is required',
                        //   }}
                    />
                </div>

                <div className={styles.input_cont}>
                    <label className={styles.input_label} htmlFor="email">Email</label>
                    <input 
                        {...register("email")} 
                        className={styles.input_text} 
                        type="email" 
                        placeholder='Email'
                        required
                        // rules={{
                        //     required: 'Email is required',
                        // }}
                    />
                </div>
                <div className={styles.input_cont}>
                    <label className={styles.input_label} htmlFor="password">Password</label>
                    <input 
                        {...register("password")} 
                        className={styles.input_text} 
                        type="password"   
                        placeholder='Password'
                        required
                        // rules={{
                        //     required: 'Password is required',
                        // }}
                    />
                </div>
                <div className={styles.input_cont}>
                    <input disabled={adding} className={styles.buttone} type="submit" name="submit" value={adding ? "Loading..." : "Register"} />
                </div>
                <div className={styles.sign_cont}>
                    <span>Already have any account?</span>
                    <Link className={styles.linkss} href="/login"><span> Login </span>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default index