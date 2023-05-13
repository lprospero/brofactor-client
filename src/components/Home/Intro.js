import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Intro = () => {

    const settings = {
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: null,
        nextArrow: null,
        arrows: false
    };

    return (
        <div className="bro-intro">
            <Slider {...settings}>
                <div>
                    <div className="bro-intro-text">
                        <span className="bro-b">Receive</span><br /><strong>kudos</strong>
                    </div>
                    <div className="bro-intro-img">
                        <img src={process.env.PUBLIC_URL + "/assets/my_awards.png"}/>
                    </div>
                </div>
                <div>
                    <div className="bro-intro-text">
                        <span className="bro-b">Create</span><br /><strong>badges</strong>
                    </div>
                    <div className="bro-intro-img">
                        <img src={process.env.PUBLIC_URL + "/assets/create_awards.png"}/>
                    </div>
                </div>
                <div>
                    <div className="bro-intro-text">
                        <span className="bro-b">Give</span><br /><strong>awards</strong>
                    </div>
                    <div className="bro-intro-img">
                        <img src={process.env.PUBLIC_URL + "/assets/send_awards.png"}/>
                    </div>
                </div>
            </Slider>
            <br /><br />
            Try it now! Log in as <span className="bro-b" style={{ fontFamily: "Courier New" }}>user1@domain.com|password</span> to explore the application.
        </div>
    );

}

export default Intro;