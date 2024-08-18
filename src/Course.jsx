import { Card, Typography, TextField, Button } from "@mui/material";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

function Course() {
    let { courseId } = useParams();
    const setCourses = useSetRecoilState(coursesState);

    useEffect(() => {
        function callBack2(data) {
            setCourses(data.courses);
        }
        function callBack1(res) {
            res.json().then(callBack2);
        }
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(callBack1);
    }, []);


    return (
        <div>
            <CourseCard courseId={courseId}/>
            <UpdateCard courseId={courseId}/>
        </div>
    );
}

function UpdateCard(props) {
    const [title, setTitle] = useState(props.course.title);
    const [description, setDescription] = useState(props.course.description);
    const [image, setImage] = useState(props.course.imageLink);
    const course = props.course;
    const [courses, setCourses] = useSetRecoilState(coursesState);

    return (
        <div style={{ padding: 80, marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <Typography>Update course details</Typography>
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
                        value={image}
                    />
                    <br /><br />
                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => {
                            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                                method: "PUT",
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
                                    console.log("Course updated successfully:", data);
                                    // alert('Course updated successfully');
                                    let updatedCourses = [];
                                    for(let i=0; i<courses.length; i++){
                                        if(courses[i].id == props.courseId){
                                            updatedCourses.push({
                                                id: props.courseId,
                                                title: title,
                                                description: description,
                                                imageLink: image
                                            })
                                        }else{
                                            updatedCourses.push(props.courses[i]);
                                        }
                                    }
                                    setCourses(updatedCourses);
                                })
                                .catch(error => console.error('Error:', error));
                        }}
                    >
                        Update course
                    </Button>
                </Card>
            </div>
        </div>
    );
}

function CourseCard(props) {
    const courses = useRecoilState(coursesState);
    let course = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id == props.courseId) {
            course = courses[i];
        }
    }
    if (!course) {
        return <div>Loading....</div>;
    }
    return (<div style={{display:"flex", justifyContent:"center"}}>
        <Card style={{
            backgroundColor: "white",
            margin: 10,
            padding: 10,
            width: 300,
            minHeight: 100
        }}>
            <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle2">{course.description}</Typography>
            <img src={course.imageLink} alt={course.title} style={{ width: 300 }} />
        </Card>
        </div>
    );
}

export default Course;

const coursesState = atom({
    key: 'coursesState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });