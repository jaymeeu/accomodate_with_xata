import { getXataClient } from '../../utils/xata'

const xata = getXataClient()

const getHomes = async (req, res) => {
  const records = await xata.db.homes
    .sort("id", "desc")
    .select(["*", "host.email", "host.fullname"])
    .getAll();
    
    res.end(JSON.stringify(records));
}
export default getHomes