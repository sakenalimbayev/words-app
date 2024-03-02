import { useEffect, useState } from 'react';
import Char from '../../components/char/char';
import './challenge.scss';

const Challenge = () => {
    const [isSolved, setIsSolved] = useState(false);
    const [data, setData] = useState(null);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/challenges').then(data => {
            data.json().then(res => {
                console.log(res);
                const state = res[0].word.split('').map((char, index) => ({
                    value: char,
                    isOpened: index === 1 ? false : true,
                    error: null,
                }))
                setData(state);
            })
        })
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInput(value);
    }

    // 1st option
    // const handleSubmitClick = () => {
    //     console.log(input);
    //     console.log(data);
    //     if (data.filter(char => !char.isOpened)[0].value === input) {
    //         // success case
    //         setIsSolved(true);
    //         const result = data.map(char => ({
    //             ...char,
    //             isOpened: true
    //         }))
    //         setData(result);
    //     } else {
    //         // wrong case - show error
    //     }
    // }

    // 2nd option
    const handleSubmitClick = () => {
        const target = data.filter(char => !char.isOpened)[0];
        if (input !== target.value) {
            // error case
            const result = data.map(char => ({
                ...char,
                error: char.value === target.value ? true : null
            }))
            setData(result);
        } else {
            // success case
            setIsSolved(true);
            const result = data.map(char => ({
                ...char,
                isOpened: true,
                error: false,
            }))
            setData(result);
        }
    }

    return (
        <>
            <div>Challenge page</div>
            <div className="challenge-board-element">
                <div>
                    <input type="text" value={input} onChange={handleInputChange} />
                    <button onClick={handleSubmitClick}>Submit</button>
                </div>
                <div className="challenge-word">
                    {data && data.map((item, index) => <Char key={`${item.value}-${index}`} value={item.value} isOpened={item.isOpened} error={item.error} />)}
                </div>
                {isSolved && <button>Next</button>}
            </div>
        </>
    )
}

export default Challenge;