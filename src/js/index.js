import React from 'react';
import ReactDOM from 'react-dom';
import Ribbon from './Ribbon';

window.onload = () => {
	window.ribbon = ReactDOM.render(
		<Ribbon />,
		document.getElementById( 'ribbon-root' )
	);
}
