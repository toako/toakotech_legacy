import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const introText = "Hi! My name is William Kellermann. I was born in Sacramento, California, " +
"on May 13th, 2001. Being a Gen Z, I grew up in the era of Bionicles, Minecraft, and " +
"Bakugan. If I was to describe myself, I would say that I think linearly and can get " +
"tunnel-visioned easily. This can also play to my advantage as I have no trouble " +
"sitting down and deeply focusing on a goal or task and going to completion. Everyone " +
"I know tells me I am ambitious, to a fault at times, but I am always waiting for the " +
"next big challenge to conquer. It would also be fair to say I am a massive nerd...";
const intrComp = "This one is no secret. I am a programmer! I was introduced to " + 
"computers from an early age. When I was little, I would spend my time infatuated " + 
"with the once very primitive Google Maps, and I would browse around for hours. I began " + 
"playing flash games on the internet around 2nd grade, and a few years later, I got " + 
"into more serious games like Minecraft and Team Fortress 2. The first time I physically "  + 
"messed with computers themselves was in 7th grade when I upgraded the CPU in my crappy" + 
"laptop from a Pentium to a mobile i5 chip. It worked flawlessly, but to be completely " + 
"honest, it didn't do anything for performance. After graduating from middle school, I " + 
"built my first gaming PC for about $800. If I had to guess, I have probably built 20+ " + 
"custom PC's for friends and family. I have my current i3 8350k (yes, I'm cheap) OC'ed " + 
"4.0Ghz to 4.8Ghz stable with a slight voltage increase using a Corsair H80 cooler.";
const intrPrgm = "I've been waiting to talk about this one. This has already been briefly " + 
"covered in the portfolio section of this site. Here we will recap and go a bit more " + 
"in-depth. To begin, I've wanted to be a programmer since 7th grade. Playing Minecraft, " + 
"I began to take interest in mods, which are written in Java, the first \"real\" language " + 
"that I learned. I say \"real\" because the first langauge I learned was Scratch, in my " + 
"7th grade computer applications class. Making mods in Java never really panned out, but " + 
"the important part was that it opened the door for programming being the career path " + 
"I would take in life. After 7th grade, I have taken tons of free time to dabble around " + 
"in different langauges and libraries. I began with making basic websites, small Java " + 
"applications, and text-based adventure JS web games. High school is when everything " + 
"got very serious. I was bussing every morning to the \"Career and Technical Education\" " + 
"program/classes at Centennial High School. The classes were based off the " + 
"first two years of Boise State University Computer Science courses. At BSU, their program " + 
"is based around Java (which I heard has been changing as of recent). There I was able " + 
"to double-reinforce my skills in Java that I was still shaky on from my middle school years. " + 
"I was also introduced to Arduino's and Raspberry Pi's, and now I own a RasPi 4 and 3 Arduinos. " + 
"I guess I'm interested in that stuff too, but I don't spend much time on it because it " + 
"will never provide much for me career-wise. To make a long-story short, after I graduated " + 
"high school, I went to BSU for Computer Science, but left after a semester because I " + 
"realized that I would have better opportunities in doing a certification program mixed " + 
"with working my way up the chain. I started and completed the necessary FreeCodeCamp " + 
"certifications to start applying for JS stack jobs in Boise. I am also working on an " + 
"unannounced game project in Unity, which is another software I have been working with thru " + 
"high school. This is being done in my free time, so it may take several years to complete. " + 
"Stay tuned.";
const intrCar = "I never was interested in cars until the beginning of 2020. I've learned " +
"a decent amount in a short amount of time. The most I have done so far is pull off the head " +
"of my engine and failed miserably! Ha ha. Since I put more time towards programming, I " +
"don't dedicate a lot of time to cars and for now it has been put largely on the backburner. " +
"Anyways, I own a 1995 Mitsubishi Eclipse GSX. It is an absolute blast to drive, as it " +
"utilizes a turbocharged four-cylinder engine mated to a manual transmission and all-wheel " +
"drivetrain. It has the 4g63t 2.0L DOHC turbo engine, which is the same one found in the EVO. " +
"I'm going to leave this section brief for now, as I will have a dedicated page to my car. ";
const goalText = "I have a few goals that I would like to achieve in the upcoming years. My " +
"first and most attainable goal is to be hired on as a full-stack web dev for a company here in Boise. I want to work " +
"with others. My next goal after that is to finish building my game and eventually, if sensible, " +
"release it on Steam. If all goes well, I would use all profits to create a business where " +
"I create artificial intelligence related solutions and products that will benefit the world.";

class About extends React.Component {
    constructor (props) {
        super(props);
        this.state = {};
    }
    render () {
        return (<Container fluid={true}>
            <Row>
                <Col className="col-2 about-legend-panel text-center">
                    <div className="about-stick">
                        <p className="about-legend-title">About Me</p>
                        <button className="about-legend-item" href="">Introduction</button>
                        <button className="about-legend-item" href="">Interests</button>
                        <button className="about-legend-item" href="">Goals</button>
                    </div>
                </Col>
                <Col className="col-10 about-main-panel">
                    <article>
                        <h1 className="about-main-heading">Introduction</h1>
                        <div className="about-main-bar"></div>
                        <h4 className="about-main-text">{introText}</h4>
                    </article>
                    <article>
                        <h1 className="about-main-heading">Interests</h1>
                        <div className="about-main-bar"></div>
                        <h4 className="about-main-text"><span className="about-emph">Computers:</span> {intrComp}</h4>
                            <div className="text-center">
                                <img className="about-main-img" src="/res/about/computers.jpg" alt=""/>
                            </div>
                        <h4 className="about-main-text"><span className="about-emph">Coding:</span> {intrPrgm}</h4>
                            <div className="text-center">
                                <img className="about-main-img" src="/res/about/coding.png" alt=""/>
                            </div>
                        <h4 className="about-main-text"><span className="about-emph">Cars:</span> {intrCar}</h4>
                            <div className="text-center">
                                <img className="about-main-img" src="/res/about/cars.jpg" alt=""/>
                            </div>
                    </article>
                    <article>
                        <h1 className="about-main-heading">Goals</h1>
                        <div className="about-main-bar"></div>
                        <h4 className="about-main-text">{goalText}</h4>
                    </article>
                </Col>
            </Row>
        </Container>);
    }
}

export default About;