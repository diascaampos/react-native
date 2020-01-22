import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ButtonKitEscola, TextInputFormBordas } from '../StyledGlobal';
import { ID_USUARIO, ID_MOBILE } from '../util/Constants'
import { } from '../actions/TimeLineAction'
import Timeline from 'react-native-timeline-flatlist'
import TabBarNavigator from '../util/TabBarNavigator'

class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.onEventPress = this.onEventPress.bind(this)
        this.renderSelected = this.renderSelected.bind(this)
        this.renderDetail = this.renderDetail.bind(this)
        this.state = {
            idUsuario: '',
            linhaDoTempo: false,
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({
            title: this.props.item.dataAlteracao,
        });
        this.props.navigation.setParams({
            'onLeft': this.handleIconTouch
        })

    }

    handleIconTouch() {
        //Alert.alert('teste back teste')

        Actions.basket();
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    handleBackButton = () => {
        // alert('Touched!');
    }
    renderSelected() {
        if (this.state.selected)
            return <Text style={{ marginTop: 10 }}>Selected event: {this.state.selected.title} at {this.state.selected.time}</Text>
    }

    renderDetail(rowData, sectionID, rowID) {
        let title = <Text style={[styles.title]}>{rowData.title}</Text>
        var desc = null
        if (rowData.description && rowData.imageUrl)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
                    <Text style={[styles.textDescription]}>{rowData.description}</Text>
                </View>
            )

        return (
            <View style={{ flex: 1 }}>
                {title}
                {desc}
            </View>
        )
    }
    linhaDoTempo() {
        return (
            <View style={styles.container}>
                {this.renderSelected()}
                <Timeline
                    style={styles.list}
                    data={this.props.item.data}
                    circleSize={25}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#1472b5', color: 'white', padding: 5, borderRadius: 13 }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{

                    }}
                    innerCircle={'icon'}
                />
            </View>
        )

    }
    renderScreen() {
        if (this.props.msg != '') {
            Alert.alert(this.props.msg);
            return;
        }

        if (this.props.loadingTimeLine) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color='#0075BE' />
                </View>
            )
        } else {
            return (

                <View style={{ backgroundColor: '#fff', flex: 1 }} >
                    {this.linhaDoTempo()}
                </View>
            )
        }
    }
    onEventPress(data) {
        this.setState({ selected: data })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ flex: 8}}>
                    {this.renderScreen()}
                </View>
                <View style={{ flex: 1 }}>
                    <TabBarNavigator
                        tela={this.state.telaAtual} >
                    </TabBarNavigator>
                </View>
            </SafeAreaView>

        );
    }
}

const mapStateToProps = state => (
    {
        token: state.TimeLineReducer.token,
        loadingTimeLine: state.TimeLineReducer.loadingTimeLine,
        msg: state.TimeLineReducer.msg

    }
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: 'white'
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    }
});


export default connect(mapStateToProps, {})(TimeLine)