import prisma from "../libs/prisma.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;
  
    console.log("Updating user profile...");
    console.log(`Received ID from URL: ${id}`);
    console.log(`User ID from token: ${tokenUserId}`);
  
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }
  
    try {
        // Check if the user exists first
        const existingUser = await prisma.teacher.findUnique({
            where: { id },
        });
  
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
  
        // Update teacher profile
        const updatedUser = await prisma.teacher.update({
            where: { id },
            data: body,
        });
  
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating user profile:", err);
        res.status(500).json({ message: "Failed to update user" });
    }
};

export const updateAddress = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    console.log("Updating address...");
    console.log(`Received ID from URL: ${id}`);
    console.log(`User ID from token: ${tokenUserId}`);

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }

    try {
        // Check if the teacher exists first
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
        });

        if (!existingTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Update teacher address
        const updatedTeacher = await prisma.teacher.update({
            where: { id },
            data: {
                ...body,
                street: body.street,
                area: body.area,
                city: body.city,
                pin: body.pin,
            },
        });

        res.status(200).json(updatedTeacher);
    } catch (err) {
        console.error("Error updating address:", err);
        res.status(500).json({ message: "Failed to update address" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }

    try {
        await prisma.teacher.delete({
            where: { id },
        });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};

export const updateTeachingLocation = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    console.log("Updating teaching location...");
    console.log(`Received ID from URL: ${id}`);
    console.log(`User ID from token: ${tokenUserId}`);

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }

    try {
        // Check if the teacher exists first
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
        });

        if (!existingTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Update teacher teaching location
        const updatedTeacher = await prisma.teacher.update({
            where: { id },
            data: {
                preferredarea: body.area,
                preferredcity: body.city,
            },
        });

        res.status(200).json(updatedTeacher);
    } catch (err) {
        console.error("Error updating teaching location:", err);
        res.status(500).json({ message: "Failed to update teaching location" });
    }
};

export const updateTeachingInfo = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    console.log("Updating teaching details...");
    console.log(`Received ID from URL: ${id}`);
    console.log(`User ID from token: ${tokenUserId}`);

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }

    try {
        // Check if the teacher exists first
        const existingTeacher = await prisma.teacher.findUnique({
            where: { id },
        });

        if (!existingTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Update teaching details
        const updatedTeacher = await prisma.teacher.update({
            where: { id },
            data: {
                ...body,
                qualification: body.qualification,
                subject: body.subject,
            },
        });

        res.status(200).json(updatedTeacher);
    } catch (err) {
        console.error("Error updating teaching details:", err);
        res.status(500).json({ message: "Failed to update teaching details" });
    }
};

export const getTeachersForStudents = async (req, res) => {
    try {
        // Fetch all teachers from the database
        const teachers = await prisma.teacher.findMany({
            select: {
                fullname: true,
                age: true,
                gender: true,
                qualification: true,
                subject: true,
                area: true,
                city: true
            }
        });

        res.status(200).json(teachers);
    } catch (err) {
        console.error("Error fetching teachers:", err);
        res.status(500).json({ message: "Failed to fetch teachers" });
    }
};

export const getUsersForTeachers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await prisma.user.findMany({
            select: {
                fullname: true,
                age: true,
                gender: true,
                class: true,
                school: true,
                subject: true,
                preference: true,
                area: true,
                city: true
            }
        });

        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};