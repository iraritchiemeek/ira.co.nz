import React, {useState, useEffect} from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/style.scss"

function Album({pageContext}) {
	const { album } = pageContext

	const renderPhotos = () => {
		return (
			album.photos.map((photo, i) => {
				const image = getImage(photo)
				const portrait = image.width < image.height
				const nextPhoto = getImage(album.photos[i + 1]) || {}
				const lastPhoto = getImage(album.photos[i - 1]) || {}
				const nextPhotoPortrait = nextPhoto.width < nextPhoto.height
				const lastPhotoPortrait = lastPhoto.width < lastPhoto.height
				return (
					<>
						<Col xs={portrait ? 6 : 12} >
							<GatsbyImage key={i} alt={`${album.title} photo`} image={image} />
						</Col>
						{portrait && nextPhotoPortrait && <Col xs={6} hidden={!portrait || (portrait && nextPhotoPortrait)} />}
					</>
				)
			})
		)
	}

	return (
		<Container fluid className="p-4">
			<Row>
			  <Col xs={12} md={2}>
			    <h2 className="fw-light">{album.title}</h2>
			  </Col>
			  <Col xs={12} md={10}>
			  	{album.photos.length && album.photos.length && 
  				  <Row className="g-4" style={{overflowX: 'none'}}>
  					  	{renderPhotos()}
  				  </Row>
			  	}
			  </Col>
			</Row>
		</Container>
	)
}

export default Album