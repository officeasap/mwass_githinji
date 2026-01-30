// src/pages/AdminArtStudio.tsx
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import AdminAccessGate from '@/components/admin/AdminAccessGate';
import { adminOtpService } from '@/services/adminOtpService';
import { artworks } from '@/lib/artworks';
import { 
  Upload, 
  Save, 
  X, 
  Image as ImageIcon,
  Edit2, 
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Palette,
  Calendar,
  Ruler,
  Type,
  Globe,
  Shield,
  LogOut
} from 'lucide-react';

const AdminArtStudio = () => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [artworksList, setArtworksList] = useState(artworks);
  const [editingArtwork, setEditingArtwork] = useState<typeof artworks[0] | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Check access on mount
  useEffect(() => {
    const checkAccess = () => {
      const hasAdminAccess = adminOtpService.isAccessGranted();
      setHasAccess(hasAdminAccess);
      
      // Set up auto-logout timer
      if (hasAdminAccess) {
        const checkInterval = setInterval(() => {
          if (!adminOtpService.isAccessGranted()) {
            setHasAccess(false);
            clearInterval(checkInterval);
          }
        }, 60000); // Check every minute
        
        return () => clearInterval(checkInterval);
      }
    };
    
    checkAccess();
  }, []);

  // Grant access callback
  const grantAccess = () => {
    adminOtpService.updateLastActivity();
    setHasAccess(true);
    
    // Force refresh to ensure clean state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Force logout
  const handleLogout = () => {
    adminOtpService.revokeAccess();
    setHasAccess(false);
    
    // Redirect to studio page after logout
    setTimeout(() => {
      window.location.href = '/studio';
    }, 500);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, artworkId: string) => {
    if (!adminOtpService.isAccessGranted()) {
      setHasAccess(false);
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    adminOtpService.updateLastActivity();
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const newUrl = event.target?.result as string;
      
      setArtworksList(prev => 
        prev.map(artwork => 
          artwork.id === artworkId 
            ? { ...artwork, image: newUrl } 
            : artwork
        )
      );

      if (editingArtwork?.id === artworkId) {
        setEditingArtwork(prev => prev ? { ...prev, image: newUrl } : null);
      }

      setPreviewImage(newUrl);
      setShowPreview(true);
    };
    reader.readAsDataURL(file);
  };

  // Save all changes
  const saveChanges = () => {
    if (!adminOtpService.isAccessGranted()) {
      setHasAccess(false);
      return;
    }

    setSaveStatus('saving');
    adminOtpService.updateLastActivity();
    
    setTimeout(() => {
      try {
        localStorage.setItem('studioArtworks', JSON.stringify(artworksList));
        
        const activityLog = JSON.parse(localStorage.getItem('adminActivityLog') || '[]');
        activityLog.push({
          timestamp: new Date().toISOString(),
          action: 'save_all_changes',
          artworksCount: artworksList.length
        });
        localStorage.setItem('adminActivityLog', JSON.stringify(activityLog.slice(-100)));
        
        setSaveStatus('saved');
        
        setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
      } catch (error) {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    }, 1500);
  };

  // Edit artwork
  const handleEdit = (artwork: typeof artworks[0]) => {
    if (!adminOtpService.isAccessGranted()) {
      setHasAccess(false);
      return;
    }
    adminOtpService.updateLastActivity();
    setEditingArtwork(artwork);
  };

  // Update artwork field
  const updateArtworkField = (field: keyof typeof artworks[0], value: any) => {
    if (!editingArtwork) return;
    adminOtpService.updateLastActivity();
    
    setEditingArtwork(prev => prev ? { ...prev, [field]: value } : null);
  };

  // Save artwork edit
  const saveArtworkEdit = () => {
    if (!editingArtwork) return;
    if (!adminOtpService.isAccessGranted()) {
      setHasAccess(false);
      return;
    }

    adminOtpService.updateLastActivity();
    
    setArtworksList(prev =>
      prev.map(artwork =>
        artwork.id === editingArtwork.id ? editingArtwork : artwork
      )
    );

    const activityLog = JSON.parse(localStorage.getItem('adminActivityLog') || '[]');
    activityLog.push({
      timestamp: new Date().toISOString(),
      action: 'edit_artwork',
      artworkId: editingArtwork.id,
      artworkTitle: editingArtwork.title
    });
    localStorage.setItem('adminActivityLog', JSON.stringify(activityLog.slice(-100)));

    setEditingArtwork(null);
    saveChanges();
  };

  // Toggle artwork visibility
  const toggleArtworkVisibility = (artworkId: string) => {
    if (!adminOtpService.isAccessGranted()) {
      setHasAccess(false);
      return;
    }

    adminOtpService.updateLastActivity();
    
    setArtworksList(prev =>
      prev.map(artwork =>
        artwork.id === artworkId 
          ? { ...artwork, forSale: !artwork.forSale } 
          : artwork
      )
    );
    
    const artwork = artworksList.find(a => a.id === artworkId);
    if (artwork) {
      const activityLog = JSON.parse(localStorage.getItem('adminActivityLog') || '[]');
      activityLog.push({
        timestamp: new Date().toISOString(),
        action: 'toggle_visibility',
        artworkId: artwork.id,
        artworkTitle: artwork.title,
        newStatus: !artwork.forSale ? 'visible' : 'hidden'
      });
      localStorage.setItem('adminActivityLog', JSON.stringify(activityLog.slice(-100)));
    }
    
    saveChanges();
  };

  // Reset save status
  const resetSaveStatus = () => {
    setSaveStatus('idle');
  };

  // Show loading while checking access
  if (hasAccess === null) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground-muted">Verifying access...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Show access gate if no access
  if (!hasAccess) {
    return <AdminAccessGate onAccessGranted={grantAccess} />;
  }

  // Render admin panel
  return (
    <Layout>
      <div className="min-h-screen bg-background pt-24 pb-24">
        {/* Header with security controls */}
        <div className="container mx-auto px-6 lg:px-12 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-deep">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">🎨 ART STUDIO ADMIN</h1>
                <div className="flex items-center gap-4">
                  <p className="text-foreground-muted">
                    Secure management panel • Auto-locks after 30 min
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-green-500">Session Active</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {saveStatus === 'saving' && (
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-primary">Securely Saving...</span>
                </div>
              )}
              
              {saveStatus === 'saved' && (
                <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">
                    Saved & Secured
                    <button 
                      onClick={resetSaveStatus}
                      className="ml-2 text-xs underline opacity-70 hover:opacity-100"
                    >
                      Clear
                    </button>
                  </span>
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm text-destructive">Save Failed</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={saveChanges}
                  className="btn-tall px-6 py-3 flex items-center gap-2 hover:lift-up transition-all"
                  disabled={saveStatus === 'saving'}
                >
                  <Save className="w-5 h-5" />
                  Save All Changes
                </button>
                
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-xl border border-border text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  title="Lock Admin Panel"
                >
                  <LogOut className="w-5 h-5" />
                  Lock
                </button>
              </div>
            </div>
          </div>

          {/* Security Warning */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-500 font-medium mb-1">
                  🔒 SECURITY NOTICE
                </p>
                <p className="text-xs text-amber-600">
                  This panel will auto-lock after 30 minutes of inactivity. Always click "Lock" when finished. 
                  Changes are logged for security audit.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-deep">
              <p className="text-metadata mb-1">TOTAL ARTWORKS</p>
              <p className="text-2xl font-bold text-foreground">{artworksList.length}</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 shadow-deep">
              <p className="text-metadata mb-1">VISIBLE</p>
              <p className="text-2xl font-bold text-green-500">
                {artworksList.filter(a => a.forSale).length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 shadow-deep">
              <p className="text-metadata mb-1">HIDDEN</p>
              <p className="text-2xl font-bold text-amber-500">
                {artworksList.filter(a => !a.forSale).length}
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4 shadow-deep">
              <p className="text-metadata mb-1">SESSION TIME</p>
              <p className="text-2xl font-bold text-primary">Active</p>
            </div>
          </div>
        </div>

        {/* Artworks Grid */}
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {artworksList.map((artwork) => (
              <div
                key={artwork.id}
                className={`bg-card border ${artwork.forSale ? 'border-border' : 'border-amber-500/30'} rounded-3xl p-6 shadow-deep hover:shadow-cathedral transition-all duration-300`}
              >
                {/* Artwork Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{artwork.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-foreground-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {artwork.year}
                      </span>
                      {artwork.series && (
                        <span className="flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          {artwork.series}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleArtworkVisibility(artwork.id)}
                      className={`p-2 rounded-lg ${artwork.forSale ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'} hover:opacity-80 transition-opacity`}
                      title={artwork.forSale ? 'Visible on site' : 'Hidden from site'}
                    >
                      {artwork.forSale ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(artwork)}
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      title="Edit artwork"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Artwork Image */}
                <div className="relative mb-4 rounded-2xl overflow-hidden bg-muted aspect-[4/3] group">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Image Upload Overlay */}
                  <label className="absolute bottom-4 right-4 bg-black/70 hover:bg-black/80 text-white p-3 rounded-xl cursor-pointer transition-all hover:scale-105">
                    <Upload className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, artwork.id)}
                    />
                  </label>
                </div>

                {/* Artwork Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Ruler className="w-4 h-4 text-foreground-muted" />
                    <span className="text-foreground">{artwork.dimensions}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Type className="w-4 h-4 text-foreground-muted" />
                    <span className="text-foreground">{artwork.medium}</span>
                  </div>
                </div>

                {/* Description Preview */}
                <div className="mb-4">
                  <p className="text-sm text-foreground-muted line-clamp-3">
                    {artwork.description.replace(/<[^>]*>/g, '')}
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPreviewImage(artwork.image);
                      setShowPreview(true);
                    }}
                    className="flex-1 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Preview
                  </button>
                  
                  <a
                    href={`/artwork/${artwork.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    View Live
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/90 z-[9998] flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-12 right-0 p-3 bg-black/50 hover:bg-black/70 text-white rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Edit Artwork Modal */}
      {editingArtwork && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-cathedral max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Edit Artwork</h2>
                <button
                  onClick={() => setEditingArtwork(null)}
                  className="p-2 hover:bg-muted rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-metadata mb-3">ARTWORK IMAGE</label>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
                      <img
                        src={editingArtwork.image}
                        alt={editingArtwork.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <label className="btn-tall w-full h-full flex flex-col items-center justify-center gap-3 cursor-pointer hover:lift-up transition-all">
                      <Upload className="w-8 h-8" />
                      <span className="font-medium">Upload New Image</span>
                      <span className="text-sm text-foreground-muted">PNG, JPG, WebP</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, editingArtwork.id)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-metadata mb-2">TITLE</label>
                  <input
                    type="text"
                    value={editingArtwork.title}
                    onChange={(e) => updateArtworkField('title', e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                
                <div>
                  <label className="block text-metadata mb-2">YEAR</label>
                  <input
                    type="number"
                    value={editingArtwork.year}
                    onChange={(e) => updateArtworkField('year', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              {/* Dimensions & Medium */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-metadata mb-2">DIMENSIONS</label>
                  <input
                    type="text"
                    value={editingArtwork.dimensions}
                    onChange={(e) => updateArtworkField('dimensions', e.target.value)}
                    placeholder="e.g., 60 × 75 cm"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
                
                <div>
                  <label className="block text-metadata mb-2">MEDIUM</label>
                  <input
                    type="text"
                    value={editingArtwork.medium}
                    onChange={(e) => updateArtworkField('medium', e.target.value)}
                    placeholder="e.g., Oil Pastels"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              {/* Series */}
              <div>
                <label className="block text-metadata mb-2">SERIES (Optional)</label>
                <input
                  type="text"
                  value={editingArtwork.series || ''}
                  onChange={(e) => updateArtworkField('series', e.target.value)}
                  placeholder="e.g., Human Nature"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-metadata mb-2">DESCRIPTION (HTML allowed)</label>
                <textarea
                  value={editingArtwork.description}
                  onChange={(e) => updateArtworkField('description', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none font-mono text-sm"
                  placeholder="Enter description with HTML formatting..."
                />
                <div className="mt-2 p-3 rounded-lg bg-muted/20 border border-border">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-foreground-muted mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-foreground-muted">
                      HTML allowed: Use <code>&lt;span class='flag-icon'&gt;&lt;img src='...'/&gt;&lt;/span&gt;</code> for flags, <code>&lt;br/&gt;</code> for line breaks
                    </p>
                  </div>
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={editingArtwork.forSale}
                      onChange={(e) => updateArtworkField('forSale', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 rounded-full transition-colors ${editingArtwork.forSale ? 'bg-primary' : 'bg-muted'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${editingArtwork.forSale ? 'left-7' : 'left-1'}`}></div>
                    </div>
                  </div>
                  <span className="text-foreground font-medium">
                    {editingArtwork.forSale ? 'Visible on website' : 'Hidden from website'}
                  </span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setEditingArtwork(null)}
                  className="flex-1 py-4 rounded-xl border border-border text-foreground hover:bg-muted transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveArtworkEdit}
                  className="flex-1 py-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-medium shadow-deep"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminArtStudio;