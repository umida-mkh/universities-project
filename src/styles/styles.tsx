import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles({
        container: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        tableContainer: {
            marginTop: '1rem',
            marginBottom: '1rem',
            width: '100%',
            maxHeight: '80vh',
        },
        paginationContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
    });

