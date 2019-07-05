import React, { Component } from 'react';
import Ligne from './Ligne';
import axios from 'axios';
class MiniGrille extends Component {

    state = {
        taches: this.props.taches,
        tachesValidees: []
    }

    // methode 

    // recupérer les taches validées pour un user à sauvgarde 

    recupTachesValidees = (tache) => {
        console.log('recup tache ca marche', tache);
        let tacheDone = { ...tache, isDone: true };
        console.log('recup tache réalisée', tacheDone);
        let task = [...this.state.tachesValidees];
        task.push(tacheDone);
        console.log(task)
        this.setState({ ...this.state, tachesValidees: task })
    }

    sauvegarderTaches = () => {
        // doit créer un objet avec user id , habilitation id , et les taches 
        let postObjForVal = null;
        if (this.props.userId && this.props.habilitationId) {
            postObjForVal = { user: this.props.userId, habilitation: this.props.habilitationId, taches: this.state.tachesValidees }
            console.log('objet to send', postObjForVal);
        } else {
            console.log('Connectez vous ');

        }


        // axios.get()
        //     .then(e => console.log('list des habSucess en cours: ', e))

        // filtrer par le user et hab

        // update le tout 

        axios.post('http://localhost:3001/api/habilitationSucess/', postObjForVal)
            .then(el => console.log('post des taches validées', el))


    }

    render() {
        return (
            <div className='container'>
                <section id="tableau">
                    <div className="">
                        <h2> {this.props.titre}</h2>
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
                            {this.props.taches.map((el, index) => <Ligne
                                recupTache={() => this.recupTachesValidees(el)}
                                key={index}
                                index={index}
                                valeurs={el}
                            />)}
                        </tbody>
                    </table>
                </section>
                <section className="Sauvgarder">
                    <button
                        className='btn btn-block btn-info'
                        onClick={this.sauvegarderTaches}
                    > Sauvgarder </button>
                </section>

            </div>
        );
    }
}

export default MiniGrille;