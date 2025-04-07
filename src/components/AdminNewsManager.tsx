// src/components/AdminNewsManager.tsx
'use client';

import React, { useState, useTransition, useEffect } from 'react';
import type { NewsArticle } from '@/types';
import { createAIDraftArticle, updateArticle, publishArticle, deleteArticle, unpublishArticle } from '../app/admin/actions'; // Import server actions

interface AdminNewsManagerProps {
    initialArticles: NewsArticle[];
}

export default function AdminNewsManager({ initialArticles }: AdminNewsManagerProps) {
    const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [topic, setTopic] = useState(''); // For AI draft creation
    const [isLoadingAI, setIsLoadingAI] = useState(false); // Specific loading for AI call
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [isPending, startTransition] = useTransition(); // For form submissions

    // Form state for the selected article
    const [formData, setFormData] = useState<Partial<NewsArticle>>({});

    // Effect to update form when selectedArticle changes
    useEffect(() => {
        if (selectedArticle) {
            // Initialize form data with selected article's current values
            setFormData({
                title: selectedArticle.title ?? '',
                slug: selectedArticle.slug ?? '',
                summary: selectedArticle.summary ?? '',
                content: selectedArticle.content ?? '',
                image_url: selectedArticle.image_url ?? '',
                source_url: selectedArticle.source_url ?? '',
                author: selectedArticle.author ?? '',
                // Format date for datetime-local input, handle null/invalid dates
                published_at: selectedArticle.published_at
                    ? new Date(selectedArticle.published_at).toISOString().slice(0, 16)
                    : '',
            });
        } else {
            setFormData({}); // Clear form if no article is selected
        }
        setMessage(null); // Clear message when selection changes
    }, [selectedArticle]);

    const handleSelectArticle = (article: NewsArticle) => {
        setSelectedArticle(article);
        // Form update is now handled by useEffect
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value ? value : '' })); // Store as empty string if cleared
    };

    const handleCreateDraft = async () => {
        if (!topic.trim()) {
            setMessage({ type: 'error', text: 'Please enter a topic.' });
            return;
        }
        setMessage(null);
        setIsLoadingAI(true);
        
        // No optimistic update here, as we need the ID and content from the server
        const result = await createAIDraftArticle(topic);
        
        if (result.success && result.article) {
            setMessage({ type: 'success', text: result.message });
            // Add the new article to the top of the local articles list
            setArticles(prev => [result.article!, ...prev].sort((a, b) => (a.status === 'draft' ? -1 : 1) - (b.status === 'draft' ? -1 : 1) || new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())); // Keep drafts sorted first
            setTopic(''); // Clear topic input
        } else {
            setMessage({ type: 'error', text: result.message });
        }
        setIsLoadingAI(false);
    };
    
    const handleUpdateArticle = () => {
        if (!selectedArticle) return;
        
        const originalArticle = articles.find(d => d.id === selectedArticle.id);
        if (!originalArticle) return; // Should not happen if selectedArticle is set

        // Prepare only changed fields for update
        const updates: Partial<Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>> = {};
        let hasChanges = false;
        Object.keys(formData).forEach(key => {
            const formValue = formData[key as keyof typeof formData];
            const originalValue = originalArticle[key as keyof NewsArticle];
            
            // Refined comparison logic
            let currentVal = formValue;
            let initialVal = originalValue;

            // Handle date comparison by parsing form value back if necessary
            if (key === 'published_at' && typeof formValue === 'string') {
                currentVal = formValue ? new Date(formValue).toISOString() : null;
                initialVal = originalValue ? new Date(originalValue).toISOString() : null;
            } else if (typeof formValue === 'string' && initialVal === null) {
                // Treat empty string in form as null for comparison if original was null
                if(formValue === '') currentVal = null;
            }

            if (currentVal !== initialVal) {
                hasChanges = true;
                if (key === 'published_at') {
                    // Use the potentially null value from currentVal comparison
                    updates[key] = currentVal as string | null;
                } else {
                    // Using 'as any' here as a workaround for complex type inference issues
                    // when assigning to a dynamically keyed property with union/null types.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    updates[key as keyof typeof updates] = currentVal as any;
                }
            }
        });

        if (!hasChanges) {
            setMessage({type: 'error', text: 'No changes detected to save.'});
            return;
        }

        startTransition(async () => {
            setMessage(null);

            // Optimistic Update:
            const updatedArticles = articles.map(draft =>
                draft.id === selectedArticle.id ? { ...draft, ...updates } : draft
            );
            setArticles(updatedArticles);
            // Update selected article state as well to reflect changes immediately in form
            setSelectedArticle(prev => prev ? { ...prev, ...updates } : null);

            const result = await updateArticle(selectedArticle.id, updates);
            setMessage({ type: result.success ? 'success' : 'error', text: result.message });
            
            // If server fails, revert optimistic update (optional but good practice)
            if (!result.success) {
                setArticles(articles); // Revert to original articles list
                setSelectedArticle(originalArticle); // Revert selected article
            }
        });
    };

    const handlePublishArticle = () => {
        if (!selectedArticle) return;

        const publishDate = formData.published_at ? formData.published_at as string : null;

        startTransition(async () => {
            setMessage(null);

            // Optimistic Update:
            const originalArticles = articles; // Use renamed state
            // Update status locally instead of removing entirely
            const publishedArticle = { ...selectedArticle, status: 'published' as const, published_at: publishDate || new Date().toISOString() }; // Simulate publish
            setArticles(prev => prev.map(a => a.id === selectedArticle.id ? publishedArticle : a).sort((a, b) => (a.status === 'draft' ? -1 : 1) - (b.status === 'draft' ? -1 : 1) || new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())); // Update in list and re-sort
            setSelectedArticle(publishedArticle); // Keep selected, but show as published
            // setFormData({}); // Might not want to clear form immediately

            const result = await publishArticle(selectedArticle.id, publishDate);
            setMessage({ type: result.success ? 'success' : 'error', text: result.message });
            
            if (!result.success) {
                 setArticles(originalArticles); 
                 setSelectedArticle(originalArticles.find(d => d.id === selectedArticle?.id) || null); // Revert selected state too
             }
        });
    };

    const handleDeleteArticle = () => {
        if (!selectedArticle) return;

        // Confirmation dialog
        if (!window.confirm(`Are you sure you want to permanently delete "${selectedArticle.title}"?`)) {
            return;
        }

        startTransition(async () => {
            setMessage(null);

            // Optimistic Update:
            const originalArticles = articles;
            const deletedArticleId = selectedArticle.id;
            setArticles(prev => prev.filter(d => d.id !== deletedArticleId));
            setSelectedArticle(null);
            setFormData({});

            const result = await deleteArticle(deletedArticleId);
            setMessage({ type: result.success ? 'success' : 'error', text: result.message });

            // If server fails, revert optimistic update
            if (!result.success) {
                setArticles(originalArticles);
            }
        });
    };

    const handleUnpublishArticle = () => {
        if (!selectedArticle || selectedArticle.status !== 'published') { // Only allow unpublishing published articles
             setMessage({ type: 'error', text: 'Only published articles can be unpublished.' });
            return;
        }

        startTransition(async () => {
            setMessage(null);
            
            // Optimistic Update:
            const originalArticles = articles; // Use renamed state
            const articleToUnpublishId = selectedArticle.id;
            const unPublishedArticle = { 
                ...selectedArticle,
                status: 'draft' as const,
                published_at: null,
            };
            setArticles(prev => prev.map(a => a.id === articleToUnpublishId ? unPublishedArticle : a).sort((a, b) => (a.status === 'draft' ? -1 : 1) - (b.status === 'draft' ? -1 : 1) || new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime())); // Update and re-sort
            setSelectedArticle(unPublishedArticle); 

            const result = await unpublishArticle(articleToUnpublishId);
            setMessage({ type: result.success ? 'success' : 'error', text: result.message });

             if (!result.success) {
                 setArticles(originalArticles); // Use renamed state
                 setSelectedArticle(originalArticles.find(d => d.id === articleToUnpublishId) || null);
             }
        });
    };

    // Determine if publish button should be disabled
    const isPublishDisabled = !!selectedArticle && (!formData.author || formData.author.trim() === '');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Create Draft + Article List */}
            <div className="md:col-span-1 space-y-6">
                {/* Create Draft Section */}
                <div className="bg-gray-800 p-4 rounded-lg shadow">
                     <h2 className="text-xl font-semibold mb-3">Create AI Draft</h2>
                     <div className="space-y-3">
                         <textarea
                             value={topic}
                             onChange={(e) => setTopic(e.target.value)}
                             placeholder="Enter topic for AI (e.g., 'UFC 300 main event results', 'Latest Bellator signings')"
                             rows={3}
                             className="form-input"
                             disabled={isLoadingAI}
                         />
                         <button
                            onClick={handleCreateDraft}
                            disabled={isLoadingAI || isPending}
                            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors disabled:opacity-50"
                        >
                            {isLoadingAI ? 'Creating...' : 'Create Draft'}
                        </button>
                    </div>
                 </div>

                {/* Article List */}
                <div className="bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-3">All Articles ({articles.length})</h2>
                    <ul className="space-y-2 max-h-96 overflow-y-auto">
                        {articles.map((article) => (
                            <li key={article.id}>
                                <button
                                    onClick={() => handleSelectArticle(article)}
                                    className={`w-full text-left px-3 py-2 rounded transition-colors ${selectedArticle?.id === article.id ? 'bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                                >
                                    {article.title} 
                                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${article.status === 'published' ? 'bg-green-600' : 'bg-yellow-600 text-black'}`}>
                                        {article.status === 'published' ? 'Published' : 'Draft'}
                                    </span>
                                </button>
                            </li>
                        ))}
                         {articles.length === 0 && <p className="text-gray-400 italic">No articles found.</p>}
                    </ul>
                </div>
            </div>

            {/* Column 2: Edit Form */}
            <div className="md:col-span-2 bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">
                    {selectedArticle ? `Edit Article (ID: ${selectedArticle.id} - Status: ${selectedArticle.status})` : 'Edit Article'}
                </h2>
                {message && (
                    <div className={`p-3 rounded mb-4 text-center ${message.type === 'success' ? 'bg-green-600/80' : 'bg-red-600/80'}`}>
                        {message.text}
                    </div>
                )}
                {selectedArticle ? (
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                         {/* Add input fields for each editable property */}
                         <div>
                             <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                             <input type="text" name="title" id="title" value={formData.title || ''} onChange={handleInputChange} disabled={isPending} className="form-input" />
                         </div>
                         <div>
                             <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">Slug</label>
                             <input type="text" name="slug" id="slug" value={formData.slug || ''} onChange={handleInputChange} disabled={isPending} className="form-input" />
                         </div>
                          <div>
                             <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-1">Summary</label>
                             <textarea name="summary" id="summary" rows={3} value={formData.summary || ''} onChange={handleInputChange} disabled={isPending} className="form-input" />
                         </div>
                         <div>
                             <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                             <textarea name="content" id="content" rows={10} value={formData.content || ''} onChange={handleInputChange} disabled={isPending} className="form-input" />
                         </div>
                         <div>
                             <label htmlFor="image_url" className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                             <input type="text" name="image_url" id="image_url" value={formData.image_url || ''} onChange={handleInputChange} disabled={isPending} className="form-input" placeholder="https://example.com/image.jpg"/>
                             {/* TODO: Add image preview or upload component later */}
                         </div>
                         <div>
                            <label htmlFor="source_url" className="block text-sm font-medium text-gray-300 mb-1">Source URL</label>
                            <input type="text" name="source_url" id="source_url" value={formData.source_url || ''} onChange={handleInputChange} disabled={isPending} className="form-input" placeholder="https://originalsource.com/article"/>
                         </div>
                         <div>
                             <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">Author <span className="text-red-500">*</span></label>
                             <input type="text" name="author" id="author" value={formData.author || ''} onChange={handleInputChange} disabled={isPending} className="form-input" placeholder="Enter author name (required to publish)"/>
                         </div>
                         <div>
                             <label htmlFor="published_at" className="block text-sm font-medium text-gray-300 mb-1">Publish At (Optional - Leave blank to publish now)</label>
                             <input 
                                type="datetime-local" 
                                name="published_at" 
                                id="published_at" 
                                value={formData.published_at as string || ''} 
                                onChange={handleDateTimeChange} // Use specific handler
                                disabled={isPending} 
                                className="form-input" 
                            />
                         </div>

                        {/* Action Buttons */}
                         <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-700 mt-6">
                            <button 
                                type="button" 
                                onClick={handleUpdateArticle}
                                disabled={isPending}
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors disabled:opacity-50"
                            >
                                {isPending ? 'Saving...' : 'Save Changes'}
                            </button>
                             <button 
                                type="button" 
                                onClick={handlePublishArticle}
                                disabled={isPending || isPublishDisabled}
                                className={`px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition-colors disabled:opacity-50 ${isPublishDisabled ? 'cursor-not-allowed' : ''}`}
                                title={isPublishDisabled ? 'Author name is required to publish' : 'Publish the article'}
                            >
                                {isPending ? 'Publishing...' : 'Publish Article'}
                             </button>
                             {/* Unpublish Button - Show only if article is published */}
                             {selectedArticle?.status === 'published' && (
                             <button 
                                type="button" 
                                onClick={handleUnpublishArticle}
                                disabled={isPending}
                                className="px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded transition-colors disabled:opacity-50"
                             >
                                 {isPending ? 'Unpublishing...' : 'Unpublish (Back to Draft)'}
                             </button>
                             )}
                             {/* Delete Button */}
                             <button 
                                type="button" 
                                onClick={handleDeleteArticle}
                                disabled={isPending}
                                className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded transition-colors disabled:opacity-50 ml-auto" // Pushed to the right
                            >
                                {isPending ? 'Deleting...' : 'Delete Article'}
                             </button>
                         </div>
                    </form>
                ) : (
                    <p className="text-gray-400 italic text-center py-10">Select or create a draft article to edit.</p>
                )}
            </div>
        </div>
    );
}

// Helper style (add to globals.css or keep here temporarily)
// Make sure tailwind processes this or add to globals.css
const styles = `
.form-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #374151; /* gray-700 */
  border: 1px solid #4B5563; /* gray-600 */
  border-radius: 0.375rem; /* rounded-md */
  color: white;
  placeholder-color: #9CA3AF; /* gray-400 */
}
.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #EF4444; /* ring-2 ring-red-500 */
  border-color: #EF4444; /* focus:border-red-500 */
}
.form-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

textarea.form-input {
    min-height: 80px;
}
`;

// Inject styles (or move to globals.css) - less ideal but works for component demo
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
