const express=require('express')
const cors=require('cors')
const port=5000
const connect_mongoose=require('./DBconfig/DBconfiguration')
const {initUsers}=require('./Models/user.model')

// initUsers()
connect_mongoose()
const app=express()

app.use(express.json())
app.use(cors())

app.use(`/auth`, require(`./Routes/auth.routes`))

app.listen(port, ()=>console.log(`Go on ${port}, Enjoy`))