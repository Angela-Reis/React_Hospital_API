/**
 * TabelaPrescricoes.js
 */


 import React from "react";
 
 function Cabecalho() {
     return (
         <thead>
             <tr>
                 <th>Descrição</th>
                 <th>Estado</th>
                 <th>Data</th>
                 <th>Diagnostico</th>
             </tr>
         </thead>
     )
 }
 
 
 const Corpo = (props) => {
         const linhas = props.dadosTabelaIN.map((linha) => {
         return (
             <tr key={linha.id}>
                 <td>{linha.descricao}</td>
                 <td>{linha.estado}</td>
                 <td>{linha.data}</td>
                 <td>{linha.diagnostico}</td>
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
 
 
 
 class TabelaPrescricoes extends React.Component {
 
     render() {
         const { dadosPrescricoesIN, apagaOUT} = this.props;
         return (
             <table className="table table-striped table-bordered">
                 <Cabecalho />
                 <Corpo dadosTabelaIN={dadosPrescricoesIN}  apagarDados={apagaOUT}  />
             </table>
         )
     }
 }
 
 export default TabelaPrescricoes;