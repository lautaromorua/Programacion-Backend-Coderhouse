process.on('message', cantidad => {
    const objectResponse = {}

    for (let i = 0; i < cantidad; i++) {
        const random = Math.floor(Math.random() * 1000 + 1);

        if (objectResponse.hasOwnProperty(random)) {
            objectResponse[random]++;
        } else {
            objectResponse[random] = 1;
        }
    }


    process.send(objectResponse)
    process.exit()
})

process.send('Ready')