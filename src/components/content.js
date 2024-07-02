import React, { useEffect, useState } from "react";
import axios from "axios";

function Content() {
    const [data, setData] = useState(null);
    const apiEndpoint = `http://{process.env.API_SERVICE_SERVICE_HOST}:3001`;

    useEffect(() => {
        const url = apiEndpoint + "/notification";
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                document.getElementById("err").innerHTML = "Could not fetch data";
                console.error(error);
            });
    }, []);

    const deleteNotification = (email, url) => {
        document.getElementById("err").innerHTML = "";
        axios
            .delete(apiEndpoint + "/notification/byemailurl", { data: { email, url } })
            .then(() => {
                let newData = data.filter((item) => item.email !== email || item.url !== url);
                setData(newData);
            })
            .catch((error) => {
                document.getElementById("err").innerHTML = "Could not delete notification";
                console.error(error);
            });
    };

    const deleteAllNotifications = () => {
        document.getElementById("err").innerHTML = "";
        axios
            .delete(apiEndpoint + "/notification")
            .then(() => {
                setData([]);
            })
            .catch((error) => {
                document.getElementById("err").innerHTML = "Could not delete notifications";
                console.error(error);
            });
    };

    const addNotification = (e) => {
        document.getElementById("err").innerHTML = "";
        e.preventDefault();
        const url = document.getElementById("url").value;
        const email = document.getElementById("email").value;
        axios
            .post(apiEndpoint + "/notification", { url, email })
            .then((response) => {
                let newData = [...data, { url, email }];
                setData(newData);
            })
            .catch((error) => {
                document.getElementById("err").innerHTML = "Could not add notification";
                console.error(error);
            });
        document.getElementById("url").value = "";
    };

    return (
        <div className="content">
            <form>
                <div>
                    <label>
                        Url to monitor:
                        <input type="text" name="url" id="url" />
                    </label>
                </div>
                <div>
                    <label>
                        Email to notify:
                        <input type="text" name="email" id="email" />
                    </label>
                </div>

                <button value="Submit" onClick={addNotification}>
                    Create
                </button>
                <button value="clear" onClick={deleteAllNotifications}>
                    Clear
                </button>
            </form>
            <div>
                <span id="err" className="error"></span>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.url}</td>
                                <td>
                                    <button
                                        onClick={() => deleteNotification(item.email, item.url)}
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default Content;
