function About() {
    return (
        <div className="about">
            <div className="about-background">
                <h1 className="about-bg-text">About Us</h1>
            </div>
            <div className="container">
                <h2 className="about-title"></h2>
                <div className="row">
                    <div class="col-md-6 about-left">
                        <div className="about-pitch">
                            <h5 className="pitch-text">Team Galactus</h5>
                            <p className="pitch-text1">As a warehouse manager, have you ever found it difficult to manage inventory? With your expertise, I’m sure you’re well aware that mismanagement of inventory can lead to large losses of revenue, either through expired products, lack of available storage space, or not having enough product to meet demand.

                            <br /><br /> Our Dunder Mifflin Warehouse application (DMW) is YOUR solution to efficient warehouse optimization. DMW allows you to easily view and edit your inventory, and sends automatic updates to vendors when product runs low.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6 about-right">
                        <div className="about-right-img"></div>
                    </div>
                    <div class="clearfix"> </div>
                </div>
            </div>
        </div>

    );
}

export default About;