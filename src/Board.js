import React from "react";
import StickyNote from "./StickyNote";


function randomBetween(x, y, s) {
  return (x + Math.ceil(Math.random() * (y-x))) + s;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
      
      if(!state || !state.sticky) {
        return {
          sticky : Array.apply(null, {length: props.count}).map(i => ({
            editing: false,
            note: "This is my first sticky Note!!! ",
            checkedyn: false,
            style: {
              top: randomBetween(0, window.innerHeight - 150, "px"),
              left: randomBetween(0, window.innerWidth - 150, "px"),
            }
          }))
         }
      }
      return state;
  }

  handleEditMode = i => e => {
     this.setState(prevstate => {
     return {
       ...prevstate,
       sticky: [
         ...prevstate.sticky.slice(0,i),
         {
           ...prevstate.sticky[i],
           editing: !prevstate.sticky[i].editing
         },
         ...prevstate.sticky.slice(i+1)
       ]
     };
   });
  }

  handleDisplayMode = i => e => {
    const note = e.target.value;
    this.setState(prevstate => {
      return {
        ...prevstate,
        sticky: [
          ...prevstate.sticky.slice(0,i),
          {
            ...prevstate.sticky[i],
            note: note
          },
          ...prevstate.sticky.slice(i+1)
        ]
      };
    });
  }

  onCheckboxchange = i => e => {
    this.setState(prevstate => {
      return {
        ...prevstate,
        sticky: [
          ...prevstate.sticky.slice(0,i),
          {
            ...prevstate.sticky[i],
            checkedyn: !prevstate.sticky[i].checkedyn
          },
          ...prevstate.sticky.slice(i+1)
        ]
      };
   });
  }

  handleDeleteMode = i => e => 
  {
    this.setState(prevstate => {
      return {
        ...prevstate,
        sticky: [
          ...prevstate.sticky.slice(0,i),
          ...prevstate.sticky.slice(i+1)
        ]
      };
   });
  }

  addSticky = e => {
    this.setState(prevstate => {
      return {
        ...prevstate,
        sticky: [
          ...prevstate.sticky,
          { editing: false,
            note: "This is my first sticky Note!!! ",
            checkedyn: false,
            style: {
              top: randomBetween(0, window.innerHeight - 150, "px"),
              left: randomBetween(0, window.innerWidth - 150, "px"),
            }
          }
        ]
      };
   });
  }

  render() {
    return (
        <div>
          <header>
            <button onClick={this.addSticky}>Add new StickyNote</button>
            <select><option value='all'>ALL</option></select>
          </header>
           {
               this.state.sticky.map((sticky,i) => (
                  <StickyNote 
                    sticky={sticky} 
                    key={i} 
                    index={i}
                    onEditMode={this.handleEditMode(i)}
                    onDisplayMode={this.handleDisplayMode(i)}
                    onChecked={this.onCheckboxchange(i)}
                    onDelete={this.handleDeleteMode(i)}
                />
               ))
           }
        </div>
      );
  }
}


export default Board;