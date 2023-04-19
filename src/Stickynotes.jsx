import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Typography, Button, Grid, Box, TextField, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Stickynote() {
  const [items, setitems] = useState(() => {
    return JSON.parse(localStorage.getItem("items")) || [];
  });
  const [Editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingText2, setEditingText2] = useState("");
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const json = JSON.stringify(items);
    localStorage.setItem("items", json);
  }, [items]);

  function deleteItem(id) {
    let updatedItems = [...items].filter((item) => item.id !== id);
    setitems(updatedItems);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: new Date().getTime(),
      text: title,
      desc: desc,
    };
    setitems([...items].concat(newItem));
    setTitle("");
    setDesc("");
    handleClose();
  }

  function submitEdits(id) {
    const updated = [...items].map((item) => {
      if (item.id === id) {
        item.text = editingText;
        item.desc = editingText2;
      }
      return item;
    });
    setitems(updated);
    setEditing(null);
  }

  return (
    <>
      <Typography align="center">
        <Typography variant="h6" sx={{ mb: "30px" }} align="center">
          {" "}
          Sticky Notes{" "}
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add Note
        </Button>
      </Typography>

      <Grid
        container
        spacing={4}
        justify="center"
        style={{ marginTop: "80px" }}
      >
        {items.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Draggable>
                <Box
                  sx={{
                    height: "auto",
                    width: "250px",
                    bgcolor: "purple",
                    ml: "20px",
                  }}
                  key={index}
                >
                  <Box
                    sx={{ height: "50px", width: "250px", bgcolor: "yellow" }}
                  >
                    {" "}
                    <Typography
                      align="center"
                      variant="h6"
                      sx={{ fontWeight: "bold" }}
                    >
                      {item.text}{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ height: "200", width: "250px" }}>
                    <Typography
                      align="center"
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "white" }}
                    >
                      {item.desc}{" "}
                    </Typography>
                  </Box>
                  <Typography sx={{ marginTop: "130px", ml: "3px" }}>
                    {" "}
                    <Button
                      variant="contained"
                      sx={{
                        height: "30",
                        width: "40px",
                        fontSize: "10px",
                        backgroundColor: "black",
                      }}
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    <br />
                    <br />
                  </Typography>

                  {item.id === Editing ? (
                    <Button
                      sx={{
                        width: "26px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                      variant="contained"
                      onClick={() => submitEdits(item.id)}
                    >
                      Submit Edits
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        width: "20px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                      variant="contained"
                      onClick={() => setEditing(item.id)}
                    >
                      {" "}
                      Edit
                    </Button>
                  )}
                  <br />
                  <br />
                  {item.id === Editing ? (
                    <center>
                      {" "}
                      <>
                        <Box>
                          {" "}
                          <input
                            type="text"
                            placeholder="Edit Title"
                            onChange={(e) => setEditingText(e.target.value)}
                          />
                          <Box>
                            <input
                              type="text"
                              placeholder="Edit Description"
                              style={{ marginBottom: "10px" }}
                              onChange={(e) => setEditingText2(e.target.value)}
                            />
                          </Box>
                        </Box>
                      </>
                    </center>
                  ) : (
                    ""
                  )}
                </Box>
              </Draggable>
            </Grid>
          );
        })}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <center>
            <TextField
              id="outlined-basic"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Discription"
              onChange={(e) => setDesc(e.target.value)}
              variant="outlined"
            />
            <br />
            <br />
            <Button
              onClick={handleSubmit}
              sx={{
                height: "30",
                width: "100px",
                marginTop: "20px",
                float: "center",
              }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </center>
        </Box>
      </Modal>
    </>
  );
}

export default Stickynote;
