let Answers = [];
var currentNum;
class JScalculator
{
    constructor(PrevOperandElement, NewOperandElement, OutputAnswers)
    {
        this.PrevOperandElement = PrevOperandElement;
        this.NewOperandElement = NewOperandElement;
        this.OutputAnswers = OutputAnswers;
        this.clearOutput();
    }

    clearOutput()
    {
        this.prevOperand = '';
        this.newOperand = '';
        this.operationParam = undefined;
    }

    deleteElement()
    {
        this.newOperand = this.newOperand.toString().slice(0,-1);
    }

    appendNum(appNum)
    {
        if(appNum === '.' && this.newOperand.includes('.')){   // for not adding more then one '.'
            return;
        }
        this.newOperand = this.newOperand.toString() + appNum.toString();
    }

    perfomOperation(operationParam)
    {
        if(this.newOperand === ''){
            return;
        }
        if(this.prevOperand !== '')
        {
            this.computeData();
        }
        this.operationParam = operationParam;
        this.prevOperand = this.newOperand;
        this.newOperand = '';
    }

    computeData()
    {
        let computeNum;
        const prevNum = parseFloat(this.prevOperand);
        const newNum = parseFloat(this.newOperand);
        currentNum = newNum;
        //console.log(newNum);
        /*if(isNaN(prevNum) || isNaN(newNum)){            // chek for both valur prev and new without one not perfom
            return;
        } */

        switch(this.operationParam)
        {
            case '+':
                computeNum = prevNum + newNum;
                break;
            case '-':
                computeNum = prevNum - newNum;
                break;
            case '*':
                computeNum = prevNum * newNum;
                break;
            case '÷':
                computeNum = prevNum / newNum;
                break;
            case 'x^':
                computeNum = Math.exp(prevNum,newNum);
                break;
            case '^2':
                computeNum = prevNum*prevNum;
                break; 
            case '2√':
                computeNum = Math.sqrt(prevNum);
                break;
            case '^3':
                computeNum = prevNum*prevNum*prevNum;
                break;
            case 'FAC':
                let fact = 1;
                for(let i=1; i<=prevNum; ++i)
                {
                    fact *= i;
                    console.log(fact);
                }
                computeNum = fact;
                break;
            default:
                return;
        }
        this.newOperand = computeNum;
        this.operationParam = undefined;
        this.prevOperand = '';
    }

    updateOutput(isAnswer)
    {
        //let outputAns,outputprevOperatino;

        this.NewOperandElement.textContent = this.newOperand;

        if(isAnswer == true)
        {
            //console.log(this.NewOperandElement.textContent);
            let answer = {
                prevOperation: this.PrevOperandElement.textContent + ' ' + currentNum,
                outputAns: this.NewOperandElement.textContent
            }

            if(Answers.length < 10)
            {
                //console.log(answer);
                Answers.push(answer.prevOperation +' '+ '=' +' ' + answer.outputAns);
            }
            else{
                Answers.shift();
                Answers.push(answer);
            }

            for(let i=0; i<Answers.length; i++){      // answers display
                //if(i>10){break;}
                this.OutputAnswers.textContent = JSON.stringify(Answers);
                 this.OutputAnswers.textContent = this.OutputAnswers.textContent.replace(/[^0-9-+*=.÷ ]/g, '\n');
            }     
        }

        if(this.operationParam != null)       // for display opearator with operands in previous output
        {
            this.PrevOperandElement.textContent = `${this.prevOperand} ${this.operationParam}`;
        }
        else
        {
            this.PrevOperandElement.textContent = '';
        }
    }

}


const btnnumber = document.querySelectorAll('[data-number]');
const btnoperation = document.querySelectorAll('[data-operation]');
//const btnsqure = document.querySelector('[data-operation-sqr]');
const btnequals = document.querySelector('[data-equals]');
const btndelete = document.querySelector('[data-delete]');
const btnclearall = document.querySelector('[data-all-clear]');
const PrevOperandElement = document.querySelector('[data-previous-operand]');
const NewOperandElement = document.querySelector('[data-current-operand]');
const OutputAnswers = document.querySelector('[output-answers]');

const calcy = new JScalculator(PrevOperandElement, NewOperandElement, OutputAnswers);

btnnumber.forEach(function(btn)       // for number buttons
{                    
    btn.addEventListener('click', function()
    {
        calcy.appendNum(btn.textContent);
        calcy.updateOutput(false);
    })
})

btnoperation.forEach(function(btn)       // for operation buttons
{                    
    btn.addEventListener('click', function()
    {
        calcy.perfomOperation(btn.textContent);
        calcy.updateOutput(false);
    })
})

btnequals.addEventListener('click', function()
{
    calcy.computeData();
    calcy.updateOutput(true);

})

btnclearall.addEventListener('click', function()
{
    calcy.clearOutput();
    calcy.updateOutput(false);
})

btndelete.addEventListener('click', function()
{
    calcy.deleteElement();
    calcy.updateOutput(false);
})

/* btnsqure.addEventListener('click', function(btn)       
{                    
        calcy.perfomOperation(btn.textContent);
        calcy.updateOutput();
    
})  */