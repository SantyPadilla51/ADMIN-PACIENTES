import { useState } from "react"
import clienteAxios from "../config/axios";
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import 'react-toastify/dist/ReactToastify.css';


const InicioSesion = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    const [datos, setDatos] = useState({
        email: "",
        password: ""
    })
    const { setAuth } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (datos.email === "" || datos.password === "") {
            toast.error("Todos los campos son obligatorios")
            return;
        } else {

            try {
                setCargando(true)

                toast.loading("Iniciando Sesion...", {
                    position: "top-center"
                })
                
                const url = "/iniciar-sesion"
                const { data } = await clienteAxios.post(url, datos)

                if (data.ok != true) {
                    toast.error(data.msg)
                    return
                } else {
                    setAuth(data)
                    localStorage.setItem('token', data.token)
                    setTimeout(() => {
                        navigate("/admin/pacientes")
                    }, 300);
                }
                setCargando(false)

            } catch (error) {
                setCargando(false)
                toast.error('Hubo un error al iniciar sesion')

            }
        }

    }

    const hanldeChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Inicia Sesión
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={datos.email}
                                onChange={(e) => hanldeChange(e)}
                                required
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Ingresa tu correo"
                            />
                        </div>
                        {/* Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={datos.password}
                                onChange={(e) => hanldeChange(e)}
                                required
                                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>
                        {/* Botón de Iniciar Sesión */}
                        <div>
                            <button
                                type="submit"
                                disabled={cargando}
                                className={`w-full py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 ${cargando
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                                    }`}
                            >
                                {cargando ? "Cargando..." : "Iniciar Sesión"}
                            </button>
                        </div>
                    </form>
                    {/* Enlaces de Registro y Contraseña */}
                    <div className="mt-6 flex justify-between items-center">
                        <Link
                            to={'/olvide-password'}
                            className="text-sm text-indigo-600 hover:text-indigo-800">
                            ¿Olvidaste tu contraseña?</Link>

                        <Link
                            to={'/crear-cuenta'}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                            Regístrate</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InicioSesion