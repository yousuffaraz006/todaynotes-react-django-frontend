import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  const handleNoteDeletion = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted!");
        else alert("Failed to Delete Note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };
  const handleNoteCreation = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created!");
        else alert("Failed to Create Note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={handleNoteDeletion} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={handleNoteCreation}>
        <label htmlFor="title">Title :</label>
        <br />
        <input
          required
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content :</label>
        <br />
        <textarea
          required
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
