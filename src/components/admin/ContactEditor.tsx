import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Mail } from 'lucide-react';

const ContactEditor: React.FC = () => {
  const { contactInfo, updateContactInfo } = useData();
  const [formData, setFormData] = useState(contactInfo);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const success = await updateContactInfo(formData);
    
    setIsSaving(false);
    
    if (success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="admin-section-header">
        <Mail />
        <h2 className="admin-section-title">Contact Information</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="form-input"
          />
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

export default ContactEditor;