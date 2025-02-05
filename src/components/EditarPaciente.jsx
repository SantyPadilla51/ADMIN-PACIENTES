import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import clienteAxios from "../config/axios";
import NavbarAdmin from "./NavbarAdmin";
import 'react-toastify/dist/ReactToastify.css';


const EditarPaciente = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams()
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: ""
    });

    const obtenerPaciente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `/pacienteId/${id}`
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.get(url, config)
            console.log(data);


            setFormData({
                nombre: data.paciente[0].nombre || "",
                apellido: data.paciente[0].apellido || "",
                edad: data.paciente[0].edad || "",
                dni: data.paciente[0].dni || "",
                sexo: data.paciente[0].sexo || "",
                email: data.paciente[0].email || "",
                telefono: data.paciente[0].telefono || ""
            });
        } catch (error) {
            toast.error("Ha ocurrido un error");
        }
    }

    const actualizarPaciente = async (e) => {
        e.preventDefault()
        setCargando(true)
        toast.loading('Actualizando Paciente..', {
            position: "top-center"
        })
        try {
            const token = localStorage.getItem('token')
            const url = `/actualizar-paciente/${id}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(url, JSON.stringify(formData), config)

            if (data.ok === true) {
                setTimeout(() => {
                    navigate("/admin/pacientes")
                }, 1000);
            } else {
                setCargando(false)
                toast.error(data.msg);
            }

        } catch (error) {
            setCargando(false)
            toast.error('Ocurrio un error')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        obtenerPaciente();
    }, [])

    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <div className="max-w-4xl mx-4 bg-white p-8 rounded-md shadow-md mt-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Editar Paciente</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
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
                            value={formData.apellido}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none  sm:text-sm"
                            placeholder="Escribe el apellido"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Edad
                        </label>
                        <input
                            type="number"
                            id="edad"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none  sm:text-sm"
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
                            value={formData.telefono}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none  sm:text-sm"
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
                            value={formData.dni}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none  sm:text-sm"
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
                            value={formData.sexo}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none  sm:text-sm"
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
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
                            placeholder="Escribe el email"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                        <button
                            onClick={(e) => actualizarPaciente(e)}
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

export default EditarPaciente