import { Container } from "react-bootstrap"

function Footer() {
    return (
        <Container>
            <div className="footer-links">
                <a href="https://americancomposers.org/about-aco/">About Us</a>
                <a href="https://americancomposers.org/privacy-policy/">Privacy Policy and Disclaimer</a>
                <a href="https://americancomposers.org">Parent Site</a>
            </div>
        </Container>
    )
}

export default Footer