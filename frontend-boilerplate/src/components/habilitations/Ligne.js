import React, { Component, Fragment } from 'react';
//import axios from 'axios';
import './ligne.css'

class Ligne extends Component {
    state = {
        tache: this.props.valeurs.tache,
        maintientDecompetance: this.props.valeurs.maintientDecompetance,
        validated: 'btn btn-sm btn-primary',
        verificationButtonTuteurClass: "btn btn-sm btn-warning disabled",
        verificationButtonTuteurListTxts: ['En attente de vérification', 'Tache réussi avec succes\nle : '],
        verificationButtonTuteurTxt: 'En attente de vérification',
        verificationSuccess: false,
        backgroundTr: [{ background: '' }, { background: '#e8f293' }, { background: '#d6ffe9' }],
        etatTRStyle: 0,
    }

    //
    validationUser = (e) => {
        // let strClassDisabled = 'btn btn-sm btn-warning disabled';
        let strClassActive = 'btn btn-sm btn-warning';
        // let strClassValidationFalse = 'btn btn-sm btn-primary';
        // let strClassValidationTrue = 'btn btn-sm btn-success disabled';

        this.setState({
            ...this.state,
            validated: 'btn btn-sm btn-success disabled',
            verificationButtonTuteurClass: strClassActive,
            verificationSuccess: true,
            etatTRStyle: 1,
        });

        this.props.recupTache();

    }

    verificationTuteur = (e) => {
        console.log(e.target.className.includes('disabled'))
        // on check si le bouton est disabled ou pas 
        if (!e.target.className.includes('disabled')) {
            let txt = ''
            // on ajoute la date du jour 
            txt = this.state.verificationButtonTuteurListTxts[1]
            let ladate = new Date()
            txt += ladate.getDate() + "/" + (ladate.getMonth() + 1) + "/" + ladate.getFullYear()
            // on change le txt 
            console.log(txt);
            // on change la couleur du boutton 
            this.setState({
                ...this.state, etatTRStyle: 2, verificationButtonTuteurTxt: txt, verificationButtonTuteurClass: "btn btn-sm btn-success disabled",
            })
        }
    }


    render() {



        return (
            <Fragment>
                <tr className='ligne' style={this.state.backgroundTr[this.state.etatTRStyle]} >
                    <th className='case 1' scope="row">
                        {this.props.index} {this.state.maintientDecompetance === 'oui' ? '/ M' : ''}
                    </th>
                    <td className='case2'   >{this.state.tache}  </td>
                    <td className='case3'>
                        <input className='form-control form-control-sm' type='text' placeholder="Ajouter une preuve "></input>
                        <input type="file" className="form-control-file  form-control-sm" ></input>
                    </td>
                    <td className='case4'>
                        <button
                            className={this.state.validated}
                            onClick={this.validationUser}>En attente de validation</button>
                    </td>
                    <td className='case5'>
                        <button
                            className={this.state.verificationButtonTuteurClass}
                            onClick={this.verificationTuteur} >
                            {this.state.verificationButtonTuteurTxt}
                        </button>
                    </td>
                </tr>
            </Fragment >
        );
    }
}

export default Ligne;