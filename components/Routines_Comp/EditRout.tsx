// import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "@/constants/icons";
import { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditRout(props: any) {
    const target = props.task;
    const [text, setText] = useState(props.task.name);
    const [desc, setDesc] = useState(props.task.desc);

    // delete Task.
    const deleteTask = async (id: number) => {
        const newList = props.tasks.filter((task: any) => task.id !== id);
        props.setTasks(newList);
        props.setModalVisible(!props.modalVisible);
    };

    // keep the initial Task's data when not editing.
    const closeTask = () => {
        setText(target.name);
        setDesc(target.desc);
        props.setModalVisible(!props.modalVisible);
    };

    // save (update) Task's data.
    const saveTask = async (id: number) => {
        const updatedTask = {
            ...target,
            name: text.trim() ? text : target.name,
            desc: desc.trim() ? desc : "",
        };

        const newList = props.tasks.map((task: any) =>
            task.id === id ? updatedTask : task
        );

        props.setTasks(newList);
        props.setModalVisible(!props.modalVisible);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                props.setModalVisible(!props.modalVisible);
            }}
        >
            <KeyboardAvoidingView
                behavior="height"
                className="flex flex-1 justify-center items-center bg-black/20"
            >
                <ScrollView
                    className="w-5/6 bg-opacity-0 my-32 pt-10"
                    contentContainerClassName="pb-12 justify-center items-center bg-white rounded-2xl"
                >
                    <View className="flex-row justify-center items-center self-end mb-5">
                        <TouchableOpacity
                            onPress={closeTask}
                            className="m-5 border-[1px] border-gray-200 bg-gray-300 p-4 rounded-full"
                        >
                            <Image
                                source={icons.x_cross}
                                alt="x-icon"
                                className="size-5"
                                tintColor="#256874"
                            />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Enter Task"
                        placeholderTextColor="gray"
                        clearButtonMode="always"
                        style={styles.taskInput}
                    />
                    <TextInput
                        value={desc}
                        onChangeText={setDesc}
                        placeholder="Enter Description"
                        placeholderTextColor="gray"
                        clearButtonMode="always"
                        multiline={true}
                        style={styles.descriptionInput}
                    />
                    <View className="flex-row justify-center items-center mt-5">
                        <TouchableOpacity
                            onPress={() => {
                                deleteTask(target.id);
                            }}
                            className="items-center m-5 w-20 border-[1px] border-red-100 bg-red-300 px-4 py-2 rounded-2xl"
                        >
                            <Image
                                source={icons.trash}
                                alt="trash-icon"
                                className="size-8"
                                tintColor="#256874"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                saveTask(target.id);
                            }}
                            className="items-center m-5 w-20 border-[1px] border-green-200 bg-green-400 px-4 py-2 rounded-2xl"
                        >
                            <Image
                                source={icons.done}
                                alt="check-icon"
                                className="size-8"
                                tintColor="#256874"
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}
const styles = StyleSheet.create({
    taskInput: {
        borderWidth: 2,
        borderRadius: 7,
        borderColor: "black",
        width: "85%",
        height: 40,
        marginBottom: 20,
        padding: 10,
        fontSize: 18,
        color: "black",
        flexShrink: 1,
    },
    descriptionInput: {
        borderWidth: 2,
        borderRadius: 7,
        borderColor: "black",
        width: "85%",
        height: 150,
        padding: 10,
        fontSize: 15,
        color: "black",
    },
});
