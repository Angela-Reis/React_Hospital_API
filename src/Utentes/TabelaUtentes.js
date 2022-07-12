/**
 * TabelaUtente.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Nome</th>
                <th>Número de Utente</th>
                <th>NIF</th>
                <th>Número de Telefone</th>
                <th>Email</th>
                <th>Data de Nascimento</th>
                <th>Sexo</th>
                <th>Foto</th>
            </tr>
        </thead>
    )
}


const Corpo = (props) => {
    const linhas = props.dadosTabelaIN.map((linha) => {
        return (
            <tr key={linha.id}>
                <td>{linha.nome}</td>
                <td>{linha.numUtente}</td>
                <td>{linha.nif}</td>
                <td>{linha.numTelefone}</td>
                <td>{linha.email}</td>
                <td>{linha.dataNascimento}</td>
                <td>{linha.sexo}</td>
                <td><img src={'https://localhost:7194/Fotos/Utentes/' + linha.foto}
                    alt={'Foto de Médico ' + linha.nome}
                    title={linha.nome}
                    height="80" /></td>
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



class TabelaUtente extends React.Component {

    render() {
        const { dadosUtentesIN, apagaOUT } = this.props;
        return (
            <table className="table table-striped table-bordered">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosUtentesIN} apagarDados={apagaOUT} />
            </table>
        )
    }
}


export default TabelaUtente;