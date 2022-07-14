/**
 * FormUtentes.js
 */

import React from "react";


class FormUtentes extends React.Component {
    novoUtente = {
        utenteNome: "",
        utenteNumUtente: "",
        utenteNIF: "",
        utenteNumTelefone: "",
        utenteEmail: "",
        utenteDataNascimento: "",
        utenteFoto: null,
        utenteSexo: ""
    }

    state = this.novoUtente;

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
            Nome: this.state.utenteNome,
            NumUtente: this.state.utenteNumUtente,
            NIF: this.state.utenteNIF,
            NumTelefone: this.state.utenteNumTelefone,
            Email: this.state.utenteEmail,
            DataNascimento: this.state.utenteDataNascimento,
            Sexo: this.state.utenteSexo,
            Foto: this.state.utenteFoto,
        }

        this.props.novoUtenteOUT(formData);
        // limpar o formulario
        this.setState({
            utenteNome: "",
            utenteNumUtente: "",
            utenteNIF: "",
            utenteNumTelefone: "",
            utenteEmail: "",
            utenteDataNascimento: "",
            utenteFoto: null,
            utenteSexo: ""
        })
        event.target.reset();
    }

    /**
     * recolhe o ficheiro com a imagem definida pelo utilizador
     * e entrega-a ao state
     * @param {*} evento 
     */
    handleFoto = (evento) => {
        this.setState({ utenteFoto: evento.target.files[0] });
    }

    render() {
        // read the state and props values
        const { utenteNome,
            utenteNumUtente,
            utenteNIF,
            utenteNumTelefone,
            utenteEmail,
            utenteDataNascimento,
        } = this.state;
        const sexos = [
            {
                valor: "F",
                label: "Mulher",
            },
            {
                valor: "M",
                label: "Homem",
            }
          ];

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="linha">
                    <div className="col-md-4">
                        Nome: <input type="text"
                            className="form-control"
                            required pattern="[A-ZÂÓÍa-záéíóúàèìòùâêîôûãõäëïöüñç '-]+" maxLength="128"
                            name="utenteNome"
                            value={utenteNome}
                            onChange={this.handleAdd}
                        />
                        Número Utente: <input type="text"
                            data-val="true"
                            className="form-control"
                            name="utenteNumUtente"
                            required pattern="[1235789][0-9]{8}"
                            maxLength="9" minLength="9"
                            value={utenteNumUtente}
                            onChange={this.handleAdd}
                        />
                    </div>
                    <div className="col-md-4">
                        NIF: <input type="text"
                            data-val="true"
                            className="form-control"
                            name="utenteNIF"
                            required pattern="[1235789][0-9]{8}"
                            maxLength="9" minLength="9"
                            value={utenteNIF}
                            onChange={this.handleAdd}
                        />
                        Número de Telefone:
                        <input type="text"
                            className="form-control"
                            required pattern="9[1236][0-9]{7}|2([1-9]{1}[0-9]{7}|[1-9]{2}[0-9]{6})" 
                            maxLength="9" minLength="9"
                            name="utenteNumTelefone"
                            value={utenteNumTelefone}
                            onChange={this.handleAdd}
                        />
                        Email: <input
                            type="email"
                            required
                            className="form-control"
                            name="utenteEmail"
                            value={utenteEmail}
                            onChange={this.handleAdd}
                        />
                    </div>
                    <div className="col-md-4">
                        Data de Nascimento: <input type="date"
                            required
                            className="form-control"
                            name="utenteDataNascimento"
                            value={utenteDataNascimento}
                            onChange={this.handleAdd}
                        />
                        
                        Sexo:<select required onChange={this.handleAdd}
                                    defaultValue={""}  
                                    name={"utenteSexo"} 
                                    className="form-select" 
                                    aria-label="Default select example">
                            <option disabled value={""} >Selecione Sexo</option>
                            {sexos.map((option, i) => (
                            <option  key={i} value={option.valor}>{option.label}</option>
                            ))}
                        </select>

                        Fotografia: <input type="file"
                            name="foto"
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handleFoto} />
                    </div>
                </div>
                <input type="submit"
                    value="Adicionar Utente"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default FormUtentes;