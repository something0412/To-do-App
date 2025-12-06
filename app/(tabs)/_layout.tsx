import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const _layout = () => {
    const AppTab = (props: any) => {
        if (props.focused) {
            return (
                <View
                    className="flex flex-row min-w-[100px] w-[150px] justify-center items-center rounded-2xl h-[120px] bg-purple-300 pb-12 mt-10"
                    style={[styles.tab, styles.activeTab]}
                >
                    <Image
                        source={props.icon}
                        className="size-8"
                        tintColor="#911F27"
                    />
                    <Text
                        className="text-secondary text-xl font-semibold ml-3"
                        style={{ color: "#753422" }}
                    >
                        {props.title}
                    </Text>
                </View>
            );
        }
        return (
            <View className="mt-7">
                <Image
                    source={props.icon}
                    className="size-8"
                    tintColor="#826F66"
                />
            </View>
        );
    };

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    display: "flex",
                    flexBasis: "auto",
                },
                tabBarStyle: {
                    paddingHorizontal: 15,
                    height: 70,
                    backgroundColor: "#F1DEC9",
                    position: "absolute",
                    borderTopWidth: 0,
                    elevation: 0,
                    overflow: "visible",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Day Plan",
                    tabBarIcon: ({ focused }) => (
                        <AppTab
                            focused={focused}
                            icon={icons.home}
                            title="Day Plan"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="scheduled"
                options={{
                    title: "Scheduled",
                    tabBarIcon: ({ focused }) => (
                        <AppTab
                            focused={focused}
                            icon={icons.calendar}
                            title="Scheduled"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="routines"
                options={{
                    title: "Routines",
                    tabBarIcon: ({ focused }) => (
                        <AppTab
                            focused={focused}
                            icon={icons.routine}
                            title="Routine"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};
const styles = StyleSheet.create({
    tab: {
        backgroundColor: "#F5E8E4",
        borderRadius: 30,
        zIndex: 1,
        boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    },
    activeTab: {
        transform: [{ scale: 1.05 }],
        zIndex: 99,
    },
});

export default _layout;
