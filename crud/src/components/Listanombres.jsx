import React, { useState } from 'react'
import uniqid from 'uniqid'

const Listanombres = () => {

    const [nombre, setNombre] = useState('')
    const [listanombres, setListaNombres] = useState([])


    const addNombre = (evento) =>{
        evento.preventDefault()
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListaNombres([...listanombres, nuevoNombre])
        setNombre('')
    }

    const deleteNombre = (id) =>{
        const borrarNombre = listanombres.filter( item => item.id !== id)
        setListaNombres(borrarNombre)
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
                                </li>
                            ) 
                        }
                    </ul>
                </div>
                <div className="col">
                    <h2>Registrar</h2>
                    <form onSubmit={(evento) => addNombre(evento)} className="form-group d-grid gap-2">
                        <input 
                            onChange={(evento) => {setNombre (evento.target.value)}} 
                            className="form-control" 
                            type="text" 
                            placeholder="Nombre"
                            value={nombre}
                        />
                        <input className="btn btn-success btn-block" type="submit" value="Registrar"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Listanombres
