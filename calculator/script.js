let screenDisplay = document.getElementById('inputbox');
        let allButtons = document.querySelectorAll('button');

        let pehlaNumber = '';
        let chunaGayaOperator = '';
        let operatorClickHoGayaHai = false;

        allButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const clickedButtonValue = e.target.innerHTML;

                if (!isNaN(clickedButtonValue) || clickedButtonValue === '.') {
                    if (operatorClickHoGayaHai) {
                        screenDisplay.value = clickedButtonValue;
                        operatorClickHoGayaHai = false;
                    } else {
                        screenDisplay.value = screenDisplay.value === '0' ? clickedButtonValue : screenDisplay.value + clickedButtonValue;
                    }
                } 
                else if (['+', '-', '*', '/'].includes(clickedButtonValue)) {
                    operatorKoHandleKaro(clickedButtonValue);
                }
                else {
                    switch (clickedButtonValue) {
                        case 'AC':
                            calculatorResetKaro();
                            break;
                        case 'DEL':
                            screenDisplay.value = screenDisplay.value.slice(0, -1) || '0';
                            break;
                        case '=':
                            finalCalculationKaro();
                            break;
                    }
                }
            });
        });

        function operatorKoHandleKaro(operatorValue) {
            if (pehlaNumber === '') {
                pehlaNumber = parseFloat(screenDisplay.value);
            }
            chunaGayaOperator = operatorValue;
            operatorClickHoGayaHai = true;
        }

        function finalCalculationKaro() {
            if (chunaGayaOperator === '' || pehlaNumber === '') {
                return;
            }
            
            let doosraNumber = parseFloat(screenDisplay.value);
            let result;

            switch (chunaGayaOperator) {
                case '+':
                    result = pehlaNumber + doosraNumber;
                    break;
                case '-':
                    result = pehlaNumber - doosraNumber;
                    break;
                case '*':
                    result = pehlaNumber * doosraNumber;
                    break;
                case '/':
                    if (doosraNumber === 0) {
                        result = 'Error';
                    } else {
                        result = pehlaNumber / doosraNumber;
                    }
                    break;
                default:
                    return;
            }
            
            screenDisplay.value = result;
            pehlaNumber = '';
            chunaGayaOperator = '';
        }

        function calculatorResetKaro() {
            screenDisplay.value = '0';
            pehlaNumber = '';
            chunaGayaOperator = '';
            operatorClickHoGayaHai = false;
        }