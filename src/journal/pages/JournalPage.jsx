/* eslint-disable no-extra-boolean-cast */
import { IconButton } from "@mui/material"

import { JournalLayout } from "../layout/JournalLayout"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { NoteView } from "../views/NoteView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { startNewNote } from "../../store/journal"
import { useSelector } from "react-redux"


export const JournalPage = () => {

    const dispatch = useDispatch()
    const { isSaving, active } = useSelector(state => state.journal)

    const onClickNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <JournalLayout>

            {
                !!active
                    ? <NoteView />
                    : <NothingSelectedView />
            }


            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >

                <AddOutlined />
            </IconButton>

        </JournalLayout>
    )
}
