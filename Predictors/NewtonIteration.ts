/*
    * @type { object }
*/
const CONSTANTS = {
    prec: 1 / 1000 /* Precision value */,
    lastValue: 0 /* Last value for Newton's method */,
};

/* 
    f-wave - a function that gives a geometrical waveform.
    (example, use sin or cos as f-wave)
    Default value - sin.

*/
class NewtonMethod {
    constructor(f_wave: object = Math.sin, der: object = 
        /* 
            Derivative is needed to get the rate of changing of f_wave function.
            Default gets rate for sinewave, but you should put your
            Own instead.
        */
            function(x: number) {
                return (this.f(x) - this.f(-x)) / (CONSTANTS.prec * 2)
            } ) {
        this.f = f_wave;
        this.d = der;
    };
    /* Main magic */
    /*
        * @name Guesser Function
        * @returns { number }
        * @param prev_value { number} - Start / Previous value
        * @example
        *   const nm = new NewtonMethod;
        *   const guess = nm.guess(1); // 1 - f(n) - start value
    */
    guess(prev_value: number): number {
        /* For people who want to break the script */
        if (typeof prev_value !== "number" || prev_value === 0) {
            /* Throw an error. */
            throw new Error("Put a normal number into argument!");
            /* For ones who doesnt use typescript */
        } else if (typeof process.env !== "undefined") {
            /* Throw another error. */
            throw new OverconstrainedError("Script should be used only in typescript / node.js environment!");
        } else {
            /* Checks are passed. */
            /* Make a literal for storing new value */
            let predicted_value: number = 0;
            /* Check if difference between 2 numbers is big */
            /* Using Math.abs to drop the number sign */
            while (Math.abs(prev_value - CONSTANTS.lastValue) >= CONSTANTS.prec) {
                /* Update old value */
                CONSTANTS.lastValue = prev_value;
                /* Make an approximation for value */
                prev_value = prev_value - this.f(prev_value) / this.d(prev_value);
                /* Iteration of Newton's method - Done! */
            };
            /* Return value predicted by Newton's method */
            return predicted_value;
        };
    }
};

/* Export the class */

export default NewtonMethod;