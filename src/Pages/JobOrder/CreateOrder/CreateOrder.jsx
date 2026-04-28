import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import "./CreateOrder.css";
import { useState } from "react";

export default function CreateOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    "/JobOrder/create",
    "/JobOrder/create/step2",
    "/JobOrder/create/step3",
    "/JobOrder/create/step4",
    "/JobOrder/create/step5",
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    dim: "",
    notes: "",
    material: "",
    quantity: "",
    priority: "",
    date: "",
  });

  const currentIndex = steps.indexOf(location.pathname);
  const isLastStep = currentIndex === steps.length - 1;

  const goNext = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1]);
    }
  };

  const isStep1Valid =
    formData.name !== "" &&
    formData.phone !== "" &&
    formData.email !== "";

  const isStep2Valid =
    formData.type !== "" &&
    formData.dim !== "" &&
    formData.notes !== "";

  const isStep3Valid = formData.material !== "";

  const isValid =
    currentIndex === 0
      ? isStep1Valid
      : currentIndex === 1
      ? isStep2Valid
      : currentIndex === 2
      ? isStep3Valid
      : true;

  return (
    <div className="createContainer">
      
      {/* 🔙 Back button (يختفي في آخر صفحة) */}
      {!isLastStep && (
        <div className="Back" onClick={() => navigate("/JobOrder/JobOrder")}>
          <ArrowLeft size={18} className="iconGray" />
          <span>Back to Orders</span>
        </div>
      )}

      {/* 🔵 Steps */}
      <div className="steps">
        {isLastStep ? (
          <div className="stepWrapper">
            <div className="circle done final">
              <Check size={18} />
            </div>
          </div>
        ) : (
          steps.map((_, i) => (
            <div key={i} className="stepWrapper">
              <div
                className={`circle ${
                  i < currentIndex
                    ? "done"
                    : i === currentIndex
                    ? "active"
                    : ""
                }`}
              >
                {i < currentIndex ? <Check size={14} /> : i + 1}
              </div>

              {i !== steps.length - 1 && <div className="Line"></div>}
            </div>
          ))
        )}
      </div>

      {/* 📄 محتوى كل step */}
      <Outlet context={{ formData, setFormData }} />

      {/* 🔘 Buttons (تختفي في آخر صفحة) */}
      {!isLastStep && (
        <div className="btnGroup">
          <button
            className="prevBtn"
            onClick={goBack}
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <button
            className={`nextBtn ${
              currentIndex === steps.length - 2 ? "createBtn" : ""
            }`}
            onClick={() => {
              if (currentIndex === steps.length - 1) {
                console.log("CREATE ORDER + GENERATE QR");
              } else {
                goNext();
              }
            }}
            disabled={!isValid}
          >
            {currentIndex === steps.length - 2 ? (
              "Create Order"
            ) : (
              <>
                Next <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}