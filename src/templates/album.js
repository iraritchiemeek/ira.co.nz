import React from "react"
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
				console.log(portrait)
				return (
					<Col xs={portrait ? 6 : 12} >
						<GatsbyImage key={i} alt={`${album.title} photo`} image={image} />
					</Col>
				)
			})
		)
	}

	return (
		<Container fluid className="p-4">
			<Row>
			  <Col xs={12} md={2}>
			    <h2 className="fw-light" style={{position: 'fixed'}}>{album.title}</h2>
			  </Col>
			  <Col xs={12} md={10}>
				  <Row className="g-4">
				  	{renderPhotos()}
				  </Row>
			  </Col>
			</Row>
		</Container>
	)
}

export default Album