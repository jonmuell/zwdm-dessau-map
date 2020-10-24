import axios from "axios";

export default {
    name: "add-data-view",
    data: () => {
        return {
            entry: {
                id: "",
                title: "",
                description: "",
                position: {
                    lat: "",
                    lon: "",
                },
                icon: "",
                address: "",
                fbPageName: ""
            }
        }
    },
    methods: {
        submit: function () {
            axios.post("/data/add", this.entry)
            .then(() => {
                this.returnToMap();
            })
            .catch((err) => {
                console.error(err);
                this.returnToMap();
            })
        },
        returnToMap: function () {
            this.$router.push("/");
        }
    }
}