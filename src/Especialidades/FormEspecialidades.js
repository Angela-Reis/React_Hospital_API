/**
 * FormEspecialidades.js
 */

import React from "react";

/**
 * criar uma lista de checkbox com os dados dos médicos
 */
const EscolherMedicos = (props) => {

    const opcoes = props.medicosDataIN.map((linha) => {
        return <div key={linha.id}>
            <input type="checkbox"
                name="medicos"
                value={linha.id}
                onChange={props.medicosOUT} /> {linha.nome + "(Cédula: "+linha.numCedulaProf+")"}<br />
        </div>
    })
    return (
        <div>
            {opcoes}
        </div>
    )
}



class FormEspecialidades extends React.Component {
    novaEspecialidade = {
        especialidadeNome: "",
        especialidadeMedicosFKs: [],
    }

    state = this.novaEspecialidade;

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
     * ler os medicos escolhidos 
     * @param {*} event 
     */
    handleMedico = (event) => {
        const { value, checked } = event.target;
        //se for selecionado
        if (checked) {
            // adicionar valor à lista
            this.setState(statePrevio => ({
                especialidadeMedicosFKs: [...statePrevio.especialidadeMedicosFKs, value]
            }));
        } else {
            // remove unchecked value from the list
            this.setState({especialidadeMedicosFKs: this.state.especialidadeMedicosFKs.filter(item => item !== value)});

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
            Nome: this.state.especialidadeNome,
            medicosId: this.state.especialidadeMedicosFKs,
        }
        this.props.novaEspecialidadeOUT(formData);
    }



    render() {
        // read the state and props values
        const { especialidadeNome, especialidadeMedicosFKs } = this.state;
        const { medicosIN } = this.props;

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="linha">
                    <div className="col-md-4">
                        Nome: <input type="text"
                            required
                            className="form-control"
                            name="especialidadeNome"
                            value={especialidadeNome}
                            onChange={this.handleAdd}
                        /><br />
                        Medicos: <EscolherMedicos medicosDataIN={medicosIN} medicosOUT={this.handleMedico} /><br />
                    </div>
                </div>
                <input type="submit"
                    value="Adicionar Especialidade"
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default FormEspecialidades;