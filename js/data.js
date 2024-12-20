
let game_data_all;

// fetch the JSON data and store it
fetch("your url")
    .then((response) => {
        if (!response.ok) {
            throw new Error("response not ok")
        }
        return response.json();
    })
    .then((data) => {
        // deep copy the result
        game_data_all = JSON.parse(JSON.stringify(data));

        // add levels after getting the result
        addAllLevels();
    })
    .catch((error) => {
        console.error("There was a problem with fetch operation: ", error);
    })