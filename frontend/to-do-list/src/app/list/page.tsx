'use client'

import style from './page.module.css'
import ListContainer from '../components/listContainer/listContainer'
import useListData from '../hooks/useListData'

export default function Page() {
    const {data} = useListData()

    return (
        <div className={style.container}>
            {data?.map(listData => <ListContainer key={1} content={listData.content} date={listData.createdat} id={data.indexOf(listData)}/>)}
        </div>
    )
}