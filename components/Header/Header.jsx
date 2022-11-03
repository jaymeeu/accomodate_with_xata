import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { ImEqualizer } from 'react-icons/im'
import styles from './Header.module.css'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Header = () => {

    const router = useRouter()

    useEffect(() => {
        setuser(JSON.parse(localStorage?.getItem('user_info')))
    }, [])
    
    const [user, setuser] = useState()
    
    const logoutUser = () =>{
        localStorage.clear();
        router.push('/')
    }

    return (
        <>
            <div className={`${styles.header_container} ${styles.space_between}`}>
    <           Link href="/" style={{textDecoration : 'none', userSelect:'none'}}>
                    {/* <Image src={logo} alt="airbnb logo" className={styles.logo_image} /> */}
                   <span style={{
                    color:'rgb(84, 105, 212)',
                    fontSize : "24px", 
                    }}>Accomodate</span>
                </Link>

                <div className={styles.center_div}>
                    <div className={styles.text_filter}>Anywhere</div>
                    <div className={styles.divider}></div>
                    <span className={styles.text_filter}>Any week</span>
                    <div className={styles.divider}></div>
                    <span className={styles.text_filterv2}>Add guests</span>
                    <div className={styles.cirle_red} style={{ backgroundColor: "var(--redish)" }}>
                        <BiSearch color='white' />
                    </div>
                </div>
{
    user ? 
    <div className={styles.right_user}>
        <div className={styles.text_filter}>
            {user?.name}
        </div>

    <Link href="/dashboard">
        <div className={styles._user}>
            Dashboard
            {/* <FaUserCircle color='#717171' size={24} /> */}
        </div>
    </Link>
    {
        router.pathname === '/dashboard' &&
        <div onClick={logoutUser} className={styles._user}>
        Logout
        </div>
    }
</div>
    :
    <div className={styles.right_user}>
    <Link href="/signup">
        <div className={styles.text_filter}>
            Become a Host
        </div>
    </Link>

    <Link href="/login">
        <div className={styles._user}>
            Login
            <FaUserCircle color='#717171' size={24} />
        </div>
    </Link>
</div>

}
               
            </div>
            <div className={styles.mobile_head}>
                <div className={styles.mobile_header}>
                    <div className={styles.cirle_red} style={{ backgroundColor: "white", width: "40px", height: "40px" }}>
                        <BiSearch color='grey' size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className={styles.place_name} style={{ fontSize: '13px', fontWeight: 600 }}>Where to?</div>
                        <div className={styles.greyer} style={{ fontSize: '12px' }}>
                            Anywhere &#8729; Any week &#8729; Add guests
                        </div>
                    </div>
                    <div className={styles.cirle_red} style={{ backgroundColor: "white", border: '1px solid rgb(235, 235, 235)', width: "40px", height: "40px" }}>
                        <ImEqualizer color='black' size={16} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header