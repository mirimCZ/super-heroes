import React from 'react'
import { Page, Flex, Box } from '../../components/wrappers'
import { Title, Link } from '../../components/atoms'

const RegisterPage = () => (
  <Page>
    <Title message="Melior Online | Registrace" />
    <Flex>
      <Box sm={12} md={6}>
        <Link to="/">
          Domů
        </Link>
      </Box>
      <Box sm={12} md={6}>
        Fest
      </Box>
    </Flex>
  </Page>
)

export default RegisterPage
