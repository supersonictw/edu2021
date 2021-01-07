export default {
    12: [
        {
            start: {
                top: 0.0,
                left: 0.0
            },
            end: {
                top: 0.3,
                left: 1.0
            },
            move: (context) => {
                return {
                    top: context.top + 2,
                    left: context.left + 2
                }
            }
        },
        {
            start: {
                top: 0.0,
                left: 0.5
            },
            end: {
                top: 1.0,
                left: 0.5
            },
            move: (context) => {
                return {
                    top: context.top + 2,
                    left: context.left + 2
                }
            }
        },
        {
            start: {
                top: 0.0,
                left: 1.0
            },
            end: {
                top: 0.3,
                left: 1.0
            },
            move: (context) => {
                return {
                    top: context.top + 2,
                    left: context.left + 2
                }
            }
        },
    ],
}
