import React from 'react';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Box, makeStyles} from '../../../Constants/Theme'
import {Dimensions} from "react-native";
import {useSelector} from "react-redux";
import Header from "../../../components/reusable/Header";

type Props = {
    route: RouteProp<ParamListBase, string>;
    navigation: NativeStackNavigationProp<ParamListBase, string>;
};

const {height, width} = Dimensions.get('window');
const  = ({navigation, route}: Props) => {
    const styles = useStyles();
    const {theme} = useSelector((state: any) => state.themeReducer);

    return (
        <>
            <Header variant={"primary"} title={' '} left={{ icon: 'ri-arrow-left-s-line', onPress: () => navigation.goBack() }} />

          
        </>
    )
};
const useStyles = makeStyles((theme) => ({}));
export {};
