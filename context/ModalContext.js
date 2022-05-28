import { createContext, useState } from 'react';

export const ModalContext = createContext();


export default function Modal(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');

    const openModal = (url) => {
        setModalPhoto(url);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setModalPhoto('');
    }

    return (
        <ModalContext.Provider value = {{modalOpen, modalPhoto, openModal, closeModal}}>
            {props.children}
        </ModalContext.Provider>
    )
}