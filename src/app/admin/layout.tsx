export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="min-h-[70vh] bg-ivory-soft">{children}</div>;
}
