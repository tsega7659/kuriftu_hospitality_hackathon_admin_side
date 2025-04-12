"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Search, Filter, AlertTriangle, CheckCircle, XCircle, MessageSquare, RefreshCw, User } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewAnalysis() {
  // State for reviews, filters, search, and pagination
  const [reviews, setReviews] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        source: 'Google',
        summary: 'Multiple guests complained about slow check-in process during peak hours',
        sentiment: 'Negative',
        date: '2023-04-10',
        priority: 'High',
        status: 'Pending',
        details: 'Several guests mentioned waiting more than 30 minutes to check in during the weekend. Staff appeared overwhelmed during peak check-in times (4-6 PM).',
        assignedTo: null,
        originalReview: 'Waited 35 minutes to check in on Saturday. Staff were polite but clearly under pressure.'
      },
      // Add more mock reviews if needed
    ];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All Sources');
  const [sentimentFilter, setSentimentFilter] = useState('All Sentiments');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Persist reviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Fetch summaries from Flask API
  const fetchSummaries = () => {
    fetch('http://localhost:5000/get-summary')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error('Error fetching summaries');
        } else {
          data.summaries.forEach((summary) => {
            toast.info(`🔔 ${summary.category}: ${summary.summary}`, {
              autoClose: 5000,
              closeOnClick: true,
            });
          });

          const newReviews = data.summaries.map((summary, index) => ({
            id: Math.max(...reviews.map(r => r.id), 0) + index + 1,
            source: 'AI Analysis',
            summary: summary.summary,
            sentiment: 'Negative',
            date: new Date().toISOString().split('T')[0],
            priority: 'High',
            status: 'Pending',
            details: `AI-generated summary from ${summary.category}.`,
            assignedTo: null,
            originalReview: 'AI-generated summary, no single original review available.'
          }));

          setReviews((prev) => [...newReviews, ...prev]);
        }
      })
      .catch(() => toast.error('Failed to connect to Flask API'));
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  // Refresh Analysis button handler
  const handleRefresh = () => {
    fetchSummaries();
    toast.info('Analysis refreshed!');
  };

  // Mark as Resolved button handler
  const handleMarkResolved = (id) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, status: 'Resolved', priority: 'Low' } : review
      )
    );
    toast.success(`Review #${id} marked as resolved`);
    // Optional: Update backend
    fetch('http://localhost:5000/update-review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'Resolved', priority: 'Low' })
    }).catch(() => toast.warn('Backend update failed, changes saved locally'));
  };

  // Assign button handler
  const handleAssign = (id) => {
    const assignee = prompt('Enter assignee name:');
    if (assignee) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, assignedTo: assignee, status: 'In Progress' } : review
        )
      );
      toast.success(`Review #${id} assigned to ${assignee}`);
      // Optional: Update backend
      fetch('http://localhost:5000/update-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, assignedTo: assignee, status: 'In Progress' })
      }).catch(() => toast.warn('Backend update failed, changes saved locally'));
    }
  };

  // View Original button handler
  const handleViewOriginal = (id) => {
    const review = reviews.find((r) => r.id === id);
    if (review.originalReview) {
      toast.info(`Original Review: ${review.originalReview}`, { autoClose: false });
    } else {
      toast.warn('No original review available');
    }
    // Optional: Fetch from backend if needed
  };

  // Filter and search logic
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === 'All Sources' || review.source === sourceFilter;
    const matchesSentiment = sentimentFilter === 'All Sentiments' || review.sentiment === sentimentFilter;
    return matchesSearch && matchesSource && matchesSentiment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to get badge color based on sentiment
  const getSentimentBadgeColor = (sentiment) => {
    switch (sentiment) {
      case 'Positive': return 'bg-green-100 text-green-600';
      case 'Negative': return 'bg-red-100 text-red-600';
      case 'Neutral': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Function to get badge color based on priority
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-600';
      case 'Medium': return 'bg-yellow-100 text-yellow-600';
      case 'Low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Function to get badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-600';
      case 'In Progress': return 'bg-blue-100 text-blue-600';
      case 'Resolved': return 'bg-green-100 text-green-600';
      case 'Acknowledged': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Function to get icon based on status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return AlertTriangle;
      case 'In Progress': return RefreshCw;
      case 'Resolved': return CheckCircle;
      case 'Acknowledged': return MessageSquare;
      default: return XCircle;
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">AI Review Analysis</h1>
          <p className="text-gray-500">AI-powered analysis and summarization of guest reviews</p>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Analysis
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reviews</p>
              <p className="text-2xl font-semibold">{reviews.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Positive Reviews</p>
              <p className="text-2xl font-semibold">{reviews.filter(r => r.sentiment === 'Positive').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Negative Reviews</p>
              <p className="text-2xl font-semibold">{reviews.filter(r => r.sentiment === 'Negative').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Action</p>
              <p className="text-2xl font-semibold">{reviews.filter(r => r.status === 'Pending').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-kuriftu-green"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            <option>All Sources</option>
            <option>Google</option>
            <option>TripAdvisor</option>
            <option>Booking.com</option>
            <option>Expedia</option>
            <option>Facebook</option>
            <option>AI Analysis</option>
          </select>
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            <option>All Sentiments</option>
            <option>Positive</option>
            <option>Negative</option>
            <option>Neutral</option>
          </select>
          <button
            onClick={() => {
              setSourceFilter('All Sources');
              setSentimentFilter('All Sentiments');
              setSearchTerm('');
              toast.info('Filters reset');
            }}
            className="border px-4 py-2 rounded-md flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">AI-Summarized Reviews</CardTitle>
          <CardDescription>Reviews analyzed and summarized by our AI system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedReviews.map((review) => {
              const StatusIcon = getStatusIcon(review.status);
              return (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                    <div className="flex items-center mb-2 md:mb-0">
                      <span className="font-medium text-gray-700 mr-3">Source: {review.source}</span>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentBadgeColor(review.sentiment)}`}
                      >
                        {review.sentiment}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(review.priority)}`}
                      >
                        {review.priority} Priority
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBadgeColor(review.status)}`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {review.status}
                      </span>
                      {review.assignedTo && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {review.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{review.summary}</h3>
                  <p className="text-gray-600 text-sm">{review.details}</p>
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkResolved(review.id)}
                        className="text-kuriftu-green text-sm font-medium disabled:opacity-50"
                        disabled={review.status === 'Resolved'}
                      >
                        Mark as Resolved
                      </button>
                      <button
                        onClick={() => handleAssign(review.id)}
                        className="text-gray-500 text-sm font-medium"
                      >
                        Assign
                      </button>
                    </div>
                    <button
                      onClick={() => handleViewOriginal(review.id)}
                      className="text-kuriftu-gold text-sm font-medium"
                    >
                      View Original
                    </button>
                  </div>
                </div>
              );
            })}
            {paginatedReviews.length === 0 && (
              <p className="text-gray-500 text-center">No reviews match your filters.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * reviewsPerPage + 1} to{' '}
              {Math.min(currentPage * reviewsPerPage, filteredReviews.length)} of {filteredReviews.length} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page ? 'bg-kuriftu-green text-white' : 'border'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}