/**
 * Consultas.js
 */

import React from "react"
import FormConsultas from "./FormConsultas";
import TabelaConsultas from "./TabelaConsultas";

/**
 * Insere os dados daf nova consulta, através da API
 * @param {*} consulta 
 */
async function InsireConsulta(consulta) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("Motivo", consulta.Motivo);
    formData.append("Estado", consulta.Estado);
    formData.append("UtenteFK", consulta.UtenteFK);
    formData.append("MedicoFK", consulta.MedicoFK);
    formData.append("DiagnosticoFK", consulta.DiagnosticoFK);
    formData.append("Data", (new Date(consulta.Data)).toUTCString());


    // entregar os dados à API
    let resposta = await fetch("api/ConsultasAPI/",
        {
            method: "POST",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na adição dos dados do Utente", resposta.status)
    }

}

async function ApagaConsulta(idConsulta) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("id", idConsulta);
    // entregar os dados à API
    let resposta = await fetch("api/ConsultasAPI/" + idConsulta,
        {
            method: "DELETE",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na eliminção dos dados da Especialidade", resposta.status)
    }
}


class Consultas extends React.Component {
    /**
     * enviar os dados para a API
     * @param {*} consulta 
     */
    handleNovoConsulta = async (consulta) => {
        try {
            // exporta os dados para a API
            await InsireConsulta(consulta);
            // recarregar a Tabela com os dados das especialidades
            await this.props.LoadDados();
        } catch (error) {
            console.error("Ocorreu um erro com a adição do consulta " + consulta.Nome)
        }

    }

    /**
     * recebe o ID do consulta a apagar e envia o id para a API
     * @param {*} id 
     */
    handleApaga = async (id) => {
        try {
            // exporta os dados para a API
            await ApagaConsulta(id);
            // recarregar a Tabela com os dados
            await this.props.LoadDados();
        } catch (error) {
            console.error("ocorreu um erro com a eliminação do médico.")
        }
    }

    render() {
        const { consultasIN, medicosIN, utentesIN, diagnosticosIN } = this.props;
        return (
            <div  className="border p-5 mb-5">
                <h1>Consultas</h1>
                <h4>Novo Consulta:</h4>
                <FormConsultas novoConsultaOUT={this.handleNovoConsulta}
                    medicosIN={medicosIN} utentesIN={utentesIN} diagnosticosIN={diagnosticosIN} />
                <br />
                <h4>Lista de Consultas</h4>
                <TabelaConsultas dadosConsultasIN={consultasIN} apagaOUT={this.handleApaga} />
                <br /><br />
            </div>
        )
    }
}

export default Consultas;