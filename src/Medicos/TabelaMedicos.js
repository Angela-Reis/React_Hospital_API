/**
 * TabelaMedicos.js
 */


import React from "react";

function Cabecalho() {
    return (
        <thead>
            <tr>
                <th>Nome</th>
                <th>Cedula Profisional</th>
                <th>Número de Telefone</th>
                <th>Email</th>
                <th>Data de Nascimento</th>
                <th>Especialidades</th>
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
                <td>{linha.numCedulaProf}</td>
                <td>{linha.numTelefone}</td>
                <td>{linha.email}</td>
                <td>{linha.dataNascimento}</td>
                <td>{linha.especialidades.map(function (especialidade) { return especialidade.nome }).join(", ")}
                </td>
                <td><img src={'https://localhost:7194/Fotos/Medicos/' + linha.foto}
                    alt={'Foto de Médico ' + linha.nome}
                    title={linha.nome}
                    height="80" /></td>
                <td className="align-middle">
                    <button className="btn btn-outline-danger"
                        onClick={() => props.apagarMedicos(linha.id)}>
                        Apagar</button>
                </td>
            </tr>
        )
    })

    // esta é a 'resposta' do componente
    return (<tbody>{linhas}</tbody>)
}



class TabelaMedicos extends React.Component {

    render() {
        const { dadosMedicosIN, apagaOUT } = this.props;
        return (
            <table className="table table-striped table-bordered">
                <Cabecalho />
                <Corpo dadosTabelaIN={dadosMedicosIN} apagarMedicos={apagaOUT}/>
            </table>
        )
    }
}


export default TabelaMedicos;