import { useState } from "react";

export function Calculator() {

  const [display, setDisplay] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setDisplay('');
    } else if (value === '=') {
      try {
        setDisplay(calculate(display));
      } catch {
        setDisplay('エラー');
      }
    } else {
      setDisplay(prev => prev + value);
    }
  };

  const calculate = (expression) => {
    // 「整数 演算子 整数」の形式のみ許可
    const validExpression = /^(\d+)([+\-*/])(\d+)$/;

    // 有効な式であるかチェック
    const match = expression.match(validExpression);
    if (!match) {
      throw new Error('無効な式です。');
    }

    const num1 = Number(match[1]); // 1つ目の整数
    const operator = match[2]; // 演算子
    const num2 = Number(match[3]); // 2つ目の整数

    let result;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          throw new Error('無効な式です。');
        }
        result = num1 / num2;
        break;
      default:
        throw new Error('無効な式です。');
    }
    return result.toString()

  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', 'C', '=', '+'
  ];

  return (
    <div className="calculator-container">
      <h2>電卓アプリ</h2>
      <div className="display">{display || '0'}</div>
      <div className="button-grid">
        {buttons.map(
          (btn) => (
            <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
          ))}
      </div>
    </div>
  );
};