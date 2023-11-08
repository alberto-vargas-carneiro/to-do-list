import style from './listContainer.module.css'
import { BsTrash3 } from 'react-icons/bs'
import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

interface ListContainerProps {
    num: number,
    content: string,
    date: string,
    x: number
}

export default function ListContainer(props: ListContainerProps) {

    const [isHovered, setIsHovered] = useState(false)
    const token = JSON.parse(localStorage.getItem('token') || 'false');

    const handleDelete = async () => {
        const response: AxiosResponse = await axios.delete('https://to-do-test-404512.rj.r.appspot.com/todo/delete', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                id: props.x
            }
        })
        if (response.status === 200) {
            window.location.reload();
            return;
        } else {
            console.log('num deu');
        }
    }

    return (
        <div className={style.container_container}>
            <div className={style.container} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className={style.listContainer}>
                    <div className={style.listLeft}>{props.num.toString()}</div>
                    <div className={style.listCenter}>{props.content}</div>
                    <div className={style.listRight}>{props.date}</div>
                </div>

                {isHovered &&
                    <button className={style.trash} id={props.x.toString()} onClick={handleDelete}><BsTrash3 /></button>
                }
            </div>
        </div>
    )
}