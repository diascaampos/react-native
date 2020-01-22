import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import Wallet from "./src/components/Wallet";

AppRegistry.registerComponent(appName, () => Wallet);
