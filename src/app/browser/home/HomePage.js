import React from 'react'
import { Page, Flex, Box } from '../../components/wrappers'
import { Title } from '../../components/atoms'
import { LoginForm } from '../../components/molecules'
import { QuickPlayTabs } from '../../components/organisms'

const HomePage = () => (
  <Page>
    <Title message="Melior Online | Homepage" />
    <Flex>
      <Box sm={12} md={6}>
        <LoginForm />
      </Box>
      <Box sm={12} md={6}>
        <QuickPlayTabs />
      </Box>
    </Flex>
  </Page>
)

export default HomePage
