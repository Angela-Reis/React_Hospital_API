/**
 * Prescricoes.js
 */

 import React from "react"
 import FormPrescricoes from "./FormPrescricoes";
 import TabelaPrescricoes from "./TabelaPrescricoes";
 
 /**
  * Insere os dados daf nova prescricao, através da API
  * @param {*} prescricao 
  */
 async function InsirePrescricao(prescricao) {
     // cria o formData que servirá para levar os dados para a API
     let formData = new FormData();
     formData.append("Descricao", prescricao.Descricao);
     formData.append("Estado", prescricao.Estado);
     formData.append("DiagnosticoFK", prescricao.DiagnosticoFK);
     formData.append("Data", (new Date(prescricao.Data)).toUTCString());

     // entregar os dados à API
     let resposta = await fetch("api/PrescricoesAPI/",
         {
             method: "POST",
             body: formData
         });
     if (!resposta.ok) {
         console.error(resposta);
         throw new Error("Ocorreu um erro na adição dos dados do Utente", resposta.status)
     }
 
 }
 
 async function ApagaPrescricao(idPrescricao) {
     // cria o formData que servirá para levar os dados para a API
     let formData = new FormData();
     formData.append("id", idPrescricao);
     // entregar os dados à API
     let resposta = await fetch("api/PrescricoesAPI/" + idPrescricao,
         {
             method: "DELETE",
             body: formData
         });
     if (!resposta.ok) {
         console.error(resposta);
         throw new Error("Ocorreu um erro na eliminção dos dados da Especialidade", resposta.status)
     }
 }
 
 
 class Prescricoes extends React.Component {
     /**
      * enviar os dados para a API
      * @param {*} prescricao 
      */
     handleNovoPrescricao = async (prescricao) => {
         try {
             // exporta os dados para a API
             await InsirePrescricao(prescricao);
             // recarregar a Tabela com os dados das especialidades
             await this.props.LoadDados();
         } catch (error) {
             console.error("Ocorreu um erro com a adição do prescricao " + prescricao.Nome)
         }
 
     }
 
     /**
      * recebe o ID do prescricao a apagar e envia o id para a API
      * @param {*} id 
      */
     handleApaga = async (id) => {
         try {
             // exporta os dados para a API
             await ApagaPrescricao(id);
             // recarregar a Tabela com os dados
             await this.props.LoadDados();
         } catch (error) {
             console.error("ocorreu um erro com a eliminação do médico.")
         }
     }
 
     render() {
         const { prescricoesIN, diagnosticosIN } = this.props;
         return (
             <div  className="border p-5 mb-5">
                 <h1>Prescricoes</h1>
                 <h4>Novo Prescricao:</h4>
                 <FormPrescricoes novoPrescricaoOUT={this.handleNovoPrescricao}
                     diagnosticosIN={diagnosticosIN} />
                 <br />
                 <h4>Lista de Prescricoes</h4>
                 <TabelaPrescricoes dadosPrescricoesIN={prescricoesIN}   apagaOUT={this.handleApaga} />
                 <br /><br />
             </div>
         )
     }
 }
 
 export default Prescricoes;