import React from 'react';
import Table from 'react-bootstrap/Table';

function Log() {
    const [entry, setEntry] = React.useState([]);
    const backendUrl = 'http://' + process.env.BACKEND_HOST + ':' + process.env.BACKEND_PORT;
    const getData = async () => {
            const response = await fetch(backendUrl);
            setEntry(await response.json());
    }
    React.useEffect(() => {
            getData();
    }, []);

    return (
            <div>
            <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Input Text (日本語)</th>
                              <th>Translated Text (English)</th>
                            </tr>
                          </thead>
            {entry.map(e => {
                return (<tbody>
                          <tr>
                            <td>{e.id}</td>
                            <td>{e.japinput}</td>
                            <td>{e.engoutput}</td>
                          </tr>
                        </tbody>
                );
            })}
            </Table>
            </div>
    );
}

export default Log;
