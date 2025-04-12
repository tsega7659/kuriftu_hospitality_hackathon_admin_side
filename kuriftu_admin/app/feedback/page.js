"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { MessageCircle, Search, Filter, Star, ThumbsUp, ThumbsDown, Download } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Feedback() {
  // State management
  const [feedbackItems, setFeedbackItems] = useState(() => {
    const saved = localStorage.getItem('feedback');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        member: "John Doe",
        membershipTier: "Pioneer",
        message: "I love the new loyalty program! The ability to mine coins is a great incentive for me to stay more often. The Pioneer benefits are excellent.",
        rating: 5,
        sentiment: "Positive",
        date: "2023-04-10",
        category: "Loyalty Program",
        archived: false,
        reply: null,
      },
      {
        id: 2,
        member: "Jane Smith",
        membershipTier: "Adventurer",
        message: "The membership tiers are confusing. It's not clear what I need to do to upgrade from Adventurer to Pioneer. Please make this more transparent.",
        rating: 3,
        sentiment: "Neutral",
        date: "2023-04-08",
        category: "Membership Tiers",
        archived: false,
        reply: null,
      },
      {
        id: 3,
        member: "Michael Johnson",
        membershipTier: "Explorer",
        message: "I think the loyalty coins are a great idea, but it takes too long to earn enough for meaningful rewards. Consider increasing the earning rate for Explorer members.",
        rating: 3,
        sentiment: "Neutral",
        date: "2023-04-05",
        category: "Loyalty Coins",
        archived: false,
        reply: null,
      },
      {
        id: 4,
        member: "Sarah Williams",
        membershipTier: "Pioneer",
        message: "The weekend getaway discount was amazing! I saved a lot on my recent stay. Looking forward to more offers like this.",
        rating: 5,
        sentiment: "Positive",
        date: "2023-04-03",
        category: "Discounts & Offers",
        archived: false,
        reply: null,
      },
      {
        id: 5,
        member: "David Brown",
        membershipTier: "Adventurer",
        message: "I'm disappointed that some benefits are only available to Pioneer members. It feels like there's too big a gap between Adventurer and Pioneer tiers.",
        rating: 2,
        sentiment: "Negative",
        date: "2023-04-01",
        category: "Membership Tiers",
        archived: false,
        reply: null,
      },
    ];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sentimentFilter, setSentimentFilter] = useState('All Sentiments');
  const [currentPage, setCurrentPage] = useState(1);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyFeedbackId, setReplyFeedbackId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const feedbackPerPage = 5;

  // Persist feedback to localStorage
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedbackItems));
  }, [feedbackItems]);

  // Filter and search logic
  const filteredFeedback = feedbackItems.filter((feedback) => {
    if (feedback.archived) return false;
    const matchesSearch = feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.member.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || feedback.category === categoryFilter;
    const matchesSentiment = sentimentFilter === 'All Sentiments' || feedback.sentiment === sentimentFilter;
    return matchesSearch && matchesCategory && matchesSentiment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFeedback.length / feedbackPerPage);
  const paginatedFeedback = filteredFeedback.slice(
    (currentPage - 1) * feedbackPerPage,
    currentPage * feedbackPerPage
  );

  // Dynamic stats
  const totalFeedback = feedbackItems.filter(f => !f.archived).length;
  const positiveFeedback = feedbackItems.filter(f => f.sentiment === 'Positive' && !f.archived).length;
  const negativeFeedback = feedbackItems.filter(f => f.sentiment === 'Negative' && !f.archived).length;
  const averageRating = feedbackItems.filter(f => !f.archived).length > 0
    ? (feedbackItems.filter(f => !f.archived).reduce((sum, f) => sum + f.rating, 0) / feedbackItems.filter(f => !f.archived).length).toFixed(1)
    : 0;

  // Feedback by category stats
  const categoryCounts = filteredFeedback.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});
  const totalCategoryFeedback = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  const categoryData = [
    { category: 'Loyalty Program', count: categoryCounts['Loyalty Program'] || 0 },
    { category: 'Membership Tiers', count: categoryCounts['Membership Tiers'] || 0 },
    { category: 'Loyalty Coins', count: categoryCounts['Loyalty Coins'] || 0 },
    { category: 'Discounts & Offers', count: categoryCounts['Discounts & Offers'] || 0 },
  ].map(item => ({
    ...item,
    percentage: totalCategoryFeedback > 0 ? ((item.count / totalCategoryFeedback) * 100).toFixed(0) : 0,
  }));

  // Sentiment analysis stats
  const sentimentCounts = filteredFeedback.reduce((acc, f) => {
    acc[f.sentiment] = (acc[f.sentiment] || 0) + 1;
    return acc;
  }, {});
  const totalSentimentFeedback = filteredFeedback.length;
  const sentimentData = {
    Positive: (sentimentCounts['Positive'] || 0) / totalSentimentFeedback * 100 || 0,
    Neutral: (sentimentCounts['Neutral'] || 0) / totalSentimentFeedback * 100 || 0,
    Negative: (sentimentCounts['Negative'] || 0) / totalSentimentFeedback * 100 || 0,
  };

  // Function to get badge color based on sentiment
  const getSentimentBadgeColor = (sentiment) => {
    switch (sentiment) {
      case "Positive": return "bg-green-100 text-green-600";
      case "Neutral": return "bg-blue-100 text-blue-600";
      case "Negative": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Function to get badge color based on membership tier
  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case "Explorer": return "bg-green-100 text-green-600";
      case "Adventurer": return "bg-blue-100 text-blue-600";
      case "Pioneer": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} className={`w-4 h-4 ${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      );
    }
    return stars;
  };

  // Export Feedback button handler
  const handleExportFeedback = () => {
    const csvContent = [
      ["ID", "Member", "Membership Tier", "Message", "Rating", "Sentiment", "Date", "Category", "Reply"],
      ...filteredFeedback.map(f => [
        f.id,
        f.member,
        f.membershipTier,
        `"${f.message.replace(/"/g, '""')}"`,
        f.rating,
        f.sentiment,
        f.date,
        f.category,
        f.reply ? `"${f.reply.replace(/"/g, '""')}"` : '',
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'feedback_export.csv';
    link.click();
    toast.success("Feedback exported as CSV");
  };

  // Reset Filters button handler
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All Categories');
    setSentimentFilter('All Sentiments');
    setCurrentPage(1);
    toast.info("Filters reset");
  };

  // Reply button handler
  const handleReply = (id) => {
    setReplyFeedbackId(id);
    const feedback = feedbackItems.find(f => f.id === id);
    setReplyMessage(feedback.reply || '');
    setIsReplyModalOpen(true);
  };

  // Save reply handler
  const handleSaveReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }
    setFeedbackItems((prev) =>
      prev.map((f) =>
        f.id === replyFeedbackId ? { ...f, reply: replyMessage } : f
      )
    );
    toast.success("Reply saved");
    setIsReplyModalOpen(false);
    setReplyMessage('');
    setReplyFeedbackId(null);
  };

  // Archive button handler
  const handleArchive = (id, member) => {
    if (confirm(`Archive feedback from ${member}?`)) {
      setFeedbackItems((prev) =>
        prev.map((f) => (f.id === id ? { ...f, archived: true } : f))
      );
      toast.success(`Feedback from ${member} archived`);
    }
  };

  // Pagination handler
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-kuriftu-black">Feedback</h1>
          <p className="text-gray-500">Review and analyze member feedback</p>
        </div>
        <button
          onClick={handleExportFeedback}
          className="bg-kuriftu-green text-white px-4 py-2 rounded-md flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Feedback
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Feedback</p>
              <p className="text-2xl font-semibold">{totalFeedback}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Positive Feedback</p>
              <p className="text-2xl font-semibold">{positiveFeedback}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-semibold">{averageRating}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <ThumbsDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Negative Feedback</p>
              <p className="text-2xl font-semibold">{negativeFeedback}</p>
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
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-kuriftu-green"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            <option>All Categories</option>
            <option>Loyalty Program</option>
            <option>Membership Tiers</option>
            <option>Loyalty Coins</option>
            <option>Discounts & Offers</option>
          </select>
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            <option>All Sentiments</option>
            <option>Positive</option>
            <option>Neutral</option>
            <option>Negative</option>
          </select>
          <button
            onClick={handleResetFilters}
            className="border px-4 py-2 rounded-md flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Feedback Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">Feedback by Category</CardTitle>
            <CardDescription>Distribution of feedback across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.category}</span>
                    <span className="text-gray-500">{item.count} feedback items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-kuriftu-green h-2.5 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Sentiment Analysis</CardTitle>
            <CardDescription>Breakdown of feedback sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold">{averageRating}</p>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-8 border-gray-200">
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500"
                    style={{ clipPath: `polygon(0 0, 100% 0, 100% ${sentimentData.Positive}%, 0 ${sentimentData.Positive}%)` }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-blue-500"
                    style={{ clipPath: `polygon(0 ${sentimentData.Positive}%, 100% ${sentimentData.Positive}%, 100% ${sentimentData.Positive + sentimentData.Neutral}%, 0 ${sentimentData.Positive + sentimentData.Neutral}%)` }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-red-500"
                    style={{ clipPath: `polygon(0 ${sentimentData.Positive + sentimentData.Neutral}%, 100% ${sentimentData.Positive + sentimentData.Neutral}%, 100% 100%, 0 100%)` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Positive</span>
                </div>
                <span className="font-medium">{Math.round(sentimentData.Positive)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>Neutral</span>
                </div>
                <span className="font-medium">{Math.round(sentimentData.Neutral)}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Negative</span>
                </div>
                <span className="font-medium">{Math.round(sentimentData.Negative)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">Recent Feedback</CardTitle>
          <CardDescription>Latest feedback from members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedFeedback.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                  <div className="mb-2 md:mb-0">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">{feedback.member}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${getTierBadgeColor(feedback.membershipTier)}`}
                      >
                        {feedback.membershipTier}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{new Date(feedback.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex">{renderStars(feedback.rating)}</div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSentimentBadgeColor(feedback.sentiment)}`}
                    >
                      {feedback.sentiment}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {feedback.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{feedback.message}</p>
                {feedback.reply && (
                  <p className="text-sm text-gray-500 mt-2"><strong>Reply:</strong> {feedback.reply}</p>
                )}
                <div className="mt-3 pt-3 border-t flex justify-end gap-2">
                  <button
                    onClick={() => handleReply(feedback.id)}
                    className="text-kuriftu-green text-sm font-medium"
                  >
                    Reply
                  </button>
                  <button
                    onClick={() => handleArchive(feedback.id, feedback.member)}
                    className="text-gray-500 text-sm font-medium"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
            {paginatedFeedback.length === 0 && (
              <p className="text-gray-500 text-center">No feedback matches your filters.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * feedbackPerPage + 1} to{' '}
              {Math.min(currentPage * feedbackPerPage, filteredFeedback.length)} of {filteredFeedback.length} results
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

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Reply to Feedback</CardTitle>
              <CardDescription>Compose a response to the member's feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveReply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Reply</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your response..."
                    className="w-full p-2 border rounded-md"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReplyModalOpen(false)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-kuriftu-green text-white rounded-md"
                  >
                    Save Reply
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}