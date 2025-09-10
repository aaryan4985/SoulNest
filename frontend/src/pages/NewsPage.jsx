import  { useEffect, useState } from 'react';
import { Clock, ExternalLink, Heart, RefreshCw } from 'lucide-react';

const NEWS_API_KEY = '4350717ba1694f23b5014df5450180ab';
// Main API URL
const BASE_URL = `https://newsapi.org/v2/everything?q=("mental health" OR "depression" OR "anxiety" OR "therapy" OR "student mental health" OR "psychiatry")&domains=psychologytoday.com,healthline.com,verywellmind.com,medicalnewstoday.com,nimh.nih.gov&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

const ARTICLES_PER_PAGE = 6;

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch news with cache buster
  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);

    // Add timestamp to always fetch fresh news
    const url = `${BASE_URL}&_=${Date.now()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Filter articles with valid images
      const withImages = (data.articles || []).filter(
        (article) => article.urlToImage && article.urlToImage.trim() !== ''
      );

      setArticles(withImages);
      setCurrentPage(1); // reset to page 1
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => {
      fetchNews();
    }, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  const handleImageError = (index) => {
    // Remove broken image article
    setArticles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleRefresh = () => {
    fetchNews(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8ff] to-[#f4f8ff]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff3f74] to-[#ff3f74] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#ff3f74]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Mental Health News</h1>
                <p className="text-sm">Latest insights and research</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-[#ff3f74] rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
              />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-[#ff3f74] animate-spin mx-auto mb-4" />
              <p className="text-lg text-[#ff3f74]">
                Loading latest mental health news...
              </p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-[#ff3f74] mx-auto mb-4" />
            <p className="text-lg text-[#ff3f74]">
              No mental health news articles found
            </p>
            <p className="text-sm text-[#ff3f74] mt-2">
              Please try refreshing or check back later
            </p>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="bg-white rounded-lg shadow-lg border border-[#ff3f74] p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-lg font-semibold text-[#ff3f74]">
                    <span className="text-[#ff3f74]">{articles.length}</span> articles found
                  </div>
                  <div className="text-lg font-semibold text-[#ff3f74]">
                    Last updated:{' '}
                    <span className="text-[#ff3f74]">
                      {new Date().toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live updates</span>
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.map((article, idx) => (
                <article
                  key={idx}
                  className="bg-white rounded-xl shadow-lg border border-[#ff3f74] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(startIndex + idx)}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#ff3f74] text-white">
                        Mental Health
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <span className="font-medium text-[#ff3f74]">
                        {article.source.name}
                      </span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                      {article.title}
                    </h2>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[#ff3f74] hover:text-[#ff3f74] text-sm font-medium transition-colors"
                    >
                      <span>Read full article</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#ff3f74] text-white border-[#ff3f74]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-red-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsPage;