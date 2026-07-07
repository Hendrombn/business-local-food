'use client';

import styles from './AdminPage.module.css';
import AdminContent from './_components/AdminContent';
import AdminHeader from './_components/AdminHeader';
import AdminStats from './_components/AdminStats';
import AdminTabs from './_components/AdminTabs';
import { useAdmin } from './_hooks/useAdmin';

export default function AdminPage() {
  const {
    stats,
    pendingBusinesses,
    reportedReviews,
    loading,
    activeTab,
    setActiveTab,
    handleVerifyBusiness,
    handleModerateReview,
  } = useAdmin();

  if (loading || !stats) {
    return <div className={styles.loading}>Memuat Admin Portal...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AdminHeader />

        <AdminStats stats={stats} />

        <AdminTabs
          activeTab={activeTab}
          stats={stats}
          onChange={setActiveTab}
        />

        <AdminContent
          activeTab={activeTab}
          pendingBusinesses={pendingBusinesses}
          reportedReviews={reportedReviews}
          onVerify={handleVerifyBusiness}
          onModerate={handleModerateReview}
        />
      </div>
    </div>
  );
}
