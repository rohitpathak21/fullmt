import bcrypt from "bcrypt"
import prisma from "../libs/prisma.js"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
  const { fullname, email, age, gender, phone, street, area, city, pin, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        age,
        gender, 
        phone,
        street,
        area,
        city,
        pin,
        password: hashedPassword,
        isVerified: false, // Default to false if not provided
      },
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err); // More detailed logging
    res.status(500).json({ message: "Failed to create user" });
  }
};




export const login = async (req, res) => {
  const {email, password} = req.body;
  try{

    const user = await prisma.user.findUnique (
      {
        where:{email}
      })

    if(!user)
      return res.status(401).json({message:"Invalid credentials"});

    const isvalidPassword = await bcrypt.compare(password, user.password)

    if(!isvalidPassword)
      return res.status(401).json({message:"Invalid credentials"});

    
    const age = 1000 * 60 * 60 ;

    const token = jwt.sign({
      id:user.id
    },process.env.JWT_SECRET_KEY,{expiresIn:age}
  )

    

    res.cookie("token", token , {
      httpOnly: true,
      maxAge: age,
    }).status(200).json({message:"Login successful"})

  }
  catch(err){
    console.log(err)
    res.status(501).json({message:"Failed to login"})
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message:"Logout successful"})
};