import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { badges } from '../../public/data';


export default function EditHomeForm({closeModal, defaultData, onSuccess}) {

    const [user_id, setuser_id] = useState('')

    useEffect(() => {
        setuser_id(JSON.parse(localStorage.getItem('user_info'))?.user_id)
    }, [])
    

    const { register, handleSubmit, formState: { errors } } = useForm();


    const [addingHome, setaddingHome] = useState(false)
    

    const addHome = async data => {
        setaddingHome(true)

        data.user_id = user_id
        data.images_links = defaultData.images_links
        data.id = defaultData.id

        await axios.post('/api/editHome', data)
        .then((res)=>onSuccess())
        .catch((err)=>console.log(err, 'error'))
        .finally(()=>{
            setaddingHome(false);
            closeModal()
        })

    }

    return (
        <form id="stlogin" className={styles.form_cont} onSubmit={handleSubmit(addHome)}>
           
            <div className={styles.input_cont}>
                <h2 className={styles.tittle}>Add home</h2>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Home title</label>
                <input defaultValue={defaultData?.title} {...register("title")} required  className={styles.input_text} type="text"  placeholder='Home title'/>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Cost per night</label>
                <input defaultValue={defaultData?.price} {...register("price")} required className={styles.input_text} type="text"  placeholder='Cost per night'/>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Category</label>
                <select defaultValue={defaultData?.category} {...register("category")} className={styles.input_text}>
                    {
                        badges.map((badge, i) => (
                            <option key={i} value={badge.text}>{badge.text}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Available from</label>
                <input defaultValue={defaultData?.dateFrom} {...register("dateFrom")} required className={styles.input_text} type="date"  placeholder='Date available'/>
            </div>

            <div className={styles.input_cont}>
                <label className={styles.input_label}>Available till</label>
                <input defaultValue={defaultData?.dateTill} {...register("dateTill")} required className={styles.input_text} type="date"  placeholder='Date available'/>
            </div>

            <div className={styles.input_cont}>
                <label className={styles.input_label}>Location</label>
                <input defaultValue={defaultData?.location} {...register("location")} required className={styles.input_text} type="text"  placeholder='Location'/>
            </div>

            <div className={styles.input_cont}>
                <input className={styles.buttone} disabled={addingHome} type="submit" name="submit" value={ addingHome ? "Updating..." : "Update"} />
            </div>
        </form>
    )
}
