import {instance} from "./instance";

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type getTasksResponseType = {
    items: TaskType[]
    error: null|string
    totalCount: number
}
export const tasksAPI = {
    getTasks(tdlId: string, /*count: number = 10, page: number = 1*/) {
        return instance.get<getTasksResponseType>(`todo-lists/${tdlId}/tasks`)
            .then(res => res.data)
    },

}