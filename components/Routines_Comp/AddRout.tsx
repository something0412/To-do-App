import { icons } from "@/constants/icons";
import { AddRoutProps } from "@/types/mainTypes";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import RoutAdd from "./RoutPopUp";

const AddRout = (props: AddRoutProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    return (
        <View className="flex items-center my-4">
            <RoutAdd
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                tasks={props.tasks}
                setTasks={props.setTasks}
            />
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }}
                className="justify-center items-center rounded-full size-[65px]"
                style={styles.addBtn}
            >
                <Image
                    source={icons.plus}
                    alt="add-icon"
                    className="size-8"
                    style={{ tintColor: "#7D6E83" }}
                />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    addBtn: {
        boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    },
});

export default AddRout;
