// import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import clienteAxios from "../config/axios";
// import 'react-toastify/dist/ReactToastify.css';


const PerfilPaciente = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [eliminandoId, setEliminandoId] = useState(null)
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellido: "",
    edad: "",
    dni: "",
    sexo: "",
    email: "",
    telefono: "",
    medicacion: "",
    sintomas: ""
  });

  const obtenerPaciente = async () => {
    try {
      const token = localStorage.getItem('token')

      const { data } = await clienteAxios.get(`pacienteId/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      setFormData({
        id: data.paciente[0].id,
        nombre: data.paciente[0].nombre || "",
        apellido: data.paciente[0].apellido || "",
        edad: data.paciente[0].edad || "",
        dni: data.paciente[0].dni || "",
        sexo: data.paciente[0].sexo || "",
        email: data.paciente[0].email || "",
        telefono: data.paciente[0].telefono || "",
        medicacion: data.paciente[0].medicacion || "",
        sintomas: data.paciente[0].sintomas || ""
      });
    } catch (error) {
      toast.error("Ha ocurrido un error");
    }
  }

  const eliminarPaciente = async (e, id) => {
    // const cardBody = e.target.parentElement.parentElement
    setEliminandoId(id)
    try {
      const token = localStorage.getItem('token')
      const url = `/eliminar-paciente/${id}`
      const { data } = await clienteAxios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.ok === true) {
        cardBody.classList.add('scale-out-horizontal')
        setTimeout(() => {
          obtenerPacientes()
        }, 1000);
      } else {
        toast.error(data.msg)
      }

    } catch (error) {
      setCargando(false)
      toast.error('Ocurrió un error')
    } finally {
      setEliminandoId(null)
    }
  }

  useEffect(() => {
    obtenerPaciente();
  }, [])

  return (
    <>
      <NavbarAdmin />
      {/* <ToastContainer /> */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Perfil del Paciente</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.nombre}</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.apellido}</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Edad
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.edad}</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.telefono}</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              DNI
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.dni}</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sexo
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.sexo}</h2>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.email}</h2>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Medicacion
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.medicacion}</h2>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Sintomas
            </label>
            <h2
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm"
            >{formData.sintomas}</h2>
          </div>

        </form>

        <div className="flex gap-4 justify-evenly mt-5">
          <button
            className="text-sm bg-gray-600 hover:bg-gray-800 text-white py-2 px-4 rounded-md"
            onClick={() => navigate(`/admin/pacientes/editar/${formData.id}`)}
          >
            Editar Paciente
          </button>

          <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-4  rounded-md" onClick={() => navigate(`/admin/pacientes/actualizar-sintomas/${formData.id}`)}>
            Actualizar Sintomas
          </button>

          <button className="text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md" onClick={() => navigate(`/actualizar-sintomas/${formData.id}`)}>
            Eliminar Paciente
          </button>
        </div>
      </div>
    </>
  )
}

export default PerfilPaciente