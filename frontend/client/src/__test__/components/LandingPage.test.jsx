import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../../components/LandingPageComponent/Navbar";

describe('Navbar Componet', () => {
    test('render the logo, button login singup', () => {
        render(<Navbar/>)
    })
})