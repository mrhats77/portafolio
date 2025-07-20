import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit, Trash2, Save, X, Code } from 'lucide-react';
import { Skill } from '../../types';

const SkillsEditor: React.FC = () => {
  const { frontendSkills, backendSkills, updateSkills } = useData();
  const [editingSkill, setEditingSkill] = useState<{ skill: Skill; type: 'frontend' | 'backend'; index: number } | null>(null);
  const [isCreating, setIsCreating] = useState<'frontend' | 'backend' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const emptySkill: Skill = {
    name: '',
    level: 'Basic',
  };

  const [formData, setFormData] = useState<Skill>(emptySkill);

  const levels = ['Basic', 'Intermediate', 'Experienced'];

  const handleEdit = (skill: Skill, type: 'frontend' | 'backend', index: number) => {
    setEditingSkill({ skill, type, index });
    setFormData(skill);
    setIsCreating(null);
  };

  const handleCreate = (type: 'frontend' | 'backend') => {
    setEditingSkill(null);
    setFormData(emptySkill);
    setIsCreating(type);
  };

  const handleCancel = () => {
    setEditingSkill(null);
    setIsCreating(null);
    setFormData(emptySkill);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isCreating) {
      if (isCreating === 'frontend') {
        updateSkills([...frontendSkills, formData], backendSkills);
      } else {
        updateSkills(frontendSkills, [...backendSkills, formData]);
      }
    } else if (editingSkill) {
      if (editingSkill.type === 'frontend') {
        const updatedSkills = [...frontendSkills];
        updatedSkills[editingSkill.index] = formData;
        updateSkills(updatedSkills, backendSkills);
      } else {
        const updatedSkills = [...backendSkills];
        updatedSkills[editingSkill.index] = formData;
        updateSkills(frontendSkills, updatedSkills);
      }
    }

    setIsSaving(false);
    handleCancel();
  };

  const handleDelete = async (type: 'frontend' | 'backend', index: number) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      if (type === 'frontend') {
        const updatedSkills = frontendSkills.filter((_, i) => i !== index);
        updateSkills(updatedSkills, backendSkills);
      } else {
        const updatedSkills = backendSkills.filter((_, i) => i !== index);
        updateSkills(frontendSkills, updatedSkills);
      }
    }
  };

  if (isCreating || editingSkill) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Code className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isCreating ? `Add ${isCreating} Skill` : 'Edit Skill'}
            </h2>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., React, Node.js, Python"
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
                Skill Level
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5 mr-2" />
              {isSaving ? 'Saving...' : 'Save Skill'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  const SkillCard: React.FC<{ 
    title: string; 
    skills: Skill[]; 
    type: 'frontend' | 'backend' 
  }> = ({ title, skills, type }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={() => handleCreate(type)}
          className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button>
      </div>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{skill.name}</p>
              <p className="text-sm text-gray-600">{skill.level}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(skill, type, index)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(type, index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-500 text-center py-4">No skills added yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Code className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillCard title="Frontend Development" skills={frontendSkills} type="frontend" />
        <SkillCard title="Backend Development" skills={backendSkills} type="backend" />
      </div>
    </div>
  );
};

export default SkillsEditor;