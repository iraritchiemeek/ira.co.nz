import React, {useEffect, useState} from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/style.scss"

function IndexPage() {

  const data = useStaticQuery(
    graphql`
      {
        allContentfulAlbum {
          edges {
            node {
              slug
              title
              subtitle
              coverPhoto {
                gatsbyImageData(
                  layout: FULL_WIDTH,
                  aspectRatio: 1.53
                )
              }
            }
          }
        }
      }
    `   
  )

  const renderAlbum = album => {
    const image = getImage(album.coverPhoto)
    return (
      <Link to={album.slug}>
        <GatsbyImage image={image} alt="Album Cover" />
        <div className="w-100 fw-bold fs-5">{album.title}</div>
        <div className="w-100 fw-light fs-6">{album.subtitle}</div>
      </Link>
    )
  }

  const renderAlbums = () => {
    return (
      data.allContentfulAlbum.edges.map(edge => {
        return (
          <Col key={edge.node.title}>
            {renderAlbum(edge.node)}
          </Col>
        )
      })
    )
  }

  return (
    <Container fluid className="p-4">
      <Row>
        <Col xs={12} md={2}>
          <h2 className="fw-light">Ira</h2>
        </Col>
        <Col xs={12} md={10}>
          <Row xs={1} md={3} className="g-4">
            {renderAlbums()}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default IndexPage
