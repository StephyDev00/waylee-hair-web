interface Props {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export function ContactFormNotice({ name, email, phone, message }: Props) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#16110f" }}>
      <h2 style={{ color: "#650a1e" }}>New contact form message</h2>
      <p>
        <strong>{name}</strong> ({email}
        {phone ? `, ${phone}` : ""}) wrote:
      </p>
      <p style={{ whiteSpace: "pre-wrap", background: "#f7f2ea", padding: 16, borderRadius: 8 }}>
        {message}
      </p>
    </div>
  );
}
