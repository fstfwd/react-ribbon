import React from 'react';
import ReactDOM from 'react-dom';
import Ribbon from './Ribbon';
import RibbonData from './data';

window.Data = RibbonData;

window.onload = () => {
	window.ribbon = ReactDOM.render(
		<Ribbon />,
		document.getElementById( 'ribbon-root' )
	);
}
