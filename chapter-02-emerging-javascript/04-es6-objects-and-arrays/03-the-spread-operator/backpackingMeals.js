var morning = {
    breakfast: "oatmeal",
    lunch: "peanut butter and jelly"
};

var dinner = "mac and cheese";

var backpackingMealsES6 = {
    ...morning,
    dinner
}

var backpackingMealsES6_r = {
    dinner,
    ...morning
}

var backpackingMealsES5 = 
Object.assign( 
    {},
    { dinner: dinner },
    morning );

var backpackingMealsES5_r = 
Object.assign( 
    morning,
    { dinner: dinner }
);

console.log("backpackingMealsES6 = ", backpackingMealsES6);
console.log("backpackingMealsES6_r = ", backpackingMealsES6_r);

console.log("backpackingMealsES5 = ", backpackingMealsES5);
console.log("backpackingMealsES5_r = ", backpackingMealsES5_r);
