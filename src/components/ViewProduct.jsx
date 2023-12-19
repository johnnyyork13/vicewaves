import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../styles/view-product.css';

export default function ViewProduct(props) {

    const [product, setPageProduct] = React.useState({})
    const [description, setDescription] = React.useState("");
    const [showEditDescription, setShowEditDescription] = React.useState(false);
    const [sendDescription, setSendDescription] = React.useState(false);
    const [variants, setVariants] = React.useState([]);
    const [currentThumbnail, setCurrentThumbnail] = React.useState("");

    React.useEffect(() => {
        try {
            setVariants(props.currentProduct.sync_variants)
            setPageProduct(props.currentProduct);
        } catch(err) {
            console.log(err);
        }
    }, [])

    const mappedVariants = variants.map((variant) => {
        return <option 
                    key={uuidv4()}
                    value={variant.id}
                >{variant.name}</option>
    })

    const testMapped = variants.map((variant) => {
        return <img 
                    src={variant.files[1].preview_url}
                />
    })

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
            <button type="button" onClick={() => props.setPage("home")}>Back</button>
            <button type="button" onClick={() => setShowEditDescription(true)}>Edit</button>
            {showEditDescription && 
                <div><textarea 
                    name="description"
                    onChange={handleDescriptionChange}
                ></textarea>
                <button type="button" onClick={() => setSendDescription(true)}>Update</button>
            </div>}
            <img
                className="view-product-thumbnail" 
                src={product.thumbnail_url} 
            />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <select>
                {mappedVariants}
            </select>
            {testMapped}
        </div>
    )
}