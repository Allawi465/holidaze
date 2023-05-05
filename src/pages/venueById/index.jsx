import { Link, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useGetApi } from '../../hooks/index';
import { Helmet } from 'react-helmet-async';
import { Venue, Loading, ErrorMessage } from '../../components';
import { BsChevronLeft } from 'react-icons/bs';

function VenueById() {
  let { id } = useParams();

  const { data, isLoading, isError } = useGetApi(
    `/venues/${id}?_owner=true&_bookings=true`
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="errorMessage">
        <ErrorMessage
          variant="danger"
          text="we are aware of the issues with accessing Holidaze, our team is actively working on it."
        />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{`${data.name} | Holidaze`}</title>
        <meta
          name="description"
          content="Explore and book Venue Name on Holidaze. View photos, read reviews, and check availability to plan your next event."
        />
        <meta
          name="keywords"
          content="Holidaze, venue, bookings, reviews, rentals"
        />
      </Helmet>
      <div>
        <Container className="mt-3">
          <div>
            <Link className="return-Link" to={'/'}>
              <BsChevronLeft className="mb-1 me-2" /> Return Home
            </Link>
          </div>
          <Venue data={data} />
        </Container>
      </div>
    </div>
  );
}

export default VenueById;
