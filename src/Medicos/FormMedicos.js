/**
 * FormMedicos.js
 */

import React from "react";

/**
 * criar uma lista de checkbox com os dados das especialidades
 */
const EscolherEspecialidade = (props) => {

    const opcoes = props.especialidades.map((linha) => {
        return <div key={linha.id}>
            <input type="checkbox"
                name="medicos"
                value={linha.id}
                onChange={props.especialidadesOUT} /> {linha.nome}<br />
        </div>
    })
    return (
        <div>
            {opcoes}
        </div>
    )
}



class FormMedicos extends React.Component {
    novoMedico = {
        medicoNome: "",
        medicoNumCedulaProf: "",
        medicoNumTelefone: "",
        medicoEmail: "",
        medicoDataNascimento: "",
        medicoFoto: null,
        medicosEspecialidadesFKs: [],
    }

    state = this.novoMedico;

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
     * ler as especialidades selecionadas 
     * @param {*} event 
     */
    handleEspecialidades = (event) => {
        const { value, checked } = event.target;
        //se for selecionado
        if (checked) {
            // adicionar valor à lista
            this.setState(statePrevio => ({
                medicosEspecialidadesFKs: [...statePrevio.medicosEspecialidadesFKs, value]
            }));
        } else {
            // remover valor não selecionado da lista
            this.setState({ medicosEspecialidadesFKs: this.state.medicosEspecialidadesFKs.filter(especialidade => especialidade !== value) });

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
            Nome: this.state.medicoNome,
            NumCedulaProf: this.state.medicoNumCedulaProf,
            NumTelefone: this.state.medicoNumTelefone,
            Email: this.state.medicoEmail,
            DataNascimento: this.state.medicoDataNascimento,
            Foto: this.state.medicoFoto,
            especialidadesId: this.state.medicosEspecialidadesFKs
        }
        this.props.novoMedicoOUT(formData);
    }

    /**
     * recolhe o ficheiro com a imagem definida pelo utilizador
     * e entrega-a ao state
     * @param {*} evento 
     */
    handleFoto = (evento) => {
        this.setState({ medicoFoto: evento.target.files[0] });
    }

    render() {
        // read the state and props values
        const { medicoNome,
            medicoNumCedulaProf,
            medicoNumTelefone,
            medicoEmail,
            medicoDataNascimento,
        } = this.state;
        const { especialidadesIN } = this.props;

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
                            name="medicoNome"
                            value={medicoNome}
                            onChange={this.handleAdd}
                        />
                        Número Cédula Profisional: <input type="text"
                            data-val="true"
                            className="form-control"
                            name="medicoNumCedulaProf"
                            value={medicoNumCedulaProf}
                            onChange={this.handleAdd}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        Número de Telefone:
                        <input type="text"
                            className="form-control"
                            required pattern="9[1236][0-9]{7}|2([1-9]{1}[0-9]{7}|[1-9]{2}[0-9]{6})" 
                            maxLength="9" minLength="9"
                            name="medicoNumTelefone"
                            value={medicoNumTelefone}
                            onChange={this.handleAdd}
                        />
                        Email: <input
                            type="email"
                            required
                            className="form-control"
                            name="medicoEmail"
                            value={medicoEmail}
                            onChange={this.handleAdd}
                        />
                    </div>
                    <div className="col-md-4">
                        Data de Nascimento: <input type="date"
                            required
                            className="form-control"
                            name="medicoDataNascimento"
                            value={medicoDataNascimento}
                            onChange={this.handleAdd}
                        />
                        Fotografia: <input type="file"
                            name="fotoMedico"
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handleFoto} />
                    </div>
                    <div className="col-md-4">
                        Especialidades: <EscolherEspecialidade especialidades={especialidadesIN}
                            especialidadesOUT={this.handleEspecialidades} /><br />
                    </div>
                </div>
                <input type="submit"
                    value="Adicionar Médico"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default FormMedicos;