import React from 'react'
import { Route, Redirect, } from 'react-router-dom'

const isAuthenticated = () => true;

const Index = ({ component: Component, ...rest }: any) => (
    <Route { ...rest } render={ (props) => {
      if (isAuthenticated()) {
        if (props.location.pathname === '/') {
          return <Redirect to={ {
            pathname: '/home',
            state: { from: props.location }
          } }/>
        }
        return <Component { ...props } />
      } else {
        return <Redirect to={ {
          pathname: '/login',
          state: { from: props.location }
        } }/>
      }
    } }/>
)

export default Index
