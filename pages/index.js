import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Cards from '../components/Cards/Cards'
import CustomMap from '../components/Map/GoogleMapWidget'
import { IoMap } from 'react-icons/io5'
import { FaListUl } from 'react-icons/fa'
import Badges from '../components/Badges'
import Header from '../components/Header/Header'
import {homes} from '../public/homes'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home() {

  const [data, setData] = useState([])
  const [dataDuplicate, setDataDuplicate] = useState([])

  const [selection, setselection] = useState('OMG!')

  useEffect(() => {
    getAllHomes();
  }, [])

  const getAllHomes = async  ()  =>{
    await axios.get('/api/getHomes')
    .then((res)=>{
      const data = res.data.filter((home) => home.category === selection)
      setData(data)
      setDataDuplicate(res.data)
    })
    .catch((error)=>console.log(error, "error"))
    .finally(()=>{})
  }

  const filterData = (e) => {
      setselection(e.text)
      const data = dataDuplicate.filter((home) => home.category === e.text)
      setData(data)
  }

  const [showMap, setshowMap] = useState(false)

  return (
      <section className={styles.home}>
        <Head>
          <title>Accomodate mkmkm</title>
          <meta name="description" content="Accomodate - home for you" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.header}>
          <Header />
          {/* <h1>something</h1> */}
        </div>
        <div className={styles.main} style={{ paddingTop: showMap ? "0" : "100px" }}>
          <div className={styles.sticky_header}>
            <Badges
              active={selection}
              onClick={(e) => filterData(e)}
            />
          </div>
          {
            showMap ?
              <CustomMap data={data} />
              :
              <div className={styles.card_container}>
                {
                  data?.map((home, index) => (
                    <div className={styles.col} key={index}>
                      <Cards data={home} />
                    </div>
                  ))
                }
              </div>
          }
        </div>
        {
          !showMap &&
          <div className={styles.footer}>
            <Footer />
          </div>
        }

        <div className={styles.map_btn}
          onClick={() => setshowMap(!showMap)}
        >
          {
            showMap ?
              <>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>Show list</span>
                <FaListUl color='white' />
              </>
              :
              <>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>Show map</span>
                <IoMap color='white' />

              </>
          }
        </div>
        <div className={styles.map_btn_mobile}
          onClick={() => setshowMap(!showMap)}
        >
          {
            showMap ?
              <>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>List</span>
                <FaListUl color='white' />
              </>
              :
              <>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>Map</span>
                <IoMap color='white' />
              </>
          }
        </div>
      </section>
  )
}
