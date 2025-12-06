import STaskContainer from "@/components/STaskContainer";
import { getList, setList } from "@/functions/asyncStorage";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const scheduled = () => {
    const [tasks, setTasks] = useState<any>([]);
    let temp: any = [...tasks, { id: "add" }];

    useEffect(() => {
        // get data and delete the ones that past 7 days ago
        getList("scheduledTasks", (storedTasks: any[]) => {
            const today = new Date();
            const newList = storedTasks.filter((task: any) => {
                const today_YYYYMMDD =
                    today.getFullYear() * 10000 +
                    today.getMonth() * 100 +
                    today.getDate();
                const task_YYYYMMDD =
                    task.time.getFullYear() * 10000 +
                    task.time.getMonth() * 100 +
                    task.time.getDate();
                const keepTask =
                    today_YYYYMMDD - task_YYYYMMDD > 7 ? false : true;
                return keepTask && task;
            });
            setTasks(newList);
        });
    }, []);

    useEffect(() => {
        setList("scheduledTasks", tasks);
        temp = [...tasks, { id: "add" }];
    }, [tasks]);
    return (
        <View className="flex-1 bg-white">
            <ScrollView
                contentContainerClassName="flex flex-row flex-wrap bg-white"
                contentContainerStyle={{ paddingBottom: 90 }}
            >
                {temp.map((item: any, index: number) => (
                    <STaskContainer
                        key={index}
                        task={item}
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default scheduled;
