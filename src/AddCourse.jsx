import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    return (
        <div style={{
            padding: 80,
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth={true}
                        label="Title"
                        variant="outlined"
                        value={title}
                    />
                    <br /><br />
                    <TextField
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                        value={description}
                    />
                    <br /><br />
                    <TextField
                        onChange={(e) => setImage(e.target.value)}
                        fullWidth={true}
                        label="Image Link"
                        variant="outlined"
                    />
                    <br /><br />
                    <Button 
                        size="large" 
                        variant="contained" 
                        onClick={() => {
                            fetch("http://localhost:3000/admin/courses", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                },
                                body: JSON.stringify({
                                    title: title,
                                    description: description,
                                    imageLink: image,
                                    publish: true
                                })
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log("Course added successfully:", data);
                                alert('course added')
                            })
                            .catch(error => console.error('Error:', error));
                        }}
                    >
                        Add course
                    </Button>
                </Card>
            </div>
        </div>
    );
}

export default AddCourse;
