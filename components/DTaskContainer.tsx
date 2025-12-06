// import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "@/constants/icons";
import { DTaskContainerProps, Task, TextDivProps } from "@/types/mainTypes";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import EditPopUp from "./EditPopUp";

const DTaskContainer = (props: DTaskContainerProps) => {
    const target: Task = props.task;
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const containerStyle: string = `flex flex-row  justify-center items-center ${target.isCompleted ? " opacity-30" : ""}`;

    const TextDiv = ({ name, desc, isCompleted }: TextDivProps) => {
        return (
            <View
                className="flex justify-center flex-1 align-left ml-5 mr-3 my-2"
                style={styles.taskDiv}
            >
                <>
                    <Text
                        className=" text-xl font-semibold "
                        style={{ color: "#7C444F" }}
                    >
                        {name}
                    </Text>
                    {desc && (
                        <ScrollView className="max-h-32">
                            <Text
                                className={` ml-5 ${isCompleted ? " line-through" : ""}`}
                                style={{ color: "#7C444F" }}
                            >
                                {desc}
                            </Text>
                        </ScrollView>
                    )}
                </>
            </View>
        );
    };

    return (
        <View className={containerStyle}>
            <View className="flex flex-col mx-1 justify-center items-center opacity-50">
                <Text className="text-sm font-semibold">{`${target.hour > 12 ? target.hour - 12 : target.hour}:${String(target.minute).padStart(2, "0")}`}</Text>
                <Text className="text-sm font-semibold">
                    {target.hour < 12 ? "  AM  " : "  PM  "}
                </Text>
            </View>
            <View className="flex-row flex-1">
                <EditPopUp
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    task={target}
                    tasks={props.tasks}
                    setTasks={props.setTasks}
                    type="time"
                />
                <TouchableOpacity
                    className="flex justify-center items-center rounded-full w-[65px] min-h-[65px] h-100"
                    onPress={() => setModalVisible(true)}
                    style={styles.editBtn}
                >
                    <Image
                        source={icons.edit}
                        alt="task-icon"
                        className="size-6"
                    />
                </TouchableOpacity>
                <TextDiv
                    isCompleted={target.isCompleted}
                    name={target.name}
                    desc={target.desc}
                />
            </View>
            <Checkbox
                value={target.isCompleted}
                onValueChange={() => {
                    props.cbToggle(target.id);
                }}
                style={styles.checkbox}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    checkbox: {
        width: 30,
        height: 30,
        marginRight: 27,
        borderRadius: 7,
    },
    taskDiv: {
        boxShadow: " rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset ",
    },
    editBtn: {
        boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
    },
});

export default DTaskContainer;
