import { Task } from "@/types/mainTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getList = async (listName: string, setTasks: (tasks: any[]) => void) => {
    // await AsyncStorage.clear()
    try {
        const storedData: string |  null = await AsyncStorage.getItem(listName);
        const list: any[] = JSON.parse(storedData || "[]")

        if (list === null || list.length === 0){
            setTasks([])
            return;
        }

        if (listName === "routineTasks"){
            setTasks(list)
            return;
        }
        
        const properList: Task[] = list.map((task: any) => ({
            ...task,
            time: new Date(task.time)
        }))

        setTasks(properList);
        // properList contains time data as Date(), not String.
    } catch (error) {
        console.log(error);
    }
};

const setList = async(listName: string, list: any[]) => {
    try{
        await AsyncStorage.setItem(listName, JSON.stringify(list))
    } catch (error){
        console.log("Save failed at index.tsx:", error)
    }
}

const getLastDate = async(key: string) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        console.error("Error loading last date:", error);
        return null;
    }
}
const setLastDate = async(yesterday: string, newDate: string) => {
    AsyncStorage.setItem(yesterday, newDate).catch(
        (e) => console.log("Save lastDate failed:", e)
    );
}
export { getLastDate, getList, setLastDate, setList };

