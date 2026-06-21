import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Reply, MoreVertical } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  replies: number;
  liked: boolean;
}

const COMMENTS: Comment[] = [
  {
    id: 1,
    author: 'John Developer',
    avatar: 'JD',
    time: '2 days ago',
    content:
      'This tutorial is exactly what I needed! Finally understand how to build responsive layouts properly.',
    likes: 342,
    replies: 12,
    liked: false,
  },
  {
    id: 2,
    author: 'Sarah Frontend',
    avatar: 'SF',
    time: '1 day ago',
    content:
      'The TailwindCSS tricks at 4:30 were game-changing. Thank you so much for making this content!',
    likes: 218,
    replies: 5,
    liked: false,
  },
  {
    id: 3,
    author: 'Code Master',
    avatar: 'CM',
    time: '12 hours ago',
    content:
      'Can you make a follow-up video on advanced CSS Grid techniques? Your explanations are crystal clear.',
    likes: 156,
    replies: 8,
    liked: false,
  },
];

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(COMMENTS);
  const [commentText, setCommentText] = useState('');

  const handleLike = (id: number) => {
    setComments(
      comments.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: comments.length + 1,
        author: 'You',
        avatar: 'U',
        time: 'just now',
        content: commentText,
        likes: 0,
        replies: 0,
        liked: false,
      };
      setComments([newComment, ...comments]);
      setCommentText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Input */}
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
          U
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full bg-transparent border-b-2 border-zinc-700 py-2 focus:outline-none focus:border-blue-500 text-white placeholder:text-gray-500"
          />

          <div className="flex justify-end gap-3 mt-3">
            <button
              onClick={() => setCommentText('')}
              className="px-4 py-2 rounded text-gray-400 hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium disabled:opacity-50 hover:bg-blue-700 transition"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-400">Sort by</span>
        <button className="text-blue-400 font-medium hover:text-blue-300">
          Top comments
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm cursor-pointer ${
              comment.avatar === 'U'
                ? 'bg-gradient-to-br from-blue-400 to-purple-500'
                : 'bg-gray-600'
            }`}>
              {comment.avatar}
            </div>

            {/* Comment Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">{comment.author}</span>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>

              <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                {comment.content}
              </p>

              {/* Comment Actions */}
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 text-xs transition ${
                    comment.liked
                      ? 'text-blue-500'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{comment.likes > 0 ? comment.likes : ''}</span>
                </button>

                <button className="text-gray-500 hover:text-gray-300 transition">
                  <ThumbsDown className="w-4 h-4" />
                </button>

                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition">
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>

                <button className="p-1 text-gray-500 hover:text-gray-300 transition">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Reply Preview */}
              {comment.replies > 0 && (
                <button className="mt-3 text-blue-400 text-xs font-medium hover:text-blue-300">
                  {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More Comments */}
      <button className="w-full py-3 text-center text-blue-400 font-medium hover:text-blue-300 text-sm">
        Load more comments
      </button>
    </div>
  );
}
