import { getXataClient } from '../../utils/xata'

const xata = getXataClient()

const addHome = async (req, res) => {
   const result =  await xata.db.homes.create({
    id: req.body.id,
    title: req.body.title,
    price: parseFloat(req.body.price),
    dateFrom: new Date(req.body.dateFrom),
    images_links: req.body.images_links,
    location: req.body.location,
    lat: 2.73829,
    lng: 6.829389,
    dateTill: new Date(req.body.dateTill),
    category: req.body.category,
    host : req.body.user_id,
    });
    res.send(result)
}
export default addHome