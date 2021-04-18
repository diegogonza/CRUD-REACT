import React, { useState } from 'react'
import uniqid from 'uniqid'

const Listanombres = () => {

    const [nombre, setNombre] = useState('')
    const [listanombres, setListaNombres] = useState([])
    const [modoedicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const addNombre = (evento) =>{
        evento.preventDefault()
        if (!nombre.trim()) {
            setError('El campo esta vacio')
            return
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([...listanombres, nuevoNombre])
        setNombre('')
        setError(null)
    }

    const deleteNombre = (id) =>{
        const borrarNombre = listanombres.filter( item => item.id !== id)
        setListaNombres(borrarNombre)
    }
    const editar = (item)=>{
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }
    const editarNombre = (evento) =>{
        evento.preventDefault()
        const NuevoArray = listanombres
        .map( item => item.id === id ? {id:id, tituloNombre:nombre}: item)
        setListaNombres(NuevoArray)
        setModoEdicion(false)
        setNombre('')
    }


    return (
        <div className="mt-5">
            <h2>App Crud</h2>
            <div className="row">
                <div className="col">
                    <h2>Nombres</h2>
                    <ul className="list-group">
                        {
                            listanombres.map( item =>
                                <li key="{item.id}" className="list-group-item">{item.tituloNombre}
                                    <button
                                        className="btn btn-danger btn-sm float-end"
                                        onClick={ ()=> {deleteNombre(item.id)}}
                                    >
                                        Borrar
                                    </button>
                                    <button
                                        className="btn btn-info btn-sm float-end"
                                        onClick={ ()=> {editar(item)}}
                                    >
                                        Editar
                                    </button>
                                </li>
                            ) 
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Registrar</h2>
                    <form onSubmit={modoedicion ? editarNombre : addNombre} className="form-group d-grid gap-2">
                        <input 
                            onChange={(evento) => {setNombre (evento.target.value)}} 
                            className="form-control" 
                            type="text" 
                            placeholder="Nombre"
                            value={nombre}
                        />
                        <input 
                            className="btn btn-success btn-block" 
                            type="submit" 
                            value={modoedicion ? 'EDITAR NOMBRE': 'AGREGAR NOMBRE'}
                        />
                    </form>
                    {
                        error != null ?(
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        ):
                            (
                                <div></div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Listanombres
