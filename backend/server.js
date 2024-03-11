const app = require('./app')
const connectDatabase = require('./config/database')
const dotEnv = require('dotenv')

dotEnv.config({path :"backend/config/config.env" })

connectDatabase()


app.listen(process.env.PORT , ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})

