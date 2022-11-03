import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards/Cards'
import Header from '../../components/Header/Header'
import { homes } from '../../public/homes'
import styles from '../../styles/Home.module.css'
import Modal from '../../components/Modal'
import dashStyle from './styles.module.css'
import { IoMdAdd } from 'react-icons/io'
import AddHomeForm from '../../components/AddHomeForm'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function index() {
    const router = useRouter();
    const [data, setData] = useState([])
    useEffect(() => {
        getUserHomes()
    }, [])

    const getUserHomes = async () => {
        const user_id = JSON.parse(localStorage.getItem('user_info'))?.user_id
        if (user_id) {
            await axios.post('/api/getUserHomes', {"user_id" : user_id})
                .then((res) => {
                    setData(res.data.records)
                })
                .catch((error) => {console.log(error, "error")})
                .finally(() => { })
        }
        else {
            router.push('login')
        }
    }


    const [open, setopen] = useState(false)

    return (
        <section className={styles.home}>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Accomodate - dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.main} style={{ paddingTop: "100px" }}>

                <div className={styles.card_container}>
                    {
                        data?.map((home, index) => (
                            <div className={styles.col} key={index}>
                                <Cards data={home} />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={dashStyle.addBtn} onClick={() => setopen(true)}>
                <IoMdAdd size={24} />
                <span>Add Home</span>
            </div>
            <Modal open={open} closeModal={() => setopen(false)}>
                <AddHomeForm closeModal={()=>setopen(false)} />
            </Modal>

        </section>
    )
}
