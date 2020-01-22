import React, { Component } from 'react';
import { ImageBackground } from "react-native";
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { buscarTokenLocal, buscarUserCompanyLocal } from '../actions/MainActions'
import {
    TOKEN,
    COMPANY
  } from '../util/Contants'

class Main extends Component {

    componentWillMount() {
        
        this.props.buscarTokenLocal(TOKEN)
       
    }

    redirectPage() {
        if (this.props.token == '' && this.props.isFindToken) {
            Actions.formLogin()
        } else if (this.props.isFindToken && this.props.company == '' && this.props.isFindCompany == false) {
            this.props.buscarUserCompanyLocal(COMPANY)
        } else if (this.props.company != '' && this.props.isFindCompany) {
            Actions.listaOpcoes(this.props.company)
        } else if (this.props.company == '' && this.props.isFindCompany) {
            Actions.selectCompanies({ token: this.props.token })
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('../img/splash.png')} style={{ height: null, width: null, flex: 1 }}>
                {this.redirectPage()}
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        msg: state.MainReducer.msg,
        token: state.MainReducer.token,
        company: state.MainReducer.company,
        loading: state.MainReducer.loading,
        isFindToken: state.MainReducer.isFindToken,
        isFindCompany: state.MainReducer.isFindCompany
    }
)

export default connect(mapStateToProps, { buscarTokenLocal, buscarUserCompanyLocal })(Main)