import { getXataClient } from '../../utility/xata'
import bcrypt from 'bcryptjs'
import {promisify} from 'util'

const xata = getXataClient()

const compare = promisify(bcrypt.compare)

const loginUser = async (req, res) => {
const user = await xata.db.users.filter("email" , req.body.email).getFirst();
    if(!user){
        return res.send('username does not exist')
    }
    const isPasswordMatch = await compare(req.body.password, user.password)

    if(!isPasswordMatch){
        return res.send({"message" : 'incorect username'})
    }
    else{
        return res.send({
            "message" : 'authorized',
            "user" : {
                "name" : user?.fullname,
                "user_id" : user?.id,
                "email" : user?.email
            }
        })
    }
    
}
export default loginUser

