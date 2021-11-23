import React from "react";
import { Theme } from "../../components";
import { Box, Card, Grid, Typography } from "@material-ui/core";
import { BsEnvelope, BsGeoAlt, BsPhone, BsTelephone } from 'react-icons/bs';
import ContactUsImage from '../../assets/media/images/contact-us.png';

const iconSize = "66%",
    cards = [
        {
            icon: <BsGeoAlt size={iconSize} color='#fff' />,
            title: 'San Bernardo Road, Subic Bay, Freeport Zone',
            subtitle: 'Address',
            link: 'https://www.google.com/maps?saddr=My+Location&daddr=ACEA+Subic+Beach+Resort+San+Bernardo=Rd+Subic+Bay+Freeport+Zone+2200+Zambales'
        },
        {
            icon: <BsEnvelope size={iconSize} color='#fff' />,
            title: 'reservations @acea.ph',
            subtitle: 'Email',
            link: 'mailto:reservations@acea.ph'
        },
        {
            icon: <BsTelephone size={iconSize} color='#fff' />,
            title: '(047) 252-2232',
            subtitle: 'Landline',
            link: 'tel:(047) 252-2232'
        },
        {
            icon: <BsPhone size={iconSize} color='#fff' />,
            title: '(+63) 917 114 1111',
            subtitle: 'Mobile',
            link: 'tel:+63 917-114-1111'
        }
    ]

const ContactCard = props => {
    const card = props.params;
    return (
        <Card
            sx={{
                backgroundColor: Theme.palette.primary.main,
                height: "34vh",
                position: "relative"
            }}
        >
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    height: "100%",
                    justifyContent: "center",
                    position: "absolute",
                    opacity: .25,
                    width: "100%",
                }}
            >
                {card.icon}
            </Box>
            <Box
                p={2}
                sx={{
                    alignItems: "flex-end",
                    display: "flex",
                    height: "87.55%",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Typography
                        sx={Theme.typography.contactCardTitle}
                    >
                        {card.title}
                    </Typography>
                    <Typography
                        sx={Theme.typography.contactCardSubtitle}
                    >
                        {card.subtitle}
                    </Typography>
                </Box>
            </Box>
        </Card>
    )
},
    ContactUs = () => {
        return (
            <>
                <Grid
                    container
                    p={4}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "block"
                        }}
                    >
                        <Box>
                            <Typography
                                variant="pageTitle"
                            >
                                Contact Us
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="pageSubtitle"
                            >
                                If you have any inquiries, feel free to contact us through the following ways:
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        ml={0}
                        mt={3}

                        sx={{ zIndex: 1 }}
                    >
                        <Grid
                            container
                            spacing={3}
                        >
                            {
                                cards.map((card, index) => (
                                    <Grid
                                        item
                                        key={index}
                                        xs={6}
                                    >
                                        <a
                                            href={card.link}
                                            style={{
                                                all: "unset"
                                            }}
                                        >
                                            <ContactCard
                                                params={card}
                                            />
                                        </a>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: {
                            xs: "fixed",
                            md: "relative"
                        },
                        height: {
                            xs: "100vh",
                            md: "auto",
                        },
                        width: {
                            xs: "100vw",
                            md: "auto",
                        },
                        opacity: {
                            xs: .25,
                            md: 1,
                        },
                        top: {
                            xs: 30,
                            md: "",
                        },
                        left: 0
                    }}>
                        <Box component="img" src={ContactUsImage} sx={{ width: { xs: "90%", md: "70%" } }} />
                    </Grid>
                </Grid>
            </>
        );
    }

export default ContactUs;