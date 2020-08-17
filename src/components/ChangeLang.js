import React, { useState } from 'react'
import Styled from "styled-components";
import CountryFlag from "react-country-flag";

const LangButtons = Styled.div`
    position: absolute;
    bottom: 1vh;
    left: 1vw;
    display: flex;
    flex-direction: column-reverse;

    span {
        position: absolute;
        top: -24px;
        width: 20vw;
        left: 0;
        text-align: left;
        color: #f3f3f3;
    }
`;

const Flag = Styled(CountryFlag)`
    border: none;
    color: #f3f3f3;
    cursor: pointer;
    margin: 5px;
    opacity: 0.6;
    ${props => props.isCurrentLang && `
        opacity: 1;
    `}
    &:hover {
        opacity: 1;
    }
`;

const FlagList = Styled.div`
    display: flex;
    flex-direction: column;
    display: none;
    margin-bottom: 10px;
    position: relative;
    &::after {
        top: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136, 183, 213, 0);
        border-top-color: #111;
        border-width: 10px;
        margin-left: -10px;
    }
`;
const CurrentFlag = Styled.div`
    &:hover ${FlagList} {
        display: flex;
        background: #111    ;
        border-radius: 5px;
    }
`;

const ChangeLang = () => {
    const [lang, setLang] = useState(null);
    const langList = [{ flagCode: "se", code: "sv" }, { flagCode: "jp", code: "jp" }];

    const flagList = { sv: "se", jp: "jp" };

    const changeLang = (lang) => {
        localStorage.setItem("varjedag_lang", lang);
        setLang({});
    }

    const currentLang = localStorage.getItem("varjedag_lang");

    return (
        <LangButtons>
            <CurrentFlag>
                <FlagList>
                    {langList.map(x => {
                        return (
                            <Flag
                                onClick={() => changeLang(x.code)}
                                countryCode={x.flagCode}
                                style={{ height: "30px", width: "40px", borderRadius: "3px" }}
                                svg />
                        )
                    })}
                </FlagList>
                <Flag
                    isCurrentLang={true}
                    countryCode={flagList[currentLang]}
                    style={{ height: "30px", width: "40px", borderRadius: "3px" }}
                    svg />

            </CurrentFlag>
        </LangButtons>
    )
}

export default ChangeLang
