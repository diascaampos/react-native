// // Toggle.js
// import React, { Component }  from "react"
// import PropTypes from "prop-types"
// import {
//   Animated,
//   Easing,
//   TouchableOpacity,
// } from "react-native"

// const knobOffset = 32

// export class Toggle extends Component {
//   static propTypes = {
//     isOn: PropTypes.bool,
//     onToggle: PropTypes.func.isRequired,
//   }

//   static defaultProps = {
//     isOn: false,
//   }

//   state = {
//     isOn: this.props.isOn,
//     animatedValue: new Animated.Value(this.props.isOn ? knobOffset : 0),
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.isOn !== this.props.isOn) {
//       this.setState(
//         { isOn: this.props.isOn },
//         () => {
//             Animated.timing(
//                 this.state.animatedValue,
//                 {
//                   toValue: this.state.isOn ? 32 : 0,
//                   duration: 250,         // in milliseconds, default is 500
//                   easing: Easing.bounce, // Easing function, default is Easing.inOut(Easing.ease)
//                   delay: 0,              // in milliseconds, default is 0
//                 }
//           ).start()
//         }
//       )
//     }
//   }

//   handlePress() {
//     this.setState(
//       { isOn: !this.state.isOn },
//       () => this.props.onToggle(this.state.isOn)
//     )
//   }

//   render() {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.5}
//         style={{
//           backgroundColor: this.state.isOn ? "limegreen" : "gray",
//           width: 64,
//           height: 32,
//           borderRadius: 32,
//           padding: 4,
//         }}
//         onPress={() => this.handlePress()}
//       >
//         <Animated.View style={{
//           width: 24,
//           height: 24,
//           borderRadius: 32,
//           transform: [{
//             translateX: this.state.animatedValue,
//           }]
//         }} />
//       </TouchableOpacity>
//     )
//   }
// }


import React, { ReactElement, useState } from 'react';
import {
  Text, 
  View
} from "react-native"
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import styled from 'styled-components/native';
 
const Container = styled.View`
  flex-direction: row;
`;
 
function Page(): Toggle {
  // const [switchOn1, setSwitchOn1] = useState(false);
  const [switchOn2, setSwitchOn2] = useState(false);
  // const [switchOn3, setSwitchOn3] = useState(false);
  // const [switchOn4, setSwitchOn4] = useState(false);
 
  return (
    <Container>
      {/* <SwitchToggle
        switchOn={switchOn1}
        onPress={(): void => setSwitchOn1(!switchOn1)}
      /> */}
      <SwitchToggle
        containerStyle={{
          marginTop: 30,
          width: 60,
          height: 30,
          borderRadius: 25,
          backgroundColor: '#ccc',
          padding: 5,
          
        }}
        circleStyle={{
          width: 18,
          height: 18,
          borderRadius: 19,
          backgroundColor: 'white', // rgb(102,134,205)
        }}
        switchOn={switchOn2}
        onPress={(): void => setSwitchOn2(!switchOn2)}
        circleColorOff="white"
        circleColorOn="white"
        
        backgroundColorOn='#3eb655'
        duration={500}
      />
      
      {/* <SwitchToggle
        containerStyle={{
          marginTop: 16,
          width: 160,
          height: 65,
          borderRadius: 30,
          padding: 5,
        }}
        backgroundColorOn="#a0e1e5"
        backgroundColorOff="#e5e1e0"
        circleStyle={{
          width: 55,
          height: 55,
          borderRadius: 27.5,
          backgroundColor: 'blue', // rgb(102,134,205)
        }}
        switchOn={switchOn3}
        onPress={(): void => setSwitchOn3(!switchOn3)}
        circleColorOff="#ff11ff"
        circleColorOn="green"
        duration={500}
      />
      <SwitchToggle
        buttonText={switchOn4 ? 'Hour' : 'Day'}
        backTextRight={switchOn4 ? '' : 'Hour'}
        backTextLeft={switchOn4 ? 'Day' : ''}
        type={1}
        buttonStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}
        rightContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        leftContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        buttonTextStyle={{ fontSize: 20 }}
        textRightStyle={{ fontSize: 20 }}
        textLeftStyle={{ fontSize: 20 }}
        containerStyle={{
          marginTop: 16,
          width: 160,
          height: 65,
          borderRadius: 30,
          padding: 5,
        }}
        backgroundColorOn="#fff"
        backgroundColorOff="#fff"
        circleStyle={{
          width: 80,
          height: 55,
          borderRadius: 27.5,
          backgroundColor: 'blue', // rgb(102,134,205)
        }}
        switchOn={switchOn4}
        onPress={(): void => setSwitchOn4(!switchOn4)}
        circleColorOff="#e5e1e0"
        circleColorOn="#e5e1e0"
        duration={500}
      /> */}
    </Container>
  );
}
 
export default Page;