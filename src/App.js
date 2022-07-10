/**
 * App.js
 */

import React from "react"
import Especialidades from "./Especialidades/Especialidades";
import Medicos from "./Medicos/Medicos";
import TabelaUtente from "./TabelaUtente";
import TabelaConsultas from "./TabelaConsultas";
import TabelaDiagnosticos from "./TabelaDiagnosticos";
import TabelaPrescricoes from "./TabelaPrescricoes";
import TabelaPagamentos from "./TabelaPagamentos";

/**
 * função que pede à API os dados do link, sendo o link uma string
 */
async function getData(link) {
  // ler os dados das Especialidades da API 
  let dados = await fetch(link);

  // verificar os dados lidos
  if (!dados.ok) {
    console.error(dados);
    throw new Error("Algo falhou ao obter os dados das especialidades HTTP Code: ",
      dados.state);
  }

  // Returnar os dados, em formato JSON
  return await dados.json();
}

class App extends React.Component {
  state = {
    especialidades: [],
    medicos: [],
    utentes: [],
    consultas: [],
    diagnosticos: [],
    prescricoes: [],
    pagamentos: [],
  }

  componentDidMount() {
    this.LoadEspecialidades();
    this.LoadMedicos();
    this.LoadUtentes();
    this.LoadConsultas();
    this.LoadDiagnosticos();
    this.LoadPrescricoes();
    this.LoadPagamentos();
  }

  /**
   * load os dados das Especialidades da API 
   */
  async LoadEspecialidades() {
    try {
      // ler os dados dos Especialidades do API
      let especialidadesDaAPI = await getData("api/EspecialidadesAPI/");
      // após receber os dados guardar no state
      this.setState({ especialidades: especialidadesDaAPI })
    } catch (ex) {
      console.error("Aconteceu um erro no acesso aos dados das especialidaes ", ex)
    }
  }

  /**
   * load os dados das Médicos da API 
   */
  async LoadMedicos() {
    try {
      // ler os dados dos Médicos do API
      let medicosDaAPI = await getData("api/MedicosAPI/");
      // após receber os dados guardar no state
      this.setState({ medicos: medicosDaAPI })
    } catch (ex) {
      console.error("Aconteceu um erro no acesso aos dados dos médicos ", ex)
    }
  }

  /**
   * load os dados dos Utentes da API 
   */
  async LoadUtentes() {
    try {
      // ler os dados dos Utentes do API
      let utentesDaAPI = await getData("api/UtentesAPI/");
      // após receber os dados guardar no state
      this.setState({ utentes: utentesDaAPI })
    } catch (ex) {
      console.error("Aconteceu um erro no acesso aos dados dos utentes ", ex)
    }
  }

  /**
 * load os dados dos Consultas da API 
 */
  async LoadConsultas() {
    try {
      // ler os dados das Consultas do API
      let consultasDaAPI = await getData("api/ConsultasAPI/");
      // após receber os dados guardar no state
      this.setState({ consultas: consultasDaAPI })
    } catch (ex) {
      console.error("Aconteceu um erro no acesso aos dados das consultas ", ex)
    }
  }

  /**
* load os dados dos diagnosticos da API 
*/
  async LoadDiagnosticos() {
    try {
      // ler os dados dos diagnosticos do API
      let diagnosticosDaAPI = await getData("api/DiagnosticosAPI/");
      // após receber os dados guardar no state
      this.setState({ diagnosticos: diagnosticosDaAPI })
    } catch (ex) {
      console.error("Aconteceu um erro no acesso aos dados dos diagnosticos ", ex)
    }
  }

  /**
* load os dados dos prescricoes da API 
*/
  async LoadPrescricoes() {
    try {
      // ler os dados dos prescricoes do API
      let prescricoesDaAPI = await getData("api/PrescricoesAPI/");
      // após receber os dados guardar no state
      this.setState({ prescricoes: prescricoesDaAPI })
    } catch (ex) {
      console.error("Aconteceu um erro no acesso aos dados das prescricoes ", ex)
    }
  }

  /**
  * load os dados dos pagamentos da API 
  */
  async LoadPagamentos() {
    try {
      // ler os dados dos pagamentos do API
      let pagamentosDaAPI = await getData("api/PagamentosAPI/");
      // após receber os dados guardar no state
      this.setState({ pagamentos: pagamentosDaAPI })
    } catch (ex) {
      console.error("Aconteceu um erro no acesso aos dados dos pagamentos ", ex)
    }
  }




  render() {
    const { especialidades, medicos, utentes, consultas, diagnosticos, prescricoes, pagamentos } = this.state;

    return (
      <div className="container">
        <Especialidades especialidadesIN={especialidades} medicosIN={medicos} LoadDados={this.LoadEspecialidades.bind(this)} />
        <Medicos medicosIN={medicos} especialidadesIN={especialidades}  LoadDados={this.LoadMedicos.bind(this)} />
        <h1>Utentes</h1>
        <br />
        <h4>Lista de Utentes</h4>
        <TabelaUtente dadosUtenteIN={utentes} />
        <br /><br />
        <h1>Consultas</h1>
        <br />
        <h4>Lista de Consultas</h4>
        <TabelaConsultas dadosConsultasIN={consultas} />
        <br /><br />
        <h1>Diagnostico</h1>
        <br />
        <h4>Lista de Diagnosticos</h4>
        <TabelaDiagnosticos dadosDiagnosticosIN={diagnosticos} />
        <br /><br />
        <h1>Prescricoes</h1>
        <br />
        <h4>Lista de Prescricoes</h4>
        <TabelaPrescricoes dadosPrescricoesIN={prescricoes} />
        <br /><br />
        <h1>Pagamentos</h1>
        <br />
        <h4>Lista de Pagamentos</h4>
        <TabelaPagamentos dadosPagamentosIN={pagamentos} />
        <br /><br />
      </div>
    )
  }
}

export default App;
