import React from 'react';
import Alert from "react-bootstrap/Alert";


const Greeting = () => {
    return (
        <Alert variant="success">
            <Alert.Heading>Welcome to Sniffer Dog</Alert.Heading>
            <p>
                This is Milo&apos;s portfolio website.
            </p>
            <hr />
            <p className="mb-0">
                All the sources of perfumes, pictures are from <a href='https://www.fragrantica.com/'>Fragrantica</a> and <a href='https://www.fragrancex.com/'>FragranceX</a>.
            </p>
        </Alert>
    )
}

export default Greeting
