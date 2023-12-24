import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DeleteButton } from "../DeleteButton";


export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'deadline', headerName: 'Deadline', width: 130 },
    { 
        field: 'completed',
        headerName: 'Completed',
        width: 90,
        renderCell: (params: GridRenderCellParams) => params.row.completed 
            ? "Yes"
            : "No"
    },
    {
        field: 'delete',
        headerName: '',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        renderCell: DeleteButton
    },
];