import React, { useEffect, useState } from "react";
const GRID_SIZE=20;
    const INITAL_SNAKE=[{x:10,y:10}]
    const INITAL_FOOD={x:5,y:5}
    const DIRECTIONS={
        ArrowUp:{x:0,y:-1},
        ArrowDown:{x:0,y:1},
        ArrowLeft:{x:-1,y:0},
        ArrowRight:{x:1,y:0}
    }
const Main=()=>{
    const[snake,setSnake]=useState(INITAL_SNAKE)
    const[food,setFood]=useState(INITAL_FOOD)
    const[direction,setDirection]=useState(DIRECTIONS.ArrowRight)
    const[gameOver,setGameOver]=useState(false)

    const resetGame=()=>{
        setSnake(INITAL_SNAKE)
        setFood(INITAL_FOOD)
        setDirection(DIRECTIONS.ArrowRight)
        setGameOver(false)
    }

    useEffect(()=>{
        const handleKeyPress=(event)=>
            DIRECTIONS[event.key]&&setDirection(DIRECTIONS[event.key])
            document.addEventListener('keydown',handleKeyPress)
            return()=> document.removeEventListener('keydown',handleKeyPress)    
    },[])

    useEffect(()=>{
        if(gameOver) return

        const interval=setInterval(()=>{
            setSnake((prvSnake)=>{
                const newHead={
                    x:prvSnake[0].x+direction.x,
                    y:prvSnake[0].y+direction.y
                }

                if(newHead.x<0||newHead.x>=GRID_SIZE||newHead.y<0||newHead.y>=GRID_SIZE||prvSnake.some((segment)=>segment.x ===newHead.x && segment.y===newHead.y)){
                    setGameOver(true)
                    return prvSnake
                }

                const newSnake=[newHead,...prvSnake]
                return newHead.x===food.x&&newHead.y===food.y?(setFood({x:Math.floor(Math.random()*GRID_SIZE),y:Math.floor(Math.random()*GRID_SIZE)}),newSnake):newSnake.slice(0,-1)
            })
        },200)
        return ()=>clearInterval(interval)
    },[snake,direction,food,gameOver])

    return(
        <div className="game-container">
            <h1>Snake Game :</h1>
            <div className="grid">
                {
                    [...Array(GRID_SIZE)].map((_,row)=>
                        <div key={row} className="row">
                            {
                            [...Array(GRID_SIZE)].map((_,col)=>
                                <div key={col} className={`cell ${snake.some(s=>s.x===col&&s.y===row)?'snake':''}${food.x===col&&food.y===row?'food':''}`}>
                                    </div>
                            )
                            }
                            </div>
                    )
                }
            </div>

{
    gameOver &&(
        <div className="game-over">
            Game Over  :<button onClick={resetGame} className="btn btn-primary">Reset</button>
            </div>
    )
}
        </div>
    )
}
export default Main



