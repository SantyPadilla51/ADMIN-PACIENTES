import { useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import clienteAxios from "../config/axios";
import 'react-toastify/dist/ReactToastify.css';

const ConfirmarCuenta = () => {

    const [cargando, setCargando] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const { token } = params

    const handleSubmit = (e) => {
        e.preventDefault()
        confirmarCuenta(token)
    }

    const confirmarCuenta = async () => {
        try {
            setCargando(true)
            
            const url = 'confirmar-cuenta'
            const { data } = await clienteAxios.post(`${url}/${token}`)

            if (data.ok != true) {
                toast.error(data.msg)
                setCargando(false)
            } else {
                toast.success(data.msg)
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }

        } catch (error) {
            toast.error("Hubo un error al confirmar la cuenta. Por favor, inténtelo más tarde.")
            console.log(error);
            
            return
        }
    }

    return (
        <>
            <div className="text-center mt-10 text-white">
                <ToastContainer />
                <h1 className="text-xl">Confirma tu cuenta dando click en el boton</h1>
                {cargando ? (
                    <button className="text-white p-3 font-semibold hover:bg-green-500 mt-5" >
                        <ClipLoader color={'#fff'} />
                    </button>
                ) : (
                    <button className="bg-green-600 font-semibold text-white p-3 hover:bg-green-500 mt-5" onClick={(e) => handleSubmit(e)}>Confirmar Cuenta</button>
                )}
            </div>

        </>
    )
}

export default ConfirmarCuenta