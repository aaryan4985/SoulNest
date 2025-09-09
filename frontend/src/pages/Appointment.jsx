import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Mail, User, Award, Clock, Globe, Filter, ChevronDown, Star, X } from 'lucide-react';
import cityNumbers from '../cityNumbers';
import specializations from '../specilization';

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

  // Get cities array from the imported object
  const cities = Object.keys(cityNumbers);

  // Fetch therapists from API
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

  const TherapistCard = ({ therapist }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 mb-6 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 self-center lg:self-start">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 border-4 border-white shadow-md">
              {therapist.imageUrl ? (
                <img 
                  src={therapist.imageUrl} 
                  alt={therapist.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{therapist.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{therapist.designation}</p>
                
                {therapist.about && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{therapist.about}</p>
                )}

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {therapist.specialization && (
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Specialization</p>
                        <p className="text-sm text-gray-800">{therapist.specialization}</p>
                      </div>
                    </div>
                  )}
                  
                  {therapist.experience && (
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Experience</p>
                        <p className="text-sm text-gray-800">{therapist.experience}</p>
                      </div>
                    </div>
                  )}
                  
                  {therapist.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
                        <p className="text-sm text-gray-800">{therapist.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {therapist.languages && (
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Languages</p>
                        <p className="text-sm text-gray-800">{therapist.languages}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                {(therapist.qualification || therapist.modeOfDelivery) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 pt-3 border-t border-gray-100">
                    {therapist.qualification && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Qualification</p>
                        <p className="text-sm text-gray-700">{therapist.qualification}</p>
                      </div>
                    )}
                    {therapist.modeOfDelivery && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Mode of Delivery</p>
                        <p className="text-sm text-gray-700">{therapist.modeOfDelivery}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="lg:text-right space-y-3">
                {therapist.phone && (
                  <a 
                    href={`tel:${therapist.phone}`}
                    className="flex lg:justify-end items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">{therapist.phone}</span>
                  </a>
                )}
                
                {therapist.email && (
                  <a 
                    href={`mailto:${therapist.email}`}
                    className="flex lg:justify-end items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{therapist.email}</span>
                  </a>
                )}
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors w-full lg:w-auto">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Mental Health Professionals</h1>
          <p className="text-gray-600">Connect with qualified therapists and counselors in your area</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* City Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select City *
              </label>
              <select
                value={searchParams.city}
                onChange={(e) => setSearchParams(prev => ({ ...prev, city: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Choose a city...</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Specialization Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization (Optional)
              </label>
              <select
                value={searchParams.specialization}
                onChange={(e) => setSearchParams(prev => ({ ...prev, specialization: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            {/* Search Buttons */}
            <div className="flex gap-3 lg:items-end">
              <button
                onClick={handleSearch}
                disabled={!searchParams.city || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              
              <button
                onClick={handleReset}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        {(therapists.length > 0 || loading) && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {loading ? 'Searching...' : `${therapists.length} therapists found`}
              </h2>
              {totalCount > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Showing {therapists.length} of {totalCount} total results
                </p>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Therapists List */}
        {!loading && therapists.length > 0 && (
          <div className="space-y-6">
            {therapists.map((therapist, index) => (
              <TherapistCard key={index} therapist={therapist} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && therapists.length === 0 && searchParams.city && !error && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No therapists found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any therapists matching your criteria. Try adjusting your search.
              </p>
              <button
                onClick={handleReset}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters and search again
              </button>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!loading && therapists.length === 0 && !searchParams.city && !error && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Find Your Therapist</h3>
              <p className="text-gray-600">
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