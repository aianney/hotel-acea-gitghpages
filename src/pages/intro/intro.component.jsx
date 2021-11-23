import React, { useEffect } from 'react'
// import { AppContext, Filter, Theme } from "../../components";
// import { Box, Button, Chip, Grid, Typography } from "@material-ui/core";
// import image from "../../assets/media/images/Intro/img-1.png";
import { useHistory } from 'react-router-dom'

const Intro = () => {
  const history = useHistory()
  // const { info, setInfo } = useContext(AppContext),
  //     [filterOpen, setFilterOpen] = useState(false),
  //     chips = ["Relax in Elegance and Comfort", "Wine & Dine to Drinks and Dishes", "Experience Endless Fun and Leisure", "Celebrate Festivities & Gatherings with Us"];

  useEffect(() => {
    // document.title = "Acea Beach Resort - The Getaway You Deserve";
    history.push('/room-selection')
    // eslint-disable-next-line
  }, [])

  return <></>
}

export default Intro

// const content = <>
//     <Box>
//         <Grid
//             container
//             sx={{
//                 height: "90vh"
//             }}
//         >
//             {/* Left Side of Grid START */}
//             <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     zIndex: {
//                         xs: 1,
//                         sm: 0,
//                     },
//                     paddingLeft: {
//                         xs: 0,
//                         md: 8,
//                     }
//                 }}
//             >
//                 <Box px={6}>
//                     <Box>
//                         <Typography variant="introTitle">
//                             The getaway you deserve!
//                         </Typography>
//                     </Box>
//                     <Box>
//                         <Typography variant="introSubtitle">
//                             Explore an unparalleled sense of leisure with rejuvenating offerings and dive into limitless play,
//                             water activities, alfresco bar and dining, notable accommodations, and momentous celebrations.
//                         </Typography>
//                     </Box>
//                     {chips.map((content, index) =>
//                         <Box mt={1} key={index}>
//                             <Chip sx={{ backgroundColor: Theme.palette.primary.main, padding: "0 10px", fontFamily: Theme.typography.fontFamily.sansSerif, fontWeight: Theme.typography.fontWeightBold }} label={index + 1} />
//                             <Typography variant="introChips" sx={{ marginLeft: 2, fontWeight: Theme.typography.fontWeightBold, color: "black" }}>
//                                 {content}
//                             </Typography>
//                         </Box>
//                     )}
//                 </Box>
//             </Grid>
//             <Grid
//                 item
//                 xs={12}
//                 sm={6}
//                 sx={{
//                     // position: {
//                     //     xs: "fixed",
//                     //     sm: "relative",
//                     // },
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     // height: {
//                     //     xs: "90vh",
//                     //     sm: "auto",
//                     // },
//                 }}
//             >
//                 <Box component="img" src={image} sx={{
//                     width: {
//                         xs: "100%",
//                         sm: "90%",
//                     },
//                     opacity: {
//                         xs: .85,
//                         sm: 1,
//                     }
//                 }} />
//             </Grid>
//             {/* Left Side of Grid END */}

//             <Grid

//             >
//             </Grid>
//         </Grid>
//     </Box>

//     <Box p={2}
//         sx={{
//             bottom: 0,
//             display: "flex",
//             justifyContent: "flex-end",
//             left: 0,
//             position: "fixed",
//             width: "100vw",
//             boxSizing: "border-box",
//             zIndex: 2,
//         }}
//     >
//         <Button
//             variant="navigationButton"
//         >
//             <Box px={2}
//                 py={1}
//                 onClick={() => setFilterOpen(true)}
//             >
//                 Book Now
//             </Box>
//         </Button>
//     </Box>

//     {/* <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} info={info} setInfo={setInfo} page="intro" text="Book Now" /> */}
// </>
