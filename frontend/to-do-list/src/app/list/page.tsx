'use client'

import style from './page.module.css'
import ListContainer from '../components/listContainer/listContainer'
import useListData from '../hooks/useListData'
import React, { useState, useEffect } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'


export default function Page() {
    const [logado, setLogado] = useState(false);
    const [token, setToken] = useState(false);
    const [email, setEmail] = useState(false);
    const [task, setTask] = useState(false);
    const [content, setContent] = useState('');
    const [username, setUsername] = useState('');

    const handleContent = (e: any) => {
        setContent(e.target.value);
    }

    const handleTask = () => {
        setTask(!task);
    }
    
    const handleAddTask = async () => {
        const response = await fetch('http://localhost:8080/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ content, email }),
        });
        if (response.ok) {
            window.location.reload();
            return
        } else {
            console.log('num deu');
        }
    }
    
    useEffect(() => {
        const logadoValue = JSON.parse(localStorage.getItem('logado') || 'false');
        const tokenValue= JSON.parse(localStorage.getItem('token') || 'false');
        const emailValue= JSON.parse(localStorage.getItem('userEmail') || 'false');
        setLogado(logadoValue);
        setToken(tokenValue);
        setEmail(emailValue);
        setUsername(emailValue.toString().split('@')[0]);
        
        if (logadoValue == false) {
            window.location.href = '/'
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { data } = useListData()

    return (
        <>
            <div className={style.container}>
                <div className={style.username}>Tarefas de {username}</div>

                {data?.map((listData, index) => <ListContainer x={listData.id} key={data.indexOf(listData) + 1} content={listData.content}
                    date={listData.createdat} num={index + 1} />)}

                <button className={style.addButton} onClick={handleTask}><BsPlusCircleFill /></button>
                {task &&
                    <>
                        <input className={style.input} value={content} name='content' onChange={handleContent} type="text" />
                        <button className={style.botao} onClick={handleAddTask}>CRIAR</button>
                    </>
                }
            </div>
        </>
    )
}