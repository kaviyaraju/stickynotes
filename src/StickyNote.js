import React from "react";
import Draggable from "react-draggable";

class StickyNote extends React.Component {

  handleChange(event) {
    this.setState({
        note: event.target.value
    });
  }

  renderDisplayMode() {
    const {sticky} = this.props;
    var classtouse = "sticky";
    if (sticky.checkedyn) {
      classtouse = "sticky done";
    }
    return (
      <div className={classtouse} style={sticky.style}>
        <p>{sticky.note}</p>
        <span>
          <button onClick={this.props.onEditMode}>edit</button>
          <button onClick={this.props.onDelete}>delete</button>
          <input type="checkbox" onChange={this.props.onChecked} checked={sticky.checkedyn}></input>
        </span>
      </div>
    );
  }
  
  renderEditMode() {
    const {sticky} = this.props;
    return (
      <div className="sticky" style={sticky.style}>
        <textarea defaultValue={sticky.note} onChange={this.props.onDisplayMode}></textarea>
        <span>
          <button onClick={this.props.onEditMode}>save</button>
        </span>
      </div>
    );
  }

  render() {
    return (
      <Draggable disabled={this.props.sticky.editing}>{
        this.props.sticky.editing ?
        this.renderEditMode()
        : this.renderDisplayMode()
     }</Draggable>
   );
  }
}

export default StickyNote;