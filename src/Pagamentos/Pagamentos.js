/**
 * Pagamentos.js
 */

 import React from "react"
 import FormPagamentos from "./FormPagamentos";
 import TabelaPagamentos from "./TabelaPagamentos";
 
 /**
  * Insere os dados daf nova pagamento, através da API
  * @param {*} pagamento 
  */
 async function InsirePagamento(pagamento) {
     // cria o formData que servirá para levar os dados para a API
     let formData = new FormData();
     formData.append("AuxValor", pagamento.AuxValor);
     formData.append("Descricao", pagamento.Descricao);
     formData.append("Estado", pagamento.Estado);
     formData.append("Metodo", pagamento.Metodo);
     formData.append("ConsultaFK", pagamento.ConsultaFK);
     formData.append("DataEfetuado", (new Date(pagamento.DataEfetuado)).toUTCString());

     // entregar os dados à API
     let resposta = await fetch("api/PagamentosAPI/",
         {
             method: "POST",
             body: formData
         });
     if (!resposta.ok) {
         console.error(resposta);
         throw new Error("Ocorreu um erro na adição dos dados do Utente", resposta.status)
     }
 
 }
 
 async function ApagaPagamento(idPagamento) {
     // cria o formData que servirá para levar os dados para a API
     let formData = new FormData();
     formData.append("id", idPagamento);
     // entregar os dados à API
     let resposta = await fetch("api/PagamentosAPI/" + idPagamento,
         {
             method: "DELETE",
             body: formData
         });
     if (!resposta.ok) {
         console.error(resposta);
         throw new Error("Ocorreu um erro na eliminção dos dados da Especialidade", resposta.status)
     }
 }
 
 
 class Pagamentos extends React.Component {
     /**
      * enviar os dados para a API
      * @param {*} pagamento 
      */
     handleNovoPagamento = async (pagamento) => {
         try {
             // exporta os dados para a API
             await InsirePagamento(pagamento);
             // recarregar a Tabela com os dados das especialidades
             await this.props.LoadDados();
         } catch (error) {
             console.error("Ocorreu um erro com a adição do pagamento " + pagamento.Nome)
         }
 
     }
 
     /**
      * recebe o ID do pagamento a apagar e envia o id para a API
      * @param {*} id 
      */
     handleApaga = async (id) => {
         try {
             // exporta os dados para a API
             await ApagaPagamento(id);
             // recarregar a Tabela com os dados
             await this.props.LoadDados();
         } catch (error) {
             console.error("ocorreu um erro com a eliminação do médico.")
         }
     }
 
     render() {
         const { pagamentosIN, consultasIN } = this.props;
         return (
             <div>
                 <h1>Pagamentos</h1>
                 <h4>Novo Pagamento:</h4>
                 <FormPagamentos novoPagamentoOUT={this.handleNovoPagamento}
                     consultasIN={consultasIN} />
                 <br />
                 <h4>Lista de Pagamentos</h4>
                 <TabelaPagamentos dadosPagamentosIN={pagamentosIN}   apagaOUT={this.handleApaga} />
                 <br /><br />
             </div>
         )
     }
 }
 
 export default Pagamentos;