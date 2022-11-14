import { Button } from "./Button";

export const Calculator = () => {

    const btnValues = [
        ["C", "+-", "%", "/"],
        [7, 8, 9, "X"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        [0, ".", "="],
    ];

    return (
        <div className="calculator-wrapper">

            <div className="calculator-screen">
                <p className="calculator-value">0</p>
            </div>

            <div className="button-wrapper">
                {
                    btnValues.flat().map((button, index) => {
                        return (
                            <Button
                                key={index}
                                className={button === '=' ? 'equal' : 'button'}
                                value={button}
                                onClick={() => {
                                    console.log(button + ' ' + 'clicked');
                                }}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}