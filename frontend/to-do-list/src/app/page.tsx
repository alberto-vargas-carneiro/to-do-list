'use client'

import styles from './page.module.css'
import { useState, useEffect } from 'react';

export default function Home() {

  const [email, setEmail] = useState('');
  const [logado, setLogado] = useState(false);
  const [password, setPassword] = useState('');
  const [temCadastro, setTemCadastro] = useState(true);
  const [senha, setStylesSenha] = useState(styles.senha);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailOK, setStylesEmail] = useState(styles.emailOK);
  const [usuarioExiste, setStylesUsuarioExiste] = useState(styles.usuarioExiste);
  const [usuarioCriado, setStylesUsuarioCriado] = useState(styles.usuarioCriado);
  const [emailInvalido, setStylesEmailInvalido] = useState(styles.emailInvalido);
  const [avisoSenhaDiferente, setStylesAvisoSenhaDiferente] = useState(styles.avisoSenhaDiferente);
  const [emailESenhaInvalidos, setStylesEmailESenhaInvalidos] = useState(styles.emailESenhaInvalidos);
  const [emailOuSenhaInvalidos, setStylesEmailOuSenhaInvalidos] = useState(styles.emailOuSenhaInvalidos);

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
    setStylesAvisoSenhaDiferente(styles.avisoSenhaDiferente);
    setStylesEmailInvalido(styles.emailInvalido);
    setStylesEmailESenhaInvalidos(styles.emailESenhaInvalidos);
    setStylesEmail(styles.emailOK);
    setStylesSenha(styles.senha);
    setStylesUsuarioExiste(styles.usuarioExiste)
  };

  const checkUserExists = async () => {
    const response = await fetch('https://to-do-test-404512.rj.r.appspot.com/auth/user-exists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  }

  const checkUser = async () => {
    const userExists = await checkUserExists();
    if (userExists) {
      setStylesUsuarioExiste(styles.usuarioExiste2);
    } else {
      setStylesUsuarioExiste(styles.usuarioExiste);
    }
  }

  useEffect(() => {
    if (logado) {
      localStorage.setItem('logado', JSON.stringify(logado));
      window.location.href = 'https://to-do-list-seven-azure-23.vercel.app/list';
    }
  }, [logado]);


  const handleLogin = async () => {
    const response = await fetch('https://to-do-test-404512.rj.r.appspot.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setLogado(true);
      localStorage.setItem('userEmail', JSON.stringify(data.email));
      localStorage.setItem('token', JSON.stringify(data.token))
    } else {
      setStylesEmailOuSenhaInvalidos(styles.emailOuSenhaInvalidos2);
    }
  }

  const handleSubmit = async () => {
    const response = await fetch('https://to-do-test-404512.rj.r.appspot.com/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    if (response.ok) {
      setStylesUsuarioCriado(styles.usuarioCriado2);
      setStylesAvisoSenhaDiferente(styles.avisoSenhaDiferente);
      setStylesEmailInvalido(styles.emailInvalido);
      setStylesEmailESenhaInvalidos(styles.emailESenhaInvalidos);
      setStylesEmail(styles.emailOK);
      setStylesSenha(styles.senha);
      setTimeout(() => {
        setStylesUsuarioCriado(styles.usuarioCriado);
        setTimeout(() => {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setTemCadastro(!temCadastro);
        }, 250);
      }, 3000);

      return
    } else {
      const regex = /@.*\.com/;
      if (password !== confirmPassword && regex.test(email)) {
        setStylesAvisoSenhaDiferente(styles.avisoSenhaDiferente2);
        setStylesSenha(styles.senhaDiferente);
      } else {
        setStylesSenha(styles.senha);
        setStylesAvisoSenhaDiferente(styles.avisoSenhaDiferente);
      }

      if (!regex.test(email) && password === confirmPassword) {
        setStylesEmail(styles.emailDiferente);
        setStylesEmailInvalido(styles.emailInvalido2);
      } else {
        setStylesEmail(styles.emailOK);
        setStylesEmailInvalido(styles.emailInvalido);
      }

      if (!regex.test(email) && password !== confirmPassword) {
        setStylesEmailESenhaInvalidos(styles.emailESenhaInvalidos2);
        setStylesEmail(styles.emailDiferente);
        setStylesSenha(styles.senhaDiferente);
      } else if (regex.test(email) && password !== confirmPassword) {
        setStylesEmailESenhaInvalidos(styles.emailESenhaInvalidos);
        setStylesEmail(styles.emailOK);
      } else if (!regex.test(email) && password === confirmPassword) {
        setStylesEmailESenhaInvalidos(styles.emailESenhaInvalidos);
        setStylesSenha(styles.senha);
      } else {
        setStylesEmailESenhaInvalidos(styles.emailESenhaInvalidos);
        setStylesEmail(styles.emailOK);
        setStylesSenha(styles.senha);
      }
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.h1}>Todas suas tarefas em um só lugar</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          {temCadastro ?
            <>
              <h2>Por favor, faça login abaixo para criar e editar suas tarefas</h2>
              <input className={styles.emailOK} name='email' type="email" placeholder='E-mail'
                value={email} onChange={handleEmailChange} />
              <input className={styles.senha} name='password' type="password" placeholder='Senha'
                value={password} onChange={handlePasswordChange} />
              <button className={styles.loginButton} onClick={handleLogin}>LOGIN</button>
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
        <div className={usuarioExiste}>USUÁRIO EXISTENTE</div>
        <div className={usuarioCriado}>USUÁRIO CRIADO COM SUCESSO</div>
        <div className={avisoSenhaDiferente}>SENHAS DIFERENTES</div>
        <div className={emailInvalido}>EMAIL INVÁLIDO</div>
        <div className={emailESenhaInvalidos}>EMAIL E SENHA INVÁLIDOS</div>
        <div className={emailOuSenhaInvalidos}>EMAIL E/OU SENHA INVÁLIDOS</div>
      </div >
    </>
  )
}
