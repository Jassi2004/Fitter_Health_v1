import React from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { X, Hash, AtSign, ImagePlus } from 'lucide-react';

interface CreatePostTemplateProps {
  content: string;
  mediaFiles: File[];
  tags: string[];
  mentions: string[];
  setContent: (content: string) => void;
  setMediaFiles: (files: File[]) => void;
  setTags: (tags: string[]) => void;
  setMentions: (mentions: string[]) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const CreatePostTemplate: React.FC<CreatePostTemplateProps> = ({
  content,
  mediaFiles,
  tags,
  mentions,
  setContent,
  setMediaFiles,
  setTags,
  setMentions,
  handleSubmit,
}) => {
  const handleRemoveTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveMention = (indexToRemove: number) => {
    setMentions(mentions.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'tag' | 'mention'
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value) {
        if (type === 'tag') {
          setTags([...tags, value]);
        } else {
          setMentions([...mentions, value]);
        }
        e.currentTarget.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800/50 rounded-2xl p-8">
          <h2 className="text-3xl font-light tracking-tight mb-8">Create Post</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Content Section */}
            <div className="space-y-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px] bg-transparent border border-gray-800 rounded-xl p-6 text-lg font-light leading-relaxed focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 resize-none placeholder-gray-500"
                placeholder="Share your thoughts..."
                required
              />
            </div>

            {/* Media Upload Section */}
            <div className="border border-gray-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <ImagePlus size={20} />
                <span className="text-sm font-medium">Media</span>
              </div>
              <FileUpload onChange={setMediaFiles} />
              {mediaFiles.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {mediaFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="w-24 h-24 rounded-lg bg-gray-800/50 backdrop-blur flex items-center justify-center">
                        <span className="text-sm text-gray-400">{file.name.slice(0, 15)}...</span>
                      </div>
                      <button
                        onClick={() => setMediaFiles(mediaFiles.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags & Mentions Section */}
            <div className="grid grid-cols-2 gap-6">
              {/* Tags */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <Hash size={20} />
                  <span className="text-sm font-medium">Tags</span>
                </div>
                <input
                  type="text"
                  onKeyPress={(e) => handleKeyPress(e, 'tag')}
                  className="w-full bg-transparent border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 placeholder-gray-500"
                  placeholder="Add tags..."
                />
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur px-3 py-1.5 rounded-full text-sm"
                    >
                      #{tag}
                      <button onClick={() => handleRemoveTag(index)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <AtSign size={20} />
                  <span className="text-sm font-medium">Mentions</span>
                </div>
                <input
                  type="text"
                  onKeyPress={(e) => handleKeyPress(e, 'mention')}
                  className="w-full bg-transparent border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 placeholder-gray-500"
                  placeholder="Mention people..."
                />
                <div className="flex flex-wrap gap-2">
                  {mentions.map((mention, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur px-3 py-1.5 rounded-full text-sm"
                    >
                      @{mention}
                      <button onClick={() => handleRemoveMention(index)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl px-8 py-4 font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostTemplate;