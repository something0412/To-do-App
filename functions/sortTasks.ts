import { Task } from "@/types/mainTypes";
// sort task by time.
function timeSort(tasks: Task[]) {
    const updatedList = [...tasks];
    // sort base on minutes.
    updatedList.sort((a, b) => a.time.getMinutes() - b.time.getMinutes());
    // sort base on hours.
    updatedList.sort((a, b) => a.time.getHours() - b.time.getHours());
    return updatedList;
}

// sort task by date.
function dateSort(tasks: Task[]) {
    const updatedList = [...tasks];
    // sort base on dates.
    updatedList.sort((a, b) => a.time.getDate() - b.time.getDate());
    // sort base on months.
    updatedList.sort((a, b) => a.time.getMonth() - b.time.getMonth());
    // sort base on years.
    updatedList.sort((a, b) => a.time.getFullYear() - b.time.getFullYear());
    return updatedList;
}

export { dateSort, timeSort };

