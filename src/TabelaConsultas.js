/**
 * TabelaConsultas.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Medico</th>
                <th>Utente</th>
                <th>Data</th>
                <th>Estado</th>
                <th>Motivo</th>
                <th>Diagnostico</th>
            </tr>
        </thead>
    )
}


const Corpo = (props) => {
        const linhas = props.dadosTabelaIN.map((linha) => {
        return (
            <tr key={linha.id}>
                <td>{linha.medico}</td>
                <td>{linha.utente}</td>
                <td>{linha.data}</td>
                <td>{linha.estado}</td>
                <td>{linha.motivo}</td>
                <td>{linha.diagnostico}</td>
            </tr>
        )
    })

    return (<tbody>{linhas}</tbody>)
}



class TabelaConsultas extends React.Component {

    render() {
        const { dadosConsultasIN } = this.props;
        return (
            <table className="table table-striped table-bordered">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosConsultasIN} />
            </table>
        )
    }
}


export default TabelaConsultas;