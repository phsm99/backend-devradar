const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },



    async store(request, response) {
        console.log(request.body);
        const { github_username, techs, longitude, latitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name = login, avatar_url, bio } = apiResponse.data;
            if (!name) {
                name = apiResponse.data.login;
            }
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

        }
        return response.json(dev);
    }
};