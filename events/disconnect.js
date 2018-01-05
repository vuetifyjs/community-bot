module.exports = (client, error) => {
    console.log(`Error has been issued: ${error}`);
    client.destroy().then(client.login.bind(client));
};
