import React, { ReactElement, FC, useState, useEffect } from 'react'
import { getPersonByFamilyCard } from '../../api/people'

import Header from '../header'

import { Container, Box, Grid, TextField, Button, Typography } from '@mui/material'

import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import { styled } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

interface tableData{
    id: number,
    nameFirst: string,
    nameMiddle: string,
    nameLast: string,
    idCardNumber: string,
    gender: string,
    nameOfficial: string,
    birthPlace: string,
    birthDate: string,
    religion: string,
    education: string,
    occupation: string,
    bloodType: string,
    maritalStatus: string,
    maritalDate: string
    maritalPlace: string,
    familyStatus: string,
    nationality: string
}

const Home: FC<any> = (): ReactElement => {
    const [data, setData] = useState<tableData[]>([])
    const [detail, setDetail] = useState({
        nameFirst: '',
        nameMiddle: '',
        nameLast: '',
        idCardNumber: '',
        gender: '',
        nameOfficial: '',
        birthPlace: '',
        birthDate: '',
        religion: '',
        education: '',
        occupation: '',
        bloodType: '',
        maritalStatus: '',
        maritalDate: '',
        maritalPlace: '',
        familyStatus: '',
        nationality: ''
    })

    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    const submitHandler = async(e: any) => {
        e.preventDefault()

        if(searchTerm !== ''){
            if(!/[^0-9]/g.test(searchTerm)){
                if(!isSearch){
                    setIsSearch(true)
                }
                const data = await getPersonByFamilyCard(searchTerm)
    
                if(data.code === 200){
                    setData(data.results)
                    if(error !== '') setError('')
                }
            }else{
                setError('Harap hanya masukan angka')
            }
        }else{
            setError('Data kartu keluarga harus dimasukan')
        }
    }

    const showDetails = (id: number) => {
        const filteredData = data.filter((entry) => {
            return entry.id === id
        })

        setDetail(filteredData[0])
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <>
            <Header />

            <Container sx={{ mt: 2 }}>
                <Box component="form"
                    sx={{ '& .MuiTextField-root': { mt: 2, width: 1 } }}
                    noValidate
                    autoComplete="off"
                    onSubmit={submitHandler}
                >
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item xs={12} lg={10}>
                            <TextField
                                fullWidth
                                label="Cari bedasarkan kartu keluarga"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={2}>
                            <Button type="submit" variant="contained" sx={{ width: '100%', mt: 2, py: 2, fontSize: 16 }}> Cari </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ color: 'red' }}>{error}</Typography>
                        </Grid>
                    </Grid>
                </Box>

                {
                    isSearch ?
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell> Nama Lengkaps </StyledTableCell>
                                    <StyledTableCell> Tanggal Lahir </StyledTableCell>
                                    <StyledTableCell> Agama </StyledTableCell>
                                    <StyledTableCell> NIK </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data.length ? (
                                        data.map((entry, i) => (
                                            <StyledTableRow key={i}>
                                                <StyledTableCell><Button onClick={() => showDetails(entry.id)}>{entry.nameOfficial}</Button></StyledTableCell>
                                                <StyledTableCell>{entry.birthDate}</StyledTableCell>
                                                <StyledTableCell>{entry.religion}</StyledTableCell>
                                                <StyledTableCell>{entry.idCardNumber}</StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                    ) : (
                                        <StyledTableRow>
                                            <StyledTableCell colSpan={4}> Maaf, data tidak ditemukan </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    : null
                }
                
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" style={{ zIndex: 7 }}>
                    <DialogTitle>{detail.nameOfficial}</DialogTitle>
                    <DialogContent>
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Nama Depan</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.nameFirst}</Typography>
                            </Grid>
                            
                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Nama Tengah</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.nameMiddle}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Nama Belakang</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.nameLast}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>NIK</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.idCardNumber}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Jenis Kelamin</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.gender}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Tempat Tanggal Lahir</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.birthPlace}, {detail.birthDate}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Agama</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.religion}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Pendidikan</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.education}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Pekerjaan</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.occupation}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Golongan darah</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.bloodType}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Status Perkawinan</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.maritalStatus}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Tanggal Perkawinan</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.maritalDate}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Status Hubungan Dalam Keluarga</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.familyStatus}</Typography>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant="subtitle2" gutterBottom>Kewarganegaraan</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="body2" gutterBottom>{detail.nationality}</Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>Tutup</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>        
    )
}

export default Home