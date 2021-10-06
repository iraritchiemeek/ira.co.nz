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
              title
              coverPhoto {
                gatsbyImageData(
                  layout: FULL_WIDTH
                )
              }
            }
          }
        }
      }
    `   
  )

  console.log(data)

  const renderAlbum = album => {
    const image = getImage(album.coverPhoto)
    return (
      <div>
        <GatsbyImage image={image} alt="Album Cover" blurred />
        <Col>{album.title}</Col>
      </div>
    )
  }

  const renderAlbums = () => {
    return (
      data.allContentfulAlbum.edges.map(edge => {
        return (
          renderAlbum(edge.node)
        )
      })
    )
  }

  return (
    <Container>
      <Row xs={1} sm={2} xl={4} className="g-4">
        {renderAlbums()}
      </Row>
    </Container>
  )
}

export default IndexPage
