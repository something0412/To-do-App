import { icons } from "@/constants/icons";
import { timeSort } from "@/functions/sortTasks";
import { AddTaskProps } from "@/types/mainTypes";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddPopUp from "./AddPopUp";

const AddTask = (props: AddTaskProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View
            className="flex flex-row items-center mb-10"
            style={{
                position: "absolute",
                bottom: 70,
            }}
        >
            <View className="flex flex-col mx-1 justify-center items-center opacity-0">
                <Text className="opacity-0 text-sm font-medium">
                    {"  PM  "}
                </Text>
            </View>
            <View>
                <AddPopUp
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    tasks={props.tasks}
                    setTasks={props.setTasks}
                    type="time"
                    sortType={timeSort}
                />
                <TouchableOpacity
                    className="justify-center items-center p-4 rounded-full size-[65px] bg-white"
                    onPress={() => {
                        setModalVisible(true);
                    }}
                    style={styles.addBtn}
                >
                    <Image
                        source={icons.plus}
                        alt="add-icon"
                        className="size-8 sticky"
                        tintColor="#256874"
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-1 align-left mx-1 opacity-0" />
        </View>
    );
};
const styles = StyleSheet.create({
    addBtn: {
        boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        zIndex: 11,
    },
});

export default AddTask;
