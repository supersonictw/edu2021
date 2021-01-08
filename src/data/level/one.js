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
const bullets = {
    cross: [
        {
            name: "Cross - One",
            mover: (progress) => {
                return bezier.one(
                    progress,
                    [0, 0.5],
                    [0.6, 0],
                )
            }
        },
        {
            name: "Cross - Two",
            mover: (progress) => {
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
            mover: (progress) => {
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
            mover: (progress) => {
                return bezier.three(
                    progress,
                    [0, 0.8],
                    [0.5, 0.8],
                    [0.6, 1],
                    [0.7, 1],
                )
            }
        }
    ],
    U: [
        {
            name: "U - Left",
            mover: (progress) => {
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
            mover: (progress) => {
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
            mover: (progress) => {
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
            mover: (progress) => {
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
            mover: (progress) => {
                return bezier.one(
                    progress,
                    [0, 0.3],
                    [1, 0.3]
                )
            }
        },
        {
            name: "Straight - Right",
            mover: (progress) => {
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
    30: bullets.cross,
    99: bullets.butterfly,
    100: bullets.butterfly,
    101: bullets.butterfly,
    102: bullets.butterfly,
    103: bullets.butterfly,
    104: bullets.butterfly,
    105: bullets.butterfly,
    150: bullets.cross,
    151: bullets.cross,
    152: bullets.cross,
    153: bullets.cross,
    154: bullets.cross,
    235: bullets.U,
    245: bullets.U,
    255: bullets.U,
    265: bullets.U,
    270: bullets.U,
    273: bullets.U,
    275: bullets.U,
    283: bullets.flash,
    285: bullets.flash,
    288: bullets.flash,
    291: bullets.flash,
    303: bullets.butterfly,
    304: bullets.butterfly,
    305: bullets.butterfly,
    310: bullets.straight,
    311: bullets.straight,
    312: bullets.straight,
    313: bullets.straight,
    314: bullets.straight,
    315: bullets.straight,
}
