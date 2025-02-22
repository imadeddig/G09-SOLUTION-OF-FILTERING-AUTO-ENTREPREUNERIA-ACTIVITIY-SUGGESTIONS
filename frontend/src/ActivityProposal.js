import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ActivityProposal.css";
import logo from "./assets/logo1 1.png";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { activityService } from '../src/services/api';

const ActivityDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [activityData, setActivityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adjacentActivities, setAdjacentActivities] = useState({ previous: null, next: null });

  // Extract the filter type from location state or default to 'to_review'
  const filterType = location.state?.filterType || 'to_review';

  useEffect(() => {
    console.log('Activity ID:', id);
    console.log('Filter Type:', filterType);
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const [activityDetails, adjacentIds] = await Promise.all([
          activityService.getActivityDetails(id),
          activityService.getAdjacentActivities(id, filterType)
        ]);
  
        console.log('Activity Details:', activityDetails);
        console.log('Adjacent Activities:', adjacentIds);
  
        setActivityData(activityDetails);
        setAdjacentActivities(adjacentIds);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchData();
    }
  }, [id, filterType]);

  const handleNavigation = (adjacentId) => {
    if (adjacentId) {
      console.log('Navigating to activity:', adjacentId);
      navigate(`/activity/${adjacentId}`, {
        state: { filterType }
      });
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      await activityService.updateActivityStatus(id, newStatus); // Update status in the backend
      navigate(-1); // Go back to the previous page
    } catch (err) {
      console.error('Error updating activity status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log('Current activity data:', activityData);

  return (
    <div className="page-container" style={{ top: "0" }}>
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div>
              <img
                src={logo}
                alt="Logo"
                style={{ top: "50px", width: "200px", height: "auto" }}
              />
            </div>
          </div>
          <nav className="nav-menu">
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="page-title-container">
          <h1 className="page-title">Activity / نشاط : {activityData?.activity || 'N/A'}</h1>
          <div className="navigation-buttons">
            <button className="nav-button"
              onClick={() => handleNavigation(adjacentActivities.previous)}
              disabled={!adjacentActivities.previous}>
              <ChevronLeft className="icon" />
              <span>رجوع للخلف</span>
            </button>
            <button className="nav-button"
              onClick={() => handleNavigation(adjacentActivities.next)}
              disabled={!adjacentActivities.next}>
              <span>التالي</span>
              <ChevronRight className="icon" />
            </button>
          </div>
        </div>

        <section className="info-section">
          <h2 className="section-title">
            Proposer Personal Information | المعلومات الشخصية للمقترح النشاط
          </h2>

          <div className="info-grid">
            <div className="info-item">
              <label>Full Name / الإسم الكامل</label>
              <div className="info-value">Ahsatal imad Eddine</div>
            </div>
            <div className="info-item">
              <label>Phone Number / رقم الهاتف</label>
              <div className="info-value">0556770990</div>
            </div>
            <div className="info-item full-width">
              <label>Email</label>
              <div className="info-value">imad.eddine.ahsatal@ensia.edu.dz</div>
            </div>
            <div className="info-item full-width">
              <label>Wilaya</label>
              <div className="info-value">{activityData?.wilaya}</div>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2 className="section-title">
            Proposed Activity Details | تفاصيل النشاط المقترح
          </h2>

          <div className="info-list">
            <div className="info-item full-width">
              <label>Field / المجال</label>
              <div className="info-value">
                {activityData?.domaine || 'N/A'}
              </div>
            </div>
            <div className="info-item full-width">
              <label>Activity / نشاط</label>
              <div className="info-value">{activityData?.activity || 'N/A'}</div>
            </div>
            <div className="info-item full-width">
              <label>Description / وصف</label>
              <div className="info-value">
                {activityData?.description || 'N/A'}
              </div>
            </div>
            <div className="info-item full-width">
              <label>Status / الحالة</label>
              <div className="info-value">{activityData?. raison_du_choix_du_status || 'N/A'}</div>
            </div>
          </div>
        </section>

        {activityData?.raison_du_choix_du_status === "Already exists" && (
          <section className="info-section">
            <h2 className="section-title">Similar Activity | نشاط مماثل</h2>
            <div className="info-list">
              <div className="info-item full-width">
                <label>Activity / نشاط</label>
                <div className="info-value">
                  Animateur de réseau d'entreprises / منشط شبكة المؤسسات
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="action-buttons">
          <button
            className="accept-button"
            onClick={() => handleStatusChange('accepted')}
            disabled={loading}
          >
            Accept Activity / قبول النشاط
          </button>
          <button
            className="decline-button"
            onClick={() => handleStatusChange('declined')}
            disabled={loading}
          >
            Decline Activity / رفض النشاط
          </button>
        </div>
      </main>
    </div>
  );
};

export default ActivityDetailsPage;
