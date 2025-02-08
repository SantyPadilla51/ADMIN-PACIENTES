import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "./Navbar";
import clienteAxios from "../config/axios";


const RegistrarUser = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        dni: "",
        telefono: "",
        especialidad: ""
    })

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true)
        try {

            const url = "crear-usuario"
            const { data } = await clienteAxios.post(url, usuario)

            if (data.ok === true) {
                toast.success(data.msg, {
                    position: "top-center"
                })
                setCargando(false)
                setTimeout(() => {
                    navigate("/")
                }, 4000);
            } else {
                setCargando(false)
                toast.error(data.msg)
            }
        } catch (error) {
            setCargando(false)
            toast.error("Ha ocurrido un error");
        }
    };

    const handleNavigate = () => {
        navigate("/")
    }

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="bg-gray-100">
                <button className="mt-4 ms-4 bg-slate-500 p-2 rounded hover:bg-slate-400" onClick={handleNavigate}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="20 20" stroke-width="2" stroke={"#fff"} className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <form className="-mt-58 shadow-lg rounded-md mx-3 bg-white flex flex-col p-4 gap-3 lg:w-1/2 lg:mx-auto" onSubmit={(e) => handleSubmit(e)}>
                    <h3 className="text-xl font-bold">Completa todos los campos</h3>

                    <div className="flex flex-col">
                        <label>Nombre:</label>
                        <input className="p-1 bg-slate-200 rounded-md" type="text" name="nombre" required onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="flex flex-col">
                        <label>Apellido:</label>
                        <input className="p-1 bg-slate-200 rounded-md" type="text" name="apellido" required onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="flex flex-col">
                        <label>DNI:</label>
                        <input className="p-1 bg-slate-200 rounded-md" type="text" minLength={8} maxLength={8} name="dni" required onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="block items-center justify-between mt-3">
                        <label>Especialidad:</label>
                        <select className="mt-4" onChange={(e) => handleChange(e)} name="especialidad" required>
                            <option value="">Seleccione una especialidad</option>
                            <option value="cardiología">Cardiología</option>
                            <option value="traumatologia">Traumatología</option>
                            <option value="neurología">Neurología</option>
                            <option value="oncología">Oncología</option>
                            <option value="pediatría">Pediatría</option>
                            <option value="psiquiatría">Psiquiatría</option>
                            <option value="urología">Urología</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label>Correo electrónico:</label>
                        <input className="p-1 bg-slate-200 rounded-md" type="email" name="email" onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="flex flex-col">
                        <label>Telefono:</label>
                        <input className="p-1 bg-slate-200 rounded-md" type="text" name="telefono" minLength={10} maxLength={10} required onChange={(e) => handleChange(e)} />
                    </div>

                    <div className="flex flex-col">
                        <label type="text" name="password" required>Contraseña:</label>
                        <input className="p-1 bg-slate-200 rounded-md" type="text" name="password" onChange={(e) => handleChange(e)} />
                    </div>

                    {cargando ? (
                        <button className="rounded-md bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit">
                            <ClipLoader color={'#fff'} />
                        </button>
                    ) : (
                        <button className="rounded-md bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit" onClick={e => handleSubmit(e)}>Crear Usuario</button>
                    )}
                </form>
            </div>
        </>
    )
}

export default RegistrarUser
