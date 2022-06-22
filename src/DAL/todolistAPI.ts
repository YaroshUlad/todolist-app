import {instance} from "./instance";

export type ToDoListType = {
    title: string
    addedDate: string
    id: string
    order: number
}

export type CreateTDLResponseType = {
    data: { item: ToDoListType }
    fieldsErrors: []
    messages: []
    resultCode: number
}

export type DeleteTDLResponseType = {
    data: {}
    fieldsErrors: []
    messages: []
    resultCode: number
}

export const todolistAPI = {
    getToDoLists() {
        return instance.get<ToDoListType[]>('todo-lists')
            .then(res => res.data)
    },
    createNewToDoList(title: string) {
        const bodyOfRequest = {"title": title}
        return instance.post<CreateTDLResponseType>('todo-lists', bodyOfRequest)
            .then(res => res.data)
    },
    deleteToDoList(tdlId: string) {
        return instance.delete<DeleteTDLResponseType>(`todo-lists/${tdlId}`)
            .then(res => res.data)
    },
    updateToDoListTitle(tdlId: string, title: string) {
        const bodyOfRequest = {"title": title}
        return instance.put<DeleteTDLResponseType>(`todo-lists/${tdlId}`, bodyOfRequest)
            .then(res => res.data)
    },
}