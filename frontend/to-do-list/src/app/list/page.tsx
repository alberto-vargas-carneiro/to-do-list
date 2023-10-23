'use client'

import style from './page.module.css'
import ListContainer from '../components/listContainer/listContainer'
import useListData from '../hooks/useListData'
import React, { useEffect } from 'react'

export default function Page() {
    const logado = JSON.parse(localStorage.getItem('logado') || 'false');
    const userEmail = JSON.parse(localStorage.getItem('userEmail') || 'false');
    useEffect(() => {
        if (logado == false) {
            window.location.href = '/'
        }
    }, []);
    const { data } = useListData()

    return (
        <>
        <div>{userEmail}</div>
            <div className={style.container}>
                {data?.map(listData => <ListContainer key={1} content={listData.content} date={listData.createdat} id={data.indexOf(listData)} />)}
            </div>
        </>
    )
}