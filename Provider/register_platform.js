const Database = require('./Database.js');
const { keyGenerator } = require('./keyGenerator.js');

/*
* Register a new Platform for the Tool
* @params - all of the Platform/Tool fields shown below
* @returns Platform object, if Platform is already registered
*/
async function registerPlatform(
    consumerUrl, /* Base url of the LMS. */
    consumerName, /* Domain name of the LMS. */
    consumerToolClientID, /* Client ID created from the LMS. */
    consumerAuthorizationURL, /* URL that the LMS redirects to launch the tool. */
    consumerAccessTokenURL, /* URL that the LMS redirects to obtain an access token/login . */
    consumerRedirect_URI, /* URL that the LMS redirects to launch tool . */
    consumerAuthorizationconfig, /* Authentication method and key for verifying messages from the platform. {method: "RSA_KEY", key:"PUBLIC KEY..."} */
    ){
    if ( !consumerUrl || !consumerName || !consumerToolClientID || !consumerAuthorizationURL || !consumerAccessTokenURL || !consumerRedirect_URI || !consumerAuthorizationconfig ) {
        console.log('Error: registerPlatform function is missing argument.');
    };
    let existingPlatform;

    try {
        //checks database for existing platform.
        const registeringPlatform = await Database.Get({ 'consumerUrl': consumerUrl });
    
        if (typeof registeringPlatform === 'undefined' || registeringPlatform.length === 0) {
            const keyPairs = keyGenerator();
    
            // creates/inserts platform data into database.
            Database.Insert({ 
                'consumerUrl': consumerUrl,
                'consumerName': consumerName,
                'consumerToolClientID': consumerToolClientID,
                'consumerAuthorizationURL': consumerAuthorizationURL,
                'consumerAccessTokenURL': consumerAccessTokenURL,
                'consumerRedirect_URI': consumerRedirect_URI,
                'kid': keyPairs,
                'consumerAuthorizationconfig': consumerAuthorizationconfig,
            });
            return console.log(`Platform registered at: ${consumerUrl}`);
        } else {
            existingPlatform = registeringPlatform;
            return existingPlatform;
        };
    } catch(err) {
        console.log(`Error finding platform: ${err}`);
        return existingPlatform;
    }
}

module.exports = {registerPlatform};
