import { useEffect, useState } from 'react';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { columns } from './config';
import store from '../../redux/store';
import { useAppState } from '../../redux/hooks';
import { getTodos } from '../../services/todos';
import { setRefreshTodos } from '../../redux/reducers/todosReducer';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';


interface TodoTableProps {
    setRowSelection: (s: GridRowSelectionModel) => void;
}

interface ToDo {
    id: number;
    description: string;
    deadline: string;
    completed: boolean;
    deleted: boolean;
}


export const TodoTable = ({
    setRowSelection,
}: TodoTableProps) => {
    const [rows, setRows] = useState<ToDo[]>()
    const [completed, setCompleted] = useState<number>()
    const [pending, setPending] = useState<number>()
    const [loading, setLoading] = useState(true)
    const { refresh } = useAppState((state) => state.app.todos)

    const setSummary = (data: ToDo[]) => {
        const completed = data.filter((x) => x.completed === true)
        const pending = data.filter((x) => x.completed === false)
        setCompleted(completed.length)
        setPending(pending.length)
    }

    useEffect(() => {
        getTodos()
        .then((data) => {
            setRows(data)
            setSummary(data)
            setRowSelection([])
            store.dispatch(setRefreshTodos({ refresh: false }))
            setLoading(false)
        })
        .catch((err) => window.alert(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading === true, refresh === true])


    if(loading || refresh) return <> Loading... </>
    
    return (
        <div>
            <Stack sx={{ height: 400, width: '100%', paddingTop: 0 }}>
                <Typography color={"black"} sx={{textAlign: "right"}}>{`Completed: ${completed} Pending: ${pending}`}</Typography>
                <DataGrid
                    rows={rows!}
                    columns={columns}
                    hideFooter={true}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newRowSelection) => {setRowSelection(newRowSelection)}}
                />
            </Stack>
        </div>
    );
}