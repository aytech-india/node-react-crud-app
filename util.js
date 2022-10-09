const parseRequestData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let data = '';
            req.on('data', (chunck) => {
                data += chunck;
            });

            req.on('end', () => {
                resolve(JSON.parse(data));
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = parseRequestData;

