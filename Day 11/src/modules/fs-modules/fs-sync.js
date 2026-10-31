import fs from "node:fs";
import { json } from "node:stream/consumers";

// Students array
const students = [
    {
        id: 1,
        name: "Farhan",
        age: 20,
        course: "MERN Stack",
        city: "Bhopal"
    },
    {
        id: 2,
        name: "Rahul",
        age: 22,
        course: "Full Stack Development",
        city: "Indore"
    },
    {
        id: 3,
        name: "Aman",
        age: 21,
        course: "Backend Development",
        city: "Delhi"
    },
    {
        id: 4,
        name: "Sara",
        age: 23,
        course: "Data Science",
        city: "Mumbai"
    },
    {
        id: 5,
        name: "Ali",
        age: 19,
        course: "Frontend Development",
        city: "Bhopal"
    }
];

// Convert array into JSON string and write to file

fs.writeFileSync("student.json", JSON.stringify(students, null, 4))

let student_data = JSON.parse(fs.readFileSync("student.json", "utf-8"))

student_data = student_data.filter((keep) => {
    if (keep.id !== 3) {
        return keep
    }
})

student_data.push({
    id: 6,
    name: "Sibtain Raza",
    age: 19,
    course: "AIML Engineer",
    city: "Noida"
})

console.log(student_data)

const find_student = student_data.find((std) => {
    if (std.id === 2) {
        std.name = "Rahul Sharma"
    }
    if (std.id === 4) {
        std.course = "MERN Stack"
    }
})



fs.writeFileSync("student.json", JSON.stringify(student_data, find_student, 4))

fs.copyFileSync("student_backup_data.json" , "student.json")

fs.unlinkSync("student.json")