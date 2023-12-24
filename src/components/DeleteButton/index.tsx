import { Button } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid"
import { deleleTodo } from "../../services/todos"
import store from "../../redux/store"
import { setRefreshTodos } from "../../redux/reducers/todosReducer"

export const DeleteButton = (params: GridRenderCellParams) =>{
    const todoId = params.row.id
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        deleleTodo(todoId)
        // inform TodoTable component that we have to refresh data
        store.dispatch(setRefreshTodos({ refresh: true }))
    }

    return(
        <Button
            variant="outlined"
            onClick={handleClick}
        >
            DELETE
        </Button>
    )
}