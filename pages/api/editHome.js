import { getXataClient } from '../../utils/xata'

const xata = getXataClient()

const editHome = async (req, res) => {
    const result = await xata.db.homes.update(req.body.id, {
        title: req.body.title,
        price: parseFloat(req.body.price),
        dateFrom: new Date(req.body.dateFrom),
        images_links: req.body.images_links,
        location: req.body.location,
        lat: 2.5,
        dateTill: new Date(req.body.dateTill),
        lng: 6.5,
        category: req.body.category,
        host: req.body.user_id,
      });
    res.send(result)
}
export default editHome