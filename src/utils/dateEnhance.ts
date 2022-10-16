export const de  = createDateEnhance();

function createDateEnhance(){
    return {
        isLeapYear,
        getYearDays,
        getNow
    }
}

function isLeapYear(y:number){
    if(isNaN(y)) throw new Error('isLeap函数参数必须为Number');
    if ((y % 100) === 0) return (y % 400) === 0;
    return (y % 4) === 0;
}

function getYearDays(y:number){
    return isLeapYear(y) ? 366 : 365
}

function getNow(){
    return new Date();
}
