import React from 'react';

import '../styles/admin.css';

export default function Admin(props) {

    const [sendDescription, setSendDescription] = React.useState(false);
    const [description, setDescription] = React.useState("");

    const [sendTag, setSendTag] = React.useState(false);
    const [tag, setTag] = React.useState("");
    const [passcode, setPasscode] = React.useState("");

    const [updateDatabase, setUpdateDatabase] = React.useState(false);

    React.useEffect(() => {
      if (updateDatabase) {
        setUpdateDatabase(false);
        const url = `http://localhost:3000/admin/update-database/${passcode}`;
        // const url = 'http://localhost:3000/admin/categories';
        async function sendUpdateDatabaseRequest() {
          await fetch(url, {
            method: "GET",
            mode: "cors",
            credentials: 'include',
          }).then((res) => res.json())
          .then((data) => {
            console.log(data)
          });
        }
        sendUpdateDatabaseRequest();
      } else {
        setUpdateDatabase(false);
      }
    }, [updateDatabase]);

    React.useEffect(() => {
        try {
            if (sendDescription) {
                setSendDescription(false); 
                async function sendNewDescription() {
                    const url = props.root + "/admin/product/description/update";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: 'include',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            passcode: passcode,
                            id: props.currentProduct.id,
                            description: description})
                    }).then((res) => res.json())
                    .then((res) => {
                      console.log(res)});
                }
                sendNewDescription()
            } else {
              setSendDescription(false); 
            }
        } catch(err) {
            console.log(err);
        }
    }, [sendDescription])

    React.useEffect(() => {
      try {
          if (sendTag) {
              setSendTag(false);
              async function sendNewTag() {
                  const url = props.root + "/admin/product/tag/update";
                  await fetch(url, {
                      method: "POST",
                      mode: "cors",
                      credentials: 'include',
                      headers: {
                          "Content-Type":"application/json",
                      },
                      body: JSON.stringify({
                          passcode: passcode,
                          id: props.currentProduct.id,
                          tag: tag})
                  }).then((res) => res.json())
                  .then((res) => {
                    console.log(res)
                  });
              }
              sendNewTag()
          } else {
            setSendTag(false);
          }
      } catch(err) {
          console.log(err);
      }
  }, [sendTag])
  

    function handleDescriptionChange(e) {
      setDescription(e.target.value);
    }

    function handleTagChange(e) {
      setTag(e.target.value);
    }

    return (
        <div className="admin">
          <div className="admin-section">
              <p>Passcode</p>
              <input
                name="passcode"
                onChange={(e) => setPasscode(e.target.value)}
              />
            </div>
          <p>{props.currentProduct ? `Updating ${props.currentProduct.name}, ID ${props.currentProduct.id}` : "No Product Selected"}</p>
            <div className="admin-section">
              <p>Description</p>
              <textarea
                name="description"
                onChange={handleDescriptionChange}
              ></textarea>
              <button className="main-btn" onClick={() => setSendDescription(true)}>Update Description</button>
            </div>
            <div className="admin-section">
              <p>Tags</p>
              <input
                name="description"
                onChange={handleTagChange}
              />
              <button className="main-btn" onClick={() => setSendTag(true)}>Update Tag</button>
            </div>
            <div className="admin-section">
              <button className="main-btn" onClick={() => setUpdateDatabase(true)}>Update Database</button>
            </div>
        </div>
    )
}
