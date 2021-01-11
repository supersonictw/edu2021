function Bezier() {
}

Bezier.prototype = {
    one: function (t, p1, p2) {
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        return [
            this._one(x1, x2, t),
            this._one(y1, y2, t)
        ];
    },
    _one: (value1, value2, time) => value1 + (value2 - value1) * time,
    two: function (t, p1, cp, p2) {
        const [x1, y1] = p1;
        const [cx, cy] = cp;
        const [x2, y2] = p2;
        return [
            this._two(x1, x2, cx, t),
            this._two(y1, y2, cy, t)
        ];
    },
    _two: (value1, value2, control, time) =>
        (1 - time) * (1 - time) * value1 +
        2 * time * (1 - time) * control +
        time * time * value2,
    three: function (t, p1, cp1, cp2, p2) {
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const [cx1, cy1] = cp1;
        const [cx2, cy2] = cp2;
        return [
            this._three(x1, x2, cx1, cx2, t),
            this._three(y1, y2, cy1, cy2, t)
        ];
    },
    _three: (value1, value2, control1, control2, time) =>
        value1 * (1 - time) * (1 - time) * (1 - time) +
        3 * control1 * time * (1 - time) * (1 - time) +
        3 * control2 * time * time * (1 - time) +
        value2 * time * time * time,
}

const bezier = new Bezier();
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
            bullets: {}
        }
    ],
    U: [
        {
            name: "U - Left",
            router: (progress) => {
                return bezier.two(
                    progress,
                    [0, 0.2],
                    [0.5, 0.3],
                    [0, 0.4]
                )
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
                    [0.2, 0.3],
                    [0.5, 0],
                )
            }
        },
        {
            name: "Flash - Right",
            router: (progress) => {
                return bezier.three(
                    progress,
                    [0, 0.8],
                    [0.1, 0.8],
                    [0.2, 0.8],
                    [0.5, 1],
                )
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
    320: true,
    328: true
}
