import React from "react";

export default class Category extends React.PureComponent {
  ref = React.createRef()
  
  componentDidMount() {
    const target = this.ref.current

    if (this.props.location.pathname === '/' + this.props.id) {
      target.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (this.props.id === '') {
      target.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    window.addEventListener('scroll', (e) => {
      console.log(e.cancelable);
      
      // const Rect = this.ref.current.getBoundingClientRect()
      // const height = Rect.height
      // const id = this.props.id
      // if (Rect.y >= 0 && Rect.y < 2 * (height / 3) && '/' + id !== this.props.location.pathname) {
      //   this.props.history.push({
      //     pathname: '/' + id,
      //     state: {
      //       scroll: true
      //     }
      //   })
      // }
    })
  }

  componentDidUpdate() {
    const target = this.ref.current

    if (!this.props.location.state.scroll && this.props.location.pathname === '/' + this.props.id) {
      target.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (!this.props.location.state.scroll && this.props.id === '') {
      target.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  render() {
    return (
      <div id={this.props.id} ref={this.ref} className={this.props.className ? this.props.className : this.props.id }>
        {this.props.children}
      </div>
    )
  }
}