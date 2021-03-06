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

export default Bezier;
