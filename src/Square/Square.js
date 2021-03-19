function Square(props) {
    return (
        <div className="game-square" data-testid={`game-square-${props.index}`} onClick={props.onClick}>
            {props.value}
        </div>
    )
}

export default Square
