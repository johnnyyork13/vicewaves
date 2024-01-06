import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../styles/admin.css';
import Card from './Card';

export default function Admin(props) {

    const [updateDatabase, setUpdateDatabase] = React.useState(false);
    const [updatedProduct, setUpdatedProduct] = React.useState(null)
    const [sendProductUpdate, setSendProductUpdate] = React.useState(false);
    const [getMissingCategories, setGetMissingCategories] = React.useState(false);
    const [productsWithMissingCategories, setProductsWithMissingCategories] = React.useState([])

    React.useEffect(() => {
        setUpdatedProduct(props.currentProduct)
        try {
          async function getProductsWithMissingCategories() {
            const url = props.root + '/admin/product/missing';
            await fetch(url, {
              method: "GET",
              mode: "cors",
              credentials: "include"
            }).then((res) => res.json())
            .then((res) => {
              setProductsWithMissingCategories(res);
              setGetMissingCategories(false);
            })
            .catch((err) => {
              console.log(err)
              setGetMissingCategories(false);
            });
          }
          getProductsWithMissingCategories();
        } catch(err) {
          console.log(err);
        }
    }, [props.currentProduct])

    React.useEffect(() => {
      if (sendProductUpdate) {
        try {
          async function updateProductInDatabase() {
            const url = props.root + '/admin/product/update';
            await fetch(url, {
              method: "POST",
              mode: "cors",
              credentials: "include",
              headers: {
                "Content-Type":"application/json",
              },
              body: JSON.stringify(updatedProduct)
            }).then((res) => res.json())
            .then((res) => {
              console.log(res);
              setSendProductUpdate(false);
              props.setCurrentProduct(updatedProduct);
            }).catch((err) => {
              console.log(err);
              setSendProductUpdate(false);
            })
          }
          updateProductInDatabase();
        } catch(err) {
          console.log(err);
        }
      }
    }, [sendProductUpdate])

    React.useEffect(() => {
      if (updateDatabase) {
        setUpdateDatabase(false);
        const url = props.root + '/admin/update-database'
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

    function handleAdminInputChange(e) {
      setUpdatedProduct((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }

    function handleAdminInputSubmit() {
      setSendProductUpdate(true);
    }
    
    const uniqueMissingProducts = [];
    for (const key in productsWithMissingCategories) {
      for (const product of productsWithMissingCategories[key]) {
        let productInArray = false;
        uniqueMissingProducts.forEach((e) => {
          if (e.id === product.id) {
            productInArray = true;
          }
        })
        if (!productInArray) {
          uniqueMissingProducts.push(product);
        }
      }
    }

    const mappedUniqueMissingProducts = uniqueMissingProducts.map((product) => {
      return <div onClick={() => props.setCurrentProduct(product)} key={uuidv4()} className="missing-product-card">
          <div className="missing-product-card-header-container">
            {!product.description && <p className="missing-product-card-header">Missing Description</p>}
            {!product.tag && <p className="missing-product-card-header">Missing Tag</p>}
            {!product.main_category && <p className="missing-product-card-header">Missing Main-Cat</p>}
            {!product.sub_category && <p className="missing-product-card-header">Missing Sub-Cat</p>}
          </div>
          <Card 
            product={product}
            setCurrentProduct={props.setCurrentProduct}
            // setPage={props.setPage}
          />
      </div>
    })

    return (
        <div className="admin">
            <div className="admin-main-section">
              <div className="admin-sidebar">
                {updatedProduct && <>
              <p>{`Updating ${props.currentProduct.name}`}</p>
              <p>{`ID ${props.currentProduct.id}`}</p>
                <Card
                  product={props.currentProduct}
                  setCurrentProduct={props.setCurrentProduct}
                  setPage={props.setPage}
                /> </>}
              </div>
              <div className="admin-main">
                  <div className="admin-section">
                    <button className="main-btn update-database-btn" onClick={() => setUpdateDatabase(true)}>Update Database</button>
                  </div>
                  {updatedProduct && <> <div className="admin-section">
                    <p>Description</p>
                    <textarea
                      name="description"
                      onChange={handleAdminInputChange}
                      value={updatedProduct.description ? updatedProduct.description : ""}
                    ></textarea>
                  </div>
                  <div className="admin-section">
                    <p>Tags</p>
                    <input
                      name="tag"
                      onChange={handleAdminInputChange}
                      value={updatedProduct.tag ? updatedProduct.tag : ""}
                    />
                  </div>
                  <div className="admin-section">
                    <p>Main Category</p>
                    <input
                      name="main_category"
                      onChange={handleAdminInputChange}
                      value={updatedProduct.main_category ? updatedProduct.main_category : ""}
                    />
                  </div>
                  <div className="admin-section">
                    <p>Sub Category</p>
                    <input
                      name="sub_category"
                      onChange={handleAdminInputChange}
                      value={updatedProduct.sub_category ? updatedProduct.sub_category : ""}
                    />
                    <button className="main-btn" onClick={handleAdminInputSubmit}>Update Product</button>
                  </div>
                  </>}
              </div>
            </div>

            <div className="admin-missing-section">
              <div className="admin-missing-category-buttons-container">
              </div>
              <p className="admin-missing-section-header">Products with Missing Information</p>
              <div className="unique-missing-cards-container">
                {mappedUniqueMissingProducts}
              </div>
            </div>
          </div>
    )
}
