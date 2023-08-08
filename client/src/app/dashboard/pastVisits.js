export default function PastVisits({ diagnosis }) {
  // console.log(diagnosis);
  // const pastDiagnosis = [...diagnosis];

  const displayPastVisits = (record) => {
    return record.map((record) => {
      return (
        <div key={new Date() * Math.random()}>
          <div>
            <div className="top-bar">
              <div className="top-item">
                <p className="list-title">Date:</p>
                <p className="list-value">{record.date}</p>
              </div>
              <div className="top-item">
                <p className="list-title">Doctor:</p>
                <p className="list-value">{record.doctor}</p>
              </div>
              <div className="top-item">
                <p className="list-title">Hospital:</p>
                <p className="list-value">{record.hosiptal}</p>
              </div>
            </div>
            <div className="list-item">
              <p className="list-title">Examintaions</p>
              <p>{record.examintaions}</p>
            </div>
            <div className="list-item">
              <p className="list-title">Diagnosis</p>
              <p>{record.diagnosis}</p>
            </div>
            <div className="list-item">
              <p className="list-title">Medicine</p>
              <p>{record.medicine}</p>
            </div>
            <hr />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="past-visit-container">
      {diagnosis ? displayPastVisits(diagnosis) : "No past diagnosis"}
    </div>
  );
}
