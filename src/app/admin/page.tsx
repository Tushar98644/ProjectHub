import dynamic from "next/dynamic";

const AdminClient = dynamic(() => import("./admin_client"), {
  ssr: false,
});

export default function Page() {
  return <AdminClient />;
}
