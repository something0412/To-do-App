import { MissionDivProps, RoutineTask, TaskTextProps } from "@/types/mainTypes";
import Checkbox from "expo-checkbox";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const MissionDiv = (props: MissionDivProps) => {
    const today: number = props.today;
    const task: RoutineTask = props.task;
    const status: boolean = task.currentWeek[today];
    const name: string = task.name;
    const desc: string = task.desc;

    const TaskText = ({ name, desc, isCompleted }: TaskTextProps) => {
        return (
            <View className="flex justify-center flex-1 align-left mx-5">
                <>
                    <Text
                        className=" text-xl font-semibold"
                        style={{ color: "#2C3639" }}
                    >
                        {name}
                    </Text>
                    {desc && (
                        <ScrollView className="max-h-32">
                            <Text
                                className={`" ml-5 "${isCompleted ? " line-through" : ""}`}
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
        <View
            className={`flex-row justify-center items-center my-3 mx-3 rounded-lg py-10 ${status ? " opacity-30" : ""}`}
            style={styles.taskDiv}
        >
            <TaskText isCompleted={status} name={name} desc={desc} />
            <Checkbox
                value={status}
                onValueChange={() => {
                    props.cbToggle(task.id);
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
        marginRight: 20,
        borderRadius: 7,
    },
    taskDiv: {
        boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        backgroundColor: "#F9F8F6",
    },
});

export default MissionDiv;
