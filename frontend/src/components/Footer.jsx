import ClgLogo from "./images/logo-2.png";
function Footer() {
    const footerStyle = {
      backgroundColor: 'black',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center'
    };
  
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      alignItems: 'center'
    };
  
    const sectionStyle = {
      textAlign: 'center'
    };
  
    const listStyle = {
      listStyle: 'none',
      padding: 0
    };
  
    const listItemStyle = {
      marginBottom: '10px'
    };
  
    const linkStyle = {
      color: 'white',
      textDecoration: 'none'
    };
  
    const gradientBarStyle = {
      background: 'linear-gradient(to right, cyan, blue)',
      height: '4px'
    };
  
    return (
      <footer>
        <div style={footerStyle}>
          <div style={gridStyle}>
            <div style={sectionStyle}>
              <img src={ClgLogo} alt='VVIT' style={{ height: '80px', width: '80px', margin: 'auto' }} />
              <div>Vasireddy Venkatadri Institute<br /> of <br />Technology</div>
            </div>
            <div>
              <ul style={listStyle}>
                <li style={{ ...listItemStyle, textDecoration: 'underline' }}>Useful Links</li>
                <li style={listItemStyle}>Courses</li>
                <li style={listItemStyle}>Admissions</li>
                <li style={listItemStyle}>Departments</li>
                <li style={listItemStyle}>Placements</li>
                <li style={listItemStyle}>Events</li>
              </ul>
            </div>
            <div>
              <ul style={listStyle}>
                <li style={{ ...listItemStyle, textDecoration: 'underline' }}>Get in touch</li>
                <li style={listItemStyle}>9999955555</li>
                <li style={listItemStyle}>9898989898</li>
                <li style={listItemStyle}>vvit@gmail.com</li>
                <li style={listItemStyle}>support.vvit@gmail.com</li>
                <li style={listItemStyle}>principal@vvit.net</li>
              </ul>
            </div>
            <div>
              <ul style={listStyle}>
                <li style={{ ...listItemStyle, textDecoration: 'underline' }}>Social Links</li>
                <li style={listItemStyle}><a href='https://www.facebook.com/vvitgunturofficial/' style={linkStyle}>Facebook</a></li>
                <li style={listItemStyle}><a href='https://twitter.com/acmvvit' style={linkStyle}>Twitter</a></li>
                <li style={listItemStyle}><a href='https://www.instagram.com/vvit__official/?hl=en' style={linkStyle}>Instagram</a></li>
                <li style={listItemStyle}><a href='http://www.youtube.com/@SOCIALVVIT' style={linkStyle}>Youtube</a></li>
                <li style={listItemStyle}><a href='https://in.linkedin.com/school/vasireddy-venkatadri-institute-of-technology-nambur-v-pedakakani-m-pin-522508-cc-bq-/' style={linkStyle}>LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>© 2021 VVIT. All Rights Reserved.</div>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  