import { makeAutoObservable } from "mobx";

// @ts-check

export interface INote
{
    id: number,
    title: string,
    text: string,
    date: Date,
    color: string
};


class notesStore
{
    
    notesList: INote[] = [];

    constructor()
    {
        makeAutoObservable(this);
    }

    addNote(newNote: INote)
    {
        this.notesList = [...this.notesList, newNote]
    }

    getAllNotes()
    {
        return [...this.notesList].reverse()
    }

    removeNote(id: number)
    {
        this.notesList = this.notesList.filter(note => note.id != id);
    }

    autoincrement()
    {
        if (this.notesList.length == 0)
        {
            return 1
        }
        else
        {
            console.log(this.notesList[this.notesList.length - 1].id);
            return this.notesList[this.notesList.length - 1].id + 1
        }
    }

    updateText(id: number, text: string)
    {
        const needNote = this.notesList.filter(note => note.id == id)[0];

        needNote.text = text;
    }

    updateTitle(id: number, title: string)
    {
        const needNote = this.notesList.filter(note => note.id == id)[0];

        needNote.title = title;
    }
}

const notes = new notesStore()

export default notes;
