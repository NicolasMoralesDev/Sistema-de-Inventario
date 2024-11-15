import React, { useEffect } from "react"
import LoginForm from "./LoginForm"
import { useLoginUsuarios } from "../../Hooks/fetch/Auth.hook"
import { onAuth } from "../../Hooks/util/auth.hook"
import { useNavigate } from "react-router-dom"
import video from "../../assets/video.mp4"
import { Helmet } from "react-helmet"
import { errorPop, loadingPop, successPop } from "../../Hooks/util/messages/alerts"
import "./estilos/login.css"

const Login = () => {

  const navigate = useNavigate()
                      
  const [logueado, errorLogin, logueando, login ] = useLoginUsuarios()

  useEffect(() => { if (logueando) { loadingPop("Ingresando...") } }, [logueando])
  useEffect(() => { if (logueado)  { successPop(logueado?.message, "login"), onAuth(logueado?.jwt) } }, [logueado])
  useEffect(() => { if (errorLogin) { errorPop(errorLogin?.message) } }, [errorLogin])

  useEffect(() => { if (logueado?.jwt) { navigate("/") } }, [logueado])

  const onLogin = (data) => { login(data) }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Inventarium System | Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="login-fondo overflow-hidden">
        <video src={ video } loop={ true } autoPlay={ true } muted>
          Video no soportado.
        </video>
      </div>
      <div className="login-container-form">
        <LoginForm onLogin={ onLogin } />
      </div>
    </>
  );
};

export default Login;
