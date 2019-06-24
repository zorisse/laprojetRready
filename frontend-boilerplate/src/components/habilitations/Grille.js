import React, { Component } from 'react';
import Ligne from './Ligne';
import axios from 'axios';

class Grille extends Component {
    state = {
        titre: '',
        tache: '',
        nbr: 1,
        maintientDecompetance: 'non',
        lignes: [],
        tuteurs: ['michel'],
    }

    handleInput = (e) => {
        let { name, value } = e.target;
        this.setState({
            ...this.state, [name]: value
        })

    }



    ajouterUneLigne = (e) => {
        let { tache, nbr, maintientDecompetance } = this.state
        let ligne = { tache, nbr, maintientDecompetance }
        let arrayLignes = this.state.lignes
        for (let index = 0; index < ligne.nbr; index++) {
            arrayLignes.push(ligne)
            this.setState({
                ...this.state,
                lignes: arrayLignes,
                tache: '',
                nbr: 1,
                maintientDecompetance: 'non',
            })
        }
    }

    savegarderLaGrille = () => {
        let newGrille = {
            titre: this.state.titre,
            taches: this.state.lignes,
            tuteurs: this.state.tuteurs,
        };
        axios.post('http://localhost:3001/api/habilitation/add', newGrille)
            .then(response => {
                console.log('voila la réponse', response);
            });
    }



    render() {
        return (
            <div className=' container '>
                <section id="formulaire de création ">
                    <h1> Créer une nouvelle grille d'habilitation</h1>
                    <div id='form' className='my-5 p-3 bg-light' style={{ width: '60vw', margin: 'auto' }}>
                        <div className="form-row my-2 d-flex ">
                            <div className="col my-1">
                                <label for="Ajouter une Titre">Titre  </label>
                                <input
                                    value={this.state.titre}
                                    name='titre'
                                    onChange={this.handleInput}
                                    type="text"
                                    className="form-control text-center"
                                    placeholder="Titre" id='Ajouter une Titre' />
                            </div>
                        </div>
                        <div className="form-row my-2 ">
                            <div className="col my-1">
                                <label for="Ajouter une tache">Description de la tache  </label>
                                <input
                                    value={this.state.tache}
                                    name='tache'
                                    onChange={this.handleInput}
                                    type="text" className="form-control" placeholder="Tache" id='Ajouter une tache' />
                            </div>
                            <div className="col-2 my-1">
                                <label for="example">Nbr</label>
                                <select
                                    name='nbr'
                                    onChange={this.handleInput}
                                    value={this.state.nbr}
                                    className="form-control" id="example" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="col-2 my-1">
                                <label for="exampleForm2">Maintient</label>
                                <select
                                    name='maintientDecompetance'
                                    onChange={this.handleInput}
                                    value={this.state.maintientDecompetance}
                                    className="form-control" id="exampleForm2" >
                                    <option>non</option>
                                    <option>oui</option>
                                </select>
                            </div>


                            <div className="col-2 my-1">
                                <label for="Ajouter" > Ajouter
                                <button
                                        onClick={this.ajouterUneLigne}
                                        className='btn btn-success form-control my-2' id="Ajouter"
                                    > + </button>
                                </label>
                            </div>
                        </div>

                    </div>

                </section>

                <section id="tableau">
                    <div className="">
                        <h2> {this.state.titre}</h2>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Taches</th>
                                <th scope="col">Réferences / Preuves</th>
                                <th scope="col"> Validation </th>
                                <th scope="col">Verification du tuteur </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lignes.map((el, index) => <Ligne key={index} index={index} valeurs={el} />)}
                        </tbody>
                    </table>
                </section>

                <section id="export dans la base de donnée">
                    <button
                        onClick={this.savegarderLaGrille}
                        className='btn btn-block btn-info'
                    > Sauvgarder la grille </button>
                </section>

            </div >
        );
    }
}

export default Grille;


