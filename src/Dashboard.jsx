import React from "react";
import { Pill, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { medicationData } from "./medData";
import Footer from "./Footer";

export default function Dashboard() {
  const getCurrentDateArabic = () => {
    return new Date().toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatus = (status) => {
    const isTaken = status === "تم";

    return {
      text: isTaken ? "تم أخذ الدواء" : "فاتني أخذ الدواء",
      color: isTaken ? "success" : "danger",
      icon: isTaken ? CheckCircle : AlertTriangle,
    };
  };

  return (
    <div dir="rtl" className="bg-light min-vh-100">
      <header className="bg-white shadow-sm py-4 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold d-flex align-items-center gap-2">
              <Pill className="text-primary" />
              جدول اليوم
            </h1>
            <p className="text-muted">{getCurrentDateArabic()}</p>
          </div>

          <div className="bg-primary text-white rounded p-3 text-center">
            <p className="mb-1">إجمالي الأدوية</p>
            <h2>{medicationData.length}</h2>
          </div>
        </div>
      </header>

      <main className="container pb-5">
        <div className="row g-4">
          {medicationData.map((medication) => {
            const status = getStatus(medication.status);
            const StatusIcon = status.icon;

            return (
              <div className="col-12 col-md-6 col-lg-4" key={medication.id}>
                <div className={`card h-100 shadow-sm border-${status.color}`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold">{medication.name}</h5>
                        <small className="text-muted">
                          {medication.dosage}
                        </small>
                      </div>

                      <span className={`badge bg-${status.color}`}>
                        <StatusIcon size={15} /> {status.text}
                      </span>
                    </div>

                    <div className="bg-light rounded p-3 text-center">
                      <Clock size={20} className="me-2" />
                      <strong>{medication.time}</strong>
                    </div>

                    <button
                      className={`btn btn-${status.color} w-100 mt-3`}
                      disabled={medication.status === "تم"}
                    >
                      {status.text}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      <Footer
        studentName="abdallah yaseen"
        studentId="12324262"
        githubUrl="https://github.com/abdalla-yaseen1"
        />
        </main>
    </div>
  );
}
