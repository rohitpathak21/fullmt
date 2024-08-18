import prisma from "../libs/prisma.js"

export const updateUser = async (req, res) => {

    console.log("update");
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    console.log(`Received ID from URL: ${id}`);
    console.log(`User ID from token: ${tokenUserId}`);

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }
 
    try {
        const updatedUser = await prisma.user.update({
            where: {id},
            data:body,
        });
        
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update user" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }

    try {
        await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};