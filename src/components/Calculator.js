import { Button } from "./Button";
import { useSelector, useDispatch } from 'react-redux';
import { resetTotal, numberClick, invertClick, percentageClick, equalClick, commaClick, signClick } from "../features/calculator/calcSlice";

export const Calculator = () => {

    const dispatch = useDispatch();

    const { sign, num, sum } = useSelector((state) => state.calculator);

    const btnValues = [
        ["C", "+-", "%", "/"],
        [7, 8, 9, "X"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        [0, ".", "="],
    ];

    const removeSpaces = (num) => num.toString().replace(/\s/g, "");

    const resetTotalHandler = () => {
        dispatch(resetTotal());
    }

    const invertedClickHandler = () => {
        dispatch(invertClick());
    }

    const percentClickHandler = () => {
        dispatch(percentageClick());
    }

    const equalsClickHandler = () => {
        if(sign && num) {
            dispatch(equalClick());
        }
    }

    const signClickHandler = (e) => {
        const value = e.target.innerHTML;
        dispatch(signClick(value));
    }

    const commaClickHandler = (e) => {
        const value = e.target.innerHTML;
        dispatch(commaClick(value));
    }

    const numberClickHandler = (e) => {
        const value = e.target.innerHTML;

        if(removeSpaces(num).length < 16){
            dispatch(numberClick(value));
        }
    }

    return (
        <div className="calculator-wrapper">

            <div className="calculator-screen">
                <p className="calculator-value">{num ? num : sum}</p>
            </div>

            <div className="button-wrapper">
                {
                    btnValues.flat().map((button, index) => {
                        return (
                            <Button
                                key={index}
                                className={button === '=' ? 'equal' : 'button'}
                                value={button}
                                onClick={
                                    button === 'C'
                                        ? resetTotalHandler
                                        : button === '+-'
                                        ? invertedClickHandler
                                        : button === '%'
                                        ? percentClickHandler
                                        : button === '='
                                        ? equalsClickHandler
                                        : button === '/' || button === 'X' || button === '-' || button === '+'
                                        ? signClickHandler
                                        : button === '.'
                                        ? commaClickHandler
                                        : numberClickHandler
                                }
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}