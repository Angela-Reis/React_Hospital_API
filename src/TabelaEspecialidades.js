/**
 * TabelaEspecialidades.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Nome</th>
                <th>Número de Medicos</th>
                <th>Medicos</th>
            </tr>
        </thead>
    )
}


const Corpo = (props) => {
    // 'map' funciona como um 'foreach()'
    const linhas = props.dadosTabelaIN.map((linha) => {
        return (
            <tr key={linha.id}>
                <td>{linha.nome}</td>
                <td>{linha.medicos.length}</td>
                <td>{//mostrar médicos que pertencem à especialidade
                        linha.medicos.map((medico) => <p key={medico.id}>{medico.nome} - {medico.numCedulaProf}</p>)
                    }
                </td>
            </tr>
        )
    })

    // esta é a 'resposta' do componente
    return (<tbody>{linhas}</tbody>)
}



class TabelaEspecialidades extends React.Component {

    render() {
        const { dadosEspecIN } = this.props;
        return (
            <table className="table table-striped table-bordered">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosEspecIN} />
            </table>
        )
    }
}


export default TabelaEspecialidades;