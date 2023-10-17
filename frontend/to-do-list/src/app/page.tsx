'use client'

import axios from 'axios';
// import useUserData from './hooks/useUserData'
import { UserData } from './interface/userData'
import styles from './page.module.css'
import { useState } from 'react';
// import { useLogin } from './hooks/useUserData';

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [temCadastro, setTemCadastro] = useState(false);
  const [senha, setStylesSenha] = useState(styles.senha);
  const [emailOK, setStylesEmail] = useState(styles.emailOK);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleTemCadastro = () => {
    setTemCadastro(!temCadastro);
  };

  const checkUserExists = async () => {
    const response = await fetch('http://localhost:8080/auth/user-exists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  }

  const checkUser = async() => {
    const userExists = await checkUserExists();
      if (userExists) {
        const criarElemento = () => {
          let div = document.createElement('div')
          div.id = 'usuarioExiste';
          div.textContent = 'USUÁRIO EXISTENTE';
          div.style.color = 'black';
          div.style.backgroundColor = 'yellow';
          div.style.padding = '10px';
          div.style.borderRadius = '10px';
          div.style.position = 'absolute';
          div.style.top = '67%';
          div.style.right = 'calc(50% - 95px)';
          return div;
        }
        document.body.appendChild(criarElemento());
      } else {
        document.getElementById('usuarioExiste')?.remove();
      }
    }

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    if (response.ok) {
      const criarElemento = () => {
        let div = document.createElement('div')
        div.id = 'usuarioCriado';
        div.textContent = 'USUÁRIO CRIADO COM SUCESSO';
        div.style.color = 'white';
        div.style.backgroundColor = 'green';
        div.style.padding = '10px';
        div.style.borderRadius = '10px';
        div.style.position = 'absolute';
        div.style.top = '67%';
        div.style.right = 'calc(50% - 142px)';
        return div;
      }
      document.body.appendChild(criarElemento());
      setTimeout(() => {
        document.getElementById('usuarioCriado')?.remove();
      }, 3000);

      return
    } else {
      const regex = /@.*\.com/;
      if (password !== confirmPassword && regex.test(email)) { // arrumar essa bosta de div, colocar lá embaixo no lugar que ela deve ficar
        const criarElemento = () => {
          let div = document.createElement('div')
          div.id = 'senhaDiferente';
          div.textContent = 'SENHAS DIFERENTES';
          div.style.color = 'white';
          div.style.backgroundColor = 'red';
          div.style.padding = '10px';
          div.style.borderRadius = '10px';
          div.style.position = 'absolute';
          div.style.top = '67%';
          div.style.right = 'calc(50% - 95px)';
          return div;
        }

        const elemento = criarElemento()
        document.body.appendChild(elemento);
        setStylesSenha(styles.senhaDiferente);
      } else {
        setStylesSenha(styles.senha);
        document.getElementById('senhaDiferente')?.remove();
      }

      if (!regex.test(email) && password === confirmPassword) {
        const criarElemento = () => {
          let div = document.createElement('div')
          div.id = 'emailInvalido';
          div.textContent = 'EMAIL INVÁLIDO';
          div.style.color = 'white';
          div.style.backgroundColor = 'red';
          div.style.padding = '10px';
          div.style.borderRadius = '10px';
          div.style.position = 'absolute';
          div.style.top = '67%';
          div.style.right = 'calc(50% - 73px)';
          return div;
        }

        setStylesEmail(styles.emailDiferente);
        document.body.appendChild(criarElemento());

      } else {
        document.getElementById('emailInvalido')?.remove();
        setStylesEmail(styles.emailOK);
      }

      if (!regex.test(email) && password !== confirmPassword) {
        const criarElemento = () => {
          let div = document.createElement('div')
          div.id = 'emailESenhaInvalidos';
          div.textContent = 'EMAIL E SENHA INVÁLIDOS';
          div.style.color = 'white';
          div.style.backgroundColor = 'red';
          div.style.padding = '10px';
          div.style.borderRadius = '10px';
          div.style.position = 'absolute';
          div.style.top = '67%';
          div.style.right = 'calc(50% - 115px)';
          return div;
        }

        setStylesEmail(styles.emailDiferente);
        setStylesSenha(styles.senhaDiferente);
        document.body.appendChild(criarElemento());
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Todas suas tarefas em um só lugar</h1>
      <div className={styles.loginContainer}>
        {temCadastro ?
          <>
            <h2>Por favor, faça login abaixo para criar e editar suas tarefas</h2>
            <input className={styles.emailOK} name='email' type="email" placeholder='E-mail'
              value={email} onChange={handleEmailChange} />
            <input className={styles.senha} name='password' type="password" placeholder='Senha'
              value={password} onChange={handlePasswordChange} />
            <button className={styles.loginButton} >ENTRAR</button>
          </>
          :
          <>
            <h2>Por favor, cadastre-se abaixo para criar e editar suas tarefas</h2>
            <input className={emailOK} name='email' type="email" placeholder='E-mail'
              value={email} onChange={handleEmailChange} onBlur={checkUser} />
            <input className={senha} name='password' type="password" placeholder='Senha'
              value={password} onChange={handlePasswordChange} />
            <input className={senha} name='confirmPassword' type="password" placeholder='Confirmar Senha'
              value={confirmPassword} onChange={handleConfirmPasswordChange} />
            <button className={styles.loginButton} onClick={handleSubmit}>CADASTRAR</button>
          </>
        }


        {temCadastro ?
          <span className={styles.jaPossui} onClick={handleTemCadastro}>Não tem cadastro? Registre-se aqui!</span>
          :
          <span className={styles.jaPossui} onClick={handleTemCadastro}>Já possui cadastro? Faça o login</span>
        }
      </div>
      <div id='usuarioExiste'>ghfsdgs</div>
    </div >
  )
}
