import React, { Component } from 'react';

import './stylesheets/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
    }
  }
  
  componentDidMount() {
    const board = [];
    
    for (let i = 0; i < 50; i++) {
      board.push([]);
    }
    
    const init = board.map((el, ind) => {
      const row = [];
      for (let i = 0; i < 50; i++) {
        if (i > 10 && i < 20 && ind > 20 && ind < 25) {
          row.push(Math.random() > .5 ? 1 : 0); 
        } else {
          row.push(0);
        }
      }
      return row;
    });
    console.log('initial board:', init)
    this.setState({board: init});
    this.control();
  }
  
  control() {
    
    setTimeout(() => {
      this.life(this.state.board, 1, [2,3], [3]);
      this.control();
    }, 50
    
    
    );
    
  }
  
  life(world, reps, continueLiving, comeToLife) {
    const height = world.length;
    
    const width = [world[0].length]
    
    while (reps > 0) {
      
      const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);
      
      const nextWorld = clone(world);
      
      for (let y = 0; y < height; y++) {
        
        for (let x = 0; x < width; x++) {
          
          const currentCell = world[y][x] ? 1 : 0;
          
          const alive = calcCells(x,y);
          
          let nextLife = 0;
          
          if (!currentCell) {
            
            if (comeToLife.includes(alive)) {
              nextLife = 1;
            }
          } else {
            if (continueLiving.includes(alive)) nextLife = 1;
          }
          
          nextWorld[y][x] = (!nextLife) ? 0 : 1;
          
        }
        
      }

      this.setState({board: nextWorld});
      console.log('w:', nextWorld)
      
      world = nextWorld;
      reps--;
    }
    
    return world;
        
    function calcCells(x,y) {
      
      let alive = 0;
      
      for (let j = y - 1; j <= y + 1; j ++){
        
        if (j < 0 || j > height - 1) continue;
        
        for (let i = x - 1; i <= x+1; i++) {
          
          if (i === x && j === y) continue;
          
          if (i < 0 || i > width - 1) continue;
          
          if (world[j][i]) {
            alive++;
          }
        }
        
      }
      
      return alive;
    } 
  }
  
  
  render() {
    
    const world = this.state.board;
    const board = [];
    
    for (let i = 0; i < world.length; i++) {
      
      const row = world[i];
      const rowPrint = [];
      for (let j = 0; j < row.length; j++){
        const bgc = row[j] ? 'cornflowerblue' : 'lightgrey';
        rowPrint.push(
          <div key={j} className="cell" style={{backgroundColor: bgc}}></div>
          )
        }
        board.push(<div key={i}>{rowPrint}</div>);
      }
      
      
      return (
        <div>
        {board}
        </div>
        );
      }
    }
    
    export default App;
