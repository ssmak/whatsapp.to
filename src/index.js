import React from "react";
import ReactDOM from "react-dom";
import "./style/main.scss";

const styles = {
  title: {
    color: '#333',
    fontWeight: 'bold',
  },
};

class App extends React.Component {
  render() {
    return (
      <div className="container d-flex flex-column justify-content-center">
        <h1 style={styles.title}>Whatsapp.to</h1>
        <div className="d-flex flex-column mt-2">
          <input type="tel" className="form-control" placeholder="Phone number /w country code" />
          <button className="btn btn-primary mt-2" onClick={() => { console.log('call') }}>Call</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
