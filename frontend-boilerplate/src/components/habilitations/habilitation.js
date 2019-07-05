import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MiniGrille from './MiniGrille';


class Habilitation extends Component {
    state = {
        habilitationsList: [],
        habilitationChoisi: '',
        habilitationGrille: null,
        user: '',
        habilitationEncoursDeValidation: null,

    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/habilitation/list')
            .then(res => {
                console.log('listhabilitations', res.data);
                this.setState({ ...this.state, habilitationsList: res.data });
            })
        if (this.props.user) {
            this.setState({ ...this.state, user: this.props.user })
        } else {

        }
    }

    componentDidUpdate() {
        if (this.props.user !== this.state.user) {
            this.setState({ ...this.state, user: this.props.user })
        }
    }
    // 

    handleInput = (e) => {
        let { name, value } = e.target;
        this.setState({
            ...this.state, [name]: value
        })

    }

    handleCallForGrille = (idGrille, idUser) => {
        axios.get(`http://localhost:3001/api/habilitation/${idGrille}`)
            .then(el => {
                this.setState({ ...this.state, habilitationGrille: el.data })
                console.log('state habilitation grille', this.state.habilitationGrille)
            })
    }



    render() {



        return (
            <div className='container'>
                <section id="Choix d'habilitation ">
                    <h3> Hey {this.props.user ? this.props.user.fullName : ""} choisi une habilitation </h3>
                    <div id='form' className='my-5 p-3 bg-light' style={{ width: '60vw', margin: 'auto' }}>
                        <div className="form-row my-2 ">
                            <div className="col my-1">
                                <label for="example">Liste des Habilitations</label>
                                <select
                                    name='habilitationChoisi'
                                    onChange={this.handleInput}
                                    value={this.state.habilitationChoisi}
                                    className="form-control" id="example" >
                                    <option></option>
                                    {this.state.habilitationsList.map(el => (<option value={el._id} key={el._id} > {el.titre}</option>))}
                                </select>
                            </div>
                            <div className="col-2 my-1">
                                <label for="Choisir" > Choisir
                                <button
                                        onClick={() => this.handleCallForGrille(this.state.habilitationChoisi)}
                                        className='btn btn-success form-control my-2' id="Choisir"
                                    > Go </button>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="l'habilitation">
                    {this.state.habilitationGrille ?
                        <MiniGrille
                            titre={this.state.habilitationGrille.titre}
                            tuteurs={this.state.habilitationGrille.tuteurs}
                            taches={this.state.habilitationGrille.taches}
                            click={this.saveData}
                            userId={this.state.user._id}
                            habilitationId={this.state.habilitationChoisi}
                        />
                        : ""}
                </section>



            </div>
        );
    }
}



const stateToProps = state => {
    return {
        user: state.UserReducer.currentUser,
        ll: state.UserReducer.lapin,
        userFull: state.UserReducer.currentUserFull,
    }
}

const actionDisppatchToProps = dispatch => {

    return {
        // isConnected: (user) => dispatch({ type: 'STORE_USER', currentUser: user })
    }
}

export default connect(stateToProps, actionDisppatchToProps)(Habilitation);

