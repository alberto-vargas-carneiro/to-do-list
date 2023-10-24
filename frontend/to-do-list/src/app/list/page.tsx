'use client'

import style from './page.module.css'
import ListContainer from '../components/listContainer/listContainer'
import useListData from '../hooks/useListData'
import React, { useEffect } from 'react'

export default function Page() {
    const logado = JSON.parse(localStorage.getItem('logado') || 'false');
    const token = JSON.parse(localStorage.getItem('token') || 'false');
    const userEmail = JSON.parse(localStorage.getItem('userEmail') || 'false');
    useEffect(() => {
        if (logado == false) {
            window.location.href = '/'
        }
        console.log(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { data } = useListData()

    return (
        <>
            <div>{userEmail}</div>
            <div className={style.container}>
                {data?.map(listData => <ListContainer key={1} content={listData.content}
                    date={listData.createdat} id={data.indexOf(listData) + 1} />)}
            </div>
        </>
    )
}