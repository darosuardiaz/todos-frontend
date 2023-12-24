import { useState } from "react"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { createTodo } from "../../services/todos"
import store from "../../redux/store"
import { setRefreshTodos } from "../../redux/reducers/todosReducer"


export const AddTodo = () => {
    const [description, setDescription] = useState<string>('')
    const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()));

    const handleSubmit = async () => {
        if(!description || !date){
            window.alert("Please complete required fields")
        }
        else{
            await createTodo({
                description: description!,
                deadline: date!
            })
            setDescription('')
            // inform TodoTable component that we have to refresh data
            store.dispatch(setRefreshTodos({ refresh: true }))
        }
    }

    return(
        <Stack spacing={0} sx={{ marginTop: 0, paddingTop: 0, }}>
            <Typography color={"black"} sx={{textAlign: "center"}}>Add a new ToDo</Typography>
            <Stack direction={"row"} spacing={1} alignItems={"center"} sx={{ marginTop: 0, paddingTop: 0 }}>
                <TextField
                    placeholder="Description"
                    label="Description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            value={date}
                            onChange={(value) => setDate(value)}
                            viewRenderers={{
                                hours: null,
                                minutes: null,
                                seconds: null,
                            }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    ADD
                </Button>
            </Stack>
        </Stack>
    )
}