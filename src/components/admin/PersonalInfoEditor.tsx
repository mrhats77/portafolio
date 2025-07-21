import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, User } from 'lucide-react';

const PersonalInfoEditor: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = useData();
  const [formData, setFormData] = useState(personalInfo);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const success = await updatePersonalInfo(formData);
    
    setIsSaving(false);
    
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="admin-section-header">
        <User />
        <h2 className="admin-section-title">Personal Information</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid md-grid-cols-2">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Professional Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows={4}
            className="form-textarea"
          />
        </div>

        <div className="grid md-grid-cols-2">
          <div className="form-group">
            <label htmlFor="profileImage" className="form-label">
              Profile Image URL
            </label>
            <input
              type="url"
              id="profileImage"
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="aboutImage" className="form-label">
              About Section Image URL
            </label>
            <input
              type="url"
              id="aboutImage"
              name="aboutImage"
              value={formData.aboutImage}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="card-footer flex-between">
          <div>
            {saved && (
              <div className="alert alert-success">
                <p>Changes saved successfully</p>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="btn btn-primary"
          >
            <Save />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoEditor;