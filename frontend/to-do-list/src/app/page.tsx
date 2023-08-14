import styles from './page.module.css'
import { BsLinkedin, BsGoogle, BsGithub } from 'react-icons/bs'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Todas suas tarefas em um só lugar</h1>
      <div className={styles.loginContainer}>
        <h2>Para criar e editar suas tarefas, por favor, faça login abaixo</h2>
        <a href="" className={styles.google}>
          <div className={styles.appContainer}>
            <span className={styles.icon}>
              <BsGoogle />
            </span>
            <span>
              Login com Google
            </span>
          </div>
        </a>
        <a href="" className={styles.github}>
          <div className={styles.appContainer}>
            <span className={styles.icon}>
              <BsGithub />
            </span>
            <span className={styles.app}>
              Login com GitHub
            </span>
          </div>
        </a>
        <a href="" className={styles.linkedin}>
          <div className={styles.appContainer}>
            <span className={styles.icon}>
              <BsLinkedin />
            </span>
            <span>
              Login com LinkedIn
            </span>
          </div>
        </a>
      </div>
    </div >
  )
}
