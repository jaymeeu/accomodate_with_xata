import { getXataClient } from '../../utils/xata'

const xata = getXataClient()

const deleteHome = async (req, res) => {
   const result  = await xata.db.homes.delete(req.body.id);
    res.send(result)
}
export default deleteHome