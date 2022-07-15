/**
 * TabelaDiagnosticos.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Titulo</th>
                <th>Estado</th>
                <th>Descricao</th>
                <th>Utente</th>
            </tr>
        </thead>
    )
}


const Corpo = (props) => {
        const linhas = props.dadosTabelaIN.map((linha) => {
        return (
            <tr key={linha.id}>
                <td>{linha.titulo}</td>
                <td>{linha.estado}</td>
                <td>{linha.descricao}</td>
                <td>{linha.utente}</td>
                <td className="align-middle">
                    <button className="btn btn-outline-danger"
                        onClick={() => props.apagarDados(linha.id)}>
                    Apagar</button>
                </td>
            </tr>
        )
    })

    return (<tbody>{linhas}</tbody>)
}



class TabelaDiagnosticos extends React.Component {

    render() {
        const { dadosTabelaIN,apagaOUT } = this.props;
        return (
            <table className="table table-striped table-bordered">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosTabelaIN} apagarDados={apagaOUT}/>
            </table>
        )
    }
}


export default TabelaDiagnosticos;