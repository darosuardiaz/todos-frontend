import { Dayjs } from "dayjs";
import ApiClient from "../ApiClient";

interface CreateTodoDto {
    description: string;
    deadline: Dayjs;
}


const createTodo = async (payload: CreateTodoDto) => {
    try{
        await ApiClient.post('/todos', payload)
    }
    catch(err){
        window.alert(`Api Error: ${err}`)
    }
}

const getTodos = async () => {
    const response = await ApiClient.get('/todos')
    return response.data
}

const completeTodos = async (todos: number[]) => {
    await ApiClient.put('/todos', {todoIds: todos})
}

const deleleTodo = async (todoId: number) => {
    await ApiClient.delete(`/todos/${todoId}`)
}

export {
    createTodo,
    getTodos,
    completeTodos,
    deleleTodo,
}