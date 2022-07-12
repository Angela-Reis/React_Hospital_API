/**
 * Utentes.js
 */

import React from "react"
import FormUtentes from "./FormUtentes";
import TabelaUtentes from "./TabelaUtentes";

/**
 * Insere os dados da nova utente, através da API
 * @param {*} utente 
 */
async function InsireUtente(utente) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("Nome", utente.Nome);
    formData.append("NumUtente", utente.NumUtente);
    formData.append("NIF", utente.NIF);
    formData.append("NumTelemovel", utente.NumTelefone);
    formData.append("Email", utente.Email);
    formData.append("DataNascimento", (new Date(utente.DataNascimento)).toUTCString());
    formData.append("Sexo", utente.Sexo);
    formData.append("novaFoto", utente.Foto);
    // entregar os dados à API
    let resposta = await fetch("api/UtentesAPI/",
        {
            method: "POST",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na adição dos dados do Médico", resposta.status)
    }

}

async function ApagaUtente(idUtente) {
    // cria o formData que servirá para levar os dados para a API
    let formData = new FormData();
    formData.append("id", idUtente);
    // entregar os dados à API
    let resposta = await fetch("api/UtentesAPI/" + idUtente,
        {
            method: "DELETE",
            body: formData
        });
    if (!resposta.ok) {
        console.error(resposta);
        throw new Error("Ocorreu um erro na eliminção dos dados da Especialidade", resposta.status)
    }
}


class Utentes extends React.Component {
    /**
     * enviar os dados para a API
     * @param {*} utente 
     */
    handleNovoUtente = async (utente) => {
        try {
            // exporta os dados para a API
            await InsireUtente(utente);
            // recarregar a Tabela com os dados das especialidades
            await this.props.LoadDados();
        } catch (error) {
            console.error("Ocorreu um erro com a adição do utente " + utente.Nome)
        }

    }

    /**
     * recebe o ID do utente a apagar e envia o id para a API
     * @param {*} id 
     */
    handleApaga = async (id) => {
        try {
            // exporta os dados para a API
            await ApagaUtente(id);
            // recarregar a Tabela com os dados
            await this.props.LoadDados();
        } catch (error) {
            console.error("ocorreu um erro com a eliminação do médico.")
        }
    }

    render() {
        const { utentesIN } = this.props;
        return (
            <div>
                <h1>Utentes</h1>
                <h4>Novo Utente:</h4>
                <FormUtentes novoUtenteOUT={this.handleNovoUtente} />
                <br />
                <h4>Lista de Utentes</h4>
                <TabelaUtentes dadosUtentesIN={utentesIN} apagaOUT={this.handleApaga} />
                <br /><br />
            </div>
        )
    }
}

export default Utentes;