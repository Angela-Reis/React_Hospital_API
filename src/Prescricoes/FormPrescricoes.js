/**
 * FormPrescricoes.js
 */

import React from "react";


const SelecionarDados = (props) => {
    const options = props.dataIN.map((linha) => {
        return <option key={linha.id} value={linha.id}>{linha.label}</option>
    })
    return (
        <select className="form-select"
            name={props.nomeSelect}
            onChange={props.onChangeAcao}
            required={props.isRequired}
            value={props.valueSelect}>
            <option disabled value="">Escolher</option>
            {options}
        </select>
    )
}

class FormPrescricoes extends React.Component {
    novoPrescricao = {
        prescricaoDescricao: "",
        prescricaoData: "",
        prescricaoEstado: true,
        prescricaoDiagnosticoFK: ""
    }

    state = this.novoPrescricao;

    /**
     * função que lida com os dados dos 'input' 
     * @param {*} event 
     */
    handleAdd = (event) => {
        //ler os dados no 'event'
        const { name, value } = event.target
        // adicionar os dados extraídos, ao state
        this.setState({
            [name]: value,
        })
    }

    /**
     * 
     * @param {*} event 
     */
    handleEstado = (event) => {
        //ler os dados no 'event'
        const { name, checked } = event.target
        // adicionar os dados extraídos, ao state
        this.setState({
            [name]: checked,
        })
    }

    /**
     * Envia o dados do formulario para o API
     * @param {*} event 
     */
    handleForm = (event) => {
        // impede o Formulário de fazer o comportamento natural dele
        event.preventDefault();

        // especifica o objecto a enviar à api
        let formData = {
            Descricao: this.state.prescricaoDescricao,
            Data: this.state.prescricaoData,
            Estado: this.state.prescricaoEstado,
            DiagnosticoFK: this.state.prescricaoDiagnosticoFK,
        }

        this.props.novoPrescricaoOUT(formData);
        // limpar o formulario
        this.setState({
            prescricaoDescricao: "",
            prescricaoData: "",
            prescricaoEstado: true,
            prescricaoDiagnosticoFK: ""
        })
        event.target.reset();
    }

    /**
     * recolhe o ficheiro com a imagem definida pelo utilizador
     * e entrega-a ao state
     * @param {*} evento 
     */
    handleFoto = (evento) => {
        this.setState({ prescricaoFoto: evento.target.files[0] });
    }

    render() {
        // read the state and props values
        const { prescricaoDescricao,
            prescricaoData,
            prescricaoEstado,
            prescricaoDiagnosticoFK
        } = this.state;
        const { diagnosticosIN } = this.props;

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="linha">
                    <div className="col-md-4">
                        Descricao: <input type="text"
                            className="form-control"
                            maxLength="800"
                            name="prescricaoDescricao"
                            required
                            value={prescricaoDescricao}
                            onChange={this.handleAdd}
                        />
                        Data: <input type="date"
                            required
                            className="form-control"
                            name="prescricaoData"
                            value={prescricaoData}
                            onChange={this.handleAdd}
                        />
                        <div className="form-check form-switch">
                            <input name={"prescricaoEstado"}
                                checked={prescricaoEstado}
                                onChange={this.handleEstado}
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Prescrição Válida</label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        Diagnostico: <SelecionarDados
                            dataIN={diagnosticosIN}
                            onChangeAcao={this.handleAdd}
                            isRequired={true}
                            nomeSelect={"prescricaoDiagnosticoFK"}
                            valueSelect={prescricaoDiagnosticoFK} />
                    </div>                  
                </div>
                <input type="submit"
                    value="Adicionar Prescricao"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default FormPrescricoes;