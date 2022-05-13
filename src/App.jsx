import React, { useState, useEffect } from 'react';
import { store } from './fireconfig'
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

function App() {
  const [nombre, setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [idUsuario, setIdUsuario] = useState('')
  const [error, setError] = useState('')
  const [usuarioAgenda, setUsuariosAgenda] = useState([])
  const [modoEdicion, setModoEdicion] = useState(null)

  useEffect(() => {
    const getUsuarios = async (e) => {
      refrescarAgenda()
    }
    getUsuarios()
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El campo nombre esta vacio')
    }
    if (!phone.trim()) {
      setError('El telefono esta vacio')
    }
    const usuario = {
      nombre: nombre,
      telefono: phone
    }
    try {

      const data = await addDoc(collection(store, 'agenda'), usuario)
      refrescarAgenda()
      alert('Registro añadido correctamente')
    } catch (e) {
      console.log(e)
    }
    setNombre('')
    setPhone('')
  }

  const BorrarUsuario = async (id) => {
    try {
      await deleteDoc(doc(store, 'agenda', id))
      refrescarAgenda()
    } catch (e) {
      console.log(e)
    }
  }

  const ActualizarDatos = async (id) => {

    try {
      const data = await getDoc(doc(store, 'agenda', id))
      const { nombre, telefono } = data.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdUsuario(id)
      setModoEdicion(true)
    } catch (e) {
      console.log(e)
    }

  }

  const setUpdate = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El campo nombre esta vacio')
    }
    if (!phone.trim()) {
      setError('El telefono esta vacio')
    }

    const userUpdate = {
      nombre: nombre,
      telefono: phone
    }
    try {
      await updateDoc(doc(store, 'agenda', idUsuario), userUpdate)
      refrescarAgenda()
    } catch (e) {
      console.log(e)
    }
    setNombre('')
    setPhone('')
    setIdUsuario('')
    setModoEdicion(false)
  }

   const refrescarAgenda = async () => {
    const { docs }= await getDocs(collection(store, 'agenda'))
    const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
    setUsuariosAgenda(nuevoArray)
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form className="from-group" onSubmit={modoEdicion ? (setUpdate) : (setUsuarios)}>
            <input type="text" placeholder="Introduce el nombre" className="from-control" onChange={(e) => { setNombre(e.target.value) }} value={nombre} />
            <input type="text" className="form-control mt-3" placeholder="introduce el numero" onChange={(e) => { setPhone(e.target.value) }} value={phone} />
            {
              modoEdicion ? (
                <input type="submit" className="btn btn-dark btn-block mt-3" value="Editar" />
              ) : (
                <input type="submit" className="btn btn-dark btn-block mt-3" value="Registrar" />
              )
            }

          </form>
          {
            error ? (<div><p>{error}</p></div>) : (<span></span>)
          }
        </div>
        <div className="col">
          <h2>Lista de tu Agenda</h2>
          <ul className="list-group">
            {
              usuarioAgenda.length !== 0 ? (
                usuarioAgenda.map(item => (
                  <li key={item.id} className="list-group-item"> {item.nombre} -- {item.telefono}
                    <button className="btn btn-success float-right " onClick={(id) => { ActualizarDatos(item.id) }}>Actualizar</button>
                    <button className="btn btn-danger float-right" onClick={(id) => { BorrarUsuario(item.id) }}>Borrar</button>
                  </li>


                ))
              ) : (<span><p>Lo siento no hay tareas que mostrar</p></span>)
            }

          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
