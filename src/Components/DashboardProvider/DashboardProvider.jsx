// import React from 'react'
import * as React from 'react'
import { AppProvider, DashboardLayout } from '@toolpad/core'
import NAVIGATION from './Navigation';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useDemoRouter } from '@toolpad/core/internal';

const DashboardProvider = ({ data }) => {
  // let child = NAVIGATION.map((e,i)=>{
  //   e.children ? {segment : e.children.segment, title: e.children.title} : null
  // })


  
  // NAVIGATION.map((e,i)=>{
  //   location.pathname == `/${e.segment}` ? document.title = `FRP - LMS | ${e.title}` : null
  // })
  const [loader,setLoader] = useState(false)
  var DUMMY_BASE = "https://example.com";

  function useDemoRouter(initialUrl = "/") {
    const [url, setUrl] = React.useState(() => new URL(initialUrl, DUMMY_BASE));
    // console.log(url);
    const Navigate = useNavigate()
    
    const router = React.useMemo(() => {
      return {
      pathname: url.pathname,
      searchParams: url.searchParams,
      navigate: (newUrl) => {
          const nextUrl = new URL(newUrl, DUMMY_BASE);
          if (nextUrl.pathname !== url.pathname || nextUrl.search !== url.search) {
            // const perf = window.performance.getEntiresByType("navigation")[0];
            // const loadTime = perf.loadEventEnd - perf.requestStart;
            // console.log(loadTime);
            setUrl(nextUrl);
            setLoader(true)
            Navigate(newUrl)
            // location.pathname == newUrl ? setLoader(false) : null;
            
          }
        }
      };
    }, [url.pathname, url.search, url.searchParams]);
    return router;
  }
  const router = useDemoRouter(location.pathname);
  // console.log(useDemoRouter)
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://cdn-icons-png.freepik.com/512/8697/8697548.png" alt="MUI logo" />,
        title: 'LMS',
      }}
      router={router}
    >
      <DashboardLayout>
        <Box>{loader ? <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>: null}{data}</Box>
      </DashboardLayout>
    </AppProvider>
  )
}

export default DashboardProvider