/**
 * Diagnosticos.js
 */

 import React from "react"
 import TabelaDiagnosticos from "./TabelaDiagnosticos";
 import FormDiagnosticos from "./FormDiagnosticos";
 
 /**
  * Insere os dados da nova diagnostico, através da API
  * @param {*} diagnostico 
  */
 async function InsireDiagnostico(diagnostico) {
     // cria o formData que servirá para levar os dados para a API
     let formData = new FormData();
     formData.append("Titulo", diagnostico.Titulo);
     formData.append("Descricao", diagnostico.Descricao);
     formData.append("Estado", diagnostico.Estado);
     // entregar os dados à API
     let resposta = await fetch("api/DiagnosticosAPI/",
         {
             method: "POST",
             body: formData
         });
     if (!resposta.ok) {
         console.error(resposta);
         throw new Error("Ocorreu um erro na adição dos dados do Diagnóstico", resposta.status)
     }
 
 }
 
 async function ApagaDiagnostico(idDiagnostico) {
     // cria o formData que servirá para levar os dados para a API
     let formData = new FormData();
     formData.append("id", idDiagnostico);
     // entregar os dados à API
     let resposta = await fetch("api/DiagnosticosAPI/" + idDiagnostico,
         {
             method: "DELETE",
             body: formData
         });
     if (!resposta.ok) {
         console.error(resposta);
         throw new Error("Ocorreu um erro na eliminção dos dados do Diagnóstico", resposta.status)
     }
 }
 
 
 class Diagnosticos extends React.Component {
     /**
      * enviar os dados para a API
      * @param {*} diagnostico 
      */
     handleNovoDiagnostico = async (diagnostico) => {
         try {
             // exporta os dados para a API
             await InsireDiagnostico(diagnostico);
             // recarregar a Tabela com os dados das diagnosticos
             await this.props.LoadDados();
         } catch (error) {
             console.error("Ocorreu um erro com a adição do Diagnóstico " + diagnostico.Nome)
         }
     }
 
     /**
      * recebe o ID da diagnostico a apagar e envia o id para a API
      * @param {*} id 
      */
     handleApaga = async (id) => {
         try {
             // exporta os dados para a API
             await ApagaDiagnostico(id);
             // recarregar a Tabela com os dados
             await this.props.LoadDados();
         } catch (error) {
             console.error("ocorreu um erro com a eliminação do Diagnóstico.")
         }
     }
 
     render() {
         const { diagnosticosIN } = this.props;
         return (
             <div>
                 <h1>Diagnosticos</h1>
                 <h4>Novo Diagnostico:</h4>
                 <FormDiagnosticos  novoDiagnosticoOUT={this.handleNovoDiagnostico} />
                 <br />
                 <h4>Lista de Diagnosticos</h4>
                 <TabelaDiagnosticos dadosTabelaIN={diagnosticosIN} apagaOUT={this.handleApaga} />
                 <br /><br />
             </div>
         )
     }
 }
 
 export default Diagnosticos;