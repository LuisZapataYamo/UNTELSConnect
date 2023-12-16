import axios from "axios";

import "./Login.css";

import logoUNTELS from "../../assets/png/untels_logo.png";
import { useContext, useEffect, useState } from "react";

import FacebookIcon from "../../assets/svg/facebook.svg?react";
import InstagramIcon from "../../assets/svg/instagram.svg?react";
import UniversityIcon from "../../assets/svg/university.svg?react";
import WhatsappIcon from "../../assets/svg/whatsapp.svg?react";
import { GlobalContext } from "../../context/GlobalStateContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [textError, setTextError] = useState();
  const navigate = useNavigate();
  let tokenIsValid = false;

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        if (tokenLocal) {
          axios.defaults.headers.common["authorization"] = tokenLocal;
          const response = await axios.get("/user/detail");
          const userDetail = response.data;
          setUser(userDetail);
          navigate("/home");
          console.log("user exit");
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
        navigate("/");
      }
    };

    fetchData();
  }, [textError, tokenIsValid]);

  // Logica para registro
  const [
    isEqualPasswordAndPasswordConfirmation,
    setIsEqualPasswordAndPasswordConfirmation,
  ] = useState(false);

  const [formDataRegister, setFormDataRegister] = useState({
    userType: "externo",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    studentCode: "",
  });

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormDataRegister({
      ...formDataRegister,
      [name]: value,
    });
    setIsEqualPasswordAndPasswordConfirmation(
      formDataRegister.password == formDataRegister.confirmPassword
    );
  };

  const handleSubmitRegister = (e) => {
    try {
      e.preventDefault();
      // Aquí puedes manejar la lógica para enviar los datos a tu servidor o realizar otras acciones
      if (isEqualPasswordAndPasswordConfirmation == false) {
        console.log("isEqual", isEqualPasswordAndPasswordConfirmation);
      }
      console.log("Datos del formulario:", formDataRegister);
    } catch (error) {
      console.error("Error en createUser:", error);
    }
  };

  const isStudent = formDataRegister.userType === "estudiante";

  // Logica para login
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // try{
    axios
      .post("/user/login", formLogin)
      .then((response) => {
        const tokenLocal = response.data.token;
        localStorage.setItem("token", tokenLocal);
        axios.defaults.headers.common["authorization"] = tokenLocal;
        axios
          .get("/user/detail")
          .then((response) => {
            localStorage.setItem("tokenIsValid", "true");
            const detailUser = response.data;
            setUser(detailUser);
            navigate("/home");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("Error ", error);
      });

    // }catch(error){
    //   try{
    //     const responseError = error.response.data
    //     setTextError(responseError.error);
    //   }catch(errorSub){
    //     console.log("Error al conectar con el servidor")
    //   }
    // }
  };

  return !tokenIsValid ? (
    <div className="index-login">
      <div className="description">
        <h1>UNTELS Connect</h1>
        <p>
          ¡Bienvenidos a nuestro blog, creado por estudiantes de la UNTELS y
          dedicado especialmente a explorar temas de tecnología! Extendemos una
          cordial invitación a estudiantes y entusiastas externos que compartan
          nuestro interés. Este espacio se presenta como un ambiente acogedor
          donde todos podemos compartir y expresar libremente nuestras ideas.
          Únete a nuestra comunidad para descubrir las últimas novedades,
          debates apasionantes y contribuir al fascinante mundo de la
          tecnología.
        </p>
        <div className="container-img">
          <ul className="word-list">
            <li>TECNOLOGÍA</li>
            <li>CIENCIA</li>
            <li>PROGRAMACIÓN</li>
          </ul>
          <img src={logoUNTELS} alt="" />
        </div>
      </div>
      <div className="container-principal">
        <div className="header-login">
          <h1>Unidos somos mas</h1>
          <ul className="list-social-icon">
            <li className="social-icon">
              <UniversityIcon />
            </li>
            <li className="social-icon">
              <FacebookIcon />
            </li>
            <li className="social-icon">
              <InstagramIcon />
            </li>
            <li className="social-icon">
              <WhatsappIcon />
            </li>
          </ul>
        </div>
        <div className="container-split">
          <div className="container-form container-form-login">
            <div className="form">
              <h1>Iniciar Sesión</h1>
              <form onSubmit={handleSubmitLogin}>
                <label>
                  Correo
                  <input
                    type="text"
                    name="email"
                    value={formLogin.email}
                    onChange={handleChangeLogin}
                  />
                </label>
                <label>
                  Contraseña
                  <input
                    type="password"
                    name="password"
                    value={formLogin.password}
                    onChange={handleChangeLogin}
                  />
                </label>
                <div>{textError}</div>
                <button type="submit">Ingresar</button>
              </form>
            </div>
          </div>
          <div className="container-form container-form-register">
            <div className="form">
              <h1>Registro de Usuario</h1>
              <form onSubmit={handleSubmitRegister}>
                <label>
                  Tipo de Usuario:
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="userType"
                        value="externo"
                        checked={formDataRegister.userType === "externo"}
                        onChange={handleChangeRegister}
                      />
                      Externo
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="userType"
                        value="estudiante"
                        checked={formDataRegister.userType === "estudiante"}
                        onChange={handleChangeRegister}
                      />
                      Estudiante
                    </label>
                  </div>
                </label>
                {isStudent && (
                  <>
                    <label>
                      Universidad:
                      <input
                        type="text"
                        name="university"
                        value={formDataRegister.university}
                        onChange={handleChangeRegister}
                      />
                    </label>

                    <label>
                      Código de Estudiante:
                      <input
                        type="text"
                        name="studentCode"
                        value={formDataRegister.studentCode}
                        onChange={(e) => {
                          // Asegurarse de que solo se ingresen dígitos
                          const onlyDigits = e.target.value.replace(/\D/g, "");
                          setFormDataRegister({
                            ...formDataRegister,
                            studentCode: onlyDigits,
                          });
                        }}
                      />
                    </label>
                  </>
                )}
                <label>
                  Correo:
                  <input
                    type="email"
                    name="email"
                    value={formDataRegister.email}
                    onChange={handleChangeRegister}
                  />
                </label>

                <label>
                  Contraseña:
                  <input
                    type="password"
                    name="password"
                    value={formDataRegister.password}
                    onChange={handleChangeRegister}
                  />
                </label>

                <label>
                  Confirmar Contraseña:
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formDataRegister.confirmPassword}
                    onChange={handleChangeRegister}
                  />
                </label>
                <button type="submit">Registrarse</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
