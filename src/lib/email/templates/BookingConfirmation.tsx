interface Props {
  customerName: string;
  serviceName: string;
  whenLabel: string;
  pending: boolean;
}

export function BookingConfirmation({ customerName, serviceName, whenLabel, pending }: Props) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#16110f" }}>
      <h2 style={{ color: "#650a1e" }}>
        {pending ? "Booking request received" : "Booking confirmed"}
      </h2>
      <p>Hi {customerName},</p>
      <p>
        {pending
          ? `Thanks for your request for ${serviceName} around ${whenLabel}. We'll confirm your exact time by phone or email shortly.`
          : `Your appointment for ${serviceName} on ${whenLabel} is confirmed.`}
      </p>
      <p>Waylee Hair &amp; Beauty — Rue Leschot 2, 1205 Genève — 078 249 55 84</p>
    </div>
  );
}
