import React from 'react';

import '../styles/admin.css';

export default function Admin(props) {

    const [sendDescription, setSendDescription] = React.useState(false);
    const [description, setDescription] = React.useState("");

    const [sendTag, setSendTag] = React.useState(false);
    const [tag, setTag] = React.useState("");

    const [updateDatabase, setUpdateDatabase] = React.useState(false);

    React.useEffect(() => {
      if (updateDatabase) {
        const url = "http://localhost:3000/admin/update-database"
        // const url = 'http://localhost:3000/admin/categories';
        async function sendUpdateDatabaseRequest() {
          await fetch(url, {
            method: "GET",
            mode: "cors",
          }).then((res) => res.json())
          .then((data) => {
            setUpdateDatabase(false);
            console.log(data)
          });
        }
        sendUpdateDatabaseRequest();
      }
    }, [updateDatabase]);

    React.useEffect(() => {
        try {
            if (sendDescription) {
                async function sendNewDescription() {
                    const url = props.root + "/admin/product/description/update";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            id: props.currentProduct.id,
                            description: description})
                    }).then((res) => res.json())
                    .then((res) => {
                      setSendDescription(false); 
                      console.log(res)});
                }
                sendNewDescription()
            }
        } catch(err) {
            console.log(err);
        }
    }, [sendDescription])

    React.useEffect(() => {
      try {
          if (sendTag) {
              async function sendNewTag() {
                  const url = props.root + "/admin/product/tag/update";
                  await fetch(url, {
                      method: "POST",
                      mode: "cors",
                      headers: {
                          "Content-Type":"application/json",
                      },
                      body: JSON.stringify({
                          id: props.currentProduct.id,
                          tag: tag})
                  }).then((res) => res.json())
                  .then((res) => {
                    setSendTag(false);
                    console.log(res)
                  });
              }
              sendNewTag()
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
          <p>{props.currentProduct ? `Updating ${props.currentProduct.name}, ID ${props.currentProduct.id}` : "No Product Selected"}</p>
            <div className="admin-section">
              <p>Description</p>
              <textarea
                name="description"
                onChange={handleDescriptionChange}
              ></textarea>
              <button onClick={() => setSendDescription(true)}>Update Description</button>
            </div>
            <div className="admin-section">
              <p>Tags</p>
              <input
                name="description"
                onChange={handleTagChange}
              />
              <button onClick={() => setSendTag(true)}>Update Tag</button>
            </div>
            <div className="admin-section">
              <button onClick={() => setUpdateDatabase(true)}>Update Database</button>
            </div>
        </div>
    )
}
