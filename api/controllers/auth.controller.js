import bcrypt from "bcrypt"
import prisma from "../libs/prisma.js"
import jwt from "jsonwebtoken"

export const register =  async (req, res) => {
  const { fullname, email, age, gender, phone, address, password } = req.body;
  try
  {
  const hashedPassword = await bcrypt.hash(password,10);

  // console.log(req.body)
  
  // const newUser = await prisma.user.create({
  //   data: {
  //     fullname: req.body.fullname,
  //     email: req.body.email,
  //     age: req.body.age,
  //     gender: req.body.gender,
  //     phone: req.body.phone,
  //     password: hashedPassword,
  //     address: {
  //       create: {
  //         street: req.body.address?.street,
  //         city: req.body.address?.city,
  //         state: req.body.address?.state,
  //         zipCode: req.body.address?.zipCode
  //       }
  //     }
  //   }
  // });
  
  // console.log(newUser);
  // res.status(201).json({message:"user created successfully"}); 

  const newUser = await prisma.user.create({
    data: {
      fullname: req.body.fullname,
      email: req.body.email,
      age: req.body.age,
      gender: req.body.gender,
      phone: req.body.phone,
      password: hashedPassword,
      address: {
        create: {
          street: req.body.address?.street,
          city: req.body.address?.city,
          state: req.body.address?.state,
          zipCode: req.body.address?.zipCode
        }
      }
    },
    include:{
      address: true
    }
  });
  res.status(201).json({message:"user created successfully"}); 
}

  catch(err){
    console.log(err)
    res.status(501).json({message:"Failed to create user"});
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
    }).status(200).json({message:"login successful"})

  }
  catch(err){
    console.log(err)
    res.status(501).json({message:"Failed to login"})
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message:"Logout successful"})
};
