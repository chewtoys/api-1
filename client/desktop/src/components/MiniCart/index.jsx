import React from 'react';
import "./styles/index.css";

export default class MiniCart extends React.PureComponent {
  render() {
    return(
      <div className="cart--mini">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="44" viewBox="0 0 14 44">
          <path d="M12.5 15h-1.81c-.28-1.86-2.04-3-3.69-3s-3.42 1.14-3.69 3H1.5c-.83 0-1.5.67-1.5 1.5v11c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-11c0-.83-.67-1.5-1.5-1.5zM7 13c1.18 0 2.43.75 2.7 2H4.3c.27-1.25 1.52-2 2.7-2zm6 14.5c0 .28-.22.5-.5.5h-11c-.28 0-.5-.22-.5-.5v-11c0-.28.22-.5.5-.5h11c.28 0 .5.22.5.5v11z" fill="#000" />
        </svg>
      </div>
    )
  }
}