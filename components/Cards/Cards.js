import React, { useState } from 'react'
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Cards.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { AiFillStar, AiTwotoneEdit } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
import moment from "moment"
import Image from 'next/image';
import { BsTrashFill } from 'react-icons/bs';

function Cards({ data, showDelete,editClick, deleteClick }) {

    const [showPagination, setshowPagination] = useState(false)
    return (
        <div className={styles.card}
            onMouseEnter={() => setshowPagination(true)}
            onMouseLeave={() => setshowPagination(false)}>
            <span className={styles.heart}>
                <FiHeart color="white" size={20} />
            </span>
            <div className={styles.main_cont_card} id='main_cont_card'>
                <Swiper
                    spaceBetween={0}
                    navigation={showPagination}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    modules={[
                        Navigation,
                        Pagination]}
                    className={styles.swiper_cont}
                >
                    {
                        data?.images_links?.map((img, index) => (
                            <SwiperSlide key={index} className={styles.swiper_slide_}>
                                <img className={styles.images} src={img} alt={index} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <div className={styles.space_between} style={{ marginTop: '12px' }}>
                <span className={styles.place_name}>{data?.title}</span>
                <div className={styles.stars}>
                    <AiFillStar color='black' />
                    <span>4.52</span>
                </div>
            </div>
            <div className={styles.greyer}>
                Hosted by {data?.host?.fullname}
            </div>
            <div className={styles.greyer}>
                {moment(data?.dateFrom).format('MMM DD')} - {moment(data?.dateTill).format('MMM DD')}
            </div>
            <div className={styles.price}>
               <div>${data?.price} <span>night</span></div> 
               {
                showDelete &&
                <div className={styles.icons}>
                    <AiTwotoneEdit onClick={()=>editClick(data)} size={18} color='var(--blue)'/>
                    <BsTrashFill onClick={()=>deleteClick(data?.id)} color='maroon'/>
                </div>
               }
                
            </div>
        </div>
    )
}

export default Cards
