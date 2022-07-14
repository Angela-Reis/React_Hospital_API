/**
 * FormConsultas.js
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
            required={props.isRequired}>
            <option value="">Escolher</option>
            {options}
        </select>
    )
}

class FormConsultas extends React.Component {
    novoConsulta = {
        consultaMotivo: "",
        consultaData: "",
        consultaMedicoFK: "",
        consultaUtenteFK: "",
        consultaDiagnosticoFK: "",
        consultaEstado: ""
    }

    state = this.novoConsulta;

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
     * Envia o dados do formulario para o API
     * @param {*} event 
     */
    handleForm = (event) => {
        // impede o Formulário de fazer o comportamento natural dele
        event.preventDefault();

        // especifica o objecto a enviar à api
        let formData = {
            Motivo: this.state.consultaMotivo,
            Data: this.state.consultaData,
            Estado: this.state.consultaEstado,
            UtenteFK: this.state.consultaUtenteFK,
            MedicoFK: this.state.consultaMedicoFK,
            DiagnosticoFK: this.state.consultaDiagnosticoFK,
        }

        this.props.novoConsultaOUT(formData);
        // limpar o formulario
        this.setState({
            consultaMotivo: "",
            consultaData: "",
            consultaMedicoFK: "",
            consultaUtenteFK: "",
            consultaDiagnosticoFK: "",
            consultaEstado: ""
        })
        event.target.reset();
    }

    /**
     * recolhe o ficheiro com a imagem definida pelo utilizador
     * e entrega-a ao state
     * @param {*} evento 
     */
    handleFoto = (evento) => {
        this.setState({ consultaFoto: evento.target.files[0] });
    }

    render() {
        // read the state and props values
        const { consultaMotivo,
            consultaData,
        } = this.state;
        const { medicosIN, utentesIN, diagnosticosIN } = this.props;

        const estados = [
            {
                valor: "P",
                label: "Pendente",
            },
            {
                valor: "M",
                label: "Marcada",
            }, {
                valor: "F",
                label: "Finalizada",
            }, {
                valor: "C",
                label: "Cancelada",
            },
        ];

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="linha">
                    <div className="col-md-4">
                        Motivo: <input type="text"
                            className="form-control"
                            maxLength="800"
                            name="consultaMotivo"
                            required
                            value={consultaMotivo}
                            onChange={this.handleAdd}
                        />
                        Data: <input type="datetime-local"
                            required
                            className="form-control"
                            name="consultaData"
                            value={consultaData}
                            onChange={this.handleAdd}
                        />
                        Estado:<select required onChange={this.handleAdd}
                            defaultValue={""}
                            name={"consultaEstado"}
                            className="form-select"
                            aria-label="Default select example">
                            <option disabled value={""} >Selecione Estado</option>
                            {estados.map((option, i) => (
                                <option key={i} value={option.valor}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        Utente: <SelecionarDados
                            dataIN={utentesIN}
                            onChangeAcao={this.handleAdd}
                            isRequired={true}
                            nomeSelect={"consultaUtenteFK"} />
                        Médico: <SelecionarDados
                            dataIN={medicosIN}
                            onChangeAcao={this.handleAdd}
                            isRequired={true}
                            nomeSelect={"consultaMedicoFK"} />
                        Diagnostico: <SelecionarDados
                            dataIN={diagnosticosIN}
                            onChangeAcao={this.handleAdd}
                            isRequired={false}
                            nomeSelect={"consultaDiagnosticoFK"} />
                    </div>
                </div>
                <input type="submit"
                    value="Adicionar Consulta"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default FormConsultas;