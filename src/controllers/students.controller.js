import Student from "../models/Student";

// funciones de alumnos
export const createStudent = async (req, res) => {
    // console.log(req.body);
    const { name, surname, dni, email, phone, birthdate, activity, address, enrolldate, imageURL } = req.body;
    const newStudent = new Student({ name, surname, dni, email, phone, birthdate, activity, address, enrolldate, imageURL });
    await newStudent.save();
    res.status(201).json({message: "Alumno creado"});
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

// buscar por nombre
export const getStudentByName = async (req, res) => {
    const name = req.params.studentName;
    const student = await Student.find({ name: { $regex: "(?i).*" + name + "(?i).*" } });
    student
        ? res.status(200).json(student)
        : res.status(400).json({
              message: "No hay coincidencias",
          });
};

export const updateStudentById = async (req, res) => {
    await Student.findByIdAndUpdate(req.params.studentId, req.body, {
        new: true,
    });
    res.status(200).json({message: "Alumno actualizado"});
};

export const deleteStudentById = async (req, res) => {
    const { studentId } = req.params;
    await Student.findByIdAndDelete(studentId);
    res.status(200).json({message: "Alumno eliminado"});
    console.log("student deleted", studentId);
};
