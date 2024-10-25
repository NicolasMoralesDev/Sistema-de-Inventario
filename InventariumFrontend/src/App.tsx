import React, { ReactNode } from 'react' 
import { Layout, theme } from 'antd' 
import { Content } from 'antd/lib/layout/layout' 
import Nav from './components/common/Nav' 
import Foter from './components/common/Foter' 

const { Header } = Layout 

interface AppProp {
  children? : ReactNode
}

const App = (prop : AppProp) => {

  const {
    token: { colorBgContainer },
  } = theme.useToken() 

  return (
    <>
      <Layout
        style={ {
          minHeight: '100vh',
        }}
      >
        <Layout
        >
          <Header
            style={ {
              padding: 0,
              background: colorBgContainer,
              textAlign: 'center',
              height: "10%"
            } }
          >
            <Nav/>
          </Header>
          <Content
            style={ {
              margin: '1%',
            } }
          >
        { prop.children }
          </Content>    
          <Foter/>
        </Layout>
      </Layout>
    </>
  ) 
} 
export default App 