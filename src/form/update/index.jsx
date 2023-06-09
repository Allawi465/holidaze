import { useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetApi } from '../../hooks';
import useApiActions from '../../hooks/api/useApiActions';
import CreateForm from '../create/createForm';

/**
 * Renders a update form component with validation and error handling
 * @component
 * @property {function} OnFormSubmit A function to handle inputs through API call'
 * @property {function} useGetApi A hook for get API
 * @property {function} useApiActions A hook for fetching data from an API endpoint and handling loading state
 * @property {boolean} isLoading True if API request is loading, false otherwise
 * @property {function} fetchData Function to fetch data from an API endpoint
 * @property {function} CreateForm Function to render form fields
 * @returns {React.ReactElement} update form component
 * @example
 * <UpdateVenue />
 */

function UpdateVenue() {
  let { id } = useParams();
  const [defaultValues, setDefaultValues] = useState({});
  const { data } = useGetApi(`/venues/${id}?_owner=true&_bookings=true`);

  useEffect(() => {
    if (data) {
      const updatedDefaultValues = {
        name: data.name || '',
        description: data.description,
        price: data.price,
        maxGuests: data.maxGuests,
        rating: data.rating,
        meta: {
          wifi: data.meta?.wifi || false,
          parking: data.meta?.parking || false,
          breakfast: data.meta?.breakfast || false,
          pets: data.meta?.pets || false,
        },
        location: data.location || {
          country: '',
          address: '',
          city: '',
          zip: '',
        },
      };
      setDefaultValues(updatedDefaultValues);
    }
  }, [data]);

  // Authentication and API data handling
  const { isLoading, fetchData } = useApiActions();

  // navigate with useNavigate
  const navigate = useNavigate();

  // State for error message
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Handler form submission
   * @async
   * @param {object} formData Form data
   */

  const OnFormSubmit = async (formData, media) => {
    const {
      name,
      description,
      price,
      maxGuests,
      rating,
      wifi,
      parking,
      breakfast,
      pets,
      address,
      city,
      zip,
      country,
    } = formData;

    const venueData = {
      name: name,
      description: description,
      media: [...media, formData.media],
      price: parseInt(price),
      maxGuests: parseInt(maxGuests),
      rating: parseInt(rating),
      meta: {
        wifi: wifi,
        parking: parking,
        breakfast: breakfast,
        pets: pets,
      },
      location: {
        address: address,
        city: city,
        zip: zip,
        country: country,
      },
    };

    // Call API to update venue
    const update = await fetchData(`/venues/${id}`, {
      method: 'put',
      body: JSON.stringify(venueData),
    });
    // Set error message if API response haves an error
    if (update.isError) {
      setErrorMessage(update.isError);
    } else {
      // Set the ID of the update venue to navigate path
      const { id } = update.data;
      navigate(`/venue/${id}`, { replace: true });
      setErrorMessage('');
    }
  };

  return (
    <>
      <CreateForm
        OnFormSubmit={OnFormSubmit}
        isLoading={isLoading}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        defaultValues={defaultValues}
        btnText={'Update now'}
      />
    </>
  );
}

export default UpdateVenue;
