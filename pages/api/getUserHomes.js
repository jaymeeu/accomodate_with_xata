import { authorize } from '../../utils/authorize';
import { getXataClient } from '../../utils/xata'

const xata = getXataClient()

const getUserHomes = async (req, res) => {

  console.log(req.body.user_id,"user_id req req")
    // const records = await xata.db.homes.filter("category", "beach");

const records = await xata.db.users.filter("email" , "rasaqadewuyi@gmail.com");
    
    // const records = await xata.db.homes.read("rec_cdep3dpg1ij7ma5jvro0");
    return res.send(JSON.stringify(records));
  
}
export default getUserHomes