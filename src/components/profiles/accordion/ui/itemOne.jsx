import { Link } from 'react-router-dom';
import { Col, Row, Accordion } from 'react-bootstrap';
import { useModel } from '../../../../hooks/index';
import { CancelBookingsModel } from '../../../index';
import defaultImages from '../../../../images/default.jpg';
import { AiFillHeart } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';
import { MdGroup } from 'react-icons/md';
import format from 'date-fns/format';

/**
 * A component that renders the bookings for a user
 * @component
 * @param {Object} props The component props
 * @param {Array} props.bookings The array of bookings
 * @param {string} props.name The name of the user
 * @param {string} props.isLogName the name of the login user
 * @returns {React.ReactElement} The YourBookings component
 * @example
 * <YourBookings bookings={bookings} name={name} isLogName={isLogName} />
 */

function YourBookings({ bookings, name, isLogName }) {
  const { handleOpenDelete, handleCloseDelete, showDeleteModel, deleteId } =
    useModel();
  return (
    <>
      <Accordion.Body className="profile-bookings">
        {bookings && bookings.length > 0 ? (
          <Row>
            {bookings.map((booking) => (
              <Col xs={12} sm={6} md={6} lg={4} key={booking.id}>
                <div
                  to={`/venue/${booking.venue.id}`}
                  className="profile-bookings-container mb-3"
                >
                  <Link
                    className="profile-bookings-container-img"
                    to={`/venue/${booking.venue.id}`}
                  >
                    {booking.venue.media && booking.venue.media.length > 0 ? (
                      <img
                        src={booking.venue.media[0]}
                        alt={booking.venue.name}
                        onError={(e) => {
                          e.target.src = defaultImages;
                        }}
                      />
                    ) : (
                      <img
                        src={defaultImages}
                        alt={`${booking.venue.name} default`}
                      />
                    )}
                  </Link>
                  <div className="profile-bookings-container-info">
                    <Link
                      to={`/venue/${booking.venue.id}`}
                      className="profile-bookings-container-info-link"
                    >
                      <h2 className="mb-2 h6 mt-0 profile-bookings-container-info-title">
                        {booking.venue.name}
                      </h2>

                      <div className="d-flex gap-2 mb-1">
                        {booking.venue.rating > 0 && (
                          <div className="venue-detail-rating">
                            <AiFillHeart className="me-1" />
                            <span>{booking.venue.rating}</span>
                          </div>
                        )}
                        <div>
                          <MdGroup className="me-1 mb-1" size={20} />
                          <span>{booking.guests}</span>
                        </div>
                      </div>

                      <span>
                        <HiLocationMarker className="me-1 mb-1" />
                        {!booking.venue.location.country ||
                        booking.venue.location.country === 'Unknown' ||
                        !booking.venue.location.city ||
                        booking.venue.location.city === 'Unknown' ? (
                          <span>Unknown location</span>
                        ) : (
                          <span>
                            {booking.venue.location.country},{' '}
                            {booking.venue.location.city}
                          </span>
                        )}
                      </span>
                      {isLogName === name && (
                        <div className="mt-1">
                          <h3 className="h5">Date</h3>
                          <p className="mb-0">
                            {format(new Date(booking.dateFrom), 'dd.MM.yy')} -{' '}
                            {format(new Date(booking.dateTo), 'dd.MM.yy')}
                          </p>
                        </div>
                      )}
                    </Link>
                    {isLogName === name && (
                      <div className="profile-bookings-container-btn mb-1">
                        {new Date(booking.dateFrom) > new Date() && (
                          <button
                            onClick={() => handleOpenDelete(booking.id)}
                            className="my-1 p-0"
                          >
                            Cancel bookings
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No bookings yet...</p>
        )}
        {showDeleteModel && (
          <CancelBookingsModel
            show={showDeleteModel}
            onClose={handleCloseDelete}
            id={deleteId}
          />
        )}
      </Accordion.Body>
    </>
  );
}

export default YourBookings;
