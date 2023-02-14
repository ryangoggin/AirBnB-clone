import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../../store/spot";
import './CreateSpot.css';


function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [image2Url, setImage2Url] = useState("");
    const [image3Url, setImage3Url] = useState("");
    const [image4Url, setImage4Url] = useState("");
    const [image5Url, setImage5Url] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const sessionUser = useSelector(state => state.session.user);

    // redirect to / if no user logged in
    if (sessionUser === null) history.push(`/`);

    useEffect(() => {
      const errors = {};

      if (country === "") {
        errors.country = "Country is required";
      }
      if (address === "") {
        errors.address = "Address is required";
      }
      if (city === "") {
        errors.city = "City is required";
      }
      if (state === "") {
        errors.state = "State is required";
      }
      if (lat === "") {
        errors.lat = "Latitude is required";
      }
      if (lng === "") {
        errors.lng = "Longitude is required";
      }
      if (description.length < 30) {
        errors.description = "Description needs a minimum of 30 characters";
      }
      if (name === "") {
        errors.name = "Name is required";
      }
      if (price === "") {
        errors.price = "Price is required";
      }
      if (previewUrl === "") {
        errors.previewUrl = "Preview image is required";
      }
      if (!(previewUrl.endsWith(".png") || previewUrl.endsWith(".jpg") || previewUrl.endsWith(".jpeg"))) {
        errors.previewUrlEnd = "Image URL must end in .png, .jpg, or .jpeg";
      }
      // additional images are optional, check they've been filled in before validating
      if (image2Url) {
        if (!(image2Url.endsWith(".png") || image2Url.endsWith(".jpg") || image2Url.endsWith(".jpeg"))) {
          errors.image2Url = "Image URL must end in .png, .jpg, or .jpeg";
        }
      };
      if (image3Url) {
        if (!(image3Url.endsWith(".png") || image3Url.endsWith(".jpg") || image3Url.endsWith(".jpeg"))) {
          errors.image3Url = "Image URL must end in .png, .jpg, or .jpeg";
        }
      };
      if (image4Url) {
        if (!(image4Url.endsWith(".png") || image4Url.endsWith(".jpg") || image4Url.endsWith(".jpeg"))) {
          errors.image4Url = "Image URL must end in .png, .jpg, or .jpeg";
        }
      };
      if (image5Url) {
        if (!(image5Url.endsWith(".png") || image5Url.endsWith(".jpg") || image5Url.endsWith(".jpeg"))) {
          errors.image5Url = "Image URL must end in .png, .jpg, or .jpeg";
        }
      };

      setErrors(errors);
    }, [country, address, city, state, lat, lng, description, name, price, previewUrl, image2Url, image3Url, image4Url, image5Url]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      // track if submit has been pressed for error showing
      setHasSubmitted(true);

      const newSpot = {
        country,
        address,
        city,
        state,
        lat,
        lng,
        description,
        name,
        price,
        Owner: {
            id: sessionUser.id,
            firstName: sessionUser.firstName,
            lastName: sessionUser.lastName
        }
      }

      const spotImages = [{url: previewUrl, preview: true}];
      if (image2Url) {
        spotImages.push({url: image2Url, preview: false});
        if (!image2Url.endsWith(".png") || !image2Url.endsWith(".jpg") || !image2Url.endsWith(".jpeg")) {
          let updatedValue = {"image2Url": "Image URL must end in .png, .jpg, or .jpeg"};
          setErrors(errors => ({
            ...errors,
            ...updatedValue
          }));
        }
      };
      if (image3Url) {
        spotImages.push({url: image3Url, preview: false});
        if (!image3Url.endsWith(".png") || !image3Url.endsWith(".jpg") || !image3Url.endsWith(".jpeg")) {
          let updatedValue = {"image3Url": "Image URL must end in .png, .jpg, or .jpeg"};
          setErrors(errors => ({
            ...errors,
            ...updatedValue
          }));
        }
      };
      if (image4Url) {
        spotImages.push({url: image4Url, preview: false});
        if (!image4Url.endsWith(".png") || !image4Url.endsWith(".jpg") || !image4Url.endsWith(".jpeg")) {
          let updatedValue = {"image4Url": "Image URL must end in .png, .jpg, or .jpeg"};
          setErrors(errors => ({
            ...errors,
            ...updatedValue
          }));
        }
      };
      if (image5Url) {
        spotImages.push({url: image5Url, preview: false});
        if (!image5Url.endsWith(".png") || !image5Url.endsWith(".jpg") || !image5Url.endsWith(".jpeg")) {
          let updatedValue = {"image5Url": "Image URL must end in .png, .jpg, or .jpeg"};
          setErrors(errors => ({
            ...errors,
            ...updatedValue
          }));
        }
      };

      // do not dispatch anything if there are errors
      if (Object.keys(errors).length > 0) {
        window.alert("Fix errors before creating spot!");
        console.log(errors);
        return
      };

      if (newSpot) {
        const newSpotWithId = await dispatch(createSpot(newSpot, spotImages));

        setHasSubmitted(false);

        history.push(`/spots/${newSpotWithId.id}`);
      }

      setCountry("");
      setAddress("");
      setCity("");
      setState("");
      setLat("");
      setLng("");
      setDescription("");
      setName("");
      setPrice("");
      setPreviewUrl("");
      setImage2Url("");
      setImage3Url("");
      setImage4Url("");
      setImage5Url("");
    };

    return (
      <div className="create-spot-container">
        <form className="create-spot-form" onSubmit={handleSubmit}>
          <h1 className="form-text form-header">Create a Spot</h1>
          <div className="first-section">
            <h2 className="section-header"> Where's your place  located?</h2>
            <p className="section-description"> Guests will only get your exact address once they booked a reservation. </p>
            {/* <ul>
                {errors.map((error, idx) => <li key={idx} className="errors">{error}</li>)}
            </ul> */}
            <label className="form-text" htmlFor='country'>
            Country {<span className={hasSubmitted ? "error" : "hidden"}>{errors.country}</span>}
            </label>
                <input
                type="text"
                id="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                />
            <label className="form-text">
                Street Address {<span className={hasSubmitted ? "error" : "hidden"}>{errors.address}</span>}
            </label>
                <input
                type="text"
                placeholder="State"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />

            <div className="city-state">
                <div className="city">
                  <label className="form-text">
                      City {<span className={hasSubmitted ? "error" : "hidden"}>{errors.city}</span>}
                  </label>
                      <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      />
                </div>
                <p className="comma">,</p>
                <div className="state">
                  <label className="form-text">
                      State {<span className={hasSubmitted ? "error" : "hidden"}>{errors.state}</span>}
                  </label>
                      <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      />
                </div>
            </div>
            <div className="lat-long">
                <div className="lat">
                  <label className="form-text">
                      Latitude {<span className={hasSubmitted ? "error" : "hidden"}>{errors.lat}</span>}
                  </label>
                      <input
                      type="text"
                      placeholder="Latitude"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                      />
                </div>
                <p className="comma">,</p>
                <div className="lng">
                  <label className="form-text">
                      Longitude {<span className={hasSubmitted ? "error" : "hidden"}>{errors.lng}</span>}
                  </label>
                      <input
                      type="text"
                      placeholder="Longitude"
                      value={lng}
                      onChange={(e) => setLng(e.target.value)}
                      />
                </div>
            </div>
          </div>
          <div className="second-section">
            <h2 className="section-header"> Describe your place to guests </h2>
            <p className="section-description"> Mention the best features your space, any special amentities like fast wifi or parking, and what you love about the neighborhood. </p>
            <textarea
                className="description"
                placeholder="Please write at least 30 characters"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {<span className={hasSubmitted ? "error" : "hidden"}>{errors.description}</span>}
          </div>
          <div className="third-section">
            <h2 className="section-header"> Create a name for your spot </h2>
            <p className="section-description"> Catch guests' attention with a spot name that highlights what makes your place special. </p>
            <input
                type="text"
                placeholder="Name of your spot"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {<span className={hasSubmitted ? "error" : "hidden"}>{errors.name}</span>}
          </div>
          <div className="fourth-section">
            <h2 className="section-header"> Set a base price for your spot </h2>
            <p className="section-description"> Competitive pricing can help your listing stand out and rank higher in search results. </p>
            <div className="pricing-input">
                <p className="dollar-sign">$</p>
                <input
                    type="text"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            {<span className={hasSubmitted ? "error" : "hidden"}>{errors.price}</span>}
          </div>
          <div className="fifth-section">
            <h2 className="section-header"> Liven up your spot with photos </h2>
            <p className="section-description"> Submit a link to at least one photo to publish your spot. </p>
            <input
                type="text"
                placeholder="Preview Image URL"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
            />
            <div className="previewImageError">
              {<span className={hasSubmitted ? "error" : "hidden"}>{errors.previewUrl}</span>}
              {<span className={hasSubmitted ? "error" : "hidden"}>{errors.previewUrlEnd}</span>}
            </div>
            <input
                type="text"
                placeholder="Image URL"
                value={image2Url}
                onChange={(e) => setImage2Url(e.target.value)}
            />
            {<span className={hasSubmitted ? "error" : "hidden"}>{errors.image2Url}</span>}
            <input
                type="text"
                placeholder="Image URL"
                value={image3Url}
                onChange={(e) => setImage3Url(e.target.value)}
            />
            {<span className={hasSubmitted ? "error" : "hidden"}>{errors.image3Url}</span>}
            <input
                type="text"
                placeholder="Image URL"
                value={image4Url}
                onChange={(e) => setImage4Url(e.target.value)}
            />
            {<span className={hasSubmitted ? "error" : "hidden"}>{errors.image4Url}</span>}
            <input
                type="text"
                placeholder="Image URL"
                value={image5Url}
                onChange={(e) => setImage5Url(e.target.value)}
            />
            {<span className={hasSubmitted ? "error" : "hidden"}>{errors.image5Url}</span>}
          </div>
          <div className="create-spot-button-container">
          <button className="create-spot-button form-text" type="submit">Create Spot</button>
          </div>
        </form>
      </div>
    );
  }

  export default CreateSpotForm;
