import { useEffect, useState } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import notes, { INote } from './stores/notesStore';
import styled from 'styled-components';
import cnopka from "./assets/CanCnopka.png";


const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

const Title = styled.h1`
  margin: 1em;
  font-size: 3em;
  font-weight: 700;
`

const NotesContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Notes = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 18.75em);
  gap: 1em;
  justify-content: center;
`

const NoteContainer = styled.div`
  background-color: ${props => props.bcolor};
  width: 18.75em;
  height: 18.75em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  position: relative;
`

const RemoveNoteButton = styled.button`
  border: none;
  padding: 0;
  box-sizing: border-box;
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
  background-color: ${props => props.bcolor};
`

const RemoveImage = styled.img`
  width: 60px;
  height: 45px;
  background-size: cover;
`

const NoteTextContainer = styled.div`
  box-sizing: border-box;
  padding: 1.25em;
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  align-items: start;
  width: 100%;
`


const NoteT = styled.p`
  margin: 0;
  padding: 0;
`

const NoteTime = styled(NoteT)`
  font-size: 1em;
  font-weight: 500;
`

const NoteText = styled(NoteT)`
  font-size: 1em;
  width: 100%;
  height: auto;
`

const NoteTitle = styled(NoteT)`
  font-size: 1.75em;
`

const NoteInput = styled.input`
  background-color: ${props => props.bcolor};
  border: none;
  width: 100%;
`

const NoteInputAddingText = styled.textarea`
  background-color: ${props => props.bcolor};
  resize: none;
  width: 100%;
  height: 8em;
  border: none;
`

const NoteInputText = styled.textarea`
  background-color: ${props => props.bcolor};
  resize: none;
  width: 100%;
  height: 12em;
  border: none;
`

const AddNoteButton = styled.button`
  box-sizing: border-box;
  padding: 0.625em;
  background-color: #FFFFFF;
  border: none;
  border-radius: 0.625em;
  cursor: pointer;
  margin: 0 0 1.25em 1.25em;
`


const colors = ["rgb(165, 248, 159)", "rgb(248, 159, 160)", "rgb(162, 159, 248)", "rgb(248, 204, 192)", "rgb(248, 245, 159)", "rgb(248, 159, 233)"]

function GetRandomColor()
{
  return colors[Math.floor(Math.random() * colors.length)];
}


const App = observer(() => {

  const [title, setTitle] = useState("");
  const [text, setText] = useState("")
  const [randomColor, setRandomColor] = useState(GetRandomColor())
  const [dateNow, setDateNow] = useState(new Date())

  function CreateNote()
  {
    if (title.trim() !== "")
    {
      const newNote: INote = {
        id: notes.autoincrement(),
        title: title,
        text: text,
        date: new Date(),
        color: randomColor
      };

      notes.addNote(newNote);

      setRandomColor(GetRandomColor())
    }
    console.log(title)
  }

  function GetFormatDate(date: Date)
  {
    return `${date.getHours()}:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()} ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
  }

  useEffect(() => {

    setDateNow(new Date());

    const intervalId = setInterval(() => {
      setDateNow(new Date());
    }, 60000);
  
    return () => clearInterval(intervalId);

  }, [CreateNote]);


  return(
    <Content>
    <Title>Приветствую в приложении для заметок!</Title>
    <NotesContent>
      <Notes>
        <NoteContainer bcolor={randomColor}>
          <NoteTextContainer>
            <NoteTime>{GetFormatDate(dateNow)}</NoteTime>
            <NoteInput value={title} onChange={(e) => setTitle(e.target.value)} bcolor={randomColor} style={{fontSize: "1.75em"}} placeholder='Введите заголовок'/>
            <NoteInputAddingText value={text} onChange={(e) => setText(e.target.value)} bcolor={randomColor} style={{fontSize: "1em"}} placeholder='Введите текст'/>
          </NoteTextContainer>
          <AddNoteButton onClick={() => CreateNote()}>Добавить новую заметку</AddNoteButton>
        </NoteContainer>
        {
          notes.getAllNotes().map((el) => (
            <NoteContainer id={el.id} bcolor={el.color}>
              <NoteTextContainer>
                <NoteTime>{GetFormatDate(el.date)}</NoteTime>
                <NoteInput value={el.title} bcolor={el.color} onChange={(e) => notes.updateTitle(el.id, e.target.value)} style={{fontSize: "1.75em"}}/>
                <NoteInputText value={el.text} bcolor={el.color} onChange={(e) => notes.updateText(el.id, e.target.value)} style={{fontSize: "1em"}}></NoteInputText>
              </NoteTextContainer>
              <RemoveNoteButton onClick={() => notes.removeNote(el.id)} bcolor={el.color}>
                <RemoveImage src={cnopka} alt="" />
              </RemoveNoteButton>
            </NoteContainer>
          ))
        }
      </Notes>
    </NotesContent>
    </Content>
  )
});

export default App
