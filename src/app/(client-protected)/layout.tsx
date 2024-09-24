import VerticalMenuClient from "@/components/verticalMenuClient/page";

const AdminProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-fill pt-6">
      <div className="flex-none w-56">
        <VerticalMenuClient />
      </div>
      <div className="flex-grow p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminProtectedLayout;
