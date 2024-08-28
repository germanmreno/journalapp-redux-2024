import { useMemo, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

import { UploadOutlined, SaveOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"

import { ImageGallery } from "../components"

import { useForm } from "../../hooks/useForm"
import { useDispatch } from "react-redux"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { DeleteOutline } from "@mui/icons-material"

export const NoteView = () => {

    const dispatch = useDispatch()

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, date, onInputChange, formState } = useForm(note)

    const options = {
        year: 'numeric', month: 'long', day: 'numeric'
    }

    const dateString = useMemo(() => new Date(date).toLocaleDateString('es', options), [date])

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
    }

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}>
            <Grid item>
                <Typography
                    fontSize={39}
                    fontWeight="light"
                >
                    {dateString}
                </Typography>
            </Grid>

            <input
                type="file"
                multiple
                onChange={onFileInputChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />

            <IconButton
                color="primary"
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
            >
                <UploadOutlined />
            </IconButton>

            <Grid item>
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    fullWidth
                    label="Título"
                    name="title"
                    onChange={onInputChange}
                    placeholder="Ingrese un título"
                    sx={{ border: 'none', mb: 1 }}
                    type="text"
                    value={title}
                    variant="filled"
                />
                <TextField
                    fullWidth
                    minRows={5}
                    multiline
                    name="body"
                    onChange={onInputChange}
                    placeholder="¿Qué sucedió en el día de hoy?"
                    type="text"
                    value={body}
                    variant="filled"
                />
            </Grid>

            <Grid
                container
                justifyContent='end'>

                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls} />
        </Grid>
    )
}
