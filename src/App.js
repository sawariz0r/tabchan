import React, { useState, useEffect } from 'react';
import Styled from "styled-components";
import './App.css';

import words from "./words";
import ChangeLang from './components/ChangeLang';
import ReportProblem from './components/ReportProblem';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const Container = Styled(motion.div)`
  width: 100vw;
  height: 100vh;
`;

const Card = Styled(motion.div)`
  background: #f3f3f340;
  padding: 30px 60px;
  border-radius: 10px;
  position: relative;

  img {
    filter: invert(100%);
    padding-bottom: 35px;
  }
  transition: transform .2s ease-in-out;

`;

const Word = Styled.p`
  font-size: 40px;
  margin: 0;
  text-transform: capitalize;
  ${props => props.hasKanji && "opacity: 0.8; font-size: 32px"};
  ${props => props.targetLang === "sv" && "font-size: 64px;"}
`;

const Kanji = Styled.h1`
  margin: 0;
  font-size: 72px;
  line-height: 64px;
  padding-bottom: 5px;
`;

const Contact = Styled.div`
  position: absolute;
  bottom: 1vh;
  width: 40%;
  left: 30%;
  text-align: center;
  color: #f3f3f350;
  a {
    color: #f3f3f390;
    text-decoration: none;
    &:hover {
      color: #f3f3f3;
    }
  }
`;

const Forgot = Styled(motion.div)`
  position: absolute;
  width: 150px;
  left: -230px;
  top: 50%; 
  transform: translateY(-50%);
  opacity: 0;
`;
const Remember = Styled(motion.div)`
  position: absolute;
  right: -240px;
  width: 150px;
  top: 50%; 
  transform: translateY(-50%);
  opacity: 0;
`;

const Meaning = Styled.span` opacity: 0.7; font-size: 24px `;
const targetLang = localStorage.getItem("varjedag_lang") || "sv";


const contents = Object.values(words);

function App() {
  const [rIndex, setRIndex] = useState(Math.floor(Math.random() * contents.length))
  const [word, setWord] = useState(contents[rIndex])
  const hasKanji = word && word[targetLang] && word[targetLang].kj !== "-";
  
  useEffect(() => {
    setWord(contents[rIndex]);
  }, [rIndex])

  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "#926868", "#686892", "#679267"
  ]);
  const forgot = useTransform(x, xInput, [
    "1", "0", "0"
  ])
  const remember = useTransform(x, xInput, [
    "0", "0", "1"
  ])
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);

  const newRIndex = () => {
    setRIndex(Math.floor(Math.random() * contents.length));
  }

  const handleDrag = (x, info) => {
    if (info.offset.x > 290) newRIndex();
    if (info.offset.x < -290) newRIndex();
  }

  const keyHandler = ({ key }) => {
    console.log(key);
    if (key === "ArrowRight") {
      x.set(100);
      setTimeout(() => {
        x.set(0)
      }, 250)
  
      setTimeout(() => {
        newRIndex();
      }, 460)
    } else if (key === "ArrowLeft") {
      x.set(-100);
      setTimeout(() => {
        x.set(0)
      }, 250)
  
      setTimeout(() => {
        newRIndex();
      }, 460)
    }
    
  }

  useEffect(() => {
    window.addEventListener("keyup", keyHandler);
    return () => {
      window.removeEventListener("keyup");
    }
  }, [])


  return (
    <motion.div className="App">
      <ChangeLang />
      <ReportProblem word={word.mean} targetLang={targetLang} />
      <Container className="App-header">
        <Card
          onDragEnd={handleDrag}
          drag="x"
          style={{ x, background }}
          dragConstraints={{ left: 0, right: 0 }}
        >
          <img src={`./images/${word.img}.png`} className="App-logo" alt="logo" />
          <Word hasKanji={hasKanji} targetLang={targetLang}>
            {word[targetLang].wd}
          </Word>
          <Kanji>
            {targetLang === "jp" && hasKanji && word[targetLang].kj}
          </Kanji>
          <Meaning>
            {word.mean}
          </Meaning>
          <Forgot style={{ opacity: forgot }}>
            <svg width="150px" viewBox="0 0 400 400">
              <motion.path
                fill="none"
                strokeWidth="20"
                stroke={"#f3f3f3"}
                d="M17,17 L330,330"
                strokeDasharray="0 1"
                style={{ pathLength: crossPathA }}
              />
              <motion.path
                fill="none"
                strokeWidth="20"
                stroke={"#f3f3f3"}
                d="M330,17 L17,330"
                strokeDasharray="0 1"
                style={{ pathLength: crossPathB }}
              />
            </svg>
          </Forgot>
          <Remember style={{ opacity: remember }}>
            <svg width="150px" viewBox="0 0 400 400">
              <motion.path
                fill="none"
                strokeWidth="20"
                stroke={"#f3f3f3"}
                d="M 15 211 L 150 330 L 381 15"
                strokeDasharray="0 1"
                style={{ pathLength: tickPath }}
              />
            </svg>
          </Remember>
        </Card>
      </Container>
      <Contact>Please send your feedback and requests to <a href="mailto:oscar@osuka.dev">oscar@osuka.dev</a>! :)<br />&copy;2020 - <a href="https://osuka.dev" rel="noopener noreferrer" target="_blank">Oscar Nilsson</a> | Icons borrowed by <a rel="noopener noreferrer" target="_blank" href="https://thenounproject.com">The Noun Project</a></Contact>
    </motion.div>
  );
}

export default App;
