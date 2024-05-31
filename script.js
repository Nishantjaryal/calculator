const numbers = document.querySelectorAll('[data-number]')
const operations = document.querySelectorAll('[data-operation]')
const equal = document.querySelector("[data-equal]")
const ac = document.querySelector("[data-all-clear]")
const c = document.querySelector("[data-delete]")
const statementStr = document.getElementById("statementDiv");
const ansStr = document.getElementById("ans");
const cp_Btn = document.getElementById("Copy_button");

class Calculator {
    res = 0;
    res2 = 1
    firstgain = 0; // only applicable in 1st approach
    valueGain = 0;
    curr_operation;
    str = '';
    err_remover1 = 0;


    checkLog() {
        this.err_remover1 = 1;
    }
    ScreenUpdate(key) {
        if (key === "." && statementStr.innerText.includes(".")) return
        this.checkLog();

        statementStr.innerText += key
        this.res = Number(statementStr.innerText)
        this.res2 = Number(statementStr.innerText)

        // console.log(this.res)
    }
    startOpration(key) {

        this.curr_operation = key;

        // --- the first approach
        // if (this.firstgain === 0){
        //     this.firstgain += this.res
        // }
        //  if (ansStr.innerText.includes('+')){
        //     this.valueGain += this.res
        //     this.str = this.valueGain + this.firstgain
        //     console.log(this.str)
        // }


        if (key === "+") {
            this.valueGain += this.res
            // console.log(this.valueGain)
            this.res = 0
            this.res2 = 1

        }
        if (key === "-") {  /// resolved 
            if (this.valueGain === 0) this.valueGain = this.res*2
            this.valueGain -= this.res 
            // console.log(this.valueGain)
            this.res = 0
            this.res2 = 1

        }
        if (key === "/") {  //resolved
            if (this.valueGain === 0) this.valueGain = this.res2**2
            this.valueGain = this.valueGain/this.res2
            // console.log(this.valueGain)
            this.res2 = 1
            this.res = 0

        }
        if (key === "*") {
            if (this.valueGain === 0) this.valueGain = 1
            this.valueGain *= this.res2
            // console.log(this.valueGain)
            this.res2 = 1
            this.res = 0

        }

        // ansStr.innerText += `${statementStr.innerText} ${key}`
        ansStr.innerText = `${this.valueGain} ${key}`
        statementStr.innerText = ""
    }

    showAns() {
        if (this.err_remover1 === 1 && this.valueGain !== 0) {
            if (this.curr_operation === "+") this.startOpration("+")
            if (this.curr_operation === "-") this.startOpration("-")
            if (this.curr_operation === "/") this.startOpration("/")
            if (this.curr_operation === "*") this.startOpration("*")
            ansStr.innerText = '';
            statementStr.innerText = this.valueGain
        }

    }


    clearAll() {
        this.res = 0;
        this.res2 = 1
        this.firstgain = 0;
        this.valueGain = 0;
        this.curr_operation;
        this.str = '';
        ansStr.innerText = '';
        statementStr.innerText = '';
    }

    clearOne() {
        this.str = statementStr.innerText.slice(0, -1)
        this.res = Number(this.str)
        this.res2 = Number(this.str)
        statementStr.innerText = this.str; // done displaying
    }







    // copy portion of the string
    async copy_string() {
        try {
            await navigator.clipboard.writeText(statementStr.innerText);
            console.log("Copied")
        } catch {
            (err) => console.log(err.message)
        }
    }
    copy_Ans() {
        this.showAns()
        this.copy_string()
    }

}














const calculator = new Calculator()
numbers.forEach((numberBTN) => {
    numberBTN.addEventListener("click", () => {
        // calculator.checkLog()
        calculator.ScreenUpdate(numberBTN.innerText)
    }
    )
})
operations.forEach((operationBTN) => {
    operationBTN.addEventListener("click", () => {
        calculator.startOpration(operationBTN.innerText)
    })
})

equal.addEventListener('click', () => {
    calculator.showAns();
})

ac.addEventListener('click', () => {
    calculator.clearAll();
})
c.addEventListener("click", () => {
    calculator.clearOne();
})
cp_Btn.addEventListener("click",
    () => {
        calculator.copy_Ans()
    })






