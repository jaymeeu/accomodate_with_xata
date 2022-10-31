import React, { useEffect, useState } from 'react'

import styles from './styles.module.css'
import {MdClose} from 'react-icons/md'
import {GoCloudUpload} from 'react-icons/go'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { badges } from '../../public/data';


export default function index({closeModal}) {

    const [user_id, setuser_id] = useState('')

    useEffect(() => {
        setuser_id(JSON.parse(localStorage.getItem('user_info'))?.user_id)
     
    }, [])
    

    // process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [Images, setImages] = useState([])

    const upload  = (e) =>{
        setImages([...Images, ...e.target.files])
    }

    const [addingHome, setaddingHome] = useState(false)
    

    const returnRandomString = (length) => {
        var result = ''
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        return result
    }

    let array_links = []
    
      const uploadImages = async (lenght, data) => {
        setaddingHome(true)
       
         if(lenght !== 0){

            var formdata = new FormData()
            formdata.append('file', Images[lenght - 1], '[PROXY]')
            formdata.append('upload_preset', 'ml_default')
            formdata.append('folder', "homes")
            formdata.append('public_id', `${returnRandomString(6)}`)
            formdata.append('api_key', `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`)
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
            }
            fetch(
                'https://api.cloudinary.com/v1_1/dhzeiianw/image/upload',
                requestOptions,
            ).then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.secure_url !== '') {
                    array_links.push(result.secure_url)
                    uploadImages(--lenght, data)
                }})
        }
        else{

            console.log(array_links, "array_linksarray_linksarray_links")
            data.images_links = array_links
            data.user_id = user_id

           await axios.post('/api/addHome', data)
            .then((res)=>console.log(res, 'result'))
            .catch((err)=>console.log(err, 'error'))
            .finally(()=>{
                setaddingHome(false);
                closeModal()
            })
        }
    }

    const addHome = async data => {
        uploadImages(Images.length, data)
    }

    return (
        <form id="stlogin" className={styles.form_cont} onSubmit={handleSubmit(addHome)}>
           
            <div className={styles.input_cont}>
                <h2 className={styles.tittle}>Add home</h2>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Home title</label>
                <input {...register("title")} required  className={styles.input_text} type="text"  placeholder='Home title'/>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Cost per night</label>
                <input {...register("price")} required className={styles.input_text} type="text"  placeholder='Cost per night'/>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Category</label>
                <select {...register("category")} className={styles.input_text}>
                    {
                        badges.map((badge, i) => (
                            <option key={i} value={badge.text}>{badge.text}</option>
                        ))
                    }
                </select>
            </div>
            <div className={styles.input_cont}>
                <label className={styles.input_label}>Available from</label>
                <input {...register("dateFrom")} required className={styles.input_text} type="date"  placeholder='Date available'/>
            </div>

            <div className={styles.input_cont}>
                <label className={styles.input_label}>Available till</label>
                <input {...register("dateTill")} required className={styles.input_text} type="date"  placeholder='Date available'/>
            </div>

            <div className={styles.input_cont}>
                <label className={styles.input_label}>Location</label>
                <input {...register("location")} required className={styles.input_text} type="text"  placeholder='Location'/>
            </div>

            <div className={styles.input_cont}>
                <label className={styles.input_label}>Upload images</label>
                <label htmlFor='home_images' className={`${styles.input_text} ${styles.input_file}`}>
                    <GoCloudUpload size={20}/>
                    <span>Upload</span>
                </label>
                <input id="home_images" style={{display:'none'}} type="file" multiple onChange={upload} />
                {
                    Images.map((img,i)=>(
                        <div key={i} style={{width : "100%", display:'flex', alignItems:'center', justifyContent : 'space-between', gap:'5px'}}>
                            <span>{img?.name}</span>
                            <span className={styles.close}>
                                <MdClose size={18} color="rgb(183, 75, 75)"/>
                            </span>
                        </div>
                    ))
                }
            </div>
           
            <div className={styles.input_cont}>
                <input className={styles.buttone} disabled={addingHome} type="submit" name="submit" value={ addingHome ? "Loading ..." : "Add"} />
            </div>
        </form>
    )
}
