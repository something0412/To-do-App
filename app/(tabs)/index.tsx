import AddTask from "@/components/AddTask";
import DTaskContainer from "@/components/DTaskContainer";
import { getList, setList } from "@/functions/asyncStorage";
import { Task } from "@/types/mainTypes";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const today: string = new Date().toDateString();

    useEffect(() => {
        // get data and keep the remaining (incomplete) tasks
        getList("dailyPlannerTasks", (storedTasks: Task[]) => {
            const newList = storedTasks.filter(
                (task) =>
                    new Date(task.time).toDateString() == today ||
                    task.isCompleted == false
            );
            setTasks(newList);
        });
    }, []);

    useEffect(() => {
        setList("dailyPlannerTasks", tasks);
    }, [tasks]);

    // toggle and store checkbox data for each Task.
    const cbToggle = (id: number) => {
        const newList = tasks.map((task: Task) =>
            task.id === id
                ? {
                      ...task,
                      isCompleted: !task.isCompleted,
                  }
                : task
        );
        setTasks(newList);
    };
    const Separator = () => {
        return (
            <View className="flex flex-row items-center">
                <View className="flex flex-col mx-1 justify-center items-center">
                    <Text className="opacity-0 text-sm font-medium">
                        {"  PM  "}
                    </Text>
                </View>
                <View className="items-center justify-center w-[65px] h-12 opacity-50">
                    <View
                        className="w-[4px] border-black h-full"
                        style={styles.connectLine}
                    />
                </View>
                <View className="flex-1 align-left mx-1" />
            </View>
        );
    };

    return (
        <View className="flex-1 bg-white">
            <View>
                <ScrollView
                    className="mb-[75px] pt-10"
                    contentContainerStyle={{ paddingBottom: 90 }}
                >
                    {tasks.map((item, i) => (
                        <View key={i}>
                            <DTaskContainer
                                task={item}
                                tasks={tasks}
                                setTasks={setTasks}
                                cbToggle={cbToggle}
                            />
                            <Separator />
                        </View>
                    ))}
                </ScrollView>
                <AddTask tasks={tasks} setTasks={setTasks} />
                {/* TOP FADE */}
                <LinearGradient
                    colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 60,
                    }}
                    pointerEvents="none"
                />

                {/* BOTTOM FADE */}
                <LinearGradient
                    colors={["rgba(255,255,255,0)", "rgba(255, 255, 255, 1)"]}
                    style={{
                        position: "absolute",
                        bottom: 140,
                        left: 0,
                        right: 0,
                        height: 50,
                        zIndex: 10,
                    }}
                    pointerEvents="none"
                />
                <LinearGradient
                    colors={["rgba(255,255,255,1)", "rgba(255, 255, 255, 1)"]}
                    style={{
                        position: "absolute",
                        bottom: 75,
                        left: 0,
                        right: 0,
                        height: 65,
                        zIndex: 10,
                    }}
                    pointerEvents="none"
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    connectLine: {
        boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
    },
});
