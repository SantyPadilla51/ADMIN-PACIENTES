import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import clienteAxios from "../config/axios";
import NavbarAdmin from "./NavbarAdmin";


const EditarPerfil = () => {
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const { id } = useParams()
    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        especialidad: ""
    });

    const obtenerDatos = async () => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.get('/perfil', config)

            setDatos({
                id: data.doctor.id,
                nombre: data.doctor.nombre,
                apellido: data.doctor.apellido,
                email: data.doctor.email,
                especialidad: data.doctor.especialidad,
                dni: data.doctor.dni,
            })

        } catch (error) {
            toast.error('Hubo un error');
        }
    }

    const handleSubmit = async (e) => {
        setCargando(true)
        e.preventDefault();
        try {
            const url = `/editar-perfil/${id}`;
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(url, datos, config);


            if (data.ok === true) {
                toast.success("Perfil actualizado correctamente", {
                    position: "top-center"
                })
                setCargando(false)
                setTimeout(() => {
                    navigate('/admin/pacientes/perfil')
                }, 2000);
            } else {
                setCargando(false)
                toast.error(data.msg)
            }

        } catch (error) {
            setCargando(false)
            toast.error("Hubo un error")
            return
        }
    };

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        obtenerDatos()
    }, [])

    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <div className="max-w-2xl mx-4 lg:mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-600 text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={datos.nombre}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-600 text-sm font-medium">Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={datos.apellido}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className=" text-gray-600 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={datos.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className=" text-gray-600 text-sm font-medium">DNI</label>
                        <input
                            type="text"
                            name="dni"
                            maxLength={8}
                            value={datos.dni}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-around mt-3 col-span-2">
                        <label>Especialidad:</label>
                        <select className="mt-1 p-2 rounded-md border-gray-300 bg-slate-100 shadow-md focus:outline-none sm:text-sm" onChange={handleChange} name="especialidad" required>
                            <option value="">{datos.especialidad}</option>
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

                    <button
                        disabled={cargando}
                        type="submit"
                        className={`col-span-2 w-full bg-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500  text-white p-2 mt-5 
                        ${cargando ? 'opacity-50 cursor-not-allowed' :
                                'hover:bg-blue-600'}`}
                    >
                        {cargando ? "Guardando..." : "Guardar Cambios"}
                    </button>

                </form>
            </div>
        </>
    );
};

export default EditarPerfil;