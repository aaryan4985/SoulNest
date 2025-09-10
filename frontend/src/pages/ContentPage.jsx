import React, { useState } from 'react';
import { Play, BookOpen, Music, ExternalLink, Heart } from 'lucide-react';
import articlesData from '../assets/articles.json';
import musicData from '../assets/music.json';
import videosData from '../assets/videos.json';

const ContentPage = () => {
    const [activeTab, setActiveTab] = useState('videos');

    // Extract arrays from JSON
    const videos = videosData.videos;
    const articles = articlesData.articles;
    const songs = musicData.songs;

    const VideoCard = ({ video }) => (
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="aspect-video bg-gradient-to-br from-[#5ea85e]/10 to-[#5ea85e]/5 rounded-xl mb-4 flex items-center justify-center group-hover:from-[#5ea85e]/20 group-hover:to-[#5ea85e]/10 transition-all duration-300">
                <Play className="w-12 h-12 text-[#5ea85e] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="font-semibold text-[#000000] mb-2 line-clamp-2">{video.title}</h3>
            <p className="text-[#000000]/60 text-sm mb-4">{video.channel}</p>
            <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#5ea85e] text-white py-2 px-4 rounded-xl hover:bg-[#4a944a] transition-colors duration-300 flex items-center justify-center gap-2 no-underline"
            >
                <Play className="w-4 h-4" />
                Watch Now
            </a>
        </div>
    );

    const ArticleCard = ({ article }) => (
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#5ea85e] to-[#4a944a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#000000] mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-[#000000]/60 text-sm mb-4">{article.source}</p>
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#5ea85e] text-white py-2 px-4 rounded-xl hover:bg-[#4a944a] transition-colors duration-300 flex items-center justify-center gap-2 no-underline"
            >
                <ExternalLink className="w-4 h-4" />
                Read Article
            </a>
        </div>
    );

    const SongCard = ({ song }) => {
        const getMoodColor = (mood) => {
            const colors = {
                uplifting: "from-yellow-400/20 to-orange-400/20",
                empowering: "from-purple-400/20 to-pink-400/20",
                motivational: "from-red-400/20 to-orange-400/20",
                supportive: "from-blue-400/20 to-cyan-400/20",
                peaceful: "from-green-400/20 to-teal-400/20",
                joyful: "from-yellow-400/20 to-green-400/20",
                calming: "from-blue-400/20 to-green-400/20",
                energetic: "from-orange-400/20 to-red-400/20",
                hopeful: "from-cyan-400/20 to-blue-400/20",
                optimistic: "from-yellow-400/20 to-pink-400/20",
                resilient: "from-purple-400/20 to-blue-400/20",
                positive: "from-green-400/20 to-cyan-400/20"
            };
            return colors[mood] || "from-[#5ea85e]/20 to-[#4a944a]/20";
        };

        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div
                    className={`w-12 h-12 bg-gradient-to-br ${getMoodColor(
                        song.mood
                    )} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                    <Music className="w-6 h-6 text-[#5ea85e]" />
                </div>
                <h3 className="font-semibold text-[#000000] mb-1">{song.title}</h3>
                <p className="text-[#000000]/60 text-sm mb-2">{song.artist}</p>
                <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-[#5ea85e]/10 text-[#5ea85e] px-3 py-1 rounded-full text-xs font-medium capitalize">
                        {song.mood}
                    </span>
                </div>
                <div className="flex gap-2">
                    <a
                        href={`https://music.youtube.com/search?q=${encodeURIComponent(song.searchQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#5ea85e] text-white py-2 px-3 rounded-lg hover:bg-[#4a944a] transition-colors duration-300 flex items-center justify-center gap-1 no-underline text-sm"
                    >
                        <Music className="w-3 h-3" />
                        YT Music
                    </a>
                    <a
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.searchQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-1 no-underline text-sm"
                    >
                        <Play className="w-3 h-3" />
                        YouTube
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#ffffeb]">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-[#5ea85e] to-[#4a944a] py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Heart className="w-8 h-8 text-white" />
                            <h1 className="text-5xl lg:text-6xl font-bold text-white">
                                Wellness Resources
                            </h1>
                        </div>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Discover curated content designed to uplift your spirit, provide valuable insights,
                            and support your journey toward better mental health and well-being.
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-2">
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'videos', label: 'Videos', icon: Play, count: videos.length },
                            { id: 'articles', label: 'Articles', icon: BookOpen, count: articles.length },
                            { id: 'songs', label: 'Music', icon: Music, count: songs.length }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-[#5ea85e] text-white shadow-lg'
                                        : 'text-[#000000]/70 hover:bg-[#5ea85e]/10'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                                <span className="text-xs opacity-75">({tab.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                {activeTab === 'videos' && (
                    <div className="space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold text-[#000000]">Inspiring Videos</h2>
                            <p className="text-[#000000]/60 max-w-2xl mx-auto">
                                Watch expert-led content on mental health, wellness techniques, and personal growth
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {videos.map((video, index) => (
                                <VideoCard key={index} video={video} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'articles' && (
                    <div className="space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold text-[#000000]">Educational Articles</h2>
                            <p className="text-[#000000]/60 max-w-2xl mx-auto">
                                Read evidence-based articles from trusted sources about mental health and wellness
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article, index) => (
                                <ArticleCard key={index} article={article} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'songs' && (
                    <div className="space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold text-[#000000]">Mood-Boosting Music</h2>
                            <p className="text-[#000000]/60 max-w-2xl mx-auto">
                                Carefully selected songs to lift your spirits and provide emotional support
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {songs.map((song, index) => (
                                <SongCard key={index} song={song} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            <div className="bg-gradient-to-r from-[#5ea85e]/10 to-[#5ea85e]/5 py-16">
                <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
                    <Heart className="w-12 h-12 text-[#5ea85e] mx-auto" />
                    <h3 className="text-2xl font-bold text-[#000000]">Remember, You're Not Alone</h3>
                    <p className="text-[#000000]/70 text-lg leading-relaxed">
                        These resources are here to support you on your journey. Take your time, be kind to yourself,
                        and remember that seeking help is a sign of strength, not weakness.
                    </p>
                    <div className="pt-4">
                        <button className="bg-[#5ea85e] text-white px-8 py-3 rounded-xl hover:bg-[#4a944a] transition-colors duration-300 font-semibold">
                            Get Professional Help
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
