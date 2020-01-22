import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    ScrollView,
    Image,
    Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { HeaderNavigator } from './HeaderNavigator'
import { buscarListSchools, buscarKitBySchool, buscarSchoolsByNome } from '../actions/ListSchoolsAction'
import { TextInputForm } from '../StyledGlobal';

class ListSchools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campoPesquisar: '',
           
        }


    }

    componentWillMount() {
        this.props.buscarListSchools()
    }

    telaListaProdutos(escola) {
        //alert('entrei TelaProductDetails ' + escola.nomeFantasia)
        this.props.buscarKitBySchool(escola.idParceiro)
        //Actions.productDetails({ escola: escola })
    }
    pesquisar(){
        if(this.state.campoPesquisar === ''){
          alert('O campo de pesquisa é obrigatório!');
          return;
        }
        this.props.buscarSchoolsByNome(this.state.campoPesquisar);
      }


      enderecoCompleto(enderecoEscola){
        var enderecoCompleto = enderecoEscola.tipoLogradouro + ' ' + enderecoEscola.logradouro + ', ' + enderecoEscola.numero + ' '
        if(enderecoEscola.complemento == undefined){
            enderecoCompleto += '- ' + enderecoEscola.bairro + '\n' + enderecoEscola.nomeCidade + ' - ' + enderecoEscola.estado + ', ' + enderecoEscola.cep
        }else{
            enderecoCompleto += enderecoEscola.complemento + ' - ' + enderecoEscola.bairro + '\n' + enderecoEscola.nomeCidade + ' - ' + enderecoEscola.estado + ', ' + enderecoEscola.cep
        }  
        return enderecoCompleto

      }

    mostrarLista() {
        return (
            this.props.listSchools.map((listSchools) => (
                <TouchableOpacity
                    onPress={() => this.telaListaProdutos(listSchools)}>
                    <View style={{
                        flex: 1, backgroundColor: '#FFF',
                        flexDirection: 'row',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        justifyContent: 'center',
                        elevation: 3,
                        margin: 3, marginHorizontal: 9, borderRadius: 5, borderColor: '#ccc', borderWidth: 1
                    }} key={listSchools.idParceiro}>
                        <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                            <Image source={{uri:listSchools.url}} style={{ height: 100, width: 100, borderRadius: 5, backgroundColor: '#1472B5' }} />
                        </View>
                        <View style={{ flex: 1, padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{listSchools.nomeFantasia}</Text>
                            <Text style={{ fontSize: 14 }}>{'CNPJ: ' + listSchools.cnpjCpf}</Text>
                            <Text style={{ fontSize: 14 }}>{'Email: ' + listSchools.email}</Text>
                            <Text style={{ fontSize: 12 }}>{'Contato: ' + listSchools.telefone}</Text>
                            <Text style={{ fontSize: 12 }}>{'Endereço:\n' + this.enderecoCompleto(listSchools.endereco)}</Text>
                        </View>
                    </View>


                </TouchableOpacity>
            ))
        )
    }

    renderScreen() {

        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
            if (this.props.listSchools.length === 0) {
                return;
            }
        }

        if (this.props.loadingListSchools) {

            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>
            )
        }

        if (this.props.listSchools.length > 0) {

            return (


                <ScrollView style={{ marginBottom: (Platform.OS === 'ios' ? 20 : 10), flex: 1 }}>
                    {this.mostrarLista()}
                </ScrollView>

            )
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >

                    <Text style={{ color: 'black' }}>Nenhum registro encontrado</Text>
                </View>
            )
        }
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <HeaderNavigator />
                <View style={{ marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TextInputForm
                        onChangeText={(texto) => {
                            this.setState({ campoPesquisar: texto })
                        }}
                        placeholder=' Digite o nome da escola' style={{ margin:5, flex: 1}} />
                    <TouchableOpacity
                        onPress={() => this.pesquisar()}>
                        <Image source={require('../img/lupa.png')} style={{ width: 35, height: 35, marginRight: 5 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {this.renderScreen()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        listSchools: state.ListSchoolsReducer.listSchools,
        loadingListSchools: state.ListSchoolsReducer.loadingListSchools,
        msg: state.ListSchoolsReducer.msg
    }
)

export default connect(mapStateToProps, { buscarListSchools, buscarKitBySchool, buscarSchoolsByNome })(ListSchools)