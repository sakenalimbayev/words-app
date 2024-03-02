import './char.scss';

const Char = ({ value, isOpened, error }) => {
    return (
        <div>
            <div>
                <span className={error !== null && !error ? 'success' : 'hidden'}>Success</span>
                <span className={error ? 'error' : 'hidden'}>Error</span>
            </div>
            {isOpened ? <div>{value}</div> : <div className="blank-char-element"></div>}
        </div>
    )
}

export default Char;