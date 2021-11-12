const path = require(`path`)

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
  const albumTemplate = path.resolve(`src/templates/album.js`)

  return graphql(`
    query loadAlbumPages {
      allContentfulAlbum {
        edges {
          node {
            slug
            title
            subtitle
            photos {
              gatsbyImageData(
                quality: 90,
                outputPixelDensities: [0.5, 1]
              )
            }
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allContentfulAlbum.edges.forEach(edge => {
      createPage({
        path: `${edge.node.slug}`,
        component: albumTemplate,
        context: {
          album: edge.node
        },
      })
    })
  })
}