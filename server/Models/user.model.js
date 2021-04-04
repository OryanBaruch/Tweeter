const {Schema, model}=require('mongoose')


const userSchema=new Schema({
    username:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    birthdate:{type:Date,require:true},
    phonenumber:{type:String},
    password:{type:String , require:true} ,
    profile_photo:{type:String, require:true},
    role:{type:Number , default:0}
},{versionKey:false})

const user_model=model(`user`, userSchema)

const initUsers=async()=>{
    const user1=new user_model({
        username:`Oryan Baruch`,
        email:`Oryanb321@gmail.com`,
        birthdate:`1996-03-21`,
        phonenumber:`050-4081-329`,
        password:`123`
    })
    await user1.save()
    
    const user2=new user_model({
        username:`Yossi leibman`,
        email:`AvhramsGod@gmail.com`,
        birthdate:`1995-03-10`,
        phonenumber:`050-2222-222`,
        password:`123`
    })
    await user2.save()

    const user3=new user_model({
        username:`Yam Gross`,
        email:`Yammos@gmail.com`,
        birthdate:`1998-01-05`,
        phonenumber:`050-1111-111`,
        password:`12345`
    })
    await user3.save()
}

module.exports={user_model, initUsers}