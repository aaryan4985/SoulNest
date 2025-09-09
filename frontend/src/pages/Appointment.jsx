import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, User, Award, Clock, Globe, Filter, ChevronDown, Star, X } from 'lucide-react';
import cityNumbers from '../assets/cityNumbers';
import specializations from '../assets/specilization';
import ProductExplainerSvg from '../assets/undraw_product-explainer_b7ft.svg';
import { auth } from '../config/firebase';

const Appointment = () => {

  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    city: '',
    specialization: '',
    page: 1
  });
  const [filters, setFilters] = useState({
    showFilters: false
  });
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState('');

  const cities = Object.keys(cityNumbers);

  const fetchTherapists = async () => {
    if (!searchParams.city) return;

    setLoading(true);
    setError('');

    try {
      const cityId = cityNumbers[searchParams.city];
      const params = new URLSearchParams({
        city: cityId,
        page: searchParams.page
      });

      if (searchParams.specialization) {
        params.append('specialization', searchParams.specialization);
      }

      const response = await fetch(`http://localhost:5000/appointment?${params}`);
      const data = await response.json();

      if (data.success) {
        setTherapists(data.data.therapists);
        setTotalCount(data.data.totalCount);
      } else {
        setError('Failed to fetch therapists');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearchParams(prev => ({ ...prev, page: 1 }));
    fetchTherapists();
  };

  const handleReset = () => {
    setSearchParams({
      city: '',
      specialization: '',
      page: 1
    });
    setTherapists([]);
    setTotalCount(0);
    setError('');
  };

  const handleBookAppointment = async (therapist) => {
    try {
      const response = await fetch("http://localhost:5000/appointment/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          therapistName: therapist.name,
          reciever: auth.currentUser.email
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("Appointment booked! Confirmation email sent.");
      } else {
        alert("Failed to send email.");
      }
    } catch (err) {
      alert("Network error, please try again.");
    }
  };

  const TherapistCard = ({ therapist }) => (
    <div className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border mb-6 overflow-hidden" style={{ backgroundColor: '#ffffeb', borderColor: '#5ea85e' }}>
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 self-center lg:self-start">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 shadow-md" style={{ backgroundColor: '#5ea85e', borderColor: '#ffffeb' }}>
              {therapist.imageUrl ? (
                <img
                  src={therapist.imageUrl}
                  alt={therapist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8" style={{ color: '#ffffeb' }} />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1" style={{ color: '#000000' }}>{therapist.name}</h3>
                <p className="font-medium mb-2" style={{ color: '#5ea85e' }}>{therapist.designation}</p>

                {therapist.about && (
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: '#000000', opacity: 0.7 }}>{therapist.about}</p>
                )}

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {therapist.specialization && (
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#5ea85e' }} />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#000000', opacity: 0.6 }}>Specialization</p>
                        <p className="text-sm" style={{ color: '#000000' }}>{therapist.specialization}</p>
                      </div>
                    </div>
                  )}

                  {therapist.experience && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#5ea85e' }} />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#000000', opacity: 0.6 }}>Experience</p>
                        <p className="text-sm" style={{ color: '#000000' }}>{therapist.experience}</p>
                      </div>
                    </div>
                  )}

                  {therapist.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#5ea85e' }} />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#000000', opacity: 0.6 }}>Location</p>
                        <p className="text-sm" style={{ color: '#000000' }}>{therapist.location}</p>
                      </div>
                    </div>
                  )}

                  {therapist.languages && (
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#5ea85e' }} />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide" style={{ color: '#000000', opacity: 0.6 }}>Languages</p>
                        <p className="text-sm" style={{ color: '#000000' }}>{therapist.languages}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                {(therapist.qualification || therapist.modeOfDelivery) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 pt-3 border-t" style={{ borderColor: '#5ea85e', opacity: 0.3 }}>
                    {therapist.qualification && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: '#000000', opacity: 0.6 }}>Qualification</p>
                        <p className="text-sm" style={{ color: '#000000' }}>{therapist.qualification}</p>
                      </div>
                    )}
                    {therapist.modeOfDelivery && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: '#000000', opacity: 0.6 }}>Mode of Delivery</p>
                        <p className="text-sm" style={{ color: '#000000' }}>{therapist.modeOfDelivery}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="lg:text-right space-y-3">
                {therapist.phone && (
                  <a
                    href={`tel:${therapist.phone}`}
                    className="flex lg:justify-end items-center gap-2 hover:opacity-75 transition-colors"
                    style={{ color: '#5ea85e' }}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">{therapist.phone}</span>
                  </a>
                )}

                {therapist.email && (
                  <a
                    href={`mailto:${therapist.email}`}
                    className="flex lg:justify-end items-center gap-2 hover:opacity-75 transition-colors"
                    style={{ color: '#5ea85e' }}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{therapist.email}</span>
                  </a>
                )}

                <button
                  onClick={() => handleBookAppointment(therapist)}
                  className="text-white px-6 py-2 rounded-lg font-medium transition-colors w-full lg:w-auto hover:opacity-90"
                  style={{ backgroundColor: '#5ea85e' }}
                >
                  Book Appointment
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffeb' }}>
      <div className="border-b" style={{ backgroundColor: '#ffffeb', borderColor: '#5ea85e' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#000000' }}>Find Mental Health Professionals</h1>
          <p style={{ color: '#000000' }} className="opacity-75">Connect with qualified therapists and counselors in your area</p>
        </div>
      </div>

      <div className="border-b shadow-sm" style={{ backgroundColor: '#ffffeb', borderColor: '#5ea85e' }}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                Select City *
              </label>
              <select
                value={searchParams.city}
                onChange={(e) => setSearchParams(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: '#ffffeb',
                  borderColor: '#5ea85e',
                  color: '#000000',
                  focusRingColor: '#5ea85e'
                }}
              >
                <option value="">Choose a city...</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" style={{ color: '#000000' }}>
                Specialization (Optional)
              </label>
              <select
                value={searchParams.specialization}
                onChange={(e) => setSearchParams(prev => ({ ...prev, specialization: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: '#ffffeb',
                  borderColor: '#5ea85e',
                  color: '#000000',
                  focusRingColor: '#5ea85e'
                }}
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 lg:items-end">
              <button
                onClick={handleSearch}
                disabled={!searchParams.city || loading}
                className="text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: '#5ea85e' }}
                onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#4a7c4a')}
                onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#5ea85e')}
              >
                <Search className="w-4 h-4" />
                Search
              </button>

              <button
                onClick={handleReset}
                className="border px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 hover:opacity-75"
                style={{ borderColor: '#5ea85e', color: '#000000', backgroundColor: '#ffffeb' }}
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {(therapists.length > 0 || loading) && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold" style={{ color: '#000000' }}>
                {loading ? 'Searching...' : `${therapists.length} therapists found`}
              </h2>
              {totalCount > 0 && (
                <p className="text-sm mt-1" style={{ color: '#000000', opacity: 0.7 }}>
                  Showing {therapists.length} of {totalCount} total results
                </p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="border px-4 py-3 rounded-lg mb-6" style={{ backgroundColor: '#ffebee', borderColor: '#e57373', color: '#c62828' }}>
            {error}
          </div>
        )}

        {loading && (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: '#ffffeb', borderColor: '#5ea85e' }}>
                <div className="animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-full" style={{ backgroundColor: '#5ea85e', opacity: 0.3 }}></div>
                    <div className="flex-1">
                      <div className="h-4 rounded w-1/3 mb-3" style={{ backgroundColor: '#5ea85e', opacity: 0.3 }}></div>
                      <div className="h-3 rounded w-1/4 mb-4" style={{ backgroundColor: '#5ea85e', opacity: 0.3 }}></div>
                      <div className="space-y-2">
                        <div className="h-3 rounded w-full" style={{ backgroundColor: '#5ea85e', opacity: 0.3 }}></div>
                        <div className="h-3 rounded w-3/4" style={{ backgroundColor: '#5ea85e', opacity: 0.3 }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && therapists.length > 0 && (
          <div className="space-y-6">
            {therapists.map((therapist, index) => (
              <TherapistCard key={index} therapist={therapist} />
            ))}
          </div>
        )}

        {!loading && therapists.length === 0 && searchParams.city && !error && (
          <div className="text-center py-12">
            <div className="rounded-xl shadow-sm border p-8 max-w-md mx-auto" style={{ backgroundColor: '#ffffeb', borderColor: '#5ea85e' }}>
              <Search className="w-12 h-12 mx-auto mb-4" style={{ color: '#5ea85e' }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: '#000000' }}>No therapists found</h3>
              <p className="mb-4" style={{ color: '#000000', opacity: 0.7 }}>
                We couldn't find any therapists matching your criteria. Try adjusting your search.
              </p>
              <button
                onClick={handleReset}
                className="font-medium hover:opacity-75"
                style={{ color: '#5ea85e' }}
              >
                Clear filters and search again
              </button>
            </div>
          </div>
        )}

        {!loading && therapists.length === 0 && !searchParams.city && !error && (
          <div className="text-center py-12">
            <div className="rounded-xl shadow-sm border p-8 max-w-md mx-auto" style={{ backgroundColor: '#ffffeb', borderColor: '#5ea85e' }}>
              <img
                src={ProductExplainerSvg}
                alt="Find Your Therapist"
                className="w-32 h-32 mx-auto mb-4 object-contain"
              />
              <h3 className="text-lg font-medium mb-2" style={{ color: '#000000' }}>Find Your Therapist</h3>
              <p style={{ color: '#000000', opacity: 0.7 }}>
                Select a city above to start searching for mental health professionals in your area.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;