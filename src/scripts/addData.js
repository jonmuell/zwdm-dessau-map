const axios = require("axios");

$("#buttonSubmit").click(function () {
    const id = $("#inputId").val();
    const title = $("#inputTitle").val();
    const description = $("#inputDescription").val();
    const lat = $("#inputPositionLat").val();
    const lon = $("#inputPositionLon").val();
    const icon = $("#inputIcon").val();
    const address = $("#inputAddress").val();
    const fbPageName = $("#inputFb").val();

    const pageData = {
        id,
        title,
        description,
        position: {
            lat,
            lon
        },
        icon,
        address,
        fbPageName
    }

    axios.post("/data/add", pageData)
    .then(res => {
        console.log(res.data);
    })
    .catch((err) => {
        console.error(err);
    })
});
