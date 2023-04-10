import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Pagination, Box, Typography, TableContainer, Paper, TextField, Button} from '@mui/material';
import { useStyles } from '../styles/styles';

interface University {
    stateProvince: string | null;
    web_pages: string[];
    country: string;
    name: string;
    alpha_two_code: string;
    domains: string[];
}

const UniversityList = () => {
    const [universities, setUniversities] = useState<University[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [universitiesPerPage, setUniversitiesPerPage] = useState<number>(50);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get<University[]>(
                    `http://universities.hipolabs.com/search?country=United+States`);
                setUniversities(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUniversities();
    }, []);

    const indexOfLastUniversity = currentPage * universitiesPerPage;
    const indexOfFirstUniversity = indexOfLastUniversity - universitiesPerPage;
    const currentUniversities = universities.slice(indexOfFirstUniversity, indexOfLastUniversity);  //creates a new array containing only the universities that should be displayed on the current page

    const pageNumbers = [];           //to store the page numbers
    for (let i = 1; i <= Math.ceil(universities.length / universitiesPerPage); i++) {     //used to round up the result of dividing the total number of universities by the desired number of universities per page
        pageNumbers.push(i);
    }
    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };
    const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("Search button clicked!");

        const filteredUniversities = universities.filter((university) =>
            university.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUniversities(filteredUniversities);      //Updating the current universities and resetting the current page to 1
        setCurrentPage(1);
    };

    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Box sx={{ position: 'absolute', top: '1rem', right: 0 }}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    sx={{ marginLeft: 'auto'}}
                    size="small"
                />
                <Button variant="contained" onClick={handleSearch} sx={{marginRight: 0}}> Search </Button>
            </Box>
            <Box>
                <Typography variant="h5" sx={{ marginTop: '2rem' }}>
                    List of Universities in the United States
                </Typography>
            </Box>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>State/Province</TableCell>
                            <TableCell>Webpage</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Alpha Two Code</TableCell>
                            <TableCell>Domain</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUniversities.map((university) => (
                            <TableRow key={university.name}>
                                <TableCell>{university.stateProvince ?? '-'}</TableCell>
                                <TableCell>{university.web_pages?.[0]}</TableCell>
                                <TableCell>{university.country}</TableCell>
                                <TableCell>{university.name}</TableCell>
                                <TableCell>{university.alpha_two_code}</TableCell>
                                <TableCell>{university.domains?.[0]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box>
                <Pagination className={classes.paginationContainer}
                    count={pageNumbers.length}
                    page={currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    variant="outlined"
                    shape="rounded"/>
            </Box>
        </Box>
    );
};
export default UniversityList;
