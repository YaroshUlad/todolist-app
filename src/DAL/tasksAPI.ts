import {instance} from "./instance";


export type TaskForRequestType = {
    description: string | null
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

export type TaskType = {
    description: string | null
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type getTasksResponseType = {
    items: TaskType[]
    error: null | string
    totalCount: number
}
type createNewTaskResponseType = {
    resultCode: number
    messages: string[],
    data: { item: TaskType }
}
type deleteTaskResponseType = {
    resultCode: number
    messages: string[],
    data: {}
}
type updateTaskResponseType = {
    resultCode: number
    messages: string[],
    data: {
        item: TaskType
    }
}


export const tasksAPI = {
    getTasks(tdlId: string, /*count: number = 10, page: number = 1*/) {
        return instance.get<getTasksResponseType>(`todo-lists/${tdlId}/tasks`)
            .then(res => res.data)
    },
    createNewTask(tdlId: string, title: string) {
        const bodyOfRequest = {
            title
        }
        return instance.post<createNewTaskResponseType>(`todo-lists/${tdlId}/tasks`, bodyOfRequest)
            .then(res => res.data)
    },
    deleteTask(tdlId: string, taskId: string) {
        return instance.delete<deleteTaskResponseType>(`todo-lists/${tdlId}/tasks/${taskId}`)
            .then(res => res.data)
    },
    updateTask(tdlId: string, taskId: string, task: TaskForRequestType) {
        return instance.put<updateTaskResponseType>(`todo-lists/${tdlId}/tasks/${taskId}`, task)
            .then(res => res.data)
    }
}