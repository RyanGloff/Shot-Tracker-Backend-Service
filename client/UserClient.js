const axios = require('axios');
const userServiceUrl = process.env.USER_SERVICE_URL;

async function whoAmI (token) {
    const url = userServiceUrl + '/user/whoami';
    const result = await axios.get(url, {
        headers: {
            'auth-token': token
        }
    });
    return result.data;
}

module.exports.whoAmI = whoAmI;