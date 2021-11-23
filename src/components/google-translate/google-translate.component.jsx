import React, { useEffect } from "react";
import { Box } from "@mui/material";
import "./google-translate.styles.css";

const GoogleTranslate = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
            pageLanguage: 'en',
        },
            'google_translate_element')
    };

    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return <>
        <Box id="google_translate_element"></Box>
    </>
}

export default GoogleTranslate;