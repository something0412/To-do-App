import { icons } from "@/constants/icons";
import { dateSort } from "@/functions/sortTasks";
import { ScheTaskProps, STaskContainerProps, Task } from "@/types/mainTypes";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddPopUp from "./AddPopUp";
import EditPopUp from "./EditPopUp";

const STaskContainer = (props: STaskContainerProps) => {
    const target: Task = props.task;
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const today: Date = new Date();
    const ScheTask = ({ name, desc, time }: ScheTaskProps) => {
        // check if the task's date is passed.
        const stat =
            time.getFullYear() * 10000 +
                time.getMonth() * 100 +
                time.getDate() <
            today.getFullYear() * 10000 +
                today.getMonth() * 100 +
                today.getDate()
                ? true
                : false;
        return (
            <View
                // make the task blur if its date is passed.
                className={`flex w-32 h-40 rounded-xl ${
                    stat ? "opacity-35" : ""
                }`}
                style={styles.scheDiv}
            >
                <EditPopUp
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    task={target}
                    tasks={props.tasks}
                    setTasks={props.setTasks}
                    type="date"
                />
                <View
                    className="flex-0 h-1/3 justify-center px-1 rounded-t-xl"
                    style={styles.title}
                >
                    <View className="mx-1">
                        <Text
                            className={" text-xl font-bold mx-1 "}
                            style={{ color: "#65451F" }}
                        >
                            {name}
                        </Text>
                        {desc && (
                            <Text
                                className={
                                    " ml-7 mt-[-7px] font-extrabold text-xl opacity-50"
                                }
                                style={{ color: "#65451F" }}
                            >
                                . . .
                            </Text>
                        )}
                    </View>
                </View>
                <View className="flex-1 justify-center items-center">
                    {time.getDate() == today.getDate() &&
                    time.getMonth() == today.getMonth() &&
                    time.getFullYear() == today.getFullYear() ? (
                        <Text
                            className="font-semibold text-3xl"
                            style={{ color: "#8B5D5D" }}
                        >
                            Today
                        </Text>
                    ) : (
                        <Text
                            // scratch out the date if it is passed.
                            className={`font-semibold text-3xl ${stat ? "line-through" : ""}`}
                            style={{ color: "#596E79" }}
                        >{`${time.toLocaleString("default", { month: "short" })} ${time.getDate()}`}</Text>
                    )}
                </View>
                <View className="items-end">
                    <Text className="font-bold mx-2 mb-1 opacity-25">
                        {time.getFullYear()}
                    </Text>
                </View>
            </View>
        );
    };
    const ScheAdd = () => {
        return (
            <View
                className="flex w-32 h-40 rounded-xl justify-center items-center"
                style={styles.addDiv}
            >
                <AddPopUp
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    tasks={props.tasks}
                    setTasks={props.setTasks}
                    type="date"
                    sortType={dateSort}
                />
                <Image
                    source={icons.plus}
                    alt="add-icon"
                    className="size-10"
                    tintColor="#AD8B73"
                />
            </View>
        );
    };

    return (
        <View className="mx-2.5 my-5">
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <View>
                    {target.id == "add" ? (
                        <ScheAdd />
                    ) : (
                        <ScheTask
                            name={target.name}
                            desc={target.desc}
                            time={target.time}
                        />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    addDiv: {
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        backgroundColor: "#F7F6F2",
    },
    scheDiv: {
        boxShadow:
            " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    },
    title: {
        boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        backgroundColor: "#ABC4AA",
    },
});

export default STaskContainer;
