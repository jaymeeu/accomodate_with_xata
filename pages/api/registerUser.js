import { getXataClient } from '../../utils/xata'
import { Base64 } from 'js-base64';
import bcrypt from 'bcryptjs'
import {promisify} from 'util'

const xata = getXataClient()
const hash = promisify(bcrypt.hash)

const registerUser = async (req, res) => {
const user = await xata.db.users.filter("email" , req.body.email).getFirst();
if(user){
    res.send({"message" : 'user already exist'})
}
else{
    const hashedPassword = await hash(req.body.password, 10);
    await xata.db.users.create({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
    }).then((data) => {
        res.send(JSON.stringify(data));
    }).catch((err) => {
        res.send(JSON.stringify(err));
    })
}
    
}
export default registerUser