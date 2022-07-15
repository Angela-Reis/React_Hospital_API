/**
 * FormDiagnosticos.js
 */

import React from "react";



class FormDiagnosticos extends React.Component {
    novaDiagnóstico = {
        diagnosticoTitulo: "",
        diagnosticoDescricao: "",
        diagnosticoEstado: "",
    }

    state = this.novaDiagnóstico;

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
            Titulo: this.state.diagnosticoTitulo,
            Estado: this.state.diagnosticoEstado,
            Descricao: this.state.diagnosticoDescricao,
        }
        this.props.novoDiagnosticoOUT(formData);
        // limpar o formulario
        this.setState({
            diagnosticoTitulo: "",
            diagnosticoDescricao: "",
            diagnosticoEstado: "",
        })
        event.target.reset();
    }



    render() {
        // read the state and props values
        const { diagnosticoTitulo, diagnosticoDescricao, diagnosticoEstado } = this.state;
        const estados = [
            {
                valor: "T",
                label: "Em Tratamento",
            },
            {
                valor: "F",
                label: "Curado",
            }, {
                valor: "C",
                label: "Crónico",
            },
        ];
        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="linha">
                    <div className="col-md-4">
                        Titulo: <input type="text"
                            required
                            pattern="[A-ZÂÓÍa-záéíóúàèìòùâêîôûãõäëïöüñç '-]+"
                            maxLength={60}
                            className="form-control"
                            name="diagnosticoTitulo"
                            value={diagnosticoTitulo}
                            onChange={this.handleAdd}
                        /><br />
                        Descrição: <input type="text"
                            required
                            pattern="[A-ZÂÓÍa-záéíóúàèìòùâêîôûãõäëïöüñç '-]+"
                            maxLength={60}
                            className="form-control"
                            name="diagnosticoDescricao"
                            value={diagnosticoDescricao}
                            onChange={this.handleAdd}
                        /><br />
                        Estado:<select required onChange={this.handleAdd}
                            name={"diagnosticoEstado"}
                            value={diagnosticoEstado}
                            className="form-select"
                            aria-label="Default select example">
                            <option disabled value={""} >Selecione Estado</option>
                            {estados.map((option, i) => (
                                <option key={i} value={option.valor}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <input type="submit"
                    value="Adicionar Diagnóstico"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default FormDiagnosticos;