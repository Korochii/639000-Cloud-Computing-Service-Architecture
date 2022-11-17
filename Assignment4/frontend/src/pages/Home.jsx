import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import * as minio from 'minio';

function Home() {
    const [data, setData] = React.useState(null);
    const [firstImage, setFirstImage] = React.useState(null);
    const [secondImage, setSecondImage] = React.useState(null);
    const [buttonToggle, setButtonToggle] = React.useState(false);
    const backendUrl = 'http://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT;

    const handleSubmit = (e) => {
      e.preventDefault();
      var formData = new FormData();
      formData.append('data', data);
      setData("");
      axios.post(backendUrl, formData)
            .then(function (response) {
              console.log(response);
            });
    };

    const handleCharts = () => {
        if (buttonToggle) {
                var element = document.getElementById('chart');
                while (element.firstChild) {
                        element.removeChild(element.firstChild);
                }
                setButtonToggle(false);
        } else {
                var hira = document.createElement("img");
                hira.src = firstImage;
                hira.width = "700";
                document.getElementById('chart').appendChild(hira);
                var kata = document.createElement("img");
                kata.src = secondImage;
                kata.width = "700";
                document.getElementById('chart').appendChild(kata);
                setButtonToggle(true);
        }
    };

    const getBuckets = async () => {
        // create the client
        const mc = new minio.Client({
          endPoint: process.env.MINIO_HOST,
          port: process.env.MINIO_PORT,
          useSSL: false,
          accessKey: "minioadmin",
          secretKey: "minioadmin"
        });
        mc.presignedGetObject("buckets", "hiragana.jpg", function(err, presignedUrl) {
                if (err) {return console.log(err);}
                console.log(presignedUrl);
                setFirstImage(presignedUrl);
        });
        mc.presignedGetObject("buckets", "katakana.jpg", function(err, presignedUrl) {
                if (err) {return console.log(err);}
                console.log(presignedUrl);
                setSecondImage(presignedUrl);
        });
      };

    React.useEffect(() => {
      getBuckets();
    }, []);

    return (
      <>
      <Form id="form" onSubmit={handleSubmit}>
        <Form.Group className="formInput" controlId="formInput">
          <Form.Label>What have you learnt today?</Form.Label>
          <Form.Control name="input" as="textarea" rows={3} placeholder="Type here~" value={data} onChange={ (event) => setData(event.target.value)}/>
          <Form.Text className="text-muted">
            Enter a new japanese character/phrase you have encountered!
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <p></p>
        <Button variant="info" onClick={handleCharts}>
                Click here to view the Hiragana/Katakana Charts!
        </Button>
        <div id="chart">
        </div>
      </>
    );
}

export default Home;
