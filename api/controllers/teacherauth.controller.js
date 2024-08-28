import bcrypt from "bcrypt";
import prisma from "../libs/prisma.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { fullname, email, age, gender, phone, qualification, subject, role, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email is already in use
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email }
    });

    if (existingTeacher) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create new teacher
    const newTeacher = await prisma.teacher.create({
      data: {
        fullname,
        email,
        age,
        gender,
        phone,
        qualification,
        subject,
        role: "Teacher", // Default role to "teacher"
        password: hashedPassword,
        isVerified: false, // Default value for isVerified
      },
    });

    res.status(201).json({ message: "Teacher created successfully", teacher: newTeacher });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create teacher" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { email }
    });

    if (!teacher)
      return res.status(401).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, teacher.password);

    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    const age = 1000 * 60 * 60; // Set token expiration time

    const { password: teacherPassword, ...teacherInfo } = teacher;

    const token = jwt.sign({
      id: teacher.id
    }, process.env.JWT_SECRET_KEY, { expiresIn: age });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: age,
      sameSite: 'None',
      secure: true,
    }).status(200).json(teacherInfo);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
