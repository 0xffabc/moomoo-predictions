/* Import script */

import { NewtonIteration } from "./NewtonIteration";

/* Damage prediction */
const CONSTANTS = {
    lastRes: 0,
    index: 0
};

/* Wave function */
function wave_function(x: number): number {
    let sumArray = 0;
    /*
        Damages data for predicting
        It has the most common damage from instakills - 
        PM, SM, RPM (Ruby PM), Rangetick
    */
    const damages: any[] = [
                        [68, 50, 25],
                        [46, 50, 25], 
                        [80, 50, 25], 
                        [25, 80, -1]
                    ];
    /* Vertical array iterator */
    /* 3 - horizontal length */
    for (let i: number = 0; i < 3; i++) {
        /* Iterate thought damages array */
        damages.forEach(array => {
             const newIndex: number = ++CONSTANTS.index;
             const element: number = array[newIndex];
             if (Math.abs(element - x) < x) {
                CONSTANTS.lastRes = element;
             };
         });
         /* Write data to summer value */
         sumArray+= CONSTANTS.lastRes;
         /* Wipe iterator value */
         CONSTANTS.lastRes = 0;
    }
    return sumArray;
};

/* Derivative */

/* Derivative is indeed to get a rate of difference of function 
 In case of getting damaged, rate of damage is how "common" is it. 
 Small difference means you wouldnt heal in damage prediction 
 (since it will be pointless, you dont need to outheal less than)
 (25 damage)
 So, the only case we'll use damage prediction in is when the damage
 your player will probably get is bigger than 35 or equal to it, because
 100 (max health of your player) - (50 + 25) (musket and turret damage without soldier helmet)
 will equal 35, which means if you will get instakilled with greater hammer, if you'll not
 heal - you will instantly die.
 */

function derivative(x: number): number {
    return /* Difference between first damage and last damage predicted by
                Newton's iteration */
        (
            diff = wave_function(x) - wave_function(-x),
                /* Divide it by precision (commonly 1 / 1000) multiplied by 2 */
                /* Use 500 since x / 1000 * 2 = x / 500*/
                diff / 500
            );
};

/* Initialize Newton's iteration */

const nm = new NewtonIteration(
    wave_function,
        derivative
);

/* Export NewtonIteration.prototype.guess */

/* Usage example: 
    * MooMoo.on("33", event => {
        const pot_dmg = nm.guess(100 - MooMoo.myPlayer.health); 
        // ...get weapon damage of enemy and save it in wp_dmg
        if (wp_dmg + pot_dmg > (
            MooMoo.myPlayer.skinIndex == 6 ? 
                44 : 35
        )) {
            MooMoo.myPlayer.place(
                MooMoo.myPlayer.inventory.food
            );
        } else {
            if (enemy.skinIndex == 7) {
                if (
                    MooMoo.myPlayer.skinIndex == 6
                ) {
                    if (
                        (wp_smg + pot_dmg) * 0.75 * 1.5 > 39
                        ) {
                            MooMoo.myPlayer.place(
                                MooMoo.myPlayer.inventory.food
                            );
                        }
                }
            }
        };
    })
    * (not indded to use in real project and can be buggy)
*/
export default nm.guess;