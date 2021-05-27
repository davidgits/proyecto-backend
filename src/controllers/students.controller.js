import Student from "../models/Student";

// funciones de alumnos
export const createStudent = async (req, res) => {
    // console.log(req.body);
    const { name, surname, dni, email, phone, activity, address, imageURL } = req.body;
    const newStudent = new Student({ name, surname, dni, email, phone, activity, address, imageURL });
    const studentSaved = await newStudent.save();
    res.status(201).json(studentSaved);
    console.log("new student saved", newStudent._id);
};

export const getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

export const getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.studentId);
    res.status(200).json(student);
};

export const updateStudentById = async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.studentId, req.body, {
        new: true,
    });
    res.status(200).json(updatedStudent);
};

export const deleteStudentById = async (req, res) => {
    const { studentId } = req.params;
    await Student.findByIdAndDelete(studentId);
    res.status(204).json("student deleted successfully", studentId);
};
