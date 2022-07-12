/**
 * Especialidades.js
 */

import React from "react"
import TabelaEspecialidades from "./TabelaEspecialidades";
import FormEspecialidades from "./FormEspecialidades";

/**
 * Insere os dados da nova especialidade, através da API
 * @param {*} especialidade 
 */
async function InsireEspecialidade(especialidade) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("Nome", especialidade.Nome);
    //envia o array para a API
    especialidade.medicosId.forEach(medico => formData.append('medicosId[]', medico))
    // entregar os dados à API
    let resposta = await fetch("api/EspecialidadesAPI/",
        {
            method: "POST",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na adição dos dados da Especialidade", resposta.status)
    }

}

async function ApagaEspecialidade(idEspecialidade) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("id", idEspecialidade);
    // entregar os dados à API
    let resposta = await fetch("api/EspecialidadesAPI/" + idEspecialidade,
        {
            method: "DELETE",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na eliminção dos dados da Especialidade", resposta.status)
    }
}


class Especialidades extends React.Component {
    /**
     * enviar os dados para a API
     * @param {*} especialidade 
     */
    handleNovaEspecialidade = async (especialidade) => {
        try {
            // exporta os dados para a API
            await InsireEspecialidade(especialidade);
            // recarregar a Tabela com os dados das especialidades
            await this.props.LoadDados();
        } catch (error) {
            console.error("Ocorreu um erro com a adição da especialidade " + especialidade.Nome)
        }
    }

    /**
     * recebe o ID da especialidade a apagar e envia o id para a API
     * @param {*} id 
     */
    handleApaga = async (id) => {
        try {
            // exporta os dados para a API
            await ApagaEspecialidade(id);
            // recarregar a Tabela com os dados
            await this.props.LoadDados();
        } catch (error) {
            console.error("ocorreu um erro com a eliminação da especialidade.")
        }
    }

    render() {
        const { especialidadesIN, medicosIN } = this.props;
        return (
            <div>
                <h1>Especialidades</h1>
                <h4>Nova Especialidade:</h4>
                <FormEspecialidades medicosIN={medicosIN} novaEspecialidadeOUT={this.handleNovaEspecialidade} />
                <br />
                <h4>Lista de Especialidades</h4>
                <TabelaEspecialidades dadosEspecIN={especialidadesIN} apagaOUT={this.handleApaga} />
            </div>
        )
    }
}

export default Especialidades;