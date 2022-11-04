import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards/Cards'
import Header from '../components/Header/Header'
import styles from '../styles/Home.module.css'
import Modal from '../components/Modal'
import dashStyle from '../styles/dashboard.module.css'
import { IoMdAdd } from 'react-icons/io'
import AddHomeForm from '../components/AddHomeForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import EditHomeForm from '../components/AddHomeForm/EditHome'

export default function Dashboard() {
    const router = useRouter();
    const [data, setData] = useState([])

    const [openDelete, setopenDelete] = useState(false)
    const [openEdit, setopenEdit] = useState(false)
    const [id_to_ops, setid_to_ops] = useState('')
    const [data_to_edit, setdata_to_edit] = useState({})
    const [loading, setloading] = useState(false)
    useEffect(() => {
        getUserHomes()
    }, [])

    const getUserHomes = async () => {
        setloading(true)
        const user_id = JSON.parse(localStorage.getItem('user_info'))?.user_id
        if (user_id) {
            await axios.post('/api/getUserHomes', { "user_id": user_id })
                .then((res) => {
                    setData(res.data.records)
                })
                .catch((error) => { console.log(error, "error") })
                .finally(() => {
                    setloading(false)
                })
        }
        else {
            router.push('login')
        }
    }
    const [deleting, setdeleting] = useState(false)

    const deleteUserHomes = async (id) => {
        setdeleting(true)
        await axios.post('/api/deleteHome', { "id": id })
            .then((res) => { getUserHomes() })
            .catch((error) => { console.log(error, "error") })
            .finally(() => {
                setdeleting(false);
                setopenDelete(false)
            })
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
                {
                    loading ?
                        <div className={styles.toCenter}>
                            <span className={styles.loader}></span>
                        </div>
                        :
                        <div className={styles.card_container}>
                            {
                                data?.map((home, index) => (
                                    <div className={styles.col} key={index}>
                                        <Cards
                                            data={home}
                                            showDelete={true}
                                            editClick={(e) => { setdata_to_edit(e); setopenEdit(true) }}
                                            deleteClick={(e) => { setid_to_ops(e); setopenDelete(true) }}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                }

            </div>

            <div className={dashStyle.addBtn} onClick={() => setopen(true)}>
                <IoMdAdd size={24} />
                <span>Add Home</span>
            </div>
            <Modal open={open} closeModal={() => setopen(false)}>
                <AddHomeForm
                    closeModal={() => setopen(false)}
                    onSuccess={() => getUserHomes()}
                />
            </Modal>

            <Modal open={openEdit} closeModal={() => setopenEdit(false)}>
                <EditHomeForm
                    defaultData={data_to_edit}
                    closeModal={() => setopenEdit(false)}
                    onSuccess={() => getUserHomes()}
                />
            </Modal>

            <Modal open={openDelete} closeModal={() => setopenDelete(false)}>
                <div className={dashStyle.deleteCont}>
                    <span style={{ textAlign: 'center' }}>Are you sure you want to delete this home</span>
                    <div className={dashStyle.actions} >
                        <span onClick={() => setopenDelete(false)}>Cancel</span>
                        <span style={{ color: 'maroon' }} onClick={() => deleteUserHomes(id_to_ops)}>
                            {deleting ? "Deleting..." : "Yes"}
                        </span>
                    </div>

                </div>
            </Modal>

        </section>
    )
}
