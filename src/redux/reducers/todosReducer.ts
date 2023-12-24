import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TodosState } from "../definitions";

const initialState: TodosState = { refresh: true}

const todosSlice = createSlice({
    name: "todosSlice",
    initialState,
    reducers: {
        setRefreshTodos: (state, action: PayloadAction<TodosState>) => {
            return {
                ...state,
                refresh: action.payload.refresh,
            }
        }
    }
})

export default todosSlice.reducer
export const { setRefreshTodos } = todosSlice.actions