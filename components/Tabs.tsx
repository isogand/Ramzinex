import React, {ReactNode, useCallback, useMemo, useState} from "react";
import {Dimensions, TouchableOpacity} from "react-native";
import Animated, {useAnimatedStyle} from "react-native-reanimated";
import {mix, useTiming} from "react-native-redash";
import {Box, Text, useTheme} from "../../Constants/Theme";
import {PassengerType} from "../../Constants/interfaces/IPassengerInfo";
import {useSelector} from "react-redux";
import Icon from "react-native-remix-icon";
import Colors from "../../Constants/Colors";

const {width, height} = Dimensions.get("window");

interface Tab {
    id: string;
    title: string;
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
}

interface TabsProps {
    tabs: Tab[];
    children: ReactNode;
    onTabSelect: (tabTitle: string) => void;
    variant?: "default" | "primary";
}

const Tabs = ({tabs, children, onTabSelect, edit, variant}: TabsProps & { edit?: PassengerType }) => {
    const theme = useTheme();
    const {theme: Them} = useSelector((state: any) => state.themeReducer);
    const initialIndex = edit ? (edit.nationalId ? 0 : 1) : 0;
    const [index, setIndex] = useState(initialIndex);
    const transition = useTiming(index);

    const dotStyle = useCallback(() => {
        return useAnimatedStyle(() => ({
            transform: [
                {translateX: mix(transition.value, width * 0.25, width * 0.75)},
            ],
        }));
    }, [transition]);

    const contentStyle = useCallback(() => {
        return useAnimatedStyle(() => ({
            transform: [{translateX: width * transition.value}],
        }));
    }, [transition]);

    const memoizedChildren = useMemo(() => {
        return React.Children.map(children, (child, i) => (
            <Box key={i} flex={1} width={width}>
                {child}
            </Box>
        ));
    }, [children]);


    return (
        <Box style={{backgroundColor: Them.PRIMARY_BACKGROUND_COLOR}} flex={1}>
            <Box flexDirection={'row'} >
                {tabs.map((tab, i) => (
                    <TouchableOpacity
                        activeOpacity={0.25}
                        key={i}
                        onPress={() => {
                            setIndex(i);
                            onTabSelect(variant === 'primary'? tab.id :tab.title); // send the tab title back to the parent
                        }}
                        style={{flex: 1}}
                    >
                        {variant === 'primary' ? (
                            <Box
                                //paddingTop={'l'}
                                style={{
                                    paddingBottom: theme.spacing.m + 10,
                                }}
                            >
                                <Box alignItems={'center'} justifyContent={'center'} flexDirection={'row'} backgroundColor={index === i ? 'Success' : 'White'} borderColor={index === i ? 'Success' : 'Primary'} borderWidth={0.5} borderRadius={"m"} p={"s"} mx={"m"}>
                                    {tab.iconName !== undefined && (
                                        <Icon name={tab.iconName} size={tab.iconSize !== undefined ? tab.iconSize : 16} color={tab.iconColor !== undefined ? index === i ?  'white' : Colors.yellow : 'white'} />
                                    )}
                                    <Text
                                        marginHorizontal={'sm'}
                                        variant="title6"
                                        textAlign="center"
                                        color={index === i ?  'White' : 'Primary'}
                                    >
                                        {tab.title}
                                    </Text>
                                </Box>
                            </Box>
                        ) : (
                            <Box
                                paddingTop={variant === "default" ? 's' : 'l'}
                                style={{
                                    paddingBottom: !edit ? theme.spacing.m + 10 : 0,
                                }}
                            >
                                {!edit &&
                                    <Box borderColor={index === i ? 'Primary' : 'TextLt'} borderWidth={1} borderRadius={"m"}
                                         p={"s"} mx={ variant === "default" ? "m" : "l"}>
                                        <Text
                                            variant="title6"
                                            textAlign="center"
                                            color={index === i ? 'Primary' : 'TextLt'}
                                        >
                                            {tab.title}
                                        </Text>
                                    </Box>
                                }
                            </Box>
                        )}
                    </TouchableOpacity>
                ))}
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            bottom: 0,
                            left: -5,
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                        },
                        dotStyle(),
                    ]}
                />
            </Box>
            <Animated.View
                style={[
                    {
                        flex: 1,
                        //width: width ,
                        width: width * tabs.length,
                        flexDirection: "row",
                        //height:'100%',
                    },
                    contentStyle(),
                ]}
            >
                {memoizedChildren}
            </Animated.View>
        </Box>
    );
};

export default Tabs;
