

export enum characteristicValues{
    ORBITAL,
    BOILING_POINT,
    MELTING_POINT,
    IONIZATION_ENERGY,
    ELECTRON_AFFINITY
  }

export const characteristicData ={
    [characteristicValues.ORBITAL]:{
        NAME:"Orbital",
        GAUGE:[
            {
                TEXT: "s",
                COLOR: "#FF777A",
            },
            {
                TEXT: "p",
                COLOR: "#EEBC20",
            },
            {
                TEXT: "d",
                COLOR: "#67BCEE",
            },
            {
                TEXT: "f",
                COLOR: "#6ADE68",
            },
        ],
    },
    [characteristicValues.BOILING_POINT]: {
        NAME:"Boiling Point",
        GAUGE:[
            {
                TEXT: "high",
                COLOR: "#F00",
            },
            {
                TEXT: "",
                COLOR: "#FC0",
            },
            {
                TEXT: "",
                COLOR: "#8F3",
            },
            {
                TEXT: "low",
                COLOR: "#5ED",
            },
        ],
    },
    [characteristicValues.MELTING_POINT]: {
        NAME:"Melting Point",
        GAUGE:[
            {
                TEXT: "high",
                COLOR: "#FC0",
            },
            {
                TEXT: "",
                COLOR: "#9F2",
            },
            {
                TEXT: "",
                COLOR: "#3FB",
            },
            {
                TEXT: "low",
                COLOR: "#5FF",
            },
        ],
    },
    [characteristicValues.IONIZATION_ENERGY]: {
        NAME:"Ionization Energy",
        GAUGE:[
            {
                TEXT: "high",
                COLOR: "#000",
            },
            {
                TEXT: "",
                COLOR: "#A7A",
            },
            {
                TEXT: "",
                COLOR: "#C4B",
            },
            {
                TEXT: "low",
                COLOR: "#E03",
            },
        ],
    },
    [characteristicValues.ELECTRON_AFFINITY]: {
        NAME:"Electron Affinity",
        GAUGE:[
            {
                TEXT: "high",
                COLOR: "#08F",
            },
            {
                TEXT: "",
                COLOR: "#00B",
            },
            {
                TEXT: "",
                COLOR: "#70A",
            },
            {
                TEXT: "low",
                COLOR: "#000",
            },
        ]
    }
}
