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
              photos{
                gatsbyImageData(
                  quality: 1,
                )
              }
              coverPhoto {
                gatsbyImageData(
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
    console.log(album)
    return (
      <Link to={album.slug}>
        <GatsbyImage image={image} alt="Album Cover" />
        <div className="w-100 mt-1 fw-light d-flex justify-content-between pt-2">
          <span>{album.title}</span>
          <span>images: {album.photos.length}</span>
        </div>
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
      <header className="pb-4">
          <h2 className="fw-light pb-4">Ira Ritchie Meek</h2>

      </header>
      <Row>
        <Col xs={12}>
          <Row xs={1} md={3} className="g-4">
            {renderAlbums()}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default IndexPage
