// 1.deposit some money
// 2.determine number of lines bet on
// 3.collect a bet amount
// 4.spin the slot machine
// 5. check user win
// 6. if user wins give money to them
// 7. if not play again 

/*
function deposit(digit){
    return 4*digit
}
console.log(deposit(4))*/

// es-6 function in different wat to write

/*const deposit = (digit) => {
    return digit
}
console.log(deposit(5))*/

const prompt = require('prompt-sync')();
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
};

const SYMBOLS_VALUE = {
    A: 10,
    B: 6,
    C: 4,
    D: 2
}

 




const deposit = () =>{
    while(true){
        const depositAmount = prompt("enter a deposit number: ")
        //console.log(depositAmount)
        const numberDepositAmount = parseFloat(depositAmount)
        
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log('this is invalid bro!!')
        }
        else{
            return numberDepositAmount
            

        }
    }
    
}
const getNumberOfLines = () =>{
    while (true){

    
        const lines = prompt("enter number of lines 1-3: ")
        const numberOfLines = parseFloat(lines)
        if(isNaN(numberOfLines) || (numberOfLines <=0 || numberOfLines >3)){
            console.log('you enter a invalid number')
        }else {
            return numberOfLines
        }
    }
}

const getBet = (balance , lines) => {
    while (true){

    
        const bet = prompt("enter a bet per line:  ")
        const numberBet = parseFloat(bet)
        if(isNaN(numberBet) || (numberBet <=0 || numberBet > balance/ lines)){
            console.log('invalid bet try again bro!!')
        }else {
            return numberBet
        }
    }
}

const spin =() =>{
    const symbols =[]
    for (const [symbol, count]of Object.entries(SYMBOLS_COUNT)){
        for (let i =0; i<count; i++){
            symbols.push(symbol);
        }
    
    }
    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols]
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1)
        }
    }
    return reels;
}
const transpose = (reels) =>{
    const rows = []
    for ( let i = 0; i < ROWS; i++){
        rows.push([])
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) =>{
    for (const row of rows){
        let rowString='';
        for (const [i, s] of row.entries()){
            rowString += s
            if (i != row.length-1){
                 rowString+= ' _|_ '
            }
        }
    console.log( rowString)
    }
}

const getWinnings = (rows, bet, numberOfLines) => {
    let winnings = 0;

    for (let row =0; row <numberOfLines; row++ ){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
    
        if (allSame){
            winnings+= bet * SYMBOLS_VALUE[symbols[0]]
        }
    }
    return winnings
}

const game = () => {
    let balance =deposit()

    while (true){
        const numberOfLines=getNumberOfLines()
        const bet =getBet(balance,numberOfLines);
        balance -= bet * numberOfLines;

        const reels =spin();
        const rows = transpose(reels);
        console.log(rows)
        console.log(reels)
        printRows(rows)
        const winnings =getWinnings(rows ,bet,numberOfLines)
        balance += winnings;
        console.log('you won , $' + winnings.toString())
        if (balance < 0){
             console.log('you ran out of money')
             break;
        }
        const playAgain = prompt('do you want to play again (y/ n ')
        if (playAgain != 'y') break;
    }

}
game();




//console.log(depositAmount);

