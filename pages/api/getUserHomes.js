import { authorize } from '../../utils/authorize';
import { getXataClient } from '../../utils/xata'

const xata = getXataClient()

const getUserHomes = async (req, res) => {

  // console.log(req.body.user_id,"user_id req req")

  const records =  await xata.db.homes
  .filter("host.id", req.body.user_id)
  .select(["*", "host.*"])
  .getPaginated({
    pagination: {
      size: 15,
    },
  });
  return res.send(JSON.stringify(records));
  
}
export default getUserHomes