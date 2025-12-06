// import { Text } from "@react-navigation/elements";
import AddRout from "@/components/Routines_Comp/AddRout";
import MissionDiv from "@/components/Routines_Comp/MissionDiv";
import StreakDiv from "@/components/Routines_Comp/StreakDiv";
import { icons } from "@/constants/icons";
import {
    getLastDate,
    getList,
    setLastDate,
    setList,
} from "@/functions/asyncStorage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const routines = () => {
    const TopTab = createMaterialTopTabNavigator();
    const [tasks, setTasks] = useState<any>([]);
    const todayDate = new Date();
    const today: number = todayDate.getDay();
    useEffect(() => {
        const updateTasks = async () => {
            getList("routineTasks", async (storedTasks: any[]) => {
                let newList = storedTasks;
                const yesterdayDate = await getLastDate("yesterdayDate");

                if (
                    today === 0 &&
                    (typeof yesterdayDate != "string"
                        ? false
                        : todayDate.toDateString() != yesterdayDate)
                ) {
                    // first day of week
                    newList = storedTasks.map((task: any) => {
                        const yesterday = 6;
                        const needReset =
                            !task.currentWeek[yesterday] &&
                            !task.currentWeek[today];

                        const newGrid = [...task.grid];
                        newGrid.shift();
                        newGrid.push([...task.currentWeek]);

                        return {
                            ...task,
                            streak: needReset ? 0 : task.streak,
                            grid: newGrid,
                            currentWeek: new Array(7).fill(false),
                        };
                    });
                } else {
                    newList = storedTasks.map((task: any) => {
                        const yesterday = today - 1;
                        const needReset =
                            !task.currentWeek[yesterday] &&
                            !task.currentWeek[today];

                        return {
                            ...task,
                            streak: needReset ? 0 : task.streak,
                        };
                    });
                }

                setTasks(newList);
                setLastDate("yesterdayDate", todayDate.toDateString());
            });
        };

        updateTasks();
    }, []);

    useEffect(() => {
        setList("routineTasks", tasks);
    }, [tasks]);

    const cbToggle = (id: number) => {
        const newList = tasks.map((task: any) => {
            if (task.id == id) {
                const updatedWeek = task.currentWeek;
                updatedWeek[today] = !updatedWeek[today];
                return {
                    ...task,
                    streak: updatedWeek[today]
                        ? task.streak + 1
                        : task.streak - 1,
                    currentWeek: updatedWeek,
                };
            } else {
                return task;
            }
        });

        setTasks(newList);
    };

    const MissionScreen = () => {
        return (
            <>
                <ScrollView
                    className="py-5 bg-white"
                    contentContainerStyle={{ paddingBottom: 90 }}
                >
                    {tasks.map((task: any, i: any) => {
                        return (
                            <MissionDiv
                                key={i}
                                today={today}
                                task={task}
                                cbToggle={cbToggle}
                            />
                        );
                    })}
                    <View className="flex-row justify-center items-center m-3 opacity-30">
                        <View className="flex-1 border-[1px]"></View>
                        <Text className="font-semibold mx-3 italic">
                            Edit in Streaks Tab
                        </Text>
                        <View className="flex-1 border-[1px]"></View>
                    </View>
                </ScrollView>
            </>
        );
    };
    const StreaksScreen = () => {
        return (
            <>
                <ScrollView
                    className="pt-5 bg-white"
                    contentContainerStyle={{ paddingBottom: 90 }}
                >
                    {tasks.map((task: any, i: any) => {
                        return (
                            <StreakDiv
                                key={i}
                                task={task}
                                today={today}
                                tasks={tasks}
                                setTasks={setTasks}
                                cbToggle={cbToggle}
                            />
                        );
                    })}
                    <AddRout tasks={tasks} setTasks={setTasks} />
                </ScrollView>
            </>
        );
    };
    return (
        <TopTab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowIcon: true,
                tabBarIcon: ({ focused }) => {
                    let display;

                    if (route.name === "Mission") {
                        display = focused ? (
                            <Image
                                source={icons.target}
                                className="size-8 self-center"
                                style={{
                                    tintColor: "#FF8989",
                                }}
                            />
                        ) : (
                            <Text
                                className="text-xl font-bold"
                                style={{
                                    color: "#C9CDCF",
                                }}
                            >
                                Target
                            </Text>
                        );
                    } else if (route.name === "Streaks") {
                        display = focused ? (
                            <Image
                                source={icons.campfire}
                                className="size-8 self-center"
                                style={{
                                    tintColor: "#E6521F",
                                }}
                            />
                        ) : (
                            <Text
                                className="text-xl font-bold"
                                style={{ color: "#C9CDCF" }}
                            >
                                Streaks
                            </Text>
                        );
                    }

                    return <View className="h-full">{display}</View>;
                },
                tabBarIndicatorStyle: {
                    height: 0,
                },
                tabBarShowLabel: false,
            })}
        >
            <TopTab.Screen name="Mission" component={MissionScreen} />
            <TopTab.Screen name="Streaks" component={StreaksScreen} />
        </TopTab.Navigator>
    );
};

export default routines;
