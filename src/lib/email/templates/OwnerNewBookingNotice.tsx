interface Props {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  whenLabel: string;
  notes?: string;
  pending: boolean;
}

export function OwnerNewBookingNotice({
  customerName,
  customerEmail,
  customerPhone,
  serviceName,
  whenLabel,
  notes,
  pending,
}: Props) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#16110f" }}>
      <h2 style={{ color: "#650a1e" }}>
        {pending ? "New booking request (calendar not connected)" : "New booking"}
      </h2>
      <p>
        <strong>{customerName}</strong> — {serviceName}
      </p>
      <p>When: {whenLabel}</p>
      <p>
        Contact: {customerEmail} · {customerPhone}
      </p>
      {notes && <p>Notes: {notes}</p>}
    </div>
  );
}
