import { Link } from 'react-router-dom';
import { Col, Row, Accordion } from 'react-bootstrap';
import SettingsVenue from './dropdown';
import defaultImages from '../../../../images/default.jpg';
import { AiFillHeart } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';
import { MdGroup } from 'react-icons/md';

/**
 * A component that renders the venues for a user
 * @component
 * @param {Object} props The component props
 * @param {Array} props.venues The array of venues
 * @param {string} props.name The name of the user
 * @param {string} props.isLogName the name of the login user
 * @property {function} SettingsVenue A function to show the setting to the user venues
 * @returns {React.ReactElement} The YourBookings component
 * @example
 * <YourVenues venues={venues} name={name} isLogName={isLogName} />
 */

function YourVenues({ venues, isLogName, name }) {
  return (
    <>
      <Accordion.Body className="profile-bookings">
        {venues && venues.length > 0 ? (
          <Row>
            {venues.map((venue) => (
              <Col xs={12} sm={6} md={6} lg={4} key={venue.id}>
                <div
                  to={`/venue/${venue.id}`}
                  className="profile-bookings-container mb-3"
                >
                  <Link
                    className="profile-bookings-container-img"
                    to={`/venue/${venue.id}`}
                  >
                    {venue.media && venue.media.length > 0 ? (
                      <img
                        src={venue.media[0]}
                        alt={venue.name}
                        onError={(e) => {
                          e.target.src = defaultImages;
                        }}
                      />
                    ) : (
                      <img src={defaultImages} alt={`${venue.name} default`} />
                    )}
                  </Link>
                  <div className="profile-bookings-container-info">
                    <Link
                      to={`/venue/${venue.id}`}
                      className="profile-bookings-container-info-link"
                    >
                      <h2 className="mb-2 h6 mt-0 profile-bookings-container-info-title">
                        {venue.name}
                      </h2>

                      <div className="d-flex gap-2 mb-1">
                        {venue.rating > 0 && (
                          <div className="venue-detail-rating">
                            <AiFillHeart className="me-1" />
                            <span>{venue.rating}</span>
                          </div>
                        )}
                        <div>
                          <MdGroup className="me-1 mb-1" size={20} />
                          <span>{venue.maxGuests}</span>
                        </div>
                      </div>
                      <span>
                        <HiLocationMarker className="me-1" />
                        {!venue.location.country ||
                        venue.location.country === 'Unknown' ||
                        !venue.location.city ||
                        venue.location.city === 'Unknown' ? (
                          <span>Unknown location</span>
                        ) : (
                          <span>
                            {venue.location.country}, {venue.location.city}
                          </span>
                        )}
                      </span>
                      <div className="mt-2">
                        <h3 className="h5">Created</h3>
                        <p className="mb-0">
                          {new Date(venue.created).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </div>
                  {isLogName === name && (
                    <div className="profile-bookings-container-settings">
                      <SettingsVenue id={venue.id} />
                    </div>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No venues yet...</p>
        )}
      </Accordion.Body>
    </>
  );
}

export default YourVenues;
