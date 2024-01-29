import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
// ==================================================
import { Box, Checkbox, FormControlLabel, TextField, DialogTitle, DialogContent, Button, Dialog, DialogActions } from '@mui/material';
// ===================================================
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
// ===================================================
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Sr_No, Name, Contact, Weekday, Gender, Date
// 1, "ayaz", 0987654321, [M,T,W], "Male", "03/21/2001"
function createData(Sr_No, Name, Email, Contact, Weekdays, Gender, Date) {
    return { Sr_No, Name, Email, Contact, Weekdays, Gender, Date };
}

const rows = [
    createData(1, "Arhan", "Arhan@gmail.com", 1987654321, [true, true, false, false, true], "Male", "03/21/2001"),
    createData(2, "Laviza", "Laviza@gmail.com", 1987654321, [true, true, false, true, true], "Female", "03/21/2001"),
    createData(3, "Danin", "Danin@gmail.com", 1987654321, [true, true, true, false, false], "Female", "03/21/2001"),
    createData(4, "Falak", "Falak@gmail.com", 1987654321, [true, true, true, true, true], "Female", "03/21/2001"),
];


export default function DataTable() {

    // Create an Array
    const [array, setArray] = React.useState([]);

    // variable
    const [Sr_No, setSr_no] = React.useState("");
    const [Name, setName] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Contact, setContact] = React.useState("");
    const [Gender, setGender] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date())

    // ==================modal==================
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        
    }, [array])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSr_no('')
        setName('');
        setEmail('');
        setContact('');
        setChecked([false, false, false, false, false]);
        setGender('');
        setSelectedDate('');
        setOpen(false);
    };
    const handleSubmit = (data) => {
        if (data.Sr_No) {
            // Editing existing data
            setArray((prevArray) => {
                const updatedArray = prevArray?.map((item) =>
                    item.Sr_No === data.Sr_No
                        ? {
                            ...item,
                            Name: data.Name,
                            Email: data.Email,
                            Contact: data.Contact,
                            Weekdays: data.checked,
                            Gender: data.Gender,
                            Date: data.selectedDate,
                        }
                        : item
                );
                return updatedArray;
            });
            setSr_no('')
            setName('');
            setEmail('');
            setContact('');
            setChecked([false, false, false, false, false]);
            setGender('');
            setSelectedDate('');
            setOpen(false);
        } else {
            const lastItem = array[array.length - 1];
            const lastSrNo = lastItem ? lastItem.Sr_No : 0;

            // Adding new data with a generated Sr_No
            setArray((prevArray) => [
                ...prevArray,
                {
                    Sr_No: lastSrNo + 1,
                    Name: data.Name,
                    Email: data.Email,
                    Contact: data.Contact,
                    Weekdays: data.checked,
                    Gender: data.Gender,
                    Date: data.selectedDate,
                },
            ]);
            setSr_no('')
            setName('');
            setEmail('');
            setContact('');
            setChecked([false, false, false, false, false]);
            setGender('');
            setSelectedDate('');
            setOpen(false);
        }

        setOpen(false);
    };

    //=====================CheckBox============== 
    const [checked, setChecked] = React.useState([false, false, false, false, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, checked[1], checked[2], checked[3], checked[4]]);
    };
    const handleChange2 = (event) => {
        setChecked([checked[0], event.target.checked, checked[2], checked[3], checked[4]]);
    };
    const handleChange3 = (event) => {
        setChecked([checked[0], checked[1], event.target.checked, checked[3], checked[4]]);
    };
    const handleChange4 = (event) => {
        setChecked([checked[0], checked[1], checked[2], event.target.checked, checked[4]]);
    };
    const handleChange5 = (event) => {
        setChecked([checked[0], checked[1], checked[2], checked[3], event.target.checked]);
    };
    // ============================================
    const getFormattedWeekdays = (weekdays) => {

        const daysOfWeek = ["M", "T", "W", "TH", "F"];

        return weekdays
            ? weekdays
                .map((isTrue, index) => (isTrue ? daysOfWeek[index] : null))
                .filter((day) => day !== null)
                .join(', ')
            : '';
    };

    // ============================================
    const updateData = (Sr_No, data) => {
        setOpen(true);
        setSr_no(data?.Sr_No)
        setName(data?.Name);
        setEmail(data?.Email);
        setContact(data?.Contact);
        setGender(data?.Gender);
        setSelectedDate(data?.Date);
        setChecked(data?.Weekdays);
    }
    // ===================================================
    const deletedData = (srNo) => {
        setArray((prevArray) => prevArray.filter((item) => item.Sr_No !== srNo));
    }
    // ===================================================
    const handleDateChange = (date) => {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        setSelectedDate(dateString);
    };

    return (
        <>
            <Button variant="contained" sx={{ my: 2, mx: 2 }} onClick={handleClickOpen}>
                Add-Data
            </Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Sr_No</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Weekday</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {array?.map((row) => (
                            <TableRow
                                key={row?.Sr_No}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row?.Sr_No}</TableCell>
                                <TableCell align="left">{row?.Name}</TableCell>
                                <TableCell align="left">{row?.Email}</TableCell>
                                <TableCell align="left">{row?.Contact}</TableCell>
                                <TableCell align="left">{row?.Gender}</TableCell>
                                <TableCell align="left">{getFormattedWeekdays(row?.Weekdays)}</TableCell>
                                <TableCell align="left">{row?.Date}</TableCell>
                                <TableCell align="left">
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Button variant='contained' sx={{ mx: 2 }} onClick={() => updateData(row?.Sr_No, row)}>Edit</Button>
                                        <Button variant='contained' sx={{ mx: 2 }} onClick={() => deletedData(row?.Sr_No)}>Delete</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {rows.length > 0 ? "Edit Data" : "Add Data"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h4'>{Sr_No}</Typography>
                        <TextField id="outlined-basic" sx={{ my: 3 }} label="Name" variant="outlined" value={(Name !== null && Name !== "" && Name !== undefined) ? Name : ""} onChange={(event) => setName(event.target.value)} />
                        <TextField id="outlined-basic" sx={{ mb: 3 }} label="Email" variant="outlined" value={(Email !== null && Email !== "" && Email !== undefined) ? Email : ""} onChange={(event) => setEmail(event.target.value)} />
                        <TextField id="outlined-basic" sx={{ mb: 3 }} label="Contact" variant="outlined" type='text' inputProps={{ maxLength: 10, pattern: '[0-9]*', inputMode: 'numeric' }} value={(Contact !== null && Contact !== "" && Contact !== undefined) ? Contact : ""} onChange={(event) => setContact(event.target.value)} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="D.O.B" onChange={handleDateChange} 
                                // value={selectedDate}
                                 />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <FormControlLabel
                                label="Monday"
                                control={<Checkbox checked={checked[0]} value={checked[0]} onChange={handleChange1} />}
                            />
                            <FormControlLabel
                                label="Tuesday"
                                control={<Checkbox checked={checked[1]} value={checked[1]} onChange={handleChange2} />}
                            />
                            <FormControlLabel
                                label="Wednesday"
                                control={<Checkbox checked={checked[2]} value={checked[2]} onChange={handleChange3} />}
                            />
                            <FormControlLabel
                                label="Thursday"
                                control={<Checkbox checked={checked[3]} value={checked[3]} onChange={handleChange4} />}
                            />
                            <FormControlLabel
                                label="Friday"
                                control={<Checkbox checked={checked[4]} value={checked[4]} onChange={handleChange5} />}
                            />
                        </Box>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={(Gender !== "" && Gender !== "" && Gender !== undefined) ? Gender : ""}
                                onChange={(event) => setGender(event.target.value)}
                            >
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={() => handleSubmit({ Sr_No, Name, Email, checked, Contact, Gender, selectedDate })} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}