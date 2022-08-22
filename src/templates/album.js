import React, {useState, useEffect, useCallback} from "react"
import {useSwipeable} from "react-swipeable"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/style.scss"

function Album({pageContext}) {
	const { album } = pageContext
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const renderPhoto = () => {
		return (
			<GatsbyImage alt={`${album.title} photo`} image={getImage(album.photos[currentImageIndex])} objectFit="contain" objectPosition="top" style={{height: '100%', widht: '100%'}} />
		)
	}

	const swipeHandlers = useSwipeable({
	  onSwiped: (eventData) => console.log("User Swiped!", eventData),
	});

	const changeCurrentPhoto = direction => {
		if(direction == 'back') {
			let index = currentImageIndex == 0 ? album.photos.length - 1 : currentImageIndex - 1
			setCurrentImageIndex(index)
		} else if(direction == 'forward') {
			let index = currentImageIndex == album.photos.length - 1 ? 0 : currentImageIndex + 1
			setCurrentImageIndex(index)
		}
	}

	const checkKeyPress = useCallback(e => {
    if(e.key == 'ArrowLeft') {
    	changeCurrentPhoto('back')
    } else if (e.key == 'ArrowRight') {
    	changeCurrentPhoto('forward')
    }
  },[currentImageIndex]);

  useEffect(() => {
    window.addEventListener("keydown", checkKeyPress);
    return () => {
      window.removeEventListener("keydown", checkKeyPress);
    };
  }, [checkKeyPress]);

	return (
		<Container id="album" fluid className="px-4 pb-4 h-100">
		 	<header>
		 		<h2 className="fw-bold me-2"><a href="/">Ira.co.nz</a></h2>
		 		<h2 className="fw-light">{album.title}</h2>
		 		<div style={{cursor: 'pointer'}}>
			 		<span onClick={e => changeCurrentPhoto('back')} className="fw-bold me-2">previous</span>
			 		<span onClick={e => changeCurrentPhoto('back')} className="fw-bold">next</span>
		 		</div>
		 	</header>
		 	<div {...swipeHandlers} className="album-image-container" >
		  	{album.photos.length && typeof(currentImageIndex) != 'undefined' && renderPhoto()}
		 	</div>
		</Container>
	)
}

export default Album