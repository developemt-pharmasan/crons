module.exports = (error) => {
    console.log(error)
    let mjs;
    if (error.response) {
        console.log('Error -> response: ', error.response.data);
        mjs = error.response.data.message
    } else if (error.request) {
        console.log('Error -> request: ', error.request);
        mjs =  error.request
    } else {
        console.log('Error -> message: ', error.message);
        mjs =  error.message
    }
    return {
        status: 500,
        message: mjs
    }
}