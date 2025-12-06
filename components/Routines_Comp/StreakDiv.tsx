import { icons } from "@/constants/icons";
import { RoutineTask, StreakDivProps } from "@/types/mainTypes";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EditRout from "./EditRout";

interface DotProps {
    id: number;
    day: number;
    stat: boolean;
}

interface ColProps {
    id: number;
    week: boolean[];
}

interface GridProps {
    arr: boolean[][];
}

const StreakDiv = (props: StreakDivProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    // Extracting information from props
    const task: RoutineTask = props.task;
    const currentWeek: boolean[] = props.task.currentWeek;
    const pastPreriods: boolean[][] = props.task.grid;
    const today: number = props.today;

    const getFlameColor = (streak: number): string => {
        if (streak === 0) return "rgba(0,0,0,0.2)";
        if (streak < 10) return "#FF884B";
        if (streak < 30) return "#FF204E";
        if (streak < 100) return "#cf1a9fff";
        return "#750185ff";
    };

    // Dot (single day) display
    const Dot = (props: DotProps) => {
        return (
            <View
                className={`size-[9px] ${props.day > today && props.id == 0 ? "opacity-20" : ""} m-[1px] rounded-lg border-[1px] ${props.stat ? "bg-[#38E54D] border-[#61B15A]" : "bg-[#F2EEE5] border-gray-400"}`}
            />
        );
    };

    const Col = (props: ColProps) => {
        return (
            <View className="h-full flex-col justify-around">
                {props.week.map((day, i) => (
                    <Dot key={i} id={props.id} day={i} stat={day} />
                ))}
            </View>
        );
    };

    // Row of weeks
    const Grid = (props: GridProps) => {
        return (
            <View className="w-full flex-row justify-around">
                {props.arr.map((week, i) => (
                    <Col key={i} id={-1} week={week} />
                ))}
                <Col id={0} week={currentWeek} />
            </View>
        );
    };

    const StreakContainer = () => {
        return (
            <View
                className="m-5 h-40 flex-col self-center rounded-lg"
                style={styles.streakDiv}
            >
                <EditRout
                    task={task}
                    tasks={props.tasks}
                    setTasks={props.setTasks}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
                <View style={styles.header}>
                    <View className="flex-row m-3 ">
                        <Text
                            className="flex-1 font-bold"
                            style={{ color: "#411530" }}
                        >
                            {task.name}
                        </Text>
                        <Image
                            source={icons.flame}
                            alt="flame-icon"
                            className="size-5"
                            style={{
                                tintColor: getFlameColor(task.streak),
                            }}
                        />
                        <Text> {task.streak}</Text>
                    </View>
                </View>
                <View className="h-32 p-[5px] flex-1 flex-row-reverse">
                    <Grid arr={pastPreriods} />
                </View>
            </View>
        );
    };

    return (
        <TouchableOpacity
            onPress={() => {
                setModalVisible(true);
            }}
        >
            <StreakContainer />
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    header: {
        boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    },
    streakDiv: {
        boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
    },
});

export default StreakDiv;
