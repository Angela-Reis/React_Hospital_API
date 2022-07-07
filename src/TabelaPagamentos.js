/**
 * TabelaPagamento.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Consulta</th>
                <th>Valor</th>
                <th>Descricao</th>
                <th>Estado</th>
                <th>DataEfetuado</th>
                <th>Metodo</th>
            </tr>
        </thead>
    )
}


const Corpo = (props) => {
    const linhas = props.dadosTabelaIN.map((linha) => {
        return (
            <tr key={linha.id}>
                <td>{linha.consulta}</td>
                <td>{linha.valor}</td>
                <td>{linha.descricao}</td>
                <td>{linha.estado}</td>
                <td>{linha.dataEfetuado}</td>
                <td>{linha.metodo}</td>
            </tr>
        )
    })

    return (<tbody>{linhas}</tbody>)
}



class TabelaPagamentos extends React.Component {

    render() {
        const { dadosPagamentosIN } = this.props;
        return (
            <table className="table table-striped table-bordered">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosPagamentosIN} />
            </table>
        )
    }
}

export default TabelaPagamentos;