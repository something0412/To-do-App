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

function RoutAdd(props: any) {
    const [name, setName] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const addTask = () => {
        const newTask = {
            streak: 0,
            id: Date.now(),
            name: name,
            desc: desc,
            grid: Array.from({ length: 27 }, () => new Array(7).fill(false)),
            currentWeek: new Array(7).fill(false),
        };
        if (name.trim() === "") {
            return;
        }
        props.setTasks([...props.tasks, newTask]);
        setName("");
        setDesc("");
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
            className=""
        >
            <KeyboardAvoidingView
                behavior="height"
                className="flex-1 h-full justify-center items-center bg-black/20"
            >
                {/* <ScrollView className="pt-10 justify-center items-center bg-white w-5/6 h-2/3 rounded-lg"> */}
                <ScrollView
                    className="w-5/6 bg-opacity-0 my-32 pt-10"
                    contentContainerClassName="pb-12 justify-center items-center bg-white rounded-2xl"
                >
                    <View className="flex-row justify-center items-center self-end mb-5">
                        <TouchableOpacity
                            onPress={() => {
                                props.setModalVisible(!props.modalVisible);
                            }}
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
                        value={name}
                        onChangeText={setName}
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
                                addTask();
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

export default RoutAdd;
