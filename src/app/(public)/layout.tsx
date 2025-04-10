export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        // background: "#F5F5F5",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
}
