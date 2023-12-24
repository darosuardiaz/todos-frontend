import { useState } from "react";
import { Button, Stack } from "@mui/material"
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { TodoTable } from "../components/TodoTable"
import { AddTodo } from "../components/AddTodo";
import { completeTodos } from "../services/todos";
import store from "../redux/store";
import { setRefreshTodos } from "../redux/reducers/todosReducer";


export const TodoListPage = () => {
    const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>([]);

    const handleComplete = () => {
        completeTodos(rowSelection as number[])
        // inform TodoTable component that we have to refresh data
        .then(() => store.dispatch(setRefreshTodos({ refresh: true })))
        .catch((err) => window.alert(err))
    }

    return(
        <>
            <Stack spacing={2}>
                <AddTodo />
                <TodoTable setRowSelection={setRowSelection} />
                <Button
                    variant="contained"
                    onClick={handleComplete} 
                    disabled={rowSelection.length ? false : true} 
                > 
                    Complete Task(s)
                </Button>
            </Stack>
            
        </>
    )
}