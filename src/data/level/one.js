import Bezier from "@/computes/bezier";

const bezier = new Bezier();

const chaos = {
    flower: [
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [0, 0],
            )
        },
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [0, 0.5],
            )
        },
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [0, 1],
            )
        },
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [1, 0],
            )
        },
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [1, 0.5],
            )
        },
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [1, 1],
            )
        }
    ],
    antenna: [
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [0, start[1] + 0.3],
            )
        },
        (start, progress) => {
            return bezier.one(
                progress,
                start,
                [0, start[1] + 0.8],
            )
        }
    ]
}

const flying = {
    cross: [
        {
            name: "Cross - One",
            router: (progress) => {
                return bezier.one(
                    progress,
                    [0, 0.5],
                    [0.6, 0],
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        },
        {
            name: "Cross - Two",
            router: (progress) => {
                return bezier.two(
                    progress,
                    [0, 0.3],
                    [0.3, 0.3],
                    [0.6, 1],
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        }
    ],
    butterfly: [
        {
            name: "Butterfly - Left",
            router: (progress) => {
                return bezier.three(
                    progress,
                    [0, 0.3],
                    [0.5, 0.3],
                    [0.6, 0],
                    [0.7, 0],
                )
            },
            chaos: {
                "0.20": chaos.antenna,
            }
        },
        {
            name: "Butterfly - Right",
            router: (progress) => {
                return bezier.three(
                    progress,
                    [0, 0.8],
                    [0.5, 0.8],
                    [0.6, 1],
                    [0.7, 1],
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        }
    ],
    U: [
        {
            name: "U - Left",
            router: (progress) => {
                return bezier.two(
                    progress,
                    [0, 0.20],
                    [0.5, 0.3],
                    [0, 0.4]
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        },
        {
            name: "U - Right",
            router: (progress) => {
                return bezier.two(
                    progress,
                    [0, 0.9],
                    [0.5, 0.8],
                    [0, 0.7]
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        }
    ],
    flash: [
        {
            name: "Flash - Left",
            router: (progress) => {
                return bezier.three(
                    progress,
                    [0, 0.3],
                    [0.1, 0.3],
                    [0.20, 0.3],
                    [0.5, 0],
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        },
        {
            name: "Flash - Right",
            router: (progress) => {
                return bezier.three(
                    progress,
                    [0, 0.8],
                    [0.1, 0.8],
                    [0.20, 0.8],
                    [0.5, 1],
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        }
    ],
    straight: [
        {
            name: "Straight - Left",
            router: (progress) => {
                return bezier.one(
                    progress,
                    [0, 0.3],
                    [1, 0.3]
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        },
        {
            name: "Straight - Right",
            router: (progress) => {
                return bezier.one(
                    progress,
                    [0, 0.8],
                    [1, 0.8]
                )
            },
            chaos: {
                "0.20": chaos.flower,
            }
        }
    ],
}

export default {
    id: 1,
    name: "[Unknown]",
    30: flying.cross,
    99: flying.butterfly,
    100: flying.butterfly,
    101: flying.butterfly,
    102: flying.butterfly,
    103: flying.butterfly,
    104: flying.butterfly,
    105: flying.butterfly,
    150: flying.cross,
    151: flying.cross,
    152: flying.cross,
    153: flying.cross,
    154: flying.cross,
    235: flying.U,
    245: flying.U,
    255: flying.U,
    265: flying.U,
    270: flying.U,
    273: flying.U,
    275: flying.U,
    283: flying.flash,
    285: flying.flash,
    288: flying.flash,
    291: flying.flash,
    303: flying.butterfly,
    304: flying.butterfly,
    305: flying.butterfly,
    310: flying.straight,
    311: flying.straight,
    312: flying.straight,
    313: flying.straight,
    314: flying.straight,
    315: flying.straight,
    455: flying.U,
    465: flying.U,
    470: flying.U,
    483: flying.flash,
    485: flying.flash,
    488: flying.flash,
    491: flying.flash,
    573: flying.U,
    575: flying.U,
    591: flying.butterfly,
    596: flying.butterfly,
    621: flying.butterfly,
    625: flying.cross,
    626: flying.cross,
    629: flying.straight,
    630: flying.straight,
    631: flying.straight,
    632: flying.straight,
    633: flying.straight,
    691: flying.butterfly,
    692: flying.butterfly,
    693: flying.butterfly,
    694: flying.butterfly,
    695: flying.butterfly,
    696: flying.butterfly,
    697: flying.butterfly,
    720: true,
    750: true
}
