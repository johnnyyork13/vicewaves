import React from 'react';

export default function ViewProduct(props) {

    const [product, setProduct] = React.useState({})
    const [description, setDescription] = React.useState("");
    const [showEditDescription, setShowEditDescription] = React.useState(false);
    const [sendDescription, setSendDescription] = React.useState(false);

    React.useEffect(() => {
        setProduct(props.currentProduct);
    }, []);

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
                            id: product.id,
                            description: description})
                    }).then((res) => res.json())
                    .then((res) => console.log(res));
                }
                sendNewDescription()
            }
        } catch(err) {
            console.log(err);
        }
    }, [sendDescription])

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <div className="product-page">
            <button type="button" onClick={() => setShowEditDescription(true)}>Edit</button>
            {showEditDescription && 
                <div><textarea 
                    name="description"
                    onChange={handleDescriptionChange}
                ></textarea>
                <button type="button" onClick={() => setSendDescription(true)}>Update</button>
            </div>}
            {product.name}
            {product.description}
        </div>
    )
}