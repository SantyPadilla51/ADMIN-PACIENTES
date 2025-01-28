import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';
import NavbarAdmin from './NavbarAdmin';
import 'react-toastify/dist/ReactToastify.css';

const RegistrarPaciente = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()

    const [paciente, setPaciente] = useState({
        email: "",
        edad: "",
        nombre: "",
        apellido: "",
        dni: "",
        sexo: "",
        telefono: "",
        sintomas: "",
        medicacion: ""
    });

    const handleChange = (e) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true)
        toast.loading("Guardando Paciente")
        try {
            const token = localStorage.getItem('token')
            const url = "/crear-paciente"
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(url, paciente, config)

            if (data.ok === true) {
                setCargando(false)
                setTimeout(() => {
                    navigate('/admin/pacientes')
                }, 1500);
            } else {
                toast.error(data.msg)
            }

        } catch (error) {
            toast.error('Hubo un error')
            return;
        }
    }

    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Registrar Paciente</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={paciente.nombre}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe el nombre"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido"
                            name="apellido"
                            value={paciente.apellido}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
                            placeholder="Escribe el apellido"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Edad
                        </label>
                        <input
                            type="text"
                            id="edad"
                            name="edad"
                            maxLength={3}
                            minLength={1}
                            value={paciente.edad}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
                            placeholder="Escribe la edad"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            id="telefono"
                            name="telefono"
                            maxLength={10}
                            minLength={10}
                            value={paciente.telefono}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300  bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
                            placeholder="Escribe el teléfono"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            DNI
                        </label>
                        <input
                            type="text"
                            id="dni"
                            name="dni"
                            value={paciente.dni}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
                            placeholder="Escribe el DNI"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Sexo
                        </label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={paciente.sexo}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none  sm:text-sm"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={paciente.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe el email"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Medicacion
                        </label>
                        <input
                            type="text"
                            id="medicacion"
                            name="medicacion"
                            value={paciente.medicacion}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe la medicacion"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Sintomas
                        </label>
                        <textarea
                            id="sintomas"
                            name="sintomas"
                            value={paciente.sintomas}
                            onChange={handleChange}
                            rows={6}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            placeholder="Escribe los sintomas"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                        <button
                            onClick={(e) => handleSubmit(e)}
                            disabled={cargando}
                            type="submit"
                            className={`w-full md:w-auto bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500  text-white p-2 mt-5 ${cargando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            {cargando ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegistrarPaciente