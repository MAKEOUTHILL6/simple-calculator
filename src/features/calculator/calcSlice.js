import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sign: '',
    num: 0,
    sum: 0.
}

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const calcSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        resetTotal: (state, action) => {
            state.num = 0;
            state.sum = 0;
            state.sign = '';
        },
        invertClick: (state, action) => {
            state.num = state.num ? state.num * - 1 : 0;
            state.sum = state.sum ? state.sum * - 1 : 0;
            state.sign = '';
        },
        signClick: (state, action) => {
            state.sign = action.payload;
            state.sum = !state.res && state.num ? state.num : state.sum;
            state.num = 0;
        },
        commaClick: (state, action) => {
            state.num = !state.num.toString().includes('.') ? state.num + action.payload : state.num;
        },
        percentageClick: (state, action) => {
            let num = state.num ? parseFloat(state.num) : 0;
            let sum = state.sum ? parseFloat(state.sum) : 0;

            state.num = (num /= Math.pow(100, 1));
            state.sum = (sum /= Math.pow(100, 1));
            state.sign = '';
        },
        equalClick: (state, action) => {
            const math = (a, b , sign) => 
            sign === '+'
            ? a + b
            : sign === '-'
            ? a - b
            : sign === 'X'
            ? a * b
            : a / b;
            
            state.sum = state.num === '0' && state.sign === '/'
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                    Number(removeSpaces(state.sum)),
                    Number(removeSpaces(state.num)),
                    state.sign
                )
            )
            state.sign = '';
            state.num = 0;
        },
        numberClick: (state, action) => {
            state.num = state.num === 0 && action.payload === '0'
                ? "0"
                : removeSpaces(state.num) % 1 === 0
                ? toLocaleString(Number(removeSpaces(state.num + action.payload)))
                : toLocaleString(state.num + action.payload)
            
            state.sum = !state.sign ? 0 : state.sum;
        },
    }
});

export const { resetTotal, invertClick, numberClick, percentageClick, equalClick, commaClick, signClick } = calcSlice.actions;
export default calcSlice.reducer;
