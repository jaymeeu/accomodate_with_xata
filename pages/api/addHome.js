import { getXataClient } from '../../utility/xata'

const xata = getXataClient()

const registerUser = async (req, res) => {
   const result =  await xata.db.homes.create({
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
export default registerUser