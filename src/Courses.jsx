import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Courses() {
    const [courses, setCourses] = useState([]);

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
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map(course => {
                return <Course key={course.id} course={course} />
            })}
        </div>
    );
}

export function Course(props) {
    return (
        <Card style={{
            backgroundColor: "white",
            margin: 10,
            padding:10,
            width: 300,
            minHeight: 100
        }}>
            <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle2">{props.course.description}</Typography>
            <img src={props.course.imageLink} style={{width:300}}></img>
        </Card>
    );
}

export default Courses;
