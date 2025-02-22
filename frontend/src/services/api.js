// src/services/activityService.js

const API_BASE_URL = 'http://localhost:8000';  // Adjust this to match your Django server URL

export const activityService = {
  // Get total counts for different activity types
  async getActivityCounts() {
    try {
      const [redundant, declined, toReview] = await Promise.all([
        fetch(`${API_BASE_URL}/total-redundant/`),
        fetch(`${API_BASE_URL}/total-declined/`),
        fetch(`${API_BASE_URL}/total-to-review/`)
      ]);

      const redundantData = await redundant.json();
      const declinedData = await declined.json();
      const toReviewData = await toReview.json();

      return {
        redundantCount: redundantData.total_redundant,
        declinedCount: declinedData.total_declined,
        toReviewCount: toReviewData.total_to_review
      };
    } catch (error) {
      console.error('Error fetching activity counts:', error);
      throw error;
    }
  },

  // Get redundant activities
  async getRedundantActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/search/redundant/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching redundant activities:', error);
      throw error;
    }
  },

  // Get declined activities
  async getDeclinedActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/search/declined/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching redundant activities:', error);
      throw error;
    }
  },

  // Get to review activities
  async getReviewActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/search/to_review/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching redundant activities:', error);
      throw error;
    }
  },

  async getActivityDetails(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/activity-details/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activity details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching activity details:', error);
      throw error;
    }
  },

  async updateActivityStatus(id, newStatus) {
    try {
      const response = await fetch(`${API_BASE_URL}/change-status/${id}/${newStatus}/`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating activity status:', error);
      throw error;
    }
  },

  async getActivitiesByType(type) {
    try {
      const response = await fetch(`${API_BASE_URL}/activities-by-type/${type}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching activities by type:', error);
      throw error;
    }
  },

  async getAdjacentActivities(id, type) {
    try {
      const response = await fetch(`${API_BASE_URL}/adjacent-activities/${id}/${type}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch adjacent activities');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching adjacent activities:', error);
      throw error;
    }
  }
};