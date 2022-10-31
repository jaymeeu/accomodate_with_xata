import React from 'react'
import Popup from 'reactjs-popup';
import styles from './styles.module.css'
import 'reactjs-popup/dist/index.css';
import {MdClose} from 'react-icons/md'

const index = ({ open, closeModal, children }) => {
    return (
        <Popup open={open} closeOnDocumentClick onClose={closeModal} >
            <div className={styles.pop_cont}>
                <span onClick={closeModal} className={styles.close}>
                    <MdClose size={20}/>
                </span>
                <>
                {children}
                </>
            </div>
        </Popup>
    )
}

export default index