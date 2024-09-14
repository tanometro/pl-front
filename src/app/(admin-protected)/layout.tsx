import VerticalMenuAdmin from "@/components/verticalMenuAdmin/page";

const AdminProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen pt-6">
      <div className="flex-none w-56">
        <VerticalMenuAdmin />
      </div>
      <div className="flex-grow p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminProtectedLayout;
