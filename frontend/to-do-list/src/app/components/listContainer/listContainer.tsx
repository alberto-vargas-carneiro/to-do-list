'use client'

import style from './listContainer.module.css'
import { BiEditAlt } from 'react-icons/bi'
import { BsTrash3 } from 'react-icons/bs'
import { useState } from 'react'

interface ListContainerProps {
    id: number,
    content: string,
    date: string,
}

export default function ListContainer(props: ListContainerProps) {

    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className={style.container} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className={style.listContainer}>
                <div className={style.listLeft}>{props.id}</div>
                <div className={style.listCenter}>{props.content}</div>
                <div className={style.listRight}>{props.date}</div>
            </div>

            {isHovered &&
                <>
                    <button className={style.edit}><BiEditAlt /></button>
                    <button className={style.trash}><BsTrash3 /></button>
                </>

            }
        </div>
    )
}