import style from './page.module.css'
import ListContainer from '../components/listContainer/listContainer'

export default function Page() {
    return (
        <div className={style.container}>
            <ListContainer id={0} content={'f'} date={'f'} />
            <ListContainer id={0} content={'f'} date={'f'} />
            <ListContainer id={0} content={'f'} date={'f'} />
            <ListContainer id={0} content={'f'} date={'f'} />
            <ListContainer id={0} content={'f'} date={'f'} />
        </div>
    )
}