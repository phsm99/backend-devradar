const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray');
module.exports = {
    async index(request, response) {
        const { techs, longitude, latitude } = request.query;
        console.log(techs);

        const techsArray = parseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
}