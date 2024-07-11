import mongoose from 'mongoose'

const DB_CONNECTION = ()=>{
    //connect using try catch
    try {
        mongoose.connect(`${process.env.DB_CONNECTION_STRING}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to database')
    } catch (error) {
        console.log('Error connecting to database')
    }
}

export default DB_CONNECTION;