 let display = document.getElementById('inputbox');
        let allButtons = document.querySelectorAll('button');

        allButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const clickedButtonValue = e.target.innerHTML;

                if (clickedButtonValue === 'AC') {
                    display.value = '0';
                } 
                else if (clickedButtonValue === 'DEL') {
                    display.value = display.value.slice(0, -1) || '0';
                } 
                else if (clickedButtonValue === '=') {
                    try {
                        display.value = calculate(display.value);
                    } catch {
                        display.value = 'Error';
                    }
                } 
                else {
                    if (display.value === '0') {
                        display.value = clickedButtonValue;
                    } else {
                        display.value += clickedButtonValue;
                    }
                }
            });
        });

        function calculate(expression) {
            
            const tokens = expression.match(/(\d+\.?\d*|[\+\-\*\/])/g);
            
            if (!tokens) return 'Error';

            let i = 0;
            while (i < tokens.length) {
                if (tokens[i] === '*' || tokens[i] === '/') {
                    const operator = tokens[i];
                    const left = parseFloat(tokens[i - 1]);
                    const right = parseFloat(tokens[i + 1]);
                    let result;

                    if (operator === '*') {
                        result = left * right;
                    } else {
                        if (right === 0) return 'Error'; 
                        result = left / right;
                    }
                    
                    tokens.splice(i - 1, 3, result);
                    i = 0; 
                } else {
                    i++;
                }
            }

            let result = parseFloat(tokens[0]);
            for (let i = 1; i < tokens.length; i += 2) {
                const operator = tokens[i];
                const nextNumber = parseFloat(tokens[i + 1]);

                if (operator === '+') {
                    result += nextNumber;
                } else if (operator === '-') {
                    result -= nextNumber;
                }
            }

            return result;
        }
