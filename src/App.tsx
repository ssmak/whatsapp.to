import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import logo from './images/whatsapp_logo.jpg';

const styles = {
  title: {
    color: '#333',
    fontWeight: 'bold',
  },
  error: {
    border: 'solid 1px #f00',
  },
  description: {
    fontSize: '0.9rem',
    textAlign: 'justify',
  },
  remark: {
    fontSize: '0.7rem',
    textAlign: 'justify',
  },
  copyright: {
    fontSize: '0.5rem',
    textAlign: 'center',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneno: ''
    };

    this.handlePhoneNoChange = this.handlePhoneNoChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleCall = this.handleCall.bind(this);
  }

  handlePhoneNoChange(event) {
    // Check phoneno format
    if (event.target.value === '' || /^\d+$/.test(event.target.value)) {
      // Valid format
      this.setState({
        phoneno: event.target.value,
      });
    }
  }

  handleEnter(event) {
    // Check if `Enter` is pressed
    if(event.keyCode === 13) {
      // `Enter` key
      window.open(`https://wa.me/${this.state.phoneno}`);
    }
  }

  handleCall(event) {
    window.open(`https://wa.me/${this.state.phoneno}`);
  }

  render() {
    return (
      <div className="container d-flex flex-column justify-content-center">
        <div className="text-center">
          <img src={logo} className="img-fluid" />
        </div>
        <h1 style={styles.title} className="text-center">Whatsapp.to</h1>
        <div className="d-flex flex-column mt-2">
          <input type="tel" name="phoneno" className="form-control" placeholder="Phone number /w country code" value={this.state.phoneno} onChange={this.handlePhoneNoChange} onKeyUp={this.handleEnter} />
          <button className="btn btn-primary mt-2" onClick={this.handleCall}>Call</button>
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-center" data-toggle="collapse" href="#app-description" role="button" aria-expanded="false" aria-controls="collapseExample">
            <div style={{ cursor: 'pointer' }}>About&nbsp;<span className="text-primary font-weight-light" style={{ textDecoration: 'underline' }}>Whatsapp.to</span></div>
          </div>
          <div className="collapse" id="app-description">
            <div style={styles.description}>
              <span className="text-primary">Whatsapp.to</span> feature allows you to begin a chat with someone without having their phone number saved in your phone's address book. As long as you know this person’s phone number, you can place the phone number here that will allow you to start a chat with them. By clicking the 'Call' button, a chat with the person automatically opens. This feature works on both your phone and WhatsApp Web.
          </div>
            <div className="mt-2" style={styles.remark}>
              *A full phone number in international format. Omit any zeroes, brackets or dashes when adding the phone number in international format.  Please keep in mind that this phone number must have an active account on WhatsApp.
          </div>
          </div>
          <div className="mt-4" style={styles.copyright}>
            Project from <a className="font-weight-bold" href="https://github.com" target="_blank">Github</a>.<br />
            Source from <a href="https://github.com/ssmak/whatsapp.to" target="_blank">https://github.com/ssmak/whatsapp.to</a> by <a className="text-success" href="https://github.com/ssmak" target="_blank">@ssmak</a>.
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
