import { Avatar, Container, Typography } from '@mui/material'
import React from 'react'
import Navbar from './navbar'

const About = () => {
  return (
    <>
    <Navbar/>
    <Container sx={{display: 'flex',flexDirection: 'column',justifyContent: 'top', alignItems: 'center', height: '100vh', width: '100%', marginTop: '10px'}}>
      <Avatar className='hover' src='./favicon.ico' sx={{height: '5em', width: '5em', marginY: '10px'}}/>
      <Typography variant="h6" fontWeight='900'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio provident eaque facere nisi perferendis velit eveniet sapiente, a ipsam rerum, architecto nihil suscipit placeat repellendus debitis laudantium tempore vero quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ea quisquam sed a sit accusantium illum doloremque! Illum aliquam culpa ratione alias laudantium minus corporis error, animi fugiat. Nihil, illum!</Typography>
    </Container>
    </>
  )
}

export default About