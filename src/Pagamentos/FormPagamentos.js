/**
 * FormPagamentos.js
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

class FormPagamentos extends React.Component {
    novoPagamento = {
        pagamentoValor: "",
        pagamentoDescricao: "",
        pagamentoEstado: "",
        pagamentoDataEfetuado: "",
        pagamentoMetodo: "",
        pagamentoConsultaFK: ""
    }

    state = this.novoPagamento;

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
        if (!checked) {
            this.setState({ pagamentoMetodo: "" });
            this.setState({ pagamentoDataEfetuado: "" });
        }

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
            Descricao: this.state.pagamentoDescricao,
            AuxValor: this.state.pagamentoValor,
            Estado: this.state.pagamentoEstado,
            DataEfetuado: this.state.pagamentoDataEfetuado,
            Metodo: this.state.pagamentoMetodo,
            ConsultaFK: this.state.pagamentoConsultaFK,
        }

        this.props.novoPagamentoOUT(formData);
        // limpar o formulario
        this.setState({
            pagamentoValor: "",
            pagamentoDescricao: "",
            pagamentoEstado: "",
            pagamentoDataEfetuado: "",
            pagamentoMetodo: "",
            pagamentoConsultaFK: ""
        })
        event.target.reset();
    }

    render() {
        const metodosPagamento = [
            {
                valor: "MB",
                label: "Multibanco",
            },
            {
                valor: "D",
                label: "Dinheiro",
            }, {
                valor: "CC",
                label: "Cartão de Crédito",
            },
        ];
        // read the state and props values
        const { pagamentoDescricao,
            pagamentoValor,
            pagamentoEstado,
            pagamentoDataEfetuado,
            pagamentoMetodo,
            pagamentoConsultaFK
        } = this.state;
        const { consultasIN } = this.props;

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="linha">
                    <div className="col-md-4">
                        Consulta: <SelecionarDados
                            dataIN={consultasIN}
                            onChangeAcao={this.handleAdd}
                            isRequired={true}
                            nomeSelect={"pagamentoConsultaFK"}
                            valueSelect={pagamentoConsultaFK} />
                    </div>
                    <div className="col-md-4">
                        Descricao: <input type="text"
                            className="form-control"
                            maxLength="800"
                            name="pagamentoDescricao"
                            required
                            value={pagamentoDescricao}
                            onChange={this.handleAdd}
                        />
                        Valor: <input type="text"
                            pattern="[0-9]{1,8}[,.]?[0-9]{0,2}"
                            className="form-control"
                            maxLength="10"
                            name="pagamentoValor"
                            required
                            value={pagamentoValor}
                            onChange={this.handleAdd}
                        />
                        <div className="form-check form-switch">
                            <input name={"pagamentoEstado"}
                                checked={pagamentoEstado}
                                onChange={this.handleEstado}
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pagamento Efetuado</label>
                        </div>
                    </div>
                    {pagamentoEstado &&
                        <div  className="col-md-4">
                            Data Efetuamento: <input type="date"
                                required
                                className="form-control"
                                name="pagamentoDataEfetuado"
                                value={pagamentoDataEfetuado}
                                onChange={this.handleAdd} />
                            Metodo:<select required onChange={this.handleAdd}
                                value={pagamentoMetodo}
                                name={"pagamentoMetodo"}
                                className="form-select"
                                aria-label="Default select">
                                <option disabled value={""} >Selecione Metodo</option>
                                {metodosPagamento.map((option, i) => (
                                    <option key={i} value={option.valor}>{option.label}</option>
                                ))}
                            </select>

                        </div>
                    }

                </div>
                <input type="submit"
                    value="Adicionar Pagamento"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default FormPagamentos;