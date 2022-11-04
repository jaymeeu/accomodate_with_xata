import { getXataClient } from '../../utils/xata'

const xata = getXataClient()

const getUserHomes = async (req, res) => {

  const records =  await xata.db.homes
  .filter("host.id", req.body.user_id)
  .sort("id", "desc")
  .select(["*", "host.*"])
  .getPaginated({
    pagination: {
      size: 15,
    },
  });
  return res.send(JSON.stringify(records));
  
}
export default getUserHomes