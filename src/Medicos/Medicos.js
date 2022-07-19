/**
 * Medicos.js
 */

import React from "react"
import FormMedicos from "./FormMedicos";
import TabelaMedicos from "./TabelaMedicos";

/**
 * Insere os dados da nova medico, através da API
 * @param {*} medico 
 */
async function InsireMedico(medico) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("Nome", medico.Nome);
    formData.append("NumCedulaProf", medico.NumCedulaProf);
    formData.append("NumTelefone", medico.NumTelefone);
    formData.append("Email", medico.Email);
    formData.append("DataNascimento", (new Date(medico.DataNascimento)).toUTCString());
    formData.append("novaFotoMed", medico.Foto);

    //envia o array para a API
    medico.especialidadesId.forEach(medico => formData.append('especialidadeId[]', medico))
    // entregar os dados à API
    let resposta = await fetch("api/MedicosAPI/",
        {
            method: "POST",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na adição dos dados do Médico", resposta.status)
    }

}

async function ApagaMedico(idMedico) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("id", idMedico);
    // entregar os dados à API
    let resposta = await fetch("api/MedicosAPI/" + idMedico,
        {
            method: "DELETE",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na eliminção dos dados da Especialidade", resposta.status)
    }
}


class Medicos extends React.Component {
    /**
     * enviar os dados para a API
     * @param {*} medico 
     */
    handleNovoMedico = async (medico) => {
        try {
            // exporta os dados para a API
            await InsireMedico(medico);
            // recarregar a Tabela com os dados das especialidades
            await this.props.LoadDados();
        } catch (error) {
            console.error("Ocorreu um erro com a adição do medico " + medico.Nome)
        }
    }

    /**
     * recebe o ID do medico a apagar e envia o id para a API
     * @param {*} id 
     */
    handleApaga = async (id) => {
        try {
            // exporta os dados para a API
            await ApagaMedico(id);
            // recarregar a Tabela com os dados
            await this.props.LoadDados();
        } catch (error) {
            console.error("ocorreu um erro com a eliminação do médico.")
        }
    }

    render() {
        const { medicosIN, especialidadesIN } = this.props;
        return (
            <div  className="border p-5 mb-5">
                <h1>Médicos</h1>
                <h4>Novo Médico:</h4>
                <FormMedicos especialidadesIN={especialidadesIN} novoMedicoOUT={this.handleNovoMedico} />
                <br />
                <h4>Lista de Medicos</h4>
                <TabelaMedicos dadosMedicosIN={medicosIN} apagaOUT={this.handleApaga} />
                <br /><br />
            </div>
        )
    }
}

export default Medicos;